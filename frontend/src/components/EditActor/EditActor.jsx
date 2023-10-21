import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Button, FormLabel, Input, Select, Textarea,
} from '@chakra-ui/react';
import { editActor, fetchActor } from '../../services/adminApi';

// import { IMG_URL } from '../../axios/apiUrls';

function EditActor({ actorId }) {
  EditActor.propTypes = {
    actorId: PropTypes.string.isRequired,
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    id: '',
    name: '',
    biography: '',
    birthday: '',
    deathday: '',
    gender: '',
    department: '',
    placeOfBirth: '',
  };
    // Yup form validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .max(30, 'Max 30 characters or less')
      .required('title is required'),
    biography: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('biography is required'),
    // birthday: Yup.date()
    //   .typeError('Invalid date format')
    //   .min(new Date('1900-01-01'), 'Date must be after 1900-01-01')
    //   .when('deathday', (deathday, schema) => (deathday
    //     ? schema.max(deathday, 'birthday must be less than deathday')
    //     : schema))
    //   .nullable(),
    // deathday: Yup.date()
    //   .typeError('Invalid date format')
    //   .when('birthday', (birthday, schema) => (birthday
    //     ? schema.min(birthday, 'deathday must be greater than birthday')
    //     : schema))
    //   .max(new Date(), 'Date cannot be in the future')
    //   .nullable(),
    gender: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .matches(/^[A-Za-z ]*$/, 'Please enter valid gender')
      .required('gender is required'),
    department: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .matches(/^[A-Za-z ]*$/, 'Please enter valid department')
      .required('department is required'),
    placeOfBirth: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('place of birth is required '),
  });

  const onSubmit = async (values) => {
    try {
      // seting the loading state
      setLoading(!loading);
      const { data } = await editActor(values);
      if (data?.success) {
        toast.success(data?.message, {
          position: 'top-center',
        });
        navigate('/admin/actors');
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
    const getActor = async (id) => {
      try {
        const { data } = await fetchActor(id);
        formik.setValues({
          id: data?._id || '',
          name: data?.name || '',
          biography: data?.biography || '',
          birthday: data?.birthday || null,
          deathday: data?.deathday || null,
          gender: data?.gender || '',
          department: data?.department || '',
          placeOfBirth: data?.placeOfBirth || '',
        });
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };
    getActor(actorId);
  }, [actorId]);

  return (
    <div className="m-2">
      <form action="" method="post" onSubmit={formik.handleSubmit}>
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
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Name</FormLabel>
            </div>
            {formik.touched.name && formik.errors.name
              ? <p className="text-red-500">{formik.errors.name}</p> : null}
            <Input
              name="name"
              type="text"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          <div className="col-span-1 w-auto">
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Other</option>
            </Select>
            {formik.touched.gender && formik.errors.gender
              ? <p className="text-red-500">{formik.errors.gender}</p> : null}
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Birthday</FormLabel>
            </div>
            {formik.touched.birthday && formik.errors.birthday
              ? <p className="text-red-500">{formik.errors.birthday}</p> : null}
            <Input
              name="birthday"
              type="date"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
            />
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Deathday</FormLabel>
            </div>
            {formik.touched.deathday && formik.errors.deathday
              ? <p className="text-red-500">{formik.errors.deathday}</p> : null}
            <Input
              name="deathday"
              type="date"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deathday}
            />
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Depatment</FormLabel>
            </div>
            {formik.touched.department && formik.errors.department
              ? <p className="text-red-500">{formik.errors.department}</p> : null}
            <Input
              name="department"
              type="text"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            />
          </div>
          <div className="col-span-1 w-auto">
            <div className="mb-1 block">
              <FormLabel>Place of Birth</FormLabel>
            </div>
            {formik.touched.placeOfBirth && formik.errors.placeOfBirth
              ? <p className="text-red-500">{formik.errors.placeOfBirth}</p> : null}
            <Input
              name="placeOfBirth"
              type="text"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.placeOfBirth}
            />
          </div>

          <div className="lg:col-span-2 w-auto">
            <div className="mb-1 block">
              <FormLabel>Biography</FormLabel>
            </div>
            {formik.touched.biography && formik.errors.biography
              ? <p className="text-red-500">{formik.errors.biography}</p> : null}
            <Textarea
              name="biography"
              type="text"
              rows={5}
              className="bg-slate-700 text-white"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.biography}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditActor;
