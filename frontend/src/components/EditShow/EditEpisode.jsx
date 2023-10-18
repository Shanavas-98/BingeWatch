import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Button, FormLabel, Input, Textarea,
} from '@chakra-ui/react';
import { editEpisode, fetchEpisode } from '../../services/adminApi';

function EditEpisode({ episodeId }) {
  EditEpisode.propTypes = {
    episodeId: PropTypes.string.isRequired,
  };

  const navigate = useNavigate();
  const [episode, setEpisode] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    id: '',
    title: '',
    airDate: '',
    duration: '',
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
    duration: Yup.number()
      .typeError('Invalid duration format')
      .min(1, 'min value is 1')
      .max(120, 'max value is 120')
      .required('duration is required'),
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
      const { data } = await editEpisode(values);
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
    const getEpisode = async (id) => {
      try {
        const { data } = await fetchEpisode(id);
        setEpisode(data);
        formik.setValues({
          id: data?._id || '',
          title: data?.title || '',
          airDate: data?.airDate || '',
          duration: data?.duration || '',
          rating: data?.rating || '',
          summary: data?.summary || '',
        });
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };
    getEpisode(episodeId);
  }, [episodeId]);

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
              <FormLabel>Episode Title</FormLabel>
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
                  defaultValue={episode?.title || ''}
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
                  defaultValue={episode?.airDate || ''}
                />
              )}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Duration [min]</FormLabel>
            </div>
            {formik.touched.duration && formik.errors.duration
              ? <p className="text-red-500">{formik.errors.duration}</p> : null}
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
                  defaultValue={episode?.duration || ''}
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
                  defaultValue={episode?.rating || ''}
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
                  defaultValue={episode?.summary || ''}
                />
              )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEpisode;
