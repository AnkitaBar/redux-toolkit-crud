
'use client';
import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';
import Link from 'next/link';

const StyledContainer = styled(Grid)({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg)',
    padding: '20px',
});

const StyledForm = styled(Grid)({
    maxWidth: 400,
    width: '100%',
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
    marginTop: '20px',
    background: 'linear-gradient(135deg, #1976d2 30%, #64b5f6)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px',
    '&:hover': {
        background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
    },
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const jsonData = {
          email: data.email,
          password: data.password,
        };
        dispatch(login(jsonData));
      };

    return (
        <StyledContainer container>
            <StyledForm item>
                <Typography variant="h5" gutterBottom align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Invalid email format",
                            },
                        })}
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                    />
                    <TextField
                        {...register("password", { required: "Password is required" })}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Login
                    </StyledButton>
                </form>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Link href="/auth/register" underline="hover" color="primary">
                        Register here
                    </Link>
                </Typography>

                <Typography variant="body2" style={{ marginTop: '20px' }}>
            forgot password?
          </Typography>
          <Link href="/auth/forget-password" style={{ color: '#1976d2' }}>click here</Link>

            </StyledForm>
        </StyledContainer>
    );
};

export default Login;
