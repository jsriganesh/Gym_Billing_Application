import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Grid } from '@mui/material';


interface AutoCompleteDropDownProps {
    onChange: (data: any) => void
    value: any
    label?: string
    mode?: 'editable' | 'view',
    options: { label: string, value: string |number }[]
}


const AutoCompleteDropDown = ({ onChange, value, label, options }: AutoCompleteDropDownProps) => {
    const [inputValue, setInputValue] = React.useState('');
    console.log('value ====>', value)

    return (
        <Box sx={{ p: 1.5 }}>
            <Grid container spacing={2}>
                {/* <Autocomplete
                    // freeSolo
                    // id="free-solo-2-demo"
                    value={options.find(data => data.value === value.value)}
                    defaultValue={value.value}
                    onChange={(event: any, newValue: string | null) => {
                        const getObject = options.find((data) => data.label === newValue)
                        console.log('newValue ====>', getObject)
                        onChange(getObject);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    options={options.map((opt) => opt.label)}
                    sx={{
                        width: 195,
                        // height:40,
                        // backgroundColor: '#464545',       // match dark bg
                        color: '#B0B0B0',                 // text color
                        '& .MuiInputBase-input': {
                            color: '#B0B0B0',              // input text
                            // backgroundColor: '#464545',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                // borderColor: 'red',      // border
                                backgroundColor: '#464545',
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
                            borderColor: '#00bcd4 !important',
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
                    }}
                    renderInput={(params) => <TextField {...params} label={label}
                        placeholder={options.find(data => data.value === value.value)?.label}
                    />}
                /> */}

<Autocomplete
  value={value ? value :null}
  onChange={(event, newValue) => {
    onChange(newValue || null);
  }}
  inputValue={inputValue}
  onInputChange={(event, newInputValue) => {
    setInputValue(newInputValue);
  }}
  options={options}
  getOptionLabel={(option) => option.label}
  isOptionEqualToValue={(option, value) => option.value === value.value}
  renderInput={(params) => (
    <TextField
      {...params}
      label={label}
      placeholder={value?.label || ''}
    />
  )}

  sx={{
    width: 195,
    // height:40,
    // backgroundColor: '#464545',       // match dark bg
    color: '#B0B0B0',                 // text color
    backgroundColor: '#464545',

    '& .MuiInputBase-input': {
        color: '#B0B0B0',              // input text
        // backgroundColor: '#464545',
        backgroundColor: '#464545',

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
        borderColor: '#00bcd4 !important',
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
}}
/>
            </Grid>
        </Box>
    );
}
export default AutoCompleteDropDown