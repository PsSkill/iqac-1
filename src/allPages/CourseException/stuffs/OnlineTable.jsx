import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import BasicModal from './BasicModal';
import '../styles/table.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const OnlineTable = ({ setFirstData }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const columns = [
    // { field: 'student', headerName: 'Student', headerClassName: 'super-app-theme--header' },
    // { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header' },
    // { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header' },
    { field: 'course_type', headerName: 'Course Type', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'name_of_course', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header' , width:100},
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)} >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === 0
                ? 'grey'
                : params.value === 1
                ? 'green'
                : params.value === -1
                ? 'red'
                : 'inherit',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
          }}
        >
          {params.value === 0
            ? 'Initiated'
            : params.value === 1
            ? 'Approved'
            : params.value === -1
            ? 'Rejected'
            : 'Unknown'}
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/rpStudents');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData); // Update state with fetched data
        setFirstData(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // const renderViewCell = (params) => (
  //   <Box>
  //     <Button onClick={() => setSelectedRowData(params.row)}>
  //       <RemoveRedEyeOutlinedIcon />
  //     </Button>
  //   </Box>
  // );

  // const renderStatusCell = (params) => (
  //   <Box
  //     style={{
  //       backgroundColor:
  //         params.value === 0
  //           ? 'grey'
  //           : params.value === 1
  //           ? 'green'
  //           : params.value === -1
  //           ? 'red'
  //           : 'inherit',
  //       color: 'white',
  //       padding: '6px 12px',
  //       borderRadius: '4px',
  //     }}
  //   >
  //     {params.value === 0
  //       ? 'Initiated'
  //       : params.value === 1
  //       ? 'Approved'
  //       : params.value === -1
  //       ? 'Rejected'
  //       : 'Unknown'}
  //   </Box>
  // );

  return (
    <div className="tableMain" >
      <div className="datagrid">
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          localeText={customLocaleText}
          sx={{
            width: '80%', // Set width to 80%
            overflowX: 'auto', // Enable horizontal scrolling
            '& .super-app-theme--header': {
              color: 'var(--heading-crsExp)',
              justifyContent: 'center',
            },
            '& .MuiDataGrid-columnsContainer': {
              overflow: 'visible', // Allow column headers to overflow for scrolling
            },
            '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
              whiteSpace: 'nowrap', // Prevent wrapping of cell content
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      {selectedRowData && (
        <BasicModal
          open={true} // Always keep the modal open when there's selectedRowData
          handleClose={() => setSelectedRowData(null)}
          rowData={selectedRowData}
        />
      )}
    </div>
  );
};

export default OnlineTable;
