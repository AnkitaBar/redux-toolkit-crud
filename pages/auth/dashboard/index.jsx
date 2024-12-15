import { getProfile, updatePasswordFn } from '@/redux/authSlice';
import { Avatar, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  // const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((x) => x?.Auth);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  useEffect(() => {
    dispatch(getProfile());
  }, [])

    const onSubmit = (data) => {
      const jsonData = {
        user_id: user?._id,
          password: data.password,
      };
  
      // Dispatch forgetPasswordFn with jsonData
      dispatch(updatePasswordFn(jsonData));
    };
  

  const user = Array.isArray(userProfile) ? userProfile[0] : userProfile;

  console.log(user, "profiledetails");
  
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', alignContent: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"  // Center the card vertically
        style={{ height: '100%' }}  // Ensure the Grid container takes up the full height
      >
        <Card
          sx={{
            maxWidth: 400,
            padding: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
         {/* {/ <img src={profile_pic(user.profile_picture)}/> /} */}
          <Avatar
            src={user?.image || '/default-avatar.png'} // Show default avatar if user data is unavailable
            alt={user?.name} // Corrected template literal
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto 16px auto',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />

            {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"}}>
           
              <Avatar alt="Remy Sharp" src={profile_pic(user.profile_pic)} />

            </div> */}
          <CardContent>
          
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              Name: {user?.name} 
            </Typography>
            <Typography
              variant="body1"
              // color="text.secondary"
              sx={{ marginBottom: '8px', fontStyle: 'italic', color: '#333' }}
            >
              Email: {user?.email} 
            </Typography>
            <Typography
              variant="body1"
              component="div"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              Mobile: {user?.mobile} 
            </Typography>
            <Typography
              variant="body1"
              // color="text.secondary"
              sx={{ marginBottom: '8px', fontStyle: 'italic', color: '#333' }}
            >
              First School: {user?.first_school} 
            </Typography>
            
            <Typography
              variant="body1"
              // color="text.secondary"
              sx={{ marginBottom: '16px', fontStyle: 'italic', color: '#333' }}
            >
               Role: {user?.role || 'N/A'} 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <form>
        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
          <TextField
            fullWidth
            label="Update Password"
            type="password"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiFormLabel-root': { color: '#000' },
              '& .MuiInputBase-root': { color: '#000' },
            }}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password must be at least 8 characters long and contain at least one letter and one number',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
          onClick={handleSubmit(onSubmit)}
        >
          {/* {passwordPending ? 'Updating...' : 'Update Password'} */}
          Update Password
        </Button>
      </form>
    </Container>
  )
}

export default Dashboard