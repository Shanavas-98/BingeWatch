/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { tmdbInstance } = require('../axios/tmdbInstance');
const genreModel = require('../models/genreModel');
const movieModel = require('../models/movieModel');
const platformModel = require('../models/platformModel');
const productionModel = require('../models/productionModel');
const castModel = require('../models/castModel');
const crewModel = require('../models/crewModel');
const reviewModel = require('../models/reviewModel');
const watchlistModel = require('../models/watchlistModel');
const TMDB_KEY = process.env.TMDB_KEY;

const addPlatform = async (platform) => {
    try {
        const exist = await platformModel
            .findOne({ platformId: platform?.provider_id })
            .lean();
        if (exist) {
            return (mongoose.Types.ObjectId(exist._id));
        } else {
            const result = await new Promise((resolve, reject) => {
                new platformModel({
                    platformId: platform?.provider_id,
                    platformName: platform?.provider_name,
                    logoPath: platform?.logo_path,
                })
                    .save()
                    .then((document) => {
                        resolve(mongoose.Types.ObjectId(document._id));
                    }).catch((error) => {
                        console.error('Error saving platform:', error);
                        reject(null);
                    });
            });
            return result;
        }

    } catch (err) {
        console.error('error adding single platform', err);
    }
};

const addPlatforms = async (providers) => {
    try {
        let platformArray = [];
        for (const platform of providers) {
            const platformId = await addPlatform(platform);
            if (platformId) {
                platformArray.push(platformId);
            }
        }
        return platformArray;
    } catch (err) {
        console.error('Error adding platforms:', err);
    }
};

const getPlatformDetails = async (content, contentId) => {
    try {
        let providers = [];
        await tmdbInstance
            .get(`/${content}/${contentId}/watch/providers?api_key=${TMDB_KEY}`)
            .then((response) => {
                const buy = response.data?.results?.IN?.buy;
                const flatrate = response.data?.results?.IN?.flatrate;
                const rent = response.data?.results?.IN?.rent;
                const free = response.data?.results?.IN?.free;
                providers = [...(buy ?? []), ...(flatrate ?? []), ...(rent ?? []), ...(free ?? [])];
            });
        const platformIds = await addPlatforms(providers);
        return platformIds;
    } catch (err) {
        console.error(err);
    }
};

const addCast = async (person) => {
    try {
        const exist = await castModel
            .findOne({ actorId: person?.castId })
            .lean();
        if (exist) {
            return ({ cast: mongoose.Types.ObjectId(exist._id), tmdbId: exist.actorId, name: exist.name, character: person?.character, profile: exist.profile });
        } else {
            const { data } = await tmdbInstance.get(`/person/${person?.castId}?api_key=${TMDB_KEY}&append_to_response=combined_credits`);
            const { biography, birthday, deathday, gender,
                id, known_for_department, name, place_of_birth,
                popularity, profile_path, combined_credits } = data;
            let genderType = '';
            if (gender === 1) {
                genderType = 'Female';
            } else if (gender === 2) {
                genderType = 'Male';
            } else if (gender === 3) {
                genderType = 'Non-binary';
            } else {
                genderType = 'Unknown';
            }
            const castCredits = combined_credits.cast
                .slice(0, 20)
                .map((movie) => (movie.id));
            const result = await new Promise((resolve, reject) => {
                new castModel({
                    actorId: id,
                    name,
                    biography,
                    birthday,
                    deathday,
                    gender: genderType,
                    department: known_for_department,
                    placeOfBirth: place_of_birth,
                    popularity,
                    profile: profile_path,
                    knownFor: castCredits
                })
                    .save()
                    .then((document) => {
                        resolve({ cast: mongoose.Types.ObjectId(document._id), tmdbId: document.actorId, name: document.name, character: person?.character, profile: document.profile });
                    }).catch((error) => {
                        console.error('Error saving cast:', error);
                        reject(null);
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addCasts = async (casts) => {
    try {
        let castsArray = [];
        for (const actor of casts) {
            const castData = await addCast(actor);
            if (castData) {
                castsArray.push(castData);
            }
        }
        return castsArray;
    } catch (err) {
        console.errpr(err);
    }
};

const addCastDetails = async (castDetails) => {
    try {
        const cast = castDetails
            .sort((a, b) => a.order - b.order)
            .slice(0, 20)
            .map((person) => {
                return ({
                    castId: person.id,
                    name: person.name,
                    character: person.character,
                });
            });
        const castData = await addCasts(cast);
        return castData;
    } catch (err) {
        console.error(err);
    }

};

const addCrew = async (person) => {
    try {
        const exist = await crewModel
            .findOne({ crewId: person?.crewId })
            .lean();
        if (exist) {
            return ({ crew: mongoose.Types.ObjectId(exist._id), tmdbId: exist.crewId, name: exist.name, job: person?.job, profile: exist.profile });
        } else {
            const { data } = await tmdbInstance.get(`/person/${person?.crewId}?api_key=${TMDB_KEY}&append_to_response=combined_credits`);
            const { biography, birthday, deathday, gender,
                id, known_for_department, name, place_of_birth,
                popularity, profile_path, combined_credits } = data;
            let genderType = '';
            if (gender === 1) {
                genderType = 'Female';
            } else if (gender === 2) {
                genderType = 'Male';
            } else if (gender === 3) {
                genderType = 'Non-binary';
            } else {
                genderType = 'Unknown';
            }
            const crewCredits = combined_credits.crew
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 20)
                .map((movie) => (movie.id));
            const result = await new Promise((resolve, reject) => {
                new crewModel({
                    crewId: id,
                    name,
                    profile: profile_path,
                    biography,
                    birthday,
                    deathday,
                    gender: genderType,
                    department: known_for_department,
                    placeOfBirth: place_of_birth,
                    popularity,
                    knownFor: crewCredits
                })
                    .save()
                    .then((document) => {
                        resolve({ crew: mongoose.Types.ObjectId(document._id), tmdbId: document.crewId, name: document.name, job: person?.job, profile: document.profile });
                    }).catch((error) => {
                        console.error('Error saving cast:', error);
                        reject(null);
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addCrews = async (crews) => {
    try {
        let resultArray = [];
        for (const person of crews) {
            const crewData = await addCrew(person);
            if (crewData) {
                resultArray.push(crewData);
            }
        }
        const crewsArray = resultArray.reduce((acc, obj) => {
            const existingObj = acc.find((item) => (item.tmdbId === obj.tmdbId));
            if (existingObj) {
                existingObj.job += `, ${obj.job}`;
            } else {
                acc.push(obj);
            }
            return acc;
        }, []);
        return crewsArray;
    } catch (err) {
        console.error(err);
    }
};

const addCrewDetails = async (crewDetails) => {
    try {
        const crew = crewDetails
            .slice(0, 20)
            .map((person) => {
                return ({
                    crewId: person.id,
                    name: person.name,
                    job: person.job,
                });
            });
        const crewData = await addCrews(crew);
        return crewData;
    } catch (err) {
        console.error(err);
    }
};

const getCastAndCrew = async (content, contentId) => {
    try {
        let castDetails;
        let crewDetails;
        await tmdbInstance
            .get(`/${content}/${contentId}/credits?api_key=${TMDB_KEY}`)
            .then((response) => {
                const { cast, crew } = response.data;
                castDetails = cast;
                crewDetails = crew;
            });
        const casts = await addCastDetails(castDetails);
        const crews = await addCrewDetails(crewDetails);
        return { casts, crews };
    } catch (err) {
        console.error(err);
    }
};

const addGenre = async (genre) => {
    try {
        const exist = await genreModel
            .findOne({ genreId: genre?.id })
            .lean();
        if (exist) {
            return (mongoose.Types.ObjectId(exist._id));
        } else {
            const result = await new Promise((resolve, reject) => {
                new genreModel({
                    genreId: genre?.id,
                    genreName: genre?.name
                })
                    .save()
                    .then((document) => {
                        resolve(mongoose.Types.ObjectId(document._id));
                    }).catch((error) => {
                        console.error('Error saving platform:', error);
                        reject(null);
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addGenres = async (genres) => {
    try {
        let genreArray = [];
        for (const genre of genres) {
            const genreId = await addGenre(genre);
            if (genreId) {
                genreArray.push(genreId);
            }
        }
        return genreArray;
    } catch (err) {
        console.error(err);
    }
};

const addProduction = async (production) => {
    try {
        const exist = await productionModel
            .findOne({ productionId: production?.id })
            .lean();
        if (exist) {
            return (mongoose.Types.ObjectId(exist._id));
        } else {
            const result = await new Promise((resolve, reject) => {
                new productionModel({
                    productionId: production?.id,
                    productionName: production?.name,
                    logoPath: production?.logo_path,
                    country: production?.origin_country
                })
                    .save()
                    .then((document) => {
                        resolve(mongoose.Types.ObjectId(document._id));
                    }).catch((error) => {
                        console.error('Error saving platform:', error);
                        reject(null);
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addProductions = async (productions) => {
    try {
        let productionArray = [];
        for (const production of productions) {
            const productionId = await addProduction(production);
            if (productionId) {
                productionArray.push(productionId);
            }
        }
        return productionArray;
    } catch (err) {
        console.error(err);
    }
};

const addMovie = async (movie) => {
    try {
        const exist = await movieModel
            .findOne({ id: movie?.id })
            .lean();
        if (exist) {
            return ({ success: false, message: 'movie already exists!' });
        } else {
            const result = await new Promise((resolve, reject) => {
                new movieModel(movie)
                    .save()
                    .then(() => {
                        resolve({ success: true, message: 'movie added successfully' });
                    }).catch((error) => {
                        console.error('Error saving movie:', error);
                        reject({ success: false, message: 'failed to save movie' });
                    });
            });
            return result;
        }
    } catch (err) {
        console.error(err);
    }
};

const addMovieDetails = async (movieDetails) => {
    try {
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
            videos,
            platforms,
            casts,
            crews
        } = movieDetails;
        const genreIds = await addGenres(genres);
        const productionIds = await addProductions(production_companies);
        const hour = Math.floor(runtime / 60);
        const min = runtime % 60;
        const duration = `${hour}h ${min}m`;
        const posters = images?.posters?.map((poster) => poster?.file_path)
            .slice(0, 10);
        const trailers = videos?.results?.filter((video) =>
            (video?.official == true || video?.type === 'Trailer' || video?.type === 'Teaser'))
            .map((video) => video?.key)
            .slice(0, 10);
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
            platforms,
            casts,
            crews
        };
        const result = await addMovie(movie);
        return result;
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const getMovieDetails = async (req, res) => {
    try {
        const movieId = req.params?.movieId;
        const exist = await movieModel
            .findOne({ id: movieId })
            .lean();
        if (exist) {
            return ({ success: false, message: 'movie already exists!' });
        }
        const platforms = await getPlatformDetails('movie', movieId);
        const { casts, crews } = await getCastAndCrew('movie', movieId);
        let movieData = {};
        await tmdbInstance
            .get(`/movie/${movieId}?api_key=${TMDB_KEY}&append_to_response=videos,images`)
            .then((response) => {
                const {
                    id, imdb_id, title, original_title,
                    original_language, adult, vote_average,
                    popularity, production_companies,
                    belongs_to_collection, release_date,
                    overview, genres, runtime, images, videos
                } = response.data;

                movieData = {
                    id, imdb_id, title, original_title,
                    original_language, adult, vote_average,
                    popularity, production_companies,
                    belongs_to_collection, release_date,
                    overview, genres, runtime, images,
                    videos, platforms, casts, crews
                };
            })
            .catch((err) => {
                console.error(err);
            });
        const { success, message } = await addMovieDetails(movieData);
        res.json({ success, message });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchMovies = async (req, res) => {
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
        const genres = await genreModel.find().sort({ genreName: 1 });
        const count = await movieModel
            .find({
                $and: [
                    { title: { $regex: search, $options: 'i' } },
                    { releaseDate: { $regex: year, $options: 'i' } },
                    ...(genreId
                        ? [{ genres: { $elemMatch: { $eq: genreId } } }]
                        : [])
                ]
            })
            .countDocuments()
            .exec();
        const movies = await movieModel
            .find({
                $and: [
                    { title: { $regex: search, $options: 'i' } },
                    { releaseDate: { $regex: year, $options: 'i' } },
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
        res.json({ movies, pagination, genres });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchMovie = async (req, res) => {
    try {
        const movieId = req.params?.movieId;
        const movie = await movieModel.findById(movieId).populate('genres').lean();
        res.json(movie);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchGenreMovies = async (req, res) => {
    try {
        const genreName = req.params.genreName;
        const movies = await movieModel.aggregate([
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
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const editMovie = async (req, res) => {
    try {
        const { title, language, duration, rating, releaseDate, summary } = req.body;
        const movieId = req.params?.movieId;
        await movieModel.findByIdAndUpdate(
            movieId,
            {
                $set: {
                    title,
                    language,
                    duration,
                    rating,
                    releaseDate,
                    summary
                }
            },
            { new: true })
            .then(() => {
                res.json({ success: true, message: 'movie edited successfully' });
            })
            .catch((err) => {
                res.json({ success: false, message: 'error while editing movie', err });
            });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchGenres = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        const end = page * limit;
        const search = req.query.search;
        const field = req.query.field;
        const order = JSON.parse(req.query.order);
        const sortObj = {};
        sortObj[field] = (order ? 1 : -1);
        const count = await genreModel
            .find({ genreName: { $regex: search, $options: 'i' } })
            .countDocuments()
            .exec();
        const genres = await genreModel
            .find({ genreName: { $regex: search, $options: 'i' } })
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
        res.json({ genres, pagination });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchActors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        const end = page * limit;
        const search = req.query.search;
        const field = req.query.field;
        const order = JSON.parse(req.query.order);
        const sortObj = {};
        sortObj[field] = (order ? 1 : -1);
        const gender = req.query.gender;
        const count = await castModel
            .find({
                $and: [
                    { name: { $regex: search, $options: 'i' } },
                    (gender ? { gender: gender } : {})
                ]
            })
            .countDocuments()
            .exec();
        const actors = await castModel
            .find({
                $and: [
                    { name: { $regex: search, $options: 'i' } },
                    (gender ? { gender: gender } : {})
                ]
            })
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
        res.json({ actors, pagination });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchCrews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        const end = page * limit;
        const search = req.query.search;
        const field = req.query.field;
        const order = JSON.parse(req.query.order);
        const sortObj = {};
        sortObj[field] = (order ? 1 : -1);
        const gender = req.query.gender;
        const count = await crewModel
            .find({
                $and: [
                    { name: { $regex: search, $options: 'i' } },
                    (gender ? { gender: gender } : {})
                ]
            })
            .countDocuments()
            .exec();
        const crews = await crewModel
            .find({
                $and: [
                    { name: { $regex: search, $options: 'i' } },
                    (gender ? { gender: gender } : {})
                ]
            })
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
        res.json({ crews, pagination });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchMovieDetails = async (req, res) => {
    try {
        const movieId = req.params?.movieId;
        const movie = await movieModel
            .findById(movieId)
            .populate('genres')
            .populate('productions')
            .populate('platforms')
            .exec();
        res.json(movie);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const addRating = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const user = req.userId;
        const rating = req.query.rating;
        const exist = await reviewModel.findOne({ user: user, content: contentId });
        if (!exist) {
            await reviewModel.create({
                content: contentId,
                user: user,
                rating: rating
            });
            res.json({ success: true, message: 'rating added' });
        } else {
            await reviewModel.findByIdAndUpdate(exist._id, {
                rating: rating
            });
            res.json({ success: true, message: 'rating updated' });
        }
    } catch (error) {
        console.error('Error rating movie:', error);
        res.json({ success: false, message: 'error while rating' });
    }
};

const addToWatchlist = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const type = req.query.type;
        const userId = req.userId;
        const watchlist = await watchlistModel.findOne({ user: userId });
        if (watchlist) {
            const query = {
                user: userId,
                ...(type === 'movie' ? { movies: contentId } : {}),
                ...(type === 'show' ? { series: contentId } : {})
            };
            const remove = {
                ...(type === 'movie' ? { $pull: { movies: contentId } } : {}),
                ...(type === 'show' ? { $pull: { series: contentId } } : {})
            };
            const update =                  {
                ...(type === 'movie' ? { $push: { movies: contentId } } : {}),
                ...(type === 'show' ? { $push: { series: contentId } } : {})
            };
            const isMovie = await watchlistModel.findOneAndUpdate(query, remove);
            if (!isMovie) {
                await watchlistModel.findOneAndUpdate({ user: userId }, update);
                res.json({ success: true, message: 'added to watchlist' });
            }else {
                res.json({ success: true, message: 'removed from watchlist' });
            }
        }else {
            await watchlistModel.create({
                user: userId,
                ...(type === 'movie' ? { movies: [contentId] } : type === 'show' ? { series: [contentId] } : {})
            });            
            res.json({ success: true, message: 'added to watchlist' });
        }
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.json({ success: false, message: 'error while adding to watchlist' });
    }

};

const fetchReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const userId = req.userId;
        const reviewData = await reviewModel.findOne({ content: movieId, user: userId });
        const isMovie = await watchlistModel.findOne({
            $and: [
                { user: userId },
                { movies: movieId }
            ]
        });
        let inList = false;
        if (isMovie) {
            inList = true;
        }
        if (reviewData) {
            res.json({ reviewData, inList });
        } else {
            res.json({ success: true, message: 'review not posted' });
        }
    } catch (error) {
        console.error('Error fetching movie rating:', error);
        res.json({ success: false, message: 'fetching review failed' });
    }
};

const addReview = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const userId = req.userId;
        const review = req.body.review;
        const exist = await reviewModel.findOne({ content: contentId, user: userId });
        if (!exist) {
            await reviewModel.create({
                content: contentId,
                user: userId,
                review: review
            });
            res.json({ success: true, message: 'review added' });
        } else {
            await reviewModel.findByIdAndUpdate(exist._id, {
                review: review
            });
            res.json({ success: true, message: 'review updated' });
        }
    } catch (error) {
        console.error('Error reviewing movie:', error);
        res.json({ success: false, message: 'error while reviewing' });
    }

};

const fetchActorDetails = async (req, res) => {
    try {
        const actorId = req.params.actorId;
        const actor = await castModel.findById(actorId);
        if (actor) {
            const movies = await Promise.all(
                actor.knownFor?.map(async (movieId) => {
                    const movie = await movieModel.findOne({ id: movieId });
                    return movie;
                })
            );
            if (movies.length > 0) {
                const knownFor = movies.filter((movie) => movie !== null);
                res.json({ actor, knownFor });
            }
        } else {
            res.json({ status: false, message: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error fetching actor', error);
        res.json(error);
    }
};

const fetchCrewDetails = async (req, res) => {
    try {
        const crewId = req.params.crewId;
        const crew = await crewModel.findById(crewId);
        if (crew) {
            const movies = await Promise.all(
                crew.knownFor?.map(async (movieId) => {
                    const movie = await movieModel.findOne({ id: movieId });
                    return movie;
                })
            );
            if (movies.length > 0) {
                const knownFor = movies.filter((movie) => movie !== null);
                res.json({ status: true, crew, knownFor });
            }
        } else {
            res.json({ status: false, message: 'Crew not found' });
        }
    } catch (error) {
        console.error('Error fetching crew', error);
        res.json(error);
    }
};

const fetchAllReviews = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const userId = req.userId;
        const reviews = await reviewModel
            .find({ content: movieId, user: { $ne: userId } })
            .populate({
                path:'user',
                select:'_id fullName picture'
            })
            .exec();
        const userReview = await reviewModel
            .findOne({ user: userId, content: movieId })
            .populate({
                path:'user',
                select:'_id fullName picture'
            })
            .exec();
        if (reviews || userReview) {
            return res.json({ reviews, userReview });
        } else {
            return res.json({ reviews: null, userReview: null });
        }
    } catch (error) {
        res.json(error);
    }
};

const fetchRelatedMovies = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const genresData = await movieModel.findById(movieId, { genres: 1, movieCollection: 1 });
        if (genresData) {
            const relatedMovies = await movieModel.find({ genres: { $in: genresData.genres } }).limit(10);
            res.json(relatedMovies);
        }
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    getMovieDetails,
    getPlatformDetails,
    getCastAndCrew,
    addGenres,
    addProductions,
    addCastDetails,
    addCrewDetails,
    fetchMovies,
    fetchMovie,
    editMovie,
    fetchGenres,
    fetchActors,
    fetchCrews,
    fetchGenreMovies,
    fetchMovieDetails,
    addRating,
    addToWatchlist,
    fetchReview,
    addReview,
    fetchActorDetails,
    fetchCrewDetails,
    fetchAllReviews,
    fetchRelatedMovies
};

