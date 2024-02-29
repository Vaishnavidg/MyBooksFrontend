import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, FormGroup } from '@mui/material';
import { bookApi } from '../api/BookApi';

interface FormData {
  title: string;
  author: string;
  publishYear: number;
}

export default function BookForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    publishYear: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData:", formData);
    const response = await bookApi.AddBookDetails(formData);
    console.log(response);
    setFormData({
      title: '',
      author: '',
      publishYear: 0,
    });
  };

  return (
    <FormGroup sx={{ margin: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Add New Book</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ width: 400 }}
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ width: 400 }}
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ width: 400 }}
            label="Publish Year"
            name="publishYear"
            type='number'
            value={formData.publishYear}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
}
