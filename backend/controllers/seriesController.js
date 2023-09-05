/* eslint-disable no-undef */
const { tmdbInstance } = require('../axios/tmdbInstance');
const episodeModel = require('../models/episodeModel');
const genreModel = require('../models/genreModel');
const seasonModel = require('../models/seasonModel');
const seriesModel = require('../models/seriesModel');
const { getPlatformDetails, getCastAndCrew, addGenres, addProductions, addCrewDetails, addCastDetails } = require('./movieController');
const TMDB_KEY = process.env.TMDB_KEY;

const fetchSeries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        const end = page * limit;
        const search = req.query.search;
        const year = req.query.year;
        const field = req.query.field;
        const order = JSON.parse(req.query.order);
        const sortObj = {};
        sortObj[field] = (order ? 1 : -1);
        const genreId = req.query.genre;
        const genres = await genreModel.find();
        const count = await seriesModel
            .find({
                $and: [
                    { title: { $regex: search, $options: 'i' } },
                    { airDate: { $regex: year, $options: 'i' } },
                    ...(genreId
                        ? [{ genres: { $elemMatch: { $eq: genreId } } }]
                        : [])
                ]
            })
            .countDocuments()
            .exec();
        const shows = await seriesModel
            .find({
                $and: [
                    { title: { $regex: search, $options: 'i' } },
                    { airDate: { $regex: year, $options: 'i' } },
                    ...(genreId
                        ? [{ genres: { $elemMatch: { $eq: genreId } } }]
                        : [])
                ]
            })
            .populate('genres')
            .sort(sortObj)
            .skip(start)
            .limit(limit)
            .exec();
        const pagination = {};
        pagination.current = page;
        pagination.limit = limit;
        if (start > 0) {
            pagination.previous = page - 1;
        }
        if (end < count) {
            pagination.next = page + 1;
        }
        res.json({ shows, pagination, genres });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const addShow = async (show) => {
    try {
        const exist = await seriesModel
            .findOne({ id: show?.id })
            .lean();
        if (exist) {
            return ({ success: false, message: 'series already exists!' });
        } else {
            const result = await new Promise((resolve, reject) => {
                new seriesModel(show)
                    .save()
                    .then(() => {
                        resolve({ success: true, message: 'series added successfully' });
                    }).catch((error) => {
                        console.error('Error saving series:', error);
                        reject({ success: false, message: 'failed to save series' });
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addShowDetails = async (showData)=>{
    try {
        const {
            id,adult,title,genres,
            airDate,endDate,language,
            rating,summary,totalEpisodes,
            totalSeasons,tagline,status,
            popularity,backdrop,poster,
            images,videos,createdBy,
            networks,platforms,productions,
            seasons,casts,crews,
        }=showData;
        const genreIds = await addGenres(genres);
        const productionIds = await addProductions(productions);
        const creators = await addCrewDetails(createdBy);
        const networksData = await addProductions(networks);
        const seasonsData = seasons
            .filter((season)=>(season.season_number>0))
            .map((season)=>({
                id:season.id,
                seasonNum:season.season_number,
                title:season.name,
                poster:season.poster_path,
                airDate:season.air_date,
                totalEpisodes:season.episode_count,
                rating:season.vote_average
            }));
        const backdrops = images.slice(0,10).map((poster)=>poster?.file_path);
        const trailers = videos?.results?.filter((video) =>
            (video?.official=== true|| video?.type === 'Trailer' || video?.type === 'Teaser'))
            .slice(0, 10)
            .map((video) => video?.key);
        const show = {
            id,adult,title,
            airDate,endDate,language,
            rating,summary,totalEpisodes,
            totalSeasons,tagline,status,
            popularity,backdrop,poster,
            platforms,casts,crews,
            genres:genreIds,
            seasons:seasonsData,
            productions:productionIds,
            createdBy:creators,
            networks:networksData,
            images:backdrops,
            videos:trailers,
        };
        const result = await addShow(show);
        return result;
    } catch (error) {
        console.error('error adding series',error);
        res.json(error);
    }
};

const getShowDetails = async (req, res)=>{
    try {
        const showId = req.params?.showId;
        const exist = await seriesModel
            .findOne({ id: showId })
            .lean();
        if (exist) {
            return res.json({ success: false, message: 'series already exists!' });
        }
        const platforms = await getPlatformDetails('tv',showId);
        const {casts, crews} = await getCastAndCrew('tv',showId);
        const {data}=await tmdbInstance
            .get(`/tv/${showId}?api_key=${TMDB_KEY}&append_to_response=images,videos`);
        const {
            adult,backdrop_path,created_by,first_air_date,
            genres, id, last_air_date, name, networks,
            number_of_episodes, number_of_seasons,
            original_language, overview, popularity, 
            poster_path, production_companies,seasons,
            status, tagline, vote_average, images, videos,
        } = data;

        const showData = {
            id,adult,genres,tagline,status,
            popularity,videos,networks,
            platforms,seasons,casts,crews,
            title: name,
            airDate: first_air_date,
            endDate: last_air_date,
            language: original_language,
            rating: vote_average,
            summary: overview,
            totalEpisodes: number_of_episodes,
            totalSeasons: number_of_seasons,
            backdrop: backdrop_path,
            poster: poster_path,
            images:images.backdrops,
            createdBy:created_by,
            productions: production_companies,
        };
        const { success, message } = await addShowDetails(showData);
        res.json({ success, message });
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

const addSeason = async (season) => {
    try {
        const exist = await seasonModel
            .findOne({ id: season?.id })
            .lean();
        if (exist) {
            return ({ success: false, message: 'series already exists!' });
        } else {
            const result = await new Promise((resolve, reject) => {
                new seasonModel(season)
                    .save()
                    .then(() => {
                        resolve({ success: true, message: 'season added successfully' });
                    }).catch((error) => {
                        console.error('Error saving season:', error);
                        reject({ success: false, message: 'failed to save season' });
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const getSeasonDetails = async(req,res)=>{
    try {
        const showId = req.params.showId;
        const seasonId = req.query.seasonId;
        const seasonNum = req.query.season;
        const showExist = await seriesModel.findOne({id:showId});
        if(!showExist){
            return res.json({success:false, message:'series not added, add series first!'});
        }
        const seasonExist = await seasonModel.findOne({id:seasonId});
        if(seasonExist){
            return res.json({success:false, message:'season already added!'});
        }
        const { data } = await tmdbInstance.get(`/tv/${showId}/season/${seasonNum}?api_key=${TMDB_KEY}&append_to_response=videos`);
        const {
            air_date, episodes, name, overview, id,
            poster_path, season_number, vote_average, videos,
        } = data;
        const trailers = videos.results
            .filter((video) => (video.official === true || video.type === 'Trailer' || video.type === 'Teaser'))
            .slice(0, 10)
            .map((video) => (video.key));
        const episodesDetails = episodes.map((episode) => (
            {
                airDate: episode.air_date,
                episodeNum: episode.episode_number,
                id: episode.id,
                title: episode.name,
                duration: episode.runtime,
                poster: episode.still_path,
                rating: episode.vote_average,
            }
        ));
        const season = {
            id,
            title: name,
            airDate: air_date,
            show:showExist._id,
            summary: overview,
            poster: poster_path,
            seasonNum: season_number,
            rating: vote_average,
            episodes: episodesDetails,
            videos: trailers,
        };
        const { success, message } = await addSeason(season);
        res.json({ success, message });
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};


const addEpisode = async (episode) => {
    try {
        const exist = await episodeModel
            .findOne({ id: episode?.id })
            .lean();
        if (exist) {
            return ({ success: false, message: 'episode already exists!' });
        } else {
            const result = await new Promise((resolve, reject) => {
                new episodeModel(episode)
                    .save()
                    .then(() => {
                        resolve({ success: true, message: 'episode added successfully' });
                    }).catch((error) => {
                        console.error('Error saving episode:', error);
                        reject({ success: false, message: 'failed to save episode' });
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const getEpisodeDetails = async(req,res)=>{
    try {
        const showId = req.params.showId;
        const {seasonId,season,episodeId,episode}=req.query;

        const showExist = await seriesModel.findOne({id:showId});
        if(!showExist){
            return res.json({success:false, message:'series not added, add series first!'});
        }
        const seasonExist = await seasonModel.findOne({id:seasonId});
        if(!seasonExist){
            return res.json({success:false, message:'season not added, add season first!'});
        }
        const episodeExist = await episodeModel.findOne({id:episodeId});
        if(episodeExist){
            return res.json({success:false, message:'episode already added!'});
        }
        const { data } = await tmdbInstance.get(`/tv/${showId}/season/${season}/episode/${episode}?api_key=${TMDB_KEY}&append_to_response=images,credits`);
        const {
            air_date,crew,episode_number,guest_stars,
            name, overview, id, runtime,season_number,
            still_path, vote_average,images, credits,
        } = data;
        const stills = images.stills.slice(0,10).map((pic)=>pic.file_path);
        const crews = await addCrewDetails(crew);
        const casts = await addCastDetails(credits.cast);
        const guests = await addCastDetails(guest_stars);
        const episodeData = {
            id,
            title: name,
            airDate: air_date,
            show: showExist._id,
            season: seasonExist._id,
            seasonNum: season_number,
            episodeNum: episode_number,
            summary: overview,
            duration: runtime,
            poster: still_path,
            rating: vote_average,
            images: stills,
            casts,
            guests,
            crews
        };
        const { success, message } = await addEpisode(episodeData);
        res.json({ success, message });
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

const fetchGenreSeries = async (req, res) => {
    try {
        const genreName = req.params.genreName;
        const series = await seriesModel.aggregate([
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                }
            },
            {
                $match: {
                    'genres.genreName': genreName
                }
            }
        ]);
        res.json(series);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchSeriesDetails = async(req,res)=>{
    try {
        const showId = req.params?.showId;
        const show = await seriesModel
            .findById(showId)
            .populate('genres')
            .populate('networks')
            .populate('productions')
            .populate('platforms')
            .exec();
        res.json(show);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

const fetchSeasonDetails = async(req,res)=>{
    try {
        const seasonId = req.params?.seasonId;
        const season = await seasonModel
            .findOne({id:seasonId})
            .exec();
        res.json(season);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

const fetchEpisodeDetails = async(req,res)=>{
    try {
        const episodeId = req.params?.episodeId;
        const episode = await episodeModel
            .findOne({id:episodeId})
            .exec();
        res.json(episode);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};


module.exports = {
    getShowDetails,
    getSeasonDetails,
    getEpisodeDetails,
    fetchSeries,
    fetchGenreSeries,
    fetchSeriesDetails,
    fetchSeasonDetails,
    fetchEpisodeDetails
};
