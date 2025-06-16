
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { MemberDetails } from "../../interface/common";


import dayjs from 'dayjs';
import { calculateAgeInYears } from "../../commonMethod/commonMethods";

const columns: GridColDef[] = [
  { field: "memberID", headerName: "ID", width: 100 },
  {
    field: "profileImage",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <img
        src={
          params.value ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
        }
        alt="image"
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    ),
  },
  { field: "memberName", headerName: "Name", width: 200 },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 150,
    renderCell: (params) =>
      params.value ? dayjs(params.value).format("DD/MM/YYYY") : "-",
  },
  { field: "age", headerName: "Age", width: 100 ,
    renderCell: (params) => {
      const dob = params.row?.dateOfBirth;
      return dob ? calculateAgeInYears(dob) : "-";
    },
  },
  { field: "bloodGroup", headerName: "Blood group", width: 100,
    renderCell: (params) =>
      params?.value ?? '-'
   },
  { field: "mobileNo", headerName: "Mobile Number", width: 100 },
  {
    field: "lastpaymentDate",
    headerName: "Last Payment Date",
    width: 180,
    renderCell: (params) =>
      params.value ? dayjs(params.value).format("DD/MM/YYYY") : "-",
  },
  {
    field: "nextPaymentDate",
    headerName: "Next Payment Date",
    width: 180,
    renderCell: (params) =>
      params.value ? dayjs(params.value).format("DD/MM/YYYY") : "-",
  },
  {
    field: "dueAmount",
    headerName: "Pending Amount",
    width: 150,
    valueGetter: (params:any) => {
      return params?.row?.planDetails?.dueAmount ?? 0;
    },
    
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => console.log('params ===', params.row)}
        sx={{ color: 'yellow' }}
      >
        <EditIcon sx={{ fontSize: 15 }} />
      </IconButton>
    ),
  },
];
// const columns: GridColDef[] = [
//   { field: "memberID", headerName: "ID", width: 100 },
//   {
//     field: "profileImage",
//     headerName: "Image",
//     width: 100,
//     renderCell: (params) => (
//       <img
//         src={
//           params.value ||
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
//         }
//         alt="image"
//         style={{ width: 50, height: 50, borderRadius: 50 }}
//       />
//     ),
//   },
//   { field: "memberName", headerName: "Name", width: 200 },
//   { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
//   { field: "age", headerName: "Age", width: 100 },
//   { field: "bloodGroup", headerName: "Blood group", width: 100 },
//   { field: "mobileNo", headerName: "Mobile Number", width: 100 },

//   {
//     field: "lastpaymentDate",
//     headerName: "Last Payment Date",
//     width: 180,
//   },
//   {
//     field: "nextPaymentDate",
//     headerName: "Next Payment Date",
//     width: 180,
//   },
//   {
//     field: "dueAmount",
//     headerName: "Pending Amount",
//     width: 150,
//   },
//   {
//     field: 'edit',
//     headerName: 'Edit',
//     width: 80,
//     sortable: false,
//     filterable: false,
//     renderCell: (params) => (
//       <IconButton
//         onClick={() => console.log('params ===',params.row)}
//         sx={{ color: 'yellow' }} // ✅ Green edit icon, adjust as needed
//       >
//         <EditIcon sx={{ fontSize: 15 }} />
//       </IconButton>
//     ),
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/736x/6f/30/2e/6f302ee4c03db07568d617669e9c09ea.jpg",
//     name: "Jon Snow",
//     dob: "1990-01-15",
//     age: 35,
//     lastPaymentDate: "2024-05-01",
//     nextPaymentDate: "2024-06-01",
//     pendingAmount: "$100",
//   },
//   {
//     id: 2,
//     image: "",
//     name: "Cersei Lannister",
//     dob: "1982-03-12",
//     age: 42,
//     lastPaymentDate: "2024-04-10",
//     nextPaymentDate: "2024-05-10",
//     pendingAmount: "$200",
//   },
//   {
//     id: 3,
//     image: "",
//     name: "Arya Stark",
//     dob: "2005-08-02",
//     age: 19,
//     lastPaymentDate: "2024-03-05",
//     nextPaymentDate: "2024-04-05",
//     pendingAmount: "$50",
//   },  
  
// ];

interface DatatableProps {
  data: MemberDetails[] 
}


const Datatable=({data}:DatatableProps)=> {
  const formattedData = data.map((row) => ({
    ...row,
    id: row._id,
  }));
  console.log('data ====>',formattedData)
  return (
    <div style={{ height: '90%', width: "100%" }}>
      <DataGrid
        rows={formattedData}
        columns={columns}
        sx={{
          backgroundColor: "#4C4E5F",
          border: "none",
          color: "#fff",
          "& .MuiDataGrid-scrollbarFiller":{
            backgroundColor:'#fff',
            fontWeight:'bold'
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "red",
            color: "#fff",
            fontWeight:'900'

          },
          '.MuiDataGrid-root':{
            backgroundColor: "red",
          },
          '.MuiDataGrid-columnHeader':{
            backgroundColor: "#4C4E5F",
          },
          "& .MuiDataGrid-cell": {
            color: "#fff",
          },

          

         
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#3A3C4E",
            color: "#fff",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },

          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#5C5E70 !important", // dark highlight
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#6C6E80 !important", // darker on hover
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#5A5C6D",
          },

            // ✅ Checkbox styling
    "& .MuiCheckbox-root": {
      color: "#fff", // unchecked color
    },
    "& .MuiCheckbox-root.Mui-checked": {
      color: "#fff", // checked color (green, change as needed)
    },
        }}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // checkboxSelection
        pageSizeOptions={[10, 10,15, 25]}
      />
    </div>
  );
}


export default Datatable