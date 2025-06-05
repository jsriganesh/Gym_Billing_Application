// import * as React from 'react';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// interface Data {
//   id: number;
//   calories: number;
//   carbs: number;
//   fat: number;
//   name: string;
//   protein: number;
// }

// function createData(
//   id: number,
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: false,
//     label: 'Calories',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Fat (g)',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Carbs (g)',
//   },
//   {
//     id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Protein (g)',
//   },
// ];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// export default function Datatable() {
//   const [order, setOrder] = React.useState<Order>('asc');
//   const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
//   const [selected, setSelected] = React.useState<readonly number[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data,
//   ) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected: readonly number[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id: number) => selected.indexOf(id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//   );
// }


// =========

// import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   // const columns: GridColDef[] = [
//   { field: "id", headerName: "C.ID", width: 100 },
//   {
//     field: "image",
//     headerName: "Image",
//     width: 200,
//     renderCell: (params) =>
//       params.value ? (
//         <img
//           src={params.value}
//           alt="image"
//           style={{ width: 50, height: 50, borderRadius: 50 }}
//         />
//       ) : (
//         <img
//           src={
//             "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
//           }
//           alt="image"
//           style={{ width: 50, height: 50, borderRadius: 50 }}
//         />
//       ),
//   },

//   { field: "lastName", headerName: "Name", width: 300 },
//   { field: "categoryType", headerName: "Category Type", width: 300 },
//   {
//     field: "edit",
//     headerName: "Edit",
//     width: 100,
//   },
//   {
//     field: "Delete",
//     headerName: "Edit",
//     width: 100,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     age: 35,
//     image:
//       "https://i.pinimg.com/736x/6f/30/2e/6f302ee4c03db07568d617669e9c09ea.jpg",
//   },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// export default function Datatable() {
//   return (
//     <div style={{ height: "70%", width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10, 25]}
//         // checkboxSelection
//       />
//     </div>
//   );
// }


// import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "C.ID", width: 100 },
//   {
//     field: "image",
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
//   { field: "name", headerName: "Name", width: 200 },
//   { field: "dob", headerName: "Date of Birth", width: 150 },
//   { field: "age", headerName: "Age", width: 100 },
//   {
//     field: "lastPaymentDate",
//     headerName: "Last Payment Date",
//     width: 180,
//   },
//   {
//     field: "nextPaymentDate",
//     headerName: "Next Payment Date",
//     width: 180,
//   },
//   {
//     field: "pendingAmount",
//     headerName: "Pending Amount",
//     width: 150,
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

// export default function Datatable() {
//   return (
//     <div style={{ height: "70%", width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         checkboxSelection
//         style={{backgroundColor:'#4C4E5F',borderColor:'#4C4E5F'}}
//         pageSizeOptions={[5, 10, 25]}
//       />
//     </div>
//   );
// }



import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


const columns: GridColDef[] = [
  { field: "id", headerName: "C.ID", width: 100 },
  {
    field: "image",
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
  { field: "name", headerName: "Name", width: 200 },
  { field: "dob", headerName: "Date of Birth", width: 150 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "blood", headerName: "Blood group", width: 100 },
  { field: "mobileNo", headerName: "Mobile Number", width: 100 },

  {
    field: "lastPaymentDate",
    headerName: "Last Payment Date",
    width: 180,
  },
  {
    field: "nextPaymentDate",
    headerName: "Next Payment Date",
    width: 180,
  },
  {
    field: "pendingAmount",
    headerName: "Pending Amount",
    width: 150,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => console.log('params ===',params.row)}
        sx={{ color: 'yellow' }} // ✅ Green edit icon, adjust as needed
      >
        <EditIcon sx={{ fontSize: 15 }} />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/736x/6f/30/2e/6f302ee4c03db07568d617669e9c09ea.jpg",
    name: "Jon Snow",
    dob: "1990-01-15",
    age: 35,
    lastPaymentDate: "2024-05-01",
    nextPaymentDate: "2024-06-01",
    pendingAmount: "$100",
  },
  {
    id: 2,
    image: "",
    name: "Cersei Lannister",
    dob: "1982-03-12",
    age: 42,
    lastPaymentDate: "2024-04-10",
    nextPaymentDate: "2024-05-10",
    pendingAmount: "$200",
  },
  {
    id: 3,
    image: "",
    name: "Arya Stark",
    dob: "2005-08-02",
    age: 19,
    lastPaymentDate: "2024-03-05",
    nextPaymentDate: "2024-04-05",
    pendingAmount: "$50",
  },  
  
];

export default function Datatable() {
  return (
    <div style={{ height: '90%', width: "100%" }}>
      <DataGrid
        rows={rows}
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        // checkboxSelection
        pageSizeOptions={[5, 10,15, 25]}
      />
    </div>
  );
}
