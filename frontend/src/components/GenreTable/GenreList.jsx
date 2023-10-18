import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';
import {
  Button, FormControl, FormLabel, Input,
  Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { editGenre, fetchGenres } from '../../services/adminApi';

function GenreList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('name');
  const [order, setOrder] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNextPage = (pageNo) => {
    setPage(pageNo + 1);
  };
  const handlePrevPage = (pageNo) => {
    setPage(pageNo - 1);
  };
  const handleSort = (key) => {
    setField(key);
    setOrder(!order);
  };

  const initialValues = {
    id: '',
    genreName: '',
  };

  const validationSchema = Yup.object({
    genreName: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .required('genre is required'),
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await editGenre(values);
      if (data?.success) {
        toast.success(data?.message);
        navigate('/admin/genres');
      } else {
        throw Error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      onClose();
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleGenreEdit = (id, genreName) => {
    formik.setValues({
      id,
      genreName,
    });
    onOpen();
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await fetchGenres(page, limit, search, field, order);
        setGenres(data?.genres);
        setPrev(data?.pagination?.previous);
        setPage(data?.pagination?.current);
        setNext(data?.pagination?.next);
        setLimit(data?.pagination?.limit);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
        setLoading(false);
      }
    };
    getGenres();
  }, [page, limit, search, field, order]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  return (
    <>
      <div className="flex p-2 justify-between bg-slate-900 text-white">
        <span className="self-center text-lg font-bold">Genres Table</span>
        <div className="flex">
          <Input
            name="actor"
            type="text"
            className="dark w-auto md:w-60"
            placeholder="Genre Name"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
          />
          <Button
            type="button"
            className="dark w-10 h-10"
          >
            <Search fontSize="small" />
          </Button>
        </div>
      </div>
      <table className="w-full text-white">
        <thead className=" bg-slate-700 w-full">
          <tr className="flex justify-between w-full">
            <th className="flex justify-around w-full">
              ID
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('genreId')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around w-full">
              Name
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('genreName')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="w-full">Actions</th>
          </tr>
        </thead>
        {genres?.length > 0
          ? (
            <tbody className=" w-full">
              {genres?.map((item) => (
                <tr className="flex w-full">
                  <td className="w-full pl-20">{item?.genreId}</td>
                  <td className="w-full pl-20">{item?.genreName}</td>
                  <td className="w-full pl-20">
                    <Button
                      onClick={() => handleGenreEdit(item?._id, item?.genreName)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="text-lg font-bold w-full p-5 flex justify-center">Genre not found !</div>
          )}
      </table>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Genre</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Genre name</FormLabel>
              {formik.touched.genreName && formik.errors.genreName
                ? <p className="text-red-500">{formik.errors.genreName}</p> : null}
              <Input
                name="genreName"
                type="text"
                className="dark"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genreName}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {genres?.length > 0 && (
        <div className="flex justify-center">
          {prev
            ? (
              <>
                <Button
                  type="button"
                  className="dark w-10 h-10"
                  onClick={() => handlePrevPage(page)}
                >
                  <ArrowBackIos fontSize="small" />
                </Button>
                <Button
                  type="button"
                  className="dark w-10 h-10 hover:cursor-default"
                >
                  {prev}
                </Button>

              </>
            )
            : (
              <Button
                type="button"
                className="dark w-10 h-10"
                disabled
              >
                <ArrowBackIos fontSize="small" />
              </Button>
            )}
          <Button
            type="button"
            className="dark bg-green-950 w-10 h-10 hover:cursor-default"
          >
            {page}
          </Button>

          {next
            ? (
              <>
                <Button
                  type="button"
                  className="dark w-10 h-10 hover:cursor-default"
                >
                  {next}
                </Button>
                <Button
                  type="button"
                  className="dark w-10 h-10"
                  onClick={() => handleNextPage(page)}
                >
                  <ArrowForwardIos fontSize="small" />
                </Button>

              </>
            )
            : (
              <Button
                type="button"
                className="dark w-10 h-10"
                disabled
              >
                <ArrowForwardIos fontSize="small" />
              </Button>
            )}
        </div>
      )}
    </>
  );
}

export default GenreList;
