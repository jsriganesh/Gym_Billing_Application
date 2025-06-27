// import React, { useEffect, useState } from 'react';

// import './index.scss'

// const LoginPage = () => {
    
//     return (
//         <div className="login-page">
//                 <>{'kjbkj'}</>
//         </div>
//     );
// }
// export default LoginPage


import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Link } from '@mui/material';

const LoginPage = () => {



  return (
    <Box sx={{ display: 'flex', height: '100vh',backgroundColor:'#F9F9F9', }}>
      {/* Left Side */}
      <Box
        sx={{
          width: '50%',
          backgroundColor: '#975d20',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(0% 0%, 100% 0%, 82% 101%, 0% 100%)',
        //   clipPath: 'polygon(0% 100%, 100% 100%, 100 0%, 8% 0%)',
          p: 4,
        }}
      >
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
        <img src={require('../../assets/images/logo/logo.png')} alt="Gym Logo" width={100} height={100} />
        <img src={require('../../assets/images/logo/logo_text.png')} alt="Gym Logo" width={200} height={60} />
        </div>
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Welcome back!
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Transform your body and mind
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Strategy SaaS Solutions
        </Typography>
        <Box mt={4}>
          <img src={require('../../assets/images/sample_user_images/user2.png')} alt="Illustration" width="300"  style={{borderRadius:5,}}/>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          width: '50%',
          
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Sign in your account
          </Typography>

          <TextField
            label="Email"
            placeholder="demo@example.com"
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Remember my preference"
            sx={{ mt: 1 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: '#223cc7', ':hover': { bgcolor: '#1d34b5' } }}
          >
            Sign In
          </Button>

          <Typography variant="body2" mt={2} textAlign="center">
            Don’t have an account?{' '}
            <Link href="#" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
