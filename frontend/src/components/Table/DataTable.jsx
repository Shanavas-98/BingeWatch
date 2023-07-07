/* eslint-disable react/prop-types */
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-root': {
      color: 'white', // Set the font color to white
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    '& .MuiDataGrid-footer .MuiDataGrid-pagination': {
      '& .MuiPaginationItem-root': {
        color: 'white', // Set the font color of pagination to white
      },
    },
  },
});

function DataTable({ rows, columns }) {
  const classes = useStyles();

  return (
    <div className="h-screen m-2">
      <div className={classes.root}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

export default DataTable;
