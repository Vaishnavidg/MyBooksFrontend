import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { SkipPreviousRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBook, bookApi } from '../api/BookApi';


export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState<IBook[]>([]);
  async function fetchBookDetail() {
    try {
      if (!id) {
        return;
      }
      const response = await bookApi.getBookDetails(id)
      setBook(response);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
    // console.log(book);
  }

  useEffect(() => {
    fetchBookDetail();
  }, []);

  return (
    <Box sx={{ margin: 20 }}>
      {/* <SkipPreviousRounded /> */}
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="https://source.unsplash.com/random"
            alt="Book Cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {/* {book}  */}Book Name
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Author Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of the book goes here...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
