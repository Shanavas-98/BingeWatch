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
import { editSeason, fetchSeason } from '../../services/adminApi';

function EditSeason({ seasonId }) {
  EditSeason.propTypes = {
    seasonId: PropTypes.string.isRequired,
  };

  const navigate = useNavigate();
  const [season, setSeason] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewEpisode = (episodeId) => {
    navigate(`/admin/series/view-episode/${episodeId}`);
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
    airDate: '',
    rating: '',
    summary: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('title is required'),
    airDate: Yup.date()
      .typeError('Invalid date format')
      .min(new Date('1900-01-01'), 'Date must be after 1900-01-01')
      .max(new Date(), 'air date must be less than today')
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
      const { data } = await editSeason(values);
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
    const getSeason = async (id) => {
      try {
        const { data } = await fetchSeason(id);
        setSeason(data);
        formik.setValues({
          id: data?._id || '',
          title: data?.title || '',
          airDate: data?.airDate || '',
          rating: data?.rating || '',
          summary: data?.summary || '',
        });
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };
    getSeason(seasonId);
  }, [seasonId]);

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
              <FormLabel>Season Title</FormLabel>
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
                  defaultValue={season?.title || ''}
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
                  defaultValue={season?.airDate || ''}
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
                  defaultValue={season?.rating || ''}
                />
              )}
          </div>

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
                  defaultValue={season?.summary || ''}
                />
              )}
          </div>
        </div>
      </form>
      {!edit && season?.videos
            && (
            <>
              <FormLabel>Videos</FormLabel>
              <div className="grid lg:grid-cols-3">
                {season?.videos?.map((key) => (
                  <div className="m-1">
                    <YouTube videoId={key} opts={opts} />
                  </div>
                ))}
              </div>

            </>
            )}
      {!edit && season?.episodes
          && (
          <>
            <FormLabel>Episodes</FormLabel>
            <div className="cards-carousal">
              {season?.episodes?.map((ep) => (
                <div key={ep?.id} className="flex flex-col mx-2">
                  <div>
                    <img
                      src={IMG_URL + ep.poster}
                      alt="poster"
                      className="h-44 w-64 rounded-md"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-36 h-20 overflow-hidden">
                      <h2 className="text-white">{ep?.title}</h2>
                      <h4 className="text-white">{ep?.airDate}</h4>
                    </div>
                    <div>
                      <h4 className="text-yellow-400">
                        <StarRateRounded />
                        {`${ep?.rating.toFixed(1)}/10`}
                      </h4>
                      <h4 className="text-white">{`${ep?.duration} min`}</h4>
                    </div>
                  </div>
                  <Button
                    key={ep?.id}
                    onClick={() => (
                      viewEpisode(ep?.id)
                    )}
                    className="mr-2 w-20"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </>
          )}
    </div>
  );
}

export default EditSeason;
