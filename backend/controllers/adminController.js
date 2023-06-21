
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require('../models/adminModel');
const tmdbInstance = require('../axios/tmdbInstance');


const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            throw Error('admin email doesn\'t exist');
        }
        const auth = await bcrypt.compare(password, admin.password);
        if (!auth) {
            throw Error('wrong password');
        }
        const token = createToken(admin._id);
        res.json({ admin, token });
    } catch (error) {
        res.json({ error });
    }
};

const adminAuth = async (req, res) => {
    try {
        //verify user authentication
        const { Authorization } = req.headers;
        if (!Authorization) {
            return res.json({ error: 'Authorization token required' });
        }

        const token = Authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                res.json({ status: false, message: 'Unauthorized' });
            } else {
                const admin = await adminModel.findOne({ _id: decoded.id });
                if (admin) {
                    res.json({ admin, status: true, message: 'Authorised' });
                } else {
                    res.json({ status: false, message: 'User not exists' });
                }
            }
        });
    } catch (err) {
        res.json({ error: 'Request is not authorized' });
    }
};

const dashboard = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.json({ error });
    }
};

const addMovie = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        tmdbInstance.get('/movie/'+movieId)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                throw Error(err);
            });
    } catch (err) {
        res.json({ err });
    }
};

// {
//     "iso_639_1": "en",
//     "iso_3166_1": "US",
//     "name": "See It Back On The Big Screen",
//     "key": "FVq8GX6DqTE",
//     "site": "YouTube",
//     "size": 1080,
//     "type": "Teaser",
//     "official": true,
//     "published_at": "2022-09-23T17:00:25.000Z",
//     "id": "632f736b663b87008558e615"
//   },
// {
//     "iso_639_1": "en",
//     "iso_3166_1": "US",
//     "name": "Official Trailer",
//     "key": "5PSNL1qE6VY",
//     "published_at": "2009-11-09T21:31:39.000Z",
//     "site": "YouTube",
//     "size": 720,
//     "type": "Trailer",
//     "official": true,
//     "id": "5b22be749251416e1b01d1d9"
//   }

module.exports = { login, dashboard, adminAuth, addMovie };