import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

// Initial user details

const FieldCard = ({
  label,
  value,
  mode,
  onChange,
  inputType
}: {
  label: string;
  value: string;
  mode: 'editable' | 'view';
  onChange?: (val: string) => void;
  inputType?:'string'|'number'
}) => {

  return (
    <div>
      {/* {mode === 'editable' ? (
        <TextField
          label={label}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          fullWidth
        />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="body1">{value? value:'-'}</Typography>
          </CardContent>
        </Card>
      )} */}
      {mode === 'editable' ? (
        <Box
          sx={{
            // backgroundColor: theme.palette.background.paper,
            // p: 1,
            borderRadius: 2,
            height: '100%',
            boxShadow: 1,
          }}
        >
          {/* <TextField
          style={{
            backgroundColor:'#464545'
          }}
            label={label}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            fullWidth
            variant="outlined"
          /> */}
          <TextField
  label={label}
  value={value}

  onChange={(e) =>  inputType !== 'number' ?  onChange?.(e.target.value) :  onChange?.((e.target.value.replace(/[^\d]/g,'')).toString())}
  fullWidth
  variant="outlined"
  InputProps={{
    sx: {
      backgroundColor: '#464545',
      color: '#ffffff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#888888', // default border
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#bbbbbb', // on hover
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00bcd4', // on focus
      },
    },
  }}
  InputLabelProps={{
    sx: {
      color: '#aaaaaa', // label default color
      '&.Mui-focused': {
        color: '#00bcd4', // label on focus
      },
    },
  }}
/>

        </Box>
      ) : (
        // <Card
        //   sx={{
        //     backgroundColor: '#1e1e2f',
        //     color: '#ffffff',
        //     // p: 2,
        //     width:200,
        //     height: 80,
            
        //     borderRadius: 2,
        //     boxShadow: 2,
        //   }}
        // >
        //   <CardContent sx={{ 
        //     paddingBottom:0,
        //     padding: 0 ,
        //     display:'flex',
        //     flexDirection:'column',
        //     alignContent:'center',
        //     justifyContent:'center',
        //   }}>
            // <Typography variant="subtitle2" color="gray">
            //   {label}
            // </Typography>
            // <Typography variant="body1">{value}</Typography>
        //   </CardContent>
        // </Card>
        <div style={{
            // display:'flex',flexDirection:'column',
            backgroundColor:'#464545',
            height:40,
            width:170,
            padding:'1.1rem',
            borderRadius:5
        }}>
<Typography style={{color:'white'}} variant="subtitle2" color="gray">
              {label}
            </Typography>
            <Typography style={{color:'white'}} variant="body1">{value}</Typography>

            </div>
      )}
    </div>
  );
};


interface UserDetailsProps {
  mode: 'editable' | 'view',
  onChange?:(data:string)=>void,
  label:string,
  value:string,
  inputType?:'string'|'number'
}

const UserDetails = ({ mode,label,onChange,value,inputType='string' }: UserDetailsProps) => {

  return (
    <Box sx={{ p: 1.5 }}>
      <Grid container spacing={2}>
        {/* {Object.entries(user).map(([key, value]) => ( */}
          <FieldCard
            inputType={inputType}
            // key={key}
            label={label}
            value={value}
            mode={mode}
            onChange={(val) => onChange && onChange(val)}
          />
        {/* ))} */}
      </Grid>
    </Box>
  );
};

export default UserDetails;
