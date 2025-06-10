// SearchBar.tsx

import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
// import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { Box } from '@mui/material';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    //   marginLeft: 0,
    width: '20rem',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(1),
        width: '20rem',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
            //   width: '20ch',
            '&:focus': {
                // width: '30ch',
            },
        },
    },
}));

interface TabContainerProps {
    handleChange: (data: any) => void,
    selectedTab: number,
    tabList: {
        label: string,
        iconPosition?: 'top' | 'bottom' | 'start' | 'end';
        icon?: React.JSXElementConstructor<any>
    }[]
}
const TabContainer = ({ handleChange, selectedTab, tabList }: TabContainerProps) => {

    const handleChangeEvent = (event: React.SyntheticEvent, newValue: number) => {
        handleChange(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChangeEvent}
                    aria-label="basic tabs example"
                    textColor="inherit" // Use this so you can fully control color via sx
                    TabIndicatorProps={{
                        style: { backgroundColor: '#FAF754' } // Active tab bottom line color
                    }}
                >

                    {
                        tabList.map((tab, index) => {
                            return (
                                <Tab
                                    //   icon={tab.icon }
                                    iconPosition={tab.iconPosition}
                                    label={tab.label}
                                    sx={{
                                        color: selectedTab === index ? '#FAF754' : '#888', // Active vs default
                                        fontWeight: selectedTab === index ? 'bold' : 'normal',
                                    }}
                                />
                            )
                        })
                    }
                </Tabs>
            </Box>
        </div>
    );
}

export default TabContainer