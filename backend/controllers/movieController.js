/* eslint-disable no-undef */
const { movieInstance } = require('../axios/tmdbInstance');
const genreModel = require('../models/genreModel');
const movieModel = require('../models/movieModel');
const platformModel = require('../models/platformModel');
const productionModel = require('../models/productionModel');
const tmdbKey = process.env.TMDB_KEY;

const addPlatforms = (providers) => {
    try {
        for (const platform of providers) {
            addPlatform(platform);
        }
    } catch (err) {
        console.error('Error adding platforms:', err);
    }
};

const addPlatform = async (platform) => {
    try {
        const exist = await platformModel
            .findOne({ platformId: platform?.provider_id })
            .lean();
        if (!exist) {
            await new platformModel({
                platformId: platform?.provider_id,
                platformName: platform?.provider_name,
                logoPath: platform?.logo_path,
            }).save();
        }
    } catch (err) {
        console.error('error adding single platform', err);
    }
};


const addGenres = (genres) => {
    try {
        for (const genre of genres) {
            addGenre(genre);
        }
    } catch (err) {
        console.log(err);
    }
};

const addGenre = async (genre) => {
    try {
        const exist = await genreModel
            .findOne({ genreId: genre?.id })
            .lean();
        if (!exist) {
            await new genreModel({
                genreId: genre?.id,
                genreName: genre?.name
            }).save();
        }
    } catch (err) {
        console.log(err);
    }
};

const addProductions = (productions) => {
    try {
        for (const production of productions) {
            addProduction(production);
        }
    } catch (err) {
        console.log(err);
    }
};

const addProduction = async (production) => {
    try {
        const exist = await productionModel
            .findOne({ productionId: production?.id })
            .lean();
        if (!exist) {
            await new productionModel({
                productionId: production?.id,
                productionName: production?.name,
                logoPath: production?.logo_path,
                country: production?.origin_country
            }).save();
        }
    } catch (err) {
        console.log(err);
    }
};

const addMovie = async (movie) => {
    try {
        const exist = await movieModel
            .findOne({ id: movie?.id })
            .lean();
        if (!exist) {
            const result = await new Promise((resolve, reject) => {
                new movieModel(movie)
                    .save()
                    .then(() => {
                        resolve({ success: true, message: 'movie added successfully' });
                    }).catch((error) => {
                        console.error('Error saving movie:', error);
                        reject({ success: false, message: 'failed to save movie',error });
                    });
            });
            return result;
        } else {
            return ({ success: false, message: 'movie already exists!' });
        }
    } catch (err) {
        console.log(err);
    }
};

const getMovie = async (req, res) => {
    try {
        const movieId = req.params?.movieId;
        let providers = [];
        await movieInstance
            .get(`/${movieId}/watch/providers?api_key=${tmdbKey}`)
            .then((response) => {
                const buy = response.data?.results?.IN?.buy;
                const flatrate = response.data?.results?.IN?.flatrate;
                if (buy && buy.length > 0) {
                    providers = [...buy];
                }
                if (flatrate && flatrate.length > 0) {
                    providers = [...providers, ...flatrate];
                }
            });
        await addPlatforms(providers);
        const providerIds = [...new Set(providers.map((provider) => provider?.provider_id))];

        let movie = {};
        await movieInstance
            .get(`/${movieId}?api_key=${tmdbKey}&append_to_response=videos,images`)
            .then((response) => {
                const {
                    id,
                    imdb_id,
                    title,
                    original_title,
                    original_language,
                    adult,
                    vote_average,
                    popularity,
                    production_companies,
                    belongs_to_collection,
                    release_date,
                    overview,
                    genres,
                    runtime,
                    images,
                    videos
                } = response.data;
                addGenres(genres);
                const genreIds = genres.map((genre) => genre?.id);
                const hour = Math.floor(runtime / 60);
                const min = runtime % 60;
                const duration = `${hour}h ${min}m`;
                const posters = images?.posters?.map((poster) => poster?.file_path)
                    .slice(0,6);
                addProductions(production_companies);
                const productionIds = production_companies?.map((company) => company?.id);
                const trailers = videos?.results?.filter((video) => 
                    (video?.name === 'Official Trailer' || video?.type === 'Trailer' || video?.type === 'Teaser'))
                    .map((video) => video?.key)
                    .slice(0,6);
                movie = {
                    id,
                    imdbId: imdb_id,
                    title: title || original_title,
                    language: original_language,
                    adult,
                    rating: vote_average,
                    popularity,
                    duration,
                    releaseDate: release_date,
                    genres: genreIds,
                    productions: productionIds,
                    movieCollection: belongs_to_collection?.id,
                    summary: overview,
                    images: posters,
                    videos: trailers,
                    platforms: providerIds
                };
            })
            .catch((err) => {
                console.log(err);
            });
        const { success, message } = await addMovie(movie);
        res.json({ success, message });
    } catch (err) {
        res.json(err);
    }
};

const fetchMovies = async(req,res)=>{
    try{
        const movies = await movieModel.find();
        res.json(movies);
    }catch(err){
        res.json(err);
    }
};

const fetchMovie = async(req,res)=>{
    try{
        const movieId = req.params?.movieId;
        const movie = await movieModel.findOne({id: movieId}).lean();
        console.log(movie);
        res.json(movie);
    }catch(err){
        res.json(err);
    }
};

module.exports = { getMovie, fetchMovies, fetchMovie };

