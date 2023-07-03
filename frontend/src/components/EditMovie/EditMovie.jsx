/* eslint-disable react/prop-types */
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { editMovie, fetchMovie } from '../../services/adminApi';
import { imgUrl } from '../../axios/apiUrls';

function EditMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async (id) => {
      try {
        const { data } = await fetchMovie(id);
        setMovie(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie(movieId);
  }, [movieId]);
  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    title: '',
    language: '',
    duration: '',
    rating: '',
    date: '',
    genres: '',
    summary: '',
  };
  // Yup form validation
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('First Name Required'),
    language: Yup.string()
      .required('Email is Required'),
    duration: Yup.string()
      .required('This field required'),
    rating: Yup.string()
      .required('rating is Required'),
    date: Yup.string()
      .required('date is Required '),
    genres: Yup.string()
      .required('date is Required '),
    Summary: Yup.string()
      .required('date is Required '),
  });
  const onSubmit = async (values) => {
    try {
      // seting the loading state
      setLoading(!loading);
      const { data } = await editMovie(values);
      if (data.success) {
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

  return (
    <div className="m-2">
      <Button type="button" className="dark" onClick={() => setEdit(true)}>Edit</Button>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="title" value="Movie Title" className="text-white" />
          </div>
          <TextInput
            name="title"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.title || movie.original_title : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="language" value="Language" className="text-white" />
          </div>
          <TextInput
            name="language"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.language : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="duration" value="Duration" className="text-white" />
          </div>
          <TextInput
            name="duration"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.duration : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="rating" value="Rating" className="text-white" />
          </div>
          <TextInput
            name="rating"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.rating : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="date" value="Release Date" className="text-white" />
          </div>
          <TextInput
            name="date"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.releaseDate : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="genres" value="Genres" className="text-white" />
          </div>
          <TextInput
            name="genres"
            type="text"
            className="dark"
            readOnly={!edit}
            defaultValue={movie ? movie.genres : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="summary" value="Summary" className="text-white" />
          </div>
          <Textarea
            name="summary"
            type="text"
            rows={5}
            className="bg-slate-700 text-white "
            readOnly={!edit}
            defaultValue={movie ? movie.summary : ''}
          />
        </div>
      </div>
      <Label htmlFor="posters" value="Posters" className="text-white" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movie?.images?.map((image, index = 1) => (
          <img key={index} src={imgUrl + image} alt={`poster${index}`} className="h-60 w-36 m-2 rounded-md" />
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
      {edit && (
        <div className="w-full my-2">
          {loading ? (
            <Button isProcessing type="button" className="dark">
              Update
            </Button>
          ) : (
            <Button type="button" className="dark" onClick={() => update(movie.id)}>
              Update
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EditMovie;
