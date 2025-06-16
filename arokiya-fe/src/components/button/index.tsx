// AddMembersButton.tsx or AddMembersButton.jsx
import React from 'react';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface CommonButtonProps {
    handleClick:(data:any)=>void,
    label:string
    icon?:string
}
export const CommonButton = ({handleClick,label,icon}:CommonButtonProps) => {
//   const handleClick = () => {
//     console.log('Add Members clicked');
//   };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={icon === 'addMember'?<GroupAddIcon />:''}
      onClick={handleClick}
      sx={{
        height: '48px',
        fontSize: '16px',
        paddingX: 3, // theme spacing = 3 * 8px = 24px
        borderRadius: '8px',
        textTransform: 'none', // Keeps text as "Add Members" (not uppercase)
        boxShadow: 3, // subtle elevation
      }}
    >
      {label}
    </Button>
  );
};



// import {  TextField, Box } from '@mui/material';

// const Submint = () => {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted!");
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       <TextField label="Name" fullWidth sx={{ mb: 2 }} />
//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </Box>
//   );
// };
