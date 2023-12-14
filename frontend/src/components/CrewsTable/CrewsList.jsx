import React, { useEffect, useState } from 'react';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';
import { Button, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { IMG_URL } from '../../axios/apiUrls';
import { fetchCrews } from '../../services/adminApi';

function CrewsList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [crews, setCrews] = useState([]);
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('name');
  const [order, setOrder] = useState(false);
  const [gender, setGender] = useState('');
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
  const editCrew = (crewId) => {
    navigate(`/admin/crews/edit/${crewId}`);
  };
  useEffect(() => {
    const getCrews = async () => {
      try {
        const { data } = await fetchCrews(page, limit, search, field, order, gender);
        setCrews(data?.crews);
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
    getCrews();
  }, [page, limit, search, field, order, gender]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (crews?.length < 1) {
    return (
      <div>
        <h1 className="text-white">Crews List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between bg-slate-900 p-2 text-white">
        <span className="self-center text-lg font-bold">Crews Table</span>
        <div className="flex">
          <Input
            name="crew"
            type="text"
            className="dark w-auto md:w-60"
            placeholder="Person Name"
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
        <thead className="bg-slate-700 w-full">
          <tr className="flex justify-between w-full">
            <th className="flex justify-around">
              ID
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('crewId')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th>Profile</th>
            <th className="flex justify-around">
              Name
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('name')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th>
              <select
                name="Genders"
                id="genders"
                className="bg-slate-700 border-0"
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Unknown">Unknown</option>
              </select>
            </th>
            <th className="flex justify-around">
              Department
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('department')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around">
              Popularity
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('popularity')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {crews.map((person) => (
            <tr
              className="flex w-full"
              key={person?.crewId}
            >
              <td className="w-full">{person?.crewId}</td>
              <td className="w-full pl-5"><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
              <td className="w-full pl-5">{person?.name}</td>
              <td className="w-full pl-5">{person?.gender}</td>
              <td className="w-full pl-10">{person?.department}</td>
              <td className="w-full pl-10">{person?.popularity}</td>
              <td className="w-full pl-10">
                <Button
                  key={person?.crewId}
                  colorScheme="gray"
                  onClick={() => editCrew(person?._id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
}

export default CrewsList;
