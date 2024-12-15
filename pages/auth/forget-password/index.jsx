import { forgetPasswordFn } from '@/redux/authSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const jsonData = {
        email: data.email,
        first_school: data.first_school,
        newPassword: data.newPassword,
    };

    // Dispatch forgetPasswordFn with jsonData
    dispatch(forgetPasswordFn(jsonData));
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            borderRadius: '10px',
            border: '2px solid #1976d2',
            padding: '30px',
            backgroundColor: '#fff',
            color: '#000',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>
              Change Password
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              InputLabelProps={{
                style: { color: '#000' },
              }}
              InputProps={{
                style: {
                  color: '#000',
                },
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />

            <TextField
              fullWidth
              label="First School"
              type="text"
              margin="normal"
              {...register('first_school', {
                required: 'First School is required',
              })}
              error={!!errors.first_school}
              helperText={errors.first_school ? errors.first_school.message : ''}
              InputLabelProps={{ style: { color: '#000' } }}
              InputProps={{
                style: {
                  color: '#000',
                  backgroundColor: '#fff',
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              InputLabelProps={{
                style: { color: '#000' },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    style={{ color: '#000' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
                style: {
                  color: '#000',
                  backgroundColor: '#fff',
                },
              }}
              {...register('newPassword', {
                required: 'Password is required',
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ''}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgetPassword;
