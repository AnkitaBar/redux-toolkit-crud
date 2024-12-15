import { showProductFn, updateProductsFn } from '@/redux/cmsSlice';
import styled from '@emotion/styled';
import { Avatar, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const Input = styled('input')({
  display: 'none',
});

const ProductDetails = () => {
  const [img, setImg] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const { showProducts } = useSelector((state) => state?.Cms);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch product details on component load
  useEffect(() => {
    if (slug) {
      dispatch(showProductFn(slug));
    }
  }, [slug, dispatch]);

  // Populate form fields when product data is available
  useEffect(() => {
    if (showProducts) {
      setValue('name', showProducts.name);
      setValue('price', showProducts.price);
      setValue('description', showProducts.description);
      setValue('brand', showProducts.brand);
    }
  }, [showProducts, setValue]);

  const onSubmit = async (formData) => {
    const formdata = new FormData();
    formdata.append('name', formData.name);
    formdata.append('price', formData.price);
    formdata.append('description', formData.description);
    formdata.append('brand', formData.brand);

    if (img) {
      formdata.append('image', img);
    }

  //   dispatch(updateProductsFn({ id: slug, formData: formdata }));
  // };
  dispatch(updateProductsFn({id: slug, formData: formdata})).then(() => {
    router.push('/cms/allProducts');
  });
}

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 4,
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5' }}>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register('name', {
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 3,
                    message: 'Description must be at least 3 characters',
                  },
                })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                {...register('brand', {
                  required: 'Brand is required',
                  minLength: {
                    value: 2,
                    message: 'Brand must be at least 2 characters',
                  },
                })}
                error={!!errors.brand}
                helperText={errors.brand ? errors.brand.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                {...register('price', {
                  required: 'Price is required',
                  min: {
                    value: 1,
                    message: 'Price must be greater than 0',
                  },
                })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
              />
            </Grid>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
              <Avatar
                alt="Product Picture"
                src={
                  img
                    ? URL.createObjectURL(img)
                    : showProducts?.image
                    ? `https://example.com/uploads/${showProducts.image}`
                    : ''
                }
                sx={{ width: 90, height: 90 }}
              />
              <label htmlFor="product-pic-upload">
                <Input
                  accept="image/*"
                  id="product-pic-upload"
                  type="file"
                  onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#303f9f' },
                  }}
                >
                  Upload Product Pic
                </Button>
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
                  '&:hover': { backgroundColor: '#303f9f' },
                }}
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
