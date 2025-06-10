// AddMembersButton.tsx or AddMembersButton.jsx
import React from 'react';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface CommonButtonProps {
    handleClick:(data:any)=>void,
    label:string
}
const CommonButton = ({handleClick,label}:CommonButtonProps) => {
//   const handleClick = () => {
//     console.log('Add Members clicked');
//   };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GroupAddIcon />}
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

export default CommonButton;
