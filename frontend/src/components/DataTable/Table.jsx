/* eslint-disable react/prop-types */
import { Button } from 'flowbite-react';
import React from 'react';
import { IMG_URL } from '../../axios/apiUrls';

function Table({ heading, columns, rows }) {
  return (
    <div>
      {' '}
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">{heading}</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            {columns.map((item) => (
              <th>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white">
          {rows?.map((item) => {
            const genres = item.genres?.map((genre) => genre.genreName).join(', ');
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><img src={IMG_URL + item.images[0]} alt="" className="w-15 h-20" /></td>
                <td>{item.title}</td>
                <td>{genres}</td>
                <td>{item.duration}</td>
                <td>{item.language}</td>
                <td>{item.releaseDate}</td>
                <td>
                  <Button
                    key={item.id}
                    variant="outlined"
                    color="primary"
                    size="medium"
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Table;
