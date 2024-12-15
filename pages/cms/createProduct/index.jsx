import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/redux/cmsSlice';
import { useRouter } from 'next/router';

const StyledContainer = styled(Grid)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [profilePreview, setProfilePreview] = useState(null);
  const [img, setImg] = useState(null); // Added img state

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('brand', data.brand);

    if (img) {
      formData.append('image', img); // Using img state here
    }

    dispatch(createProduct(formData)).then(() => {
      router.push('/cms/allProducts');
    });
  
    console.log(formData);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="sm" sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    }}>
      <Paper elevation={3} sx={{
        padding: 4,
        marginTop: 4,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5' }}>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                required
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                sx={{
                  '& .MuiInputBase-root': { color: '#000' },
                  '& .MuiFormLabel-root': { color: '#000' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                required
                {...register('price', {
                  required: 'Price is required',
                  minLength: {
                    value: 1,
                    message: 'Price must be at least 1 character',
                  },
                })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
                sx={{
                  '& .MuiInputBase-root': { color: '#000' },
                  '& .MuiFormLabel-root': { color: '#000' },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 3,
                    message: 'Description must be at least 3 characters',
                  },
                })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
                sx={{
                  '& .MuiInputBase-root': { color: '#000' },
                  '& .MuiFormLabel-root': { color: '#000' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                required
                {...register('brand', {
                  required: 'Brand is required',
                  minLength: {
                    value: 3,
                    message: 'Brand must be at least 3 characters',
                  },
                })}
                error={!!errors.brand}
                helperText={errors.brand ? errors.brand.message : ''}
                sx={{
                  '& .MuiInputBase-root': { color: '#000' },
                  '& .MuiFormLabel-root': { color: '#000' },
                }}
              />
            </Grid>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
              <label htmlFor="profile-pic-upload">
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    sx={{
                      backgroundColor: 'green',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: 'blue',
                      },
                    }}
                  >
                    Upload
                  </Button>
                </label>
                {profilePreview ? (
                  <Box mt={2}>
                    <img
                      style={{ height: '180px', width: '100%' }}
                      src={profilePreview}
                      alt="Uploaded"
                      className="upload-img"
                    />
                  </Box>
                ) : (
                  <Box mt={2}>
                    <p>Drop content here</p>
                  </Box>
                )}
              </label>
            </Stack>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProduct;
