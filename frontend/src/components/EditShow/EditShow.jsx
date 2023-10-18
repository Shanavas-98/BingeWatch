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
import { StarRateRounded } from '@mui/icons-material';

import { IMG_URL } from '../../axios/apiUrls';
import { editShow, fetchShow } from '../../services/adminApi';

function EditShow({ showId }) {
  EditShow.propTypes = {
    showId: PropTypes.string.isRequired,
  };
  const navigate = useNavigate();
  const [show, setShow] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewSeason = (seasonId) => {
    navigate(`/admin/series/view-season/${seasonId}`);
  };

  const opts = {
    height: '200',
    width: '350',
    playerVars: {
      autoplay: 0,
    },
  };

  const initialValues = {
    id: '',
    title: '',
    language: '',
    airDate: '',
    endDate: '',
    rating: '',
    summary: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('title is required'),
    language: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .matches(/^[A-Za-z ]*$/, 'Please enter valid language')
      .required('language is required'),
    airDate: Yup.date()
      .typeError('Invalid date format')
      .min(new Date('1900-01-01'), 'Date must be after 1900-01-01')
      .max(Yup.ref('endDate'), 'air date must be less than end date')
      .required('date is required'),
    endDate: Yup.date()
      .typeError('Invalid date format')
      .min(Yup.ref('airDate'), 'end date must be greater than air date')
      .max(new Date(), 'Date cannot be in the future')
      .required('date is required'),
    rating: Yup.number()
      .typeError('Invalid rating format')
      .min(0, 'min value is 0')
      .max(10, 'max value is 10')
      .required('rating is required'),
    summary: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('summary is required '),
  });

  const onSubmit = async (values) => {
    try {
      // seting the loading state
      setLoading(!loading);
      const { data } = await editShow(values);
      if (data?.success) {
        toast.success(data?.message, {
          position: 'top-center',
        });
        navigate('/admin/series');
      } else {
        setLoading(false);
        throw Error(data?.message);
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
    const getShow = async (id) => {
      try {
        const { data } = await fetchShow(id);
        setShow(data);
        formik.setValues({
          id: data?._id || '',
          title: data?.title || '',
          language: data?.language || '',
          airDate: data?.airDate || '',
          endDate: data?.endDate || '',
          rating: data?.rating || '',
          summary: data?.summary || '',
        });
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };
    getShow(showId);
  }, [showId]);

  return (
    <div className="m-2">
      {!edit
      && <Button type="button" className="dark" onClick={() => setEdit(true)}>Edit</Button>}
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
              <FormLabel>Show Title</FormLabel>
            </div>
            {formik.touched.title && formik.errors.title
              ? <p className="text-red-500">{formik.errors.title}</p> : null}
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
                  defaultValue={show?.title || ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Language</FormLabel>
            </div>
            {formik.touched.language && formik.errors.language
              ? <p className="text-red-500">{formik.errors.language}</p> : null}
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
                  defaultValue={show?.language || ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Air Date</FormLabel>
            </div>
            {formik.touched.airDate && formik.errors.airDate
              ? <p className="text-red-500">{formik.errors.airDate}</p> : null}
            {edit
              ? (
                <Input
                  name="airDate"
                  type="date"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.airDate}
                />
              )
              : (
                <Input
                  name="airDate"
                  type="date"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={show?.airDate || ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>End Date</FormLabel>
            </div>
            {formik.touched.endDate && formik.errors.endDate
              ? <p className="text-red-500">{formik.errors.endDate}</p> : null}
            {edit
              ? (
                <Input
                  name="endDate"
                  type="date"
                  className="dark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                />
              )
              : (
                <Input
                  name="endDate"
                  type="date"
                  className="dark"
                  readOnly={!edit}
                  defaultValue={show?.endDate || ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Rating</FormLabel>
            </div>
            {formik.touched.rating && formik.errors.rating
              ? <p className="text-red-500">{formik.errors.rating}</p> : null}
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
                  defaultValue={show?.rating || ''}
                />
              )}
          </div>
          {!edit && (
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Genres</FormLabel>
            </div>
            {formik.touched.genres && formik.errors.genres
              ? <p className="text-red-500">{formik.errors.genres}</p> : null}
            <Input
              name="genres"
              type="text"
              className="dark"
              readOnly={!edit}
              defaultValue={show?.genres?.map((genre) => genre?.genreName).join(', ') || ''}
            />
          </div>
          )}

          <div className="lg:col-span-2 w-auto">
            <div className="mb-1 block">
              <FormLabel>Summary</FormLabel>
            </div>
            {formik.touched.summary && formik.errors.summary
              ? <p className="text-red-500">{formik.errors.summary}</p> : null}
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
                  defaultValue={show?.summary || ''}
                />
              )}
          </div>
        </div>
      </form>
      {!edit && show?.images
      && (
      <>
        <FormLabel>Posters</FormLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {show?.images?.map((image, index = 1) => (
            <img key={index} src={IMG_URL + image} alt={`poster${index}`} className="h-60 w-36 m-2 rounded-md" />
          ))}
        </div>

      </>
      )}
      {!edit && show?.videos
        && (
        <>
          <FormLabel>Videos</FormLabel>
          <div className="grid lg:grid-cols-3">
            {show?.videos?.map((key) => (
              <div className="m-1">
                <YouTube videoId={key} opts={opts} />
              </div>
            ))}
          </div>

        </>
        )}
      {!edit && show?.seasons
      && (
      <>
        <FormLabel>Seasons</FormLabel>
        <div className="cards-carousal">
          {show?.seasons?.map((season) => (
            <div key={season?.id} className="flex">
              <div>
                <img
                  src={IMG_URL + season.poster}
                  alt="poster"
                  className="h-48 w-32 mx-2 rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-white">{season?.title}</h2>
                  <h4 className="text-white">{season?.airDate}</h4>
                  <h4 className="text-white">{`${season?.totalEpisodes} episodes`}</h4>
                  <h4 className="text-yellow-400">
                    <StarRateRounded />
                    {`${season?.rating}/10`}
                  </h4>
                </div>
                <Button
                  key={season?.id}
                  onClick={() => viewSeason(season?.id)}
                  className="mr-2"
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </>
      )}
    </div>
  );
}

export default EditShow;
