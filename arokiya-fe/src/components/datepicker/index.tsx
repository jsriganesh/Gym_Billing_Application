
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DatePicker{
    setSelectedDate:(date:Dayjs | null | string)=>void
    selectedDate:Dayjs | null | string
    label?:string
}

const CommonDatePicker = ({label,selectedDate, setSelectedDate}:DatePicker ) => {

  return (
    <Box sx={{ p: 1.5 }}>
    <Grid container spacing={2}>


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          
          format='DD-MM-YYYY'
          label={label || ''}
          value={dayjs(selectedDate)}
          onChange={(newValue) =>{
              

            console.log('====',dayjs(newValue).toDate().toISOString())
            newValue ?  setSelectedDate(dayjs(newValue).toDate().toISOString() ) : setSelectedDate (null)}}
          // renderInput={(params:any) => <TextField {...params} />}
          slotProps={{
            textField: {
              variant: 'outlined',
              sx: {
                width: 195,
                // backgroundColor: '#464545',       // match dark bg
                color: '#B0B0B0',                 // text color
                '& .MuiInputBase-input': {
                  color: '#B0B0B0',              // input text
                  // backgroundColor: '#464545',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    // borderColor: 'red',      // border
                    // backgroundColor: '#464545',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D0D0D0',      // subtle hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D0D0D0',      // subtle focus
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#888888',              // label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00bcd4',              // focused label color
                },
                '& .MuiSvgIcon-root': {
                  color: '#888888',              // calendar icon
                },

                '& .MuiPickersOutlinedInput-root': {
                  // border:'1px solid red'
                  color: 'white',
                  backgroundColor: '#464545',


                },
                '& .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: '#888888 !important'
                },
                // '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                //   borderColor: '#D0D0D0',
                // },

                // '& .MuiPickersInputBase-root-MuiPickersOutlinedInput-root

                // '& .MuiPickersOutlinedInput-root':{
                //   color
                // },

                // 🔸 Border (Notched Outline)
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#888888', // your desired border color
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D0D0D0',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'red !important',
                },
                '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'red', // or your preferred color
                },

                // Focus border override (removes MUI blue)
                // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                //   borderColor: '#B0B0B0', // <-- your custom focus color
                // },


                // // 🔸 Label
                // '& .MuiInputLabel-root': {
                //   color: '#B0B0B0',
                // },
                // '& .MuiInputLabel-root.Mui-focused': {
                //   color: '#B0B0B0',
                // },
              },
            },
          }}

        />
      </LocalizationProvider>
    </Grid>
  </Box>
  );
};

export default CommonDatePicker;
