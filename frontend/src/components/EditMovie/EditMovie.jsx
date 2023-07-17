/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

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
        console.error(err);
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
            <Button isProcessing type="button" className="dark">
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
              <Label htmlFor="title" value="Movie Title" className="text-white" />
            </div>
            {formik.touched.title && formik.errors.title
              ? <p>{formik.errors.title}</p> : null}
            {edit
              ? (
                <TextInput
                  name="title"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              )
              : (
                <TextInput
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
              <Label htmlFor="language" value="Language" className="text-white" />
            </div>
            {formik.touched.language && formik.errors.language
              ? <p>{formik.errors.language}</p> : null}
            {edit
              ? (
                <TextInput
                  name="language"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.language}
                />
              )
              : (
                <TextInput
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
              <Label htmlFor="duration" value="Duration" className="text-white" />
            </div>
            {formik.touched.duration && formik.errors.duration
              ? <p>{formik.errors.duration}</p> : null}
            {edit
              ? (
                <TextInput
                  name="duration"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />
              )
              : (
                <TextInput
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
              <Label htmlFor="rating" value="Rating" className="text-white" />
            </div>
            {formik.touched.rating && formik.errors.rating
              ? <p>{formik.errors.rating}</p> : null}
            {edit
              ? (
                <TextInput
                  name="rating"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                />
              )
              : (
                <TextInput
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
              <Label htmlFor="date" value="Release Date" className="text-white" />
            </div>
            {formik.touched.releaseDate && formik.errors.releaseDate
              ? <p>{formik.errors.releaseDate}</p> : null}
            {edit
              ? (
                <TextInput
                  name="releaseDate"
                  type="text"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.releaseDate}
                />
              )
              : (
                <TextInput
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
              <Label htmlFor="genres" value="Genres" className="text-white" />
            </div>
            {formik.touched.genres && formik.errors.genres
              ? <p>{formik.errors.genres}</p> : null}
            <TextInput
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
              <Label htmlFor="summary" value="Summary" className="text-white" />
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
      <Label htmlFor="posters" value="Posters" className="text-white" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movie?.images?.map((image, index = 1) => (
          <img key={index} src={IMG_URL + image} alt={`poster${index}`} className="h-60 w-36 m-2 rounded-md" />
        ))}
      </div>
      <Label htmlFor="trailer" value="Videos" className="text-white" />
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

export default EditMovie;
