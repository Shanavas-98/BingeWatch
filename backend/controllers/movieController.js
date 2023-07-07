/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { movieInstance } = require('../axios/tmdbInstance');
const genreModel = require('../models/genreModel');
const movieModel = require('../models/movieModel');
const platformModel = require('../models/platformModel');
const productionModel = require('../models/productionModel');
const castModel = require('../models/castModel');
const crewModel = require('../models/crewModel');
const tmdbKey = process.env.TMDB_KEY;

const addPlatform = async (platform) => {
    try {
        const exist = await platformModel
            .findOne({ platformId: platform?.provider_id })
            .lean();
        if (!exist) {
            const platformData = await new platformModel({
                platformId: platform?.provider_id,
                platformName: platform?.provider_name,
                logoPath: platform?.logo_path,
            }).save();
            const platformId = mongoose.Types.ObjectId(platformData._id);
            return platformId;
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
            platformArray.push(platformId);
        }
        return platformArray;
    } catch (err) {
        console.error('Error adding platforms:', err);
    }
};

const getPlatformDetails = async (movieId) => {
    try {
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
        const platformIds = await addPlatforms(providers);
        return platformIds;
    } catch (err) {
        console.log(err);
    }

};



const addCast = async (actor) => {
    try {
        const exist = await castModel
            .findOne({ castId: actor?.castId })
            .lean();
        if (!exist) {
            const cast = await new castModel({
                castId: actor?.castId,
                name: actor?.name,
                profile: actor?.profile,
                gender: actor?.gender,
                popularity: actor?.popularity
            }).save();
            const castData = { cast: mongoose.Types.ObjectId(cast._id), character: actor?.character, order: actor?.order };
            return castData;
        }
    } catch (err) {
        console.log(err);
    }
};

const addCrew = async (person) => {
    try {
        const exist = await crewModel
            .findOne({ crewId: person?.crewId })
            .lean();
        if (!exist) {
            const crew = await new crewModel({
                crewId: person?.crewId,
                name: person?.name,
                profile: person?.profile,
                gender: person?.gender,
                popularity: person?.popularity
            }).save();
            const crewData = { crew: mongoose.Types.ObjectId(crew._id), job: person?.job };
            return crewData;
        }
    } catch (err) {
        console.log(err);
    }
};

const addCasts = async (casts) => {
    try {
        let castArray = [];
        for (const actor of casts) {
            const castData = await addCast(actor);
            castArray.push(castData);
        }
        return castArray;
    } catch (err) {
        console.log(err);
    }
};

const addCrews = async (crew) => {
    try {
        // let crewArray = [];
        // let index = 0;
        // for (const person of crew) {
        //     const crewData = addCrew(person);
        //     crewArray.push({...crewData,order:index});
        //     index++;
        // }
        const crewArray = crew.map(async (person, index) => {
            const crewData = await addCrew(person);
            return { ...crewData, order: index };
        });
        return crewArray;
    } catch (err) {
        console.log(err);
    }
};

const addCastDetails = async (castDetails) => {
    try {
        castDetails.map((person) => {
            let gender = '';
            if (person.gender === 1) {
                gender = 'Female';
            } else if (person.gender === 2) {
                gender = 'Male';
            } else {
                gender = 'Unknown';
            }
            return ({
                order: person.order,
                character: person.character,
                gender,
                castId: person.id,
                department: person.known_for_department,
                name: person.name || person.original_name,
                popularity: person.popularity,
                profile: person.profile_path,
            });
        })
            .sort((a, b) => a.order - b.order)
            .slice(0, 20);
        const castData = await addCasts(cast);
        return castData;
    } catch (err) {
        console.error(err);
    }

};

const addCrewDetails = async (crewDetails) => {
    try {
        const crew = crewDetails.map((person) => {
            let gender = '';
            if (person.gender === 1) {
                gender = 'Female';
            } else if (person.gender === 2) {
                gender = 'Male';
            } else {
                gender = 'Unknown';
            }
            return ({
                job: person.job,
                gender,
                crewId: person.id,
                department: person.department || person.known_for_department,
                name: person.name || person.original_name,
                popularity: person.popularity,
                profile: person.profile_path,
            });
        })
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 20);
        const crewData = await addCrews(crew);
        return crewData;
    } catch (err) {
        console.error(err);
    }
};

const getCastAndCrew = async (movieId) => {
    try {
        let castDetails;
        let crewDetails;
        await movieInstance
            .get(`/${movieId}/credits?api_key=${tmdbKey}`)
            .then((response) => {
                const { cast, crew } = response;
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
        if (!exist) {
            const genreData = await new genreModel({
                genreId: genre?.id,
                genreName: genre?.name
            }).save();
            const genreId = mongoose.Types.ObjectId(genreData._id);
            return genreId;
        }
    } catch (err) {
        console.log(err);
    }
};

const addGenres = async (genres) => {
    try {
        let genreArray = [];
        for (const genre of genres) {
            const genreId = await addGenre(genre);
            genreArray.push(genreId);
        }
        return genreArray;
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
            const productionData = await new productionModel({
                productionId: production?.id,
                productionName: production?.name,
                logoPath: production?.logo_path,
                country: production?.origin_country
            }).save();
            const productionId = mongoose.Types.ObjectId(productionData._id);
            return productionId;
        }
    } catch (err) {
        console.log(err);
    }
};

const addProductions = async (productions) => {
    try {
        let productionArray = [];
        for (const production of productions) {
            const productionId = await addProduction(production);
            productionArray.push(productionId);
        }
        return productionArray;
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
                        reject({ success: false, message: 'failed to save movie', error });
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
        // const genreIds = genres.map((genre) => genre?.id);
        // const productionIds = production_companies?.map((company) => company?.id);
        const hour = Math.floor(runtime / 60);
        const min = runtime % 60;
        const duration = `${hour}h ${min}m`;
        const posters = images?.posters?.map((poster) => poster?.file_path)
            .slice(0, 10);
        const trailers = videos?.results?.filter((video) =>
            (video?.name === 'Official Trailer' || video?.name === 'Official Teaser' || video?.type === 'Trailer' || video?.type === 'Teaser'))
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
        console.log('movieId', movieId);
        const platforms = await getPlatformDetails(movieId);
        console.log('plaaaaaaaaaaatfooooormsssssssss\n', platforms);
        // const providerIds = [...new Set(providers.map((provider) => provider?.provider_id))];
        const { casts, crews } = await getCastAndCrew(movieId);
        console.log('caaaaaaaaaasssssssstttttttttsssssss\n', casts);
        console.log('crrreeeeeeeeewwwwsssssss\n', crews);
        let movieData = {};
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

                movieData = {
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
                };
            })
            .catch((err) => {
                console.log(err);
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
        const movies = await movieModel.find().exec();
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchMovie = async (req, res) => {
    try {
        const movieId = req.params?.movieId;
        const movie = await movieModel.findOne({ id: movieId }).lean();
        if (movie) {
            // Fetch genres details
            const genres = await genreModel.find({ id: { $in: movie.genres } }).lean();

            // Fetch productions details
            const productions = await productionModel.find({ id: { $in: movie.productions } }).lean();

            // Fetch platforms details
            const platforms = await platformModel.find({ id: { $in: movie.platforms } }).lean();

            // Attach the fetched details to the movie object
            movie.genres = genres;
            movie.productions = productions;
            movie.platforms = platforms;
        }
        res.json(movie);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const editMovie = async (req, res) => {
    try {
        const { title, language, duration, rating, releaseDate, summary } = req.body;
        const movieId = req.params?.movieId;
        await movieModel.findOneAndUpdate(
            { id: movieId },
            {
                $set: {
                    title,
                    language,
                    duration,
                    rating,
                    releaseDate,
                    summary
                }
            })
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
        const genres = await genreModel.find().lean();
        res.json(genres);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchActors = async (req, res) => {
    try {
        const actors = await castModel.find().lean();
        res.json(actors);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

const fetchCrews = async (req, res) => {
    try {
        const crews = await crewModel.find().lean();
        res.json(crews);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

module.exports = { getMovieDetails, fetchMovies, fetchMovie, editMovie, fetchGenres, fetchActors, fetchCrews };

