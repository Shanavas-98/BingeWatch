import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Button, FormLabel, Input, Textarea,
} from '@chakra-ui/react';

import { editMovie, fetchMovie } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function EditMovie({ movieId }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const initialValues = {
    id: '',
    title: '',
    language: '',
    duration: '',
    rating: '',
    date: '',
    summary: '',
  };
  // Yup form validation
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('First Name Required'),
    language: Yup.string()
      .required('Email is Required'),
    duration: Yup.string()
      .required('duration is required'),
    rating: Yup.string()
      .required('rating is Required'),
    releaseDate: Yup.string()
      .required('date is Required '),
    summary: Yup.string()
      .required('summary is Required '),
  });
  const onSubmit = async (values) => {
    try {
      // seting the loading state
      setLoading(!loading);
      const { data } = await editMovie(values);
      if (data.success) {
        toast.success(data.message, {
          position: 'top-center',
        });
        navigate('admin/movies');
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    const getMovie = async (id) => {
      try {
        const { data } = await fetchMovie(id);
        setMovie(data);
        formik.setValues({
          id: data?._id || '',
          title: data?.title || '',
          language: data?.language || '',
          duration: data?.duration || '',
          rating: data?.rating || '',
          releaseDate: data?.releaseDate || '',
          summary: data?.summary || '',
        });
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };
    getMovie(movieId);
  }, [movieId]);

  return (
    <div className="m-2">
      <Button type="button" className="dark" onClick={() => setEdit(true)}>Edit</Button>
      <form action="" method="post" onSubmit={formik.handleSubmit}>
        {edit && (
        <div className="w-full my-2">
          {loading ? (
            <Button isLoading type="button" className="dark">
              Update
            </Button>
          ) : (
            <Button type="submit" className="dark">
              Update
            </Button>
          )}
        </div>
        )}
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Movie Title</FormLabel>
            </div>
            {formik.touched.title && formik.errors.title
              ? <p>{formik.errors.title}</p> : null}
            {edit
              ? (
                <Input
                  name="title"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              )
              : (
                <Input
                  name="title"
                  type="text"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={movie ? movie.title : ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Language</FormLabel>
            </div>
            {formik.touched.language && formik.errors.language
              ? <p>{formik.errors.language}</p> : null}
            {edit
              ? (
                <Input
                  name="language"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.language}
                />
              )
              : (
                <Input
                  name="language"
                  type="text"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={movie ? movie.language : ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Duration</FormLabel>
            </div>
            {formik.touched.duration && formik.errors.duration
              ? <p>{formik.errors.duration}</p> : null}
            {edit
              ? (
                <Input
                  name="duration"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />
              )
              : (
                <Input
                  name="duration"
                  type="text"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={movie ? movie.duration : ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Rating</FormLabel>
            </div>
            {formik.touched.rating && formik.errors.rating
              ? <p>{formik.errors.rating}</p> : null}
            {edit
              ? (
                <Input
                  name="rating"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                />
              )
              : (
                <Input
                  name="rating"
                  type="text"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={movie ? movie.rating : ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Release Date</FormLabel>
            </div>
            {formik.touched.releaseDate && formik.errors.releaseDate
              ? <p>{formik.errors.releaseDate}</p> : null}
            {edit
              ? (
                <Input
                  name="releaseDate"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.releaseDate}
                />
              )
              : (
                <Input
                  name="date"
                  type="text"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={movie ? movie.releaseDate : ''}
                />
              )}
          </div>
          {!edit && (
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Genres</FormLabel>
            </div>
            {formik.touched.genres && formik.errors.genres
              ? <p>{formik.errors.genres}</p> : null}
            <Input
              name="genres"
              type="text"
              className="dark"
              readOnly={!edit}
              defaultValue={movie ? movie.genres?.map((genre) => genre.genreName).join(', ') : ''}
            />
          </div>
          )}

          <div className="lg:col-span-2 w-auto">
            <div className="mb-1 block">
              <FormLabel>Summary</FormLabel>
            </div>
            {formik.touched.summary && formik.errors.summary
              ? <p>{formik.errors.summary}</p> : null}
            {edit
              ? (
                <Textarea
                  name="summary"
                  type="text"
                  rows={5}
                  className="bg-slate-700 text-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.summary}
                />
              )
              : (
                <Textarea
                  name="summary"
                  type="text"
                  rows={5}
                  className="bg-slate-700 text-white"
                  readOnly={!edit}
                  defaultValue={movie ? movie.summary : ''}
                />
              )}
          </div>
        </div>
      </form>
      <FormLabel>Posters</FormLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movie?.images?.map((image, index = 1) => (
          <img key={index} src={IMG_URL + image} alt={`poster${index}`} className="h-60 w-36 m-2 rounded-md" />
        ))}
      </div>
      <FormLabel>Videos</FormLabel>
      {movie.videos
        && (
          <div className="grid lg:grid-cols-3">
            {movie?.videos?.map((key) => (
              <div className="m-1">
                <YouTube videoId={key} opts={opts} />
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

EditMovie.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default EditMovie;
