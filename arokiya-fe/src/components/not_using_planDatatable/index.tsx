
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { PackageListDetailsDetailsProps } from "../../interface/common";
import { deleteRequest, postRequest, putRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updatePlanList } from "../../redux/slices/commonSlice";

interface DatatableProps {
  data: PackageListDetailsDetailsProps[];
  resetPlan:()=> void
}

const PlanDatatable = ({ data,resetPlan }: DatatableProps) => {
  const dispatch = useAppDispatch();

  const [editRowId, setEditRowId] = React.useState<number | null>(null);
  const [editedRow, setEditedRow] = React.useState<Partial<PackageListDetailsDetailsProps>>({});
  const { planList } = useAppSelector((state) => state.commonData);
  const [selectedPackIndex, updateSelectedPackIndex] = React.useState<number | null>(null);

  const onSubmit=()=> {
    let preparPayload = {
        planName: editedRow.planName,
        planValue: editedRow.planValue,
        planDuration: editedRow ? editedRow.planDuration : '',
    };
    if (editedRow?._id) {
      const updateData = { ...editedRow, }
        updateData['planName'] = editedRow.planName
        updateData['planValue'] =  editedRow.planValue ? parseInt(editedRow.planValue.toString()) :0
        updateData['planDuration'] = editedRow.planDuration ? parseInt(editedRow.planDuration.toString()) : 0

            putRequest(
                EndPoint.plan + editedRow._id,
                updateData,
                success => {
                  console.log('success =>',success)
                  console.log('selectedPackIndex =>',selectedPackIndex)
                    if (selectedPackIndex !== null && selectedPackIndex !== undefined && selectedPackIndex >= 0) {
                        const list = [...planList]
                        list.splice(selectedPackIndex, 1,success)
                        dispatch(updatePlanList(list))
                        handleCancel()
                        resetPlan()
                        alert('Successfully updated')

                    }
                },
                error => {
                    console.log('error -->', error);
                },
            );
    } else {
        postRequest(
            EndPoint.plan,
            preparPayload,
            success => {
                const list = [...planList]
                list.unshift(success)
                dispatch(updatePlanList(list))
                handleCancel()
                resetPlan()
            },
            error => {
                console.log('error -->', error);
            },
        );
    }
};


const deletePlan=(row: PackageListDetailsDetailsProps,index:number)=>{
  deleteRequest(
    EndPoint.plan+row._id,
    success => {
        const list = [...planList]
        list.splice(index,1)
        dispatch(updatePlanList(list))
        handleCancel()
        resetPlan()
        alert('Successfully deleted')
    },
    error => {
        console.log('error -->', error);
    },
);
}


  const handleEdit = (row: PackageListDetailsDetailsProps,index:number) => {
    console.log('index ===',index)

    setEditRowId(row.planID);
    updateSelectedPackIndex(index)
    setEditedRow({ ...row });
  };

  const handleSave = () => {
    console.log("Saving:", editedRow);
    onSubmit()
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedRow({});
    updateSelectedPackIndex(null)
  };


  const handleInputChange = (field: string, value: string) => {
    console.log('value ===',value,'--- field====',field)
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };

  const formattedData = planList.map((row,index) => ({
    ...row,
    id: row.planID,
    rowIndex: index, 
  }));

  const columns: GridColDef[] = [
    {
      field: "planName",
      headerName: "Plan Name",
      width: 400,
      renderCell: (params: GridRenderCellParams) =>
        params.row.planID === editRowId ? (
          <TextField
            variant="standard"
            value={editedRow.planName || ""}
            onChange={(e) => handleInputChange("planName", e.target.value)}
            sx={{ input: { color: "#fff" }, '&.MuiTextField-root': { verticalAlign: 'middle' } }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "planValue",
      headerName: "Amount",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        params.row.planID === editRowId ? (
          <TextField
            variant="standard"
            value={editedRow.planValue || ""}
            onChange={(e) => handleInputChange("planValue", e.target.value)}
            sx={{ input: { color: "#fff" }, '&.MuiTextField-root': { verticalAlign: 'middle' } }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "planDuration",
      headerName: "Total Days",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        params.row.planID === editRowId ? (
          <TextField
            variant="standard"
            value={editedRow.planDuration || ""}
            onChange={(e) => handleInputChange("planDuration", e.target.value)}
            sx={{ input: { color: "#fff" }, '&.MuiTextField-root': { verticalAlign: 'middle' } }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const index = params.row.rowIndex
        const isEditing = editRowId === params.row.planID;
        return (
          <>
            {isEditing ? (
              <IconButton onClick={handleSave} sx={{ color: "lightgreen" }}>
                <SaveIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleEdit(params.row,index)}
                sx={{ color: "yellow" }}
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}

            {
              isEditing &&
              <IconButton onClick={handleCancel} sx={{ color: "lightgreen" }}>
                <CancelIcon sx={{ fontSize: 18 }} />
              </IconButton>

            }

            {!isEditing && (
              <IconButton
                onClick={() => deletePlan(params.row,index)}
                sx={{ color: "red" }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <DataGrid
        rows={formattedData}
        columns={columns}
        sx={{
          backgroundColor: "#4C4E5F",
          border: "none",
          color: "#fff",
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: '#fff',
            fontWeight: 'bold'
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "red",
            color: "#fff",
            fontWeight: '900'

          },
          '.MuiDataGrid-root': {
            backgroundColor: "red",
          },
          '.MuiDataGrid-columnHeader': {
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
        getRowId={(row) => row.planID}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 25]}
      />
    </div>
  );
};

export default PlanDatatable;
