import React, { useEffect, useState } from 'react';
import { IBook, bookApi } from '../api/BookApi';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit, InfoRounded } from '@mui/icons-material';
import Navbar from './Navbar';

export default function HomeTable() {
  const [books, setBooks] = useState<IBook[]>([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  async function fetchBooks() {
    try {
      const response = await bookApi.getAllBookDetails();
      const booksData: IBook[] = response;
      setBooks(booksData);
      // console.log(booksData); 
      // console.log(booksData.length);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      {/* <Button variant='contained' onClick={fetchBooks}>Books Details</Button> */}
      <Typography variant='h4' sx={{ alignItems: 'center', marginTop: 5, color: 'GrayText' }}>Book Details</Typography>
      {books.length > 0 && (
        <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
          <Table sx={{ minWidth: 400, marginTop: 3, marginRight: 5, marginLeft: 5 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Id</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Author</StyledTableCell>
                <StyledTableCell align="left">Published Year</StyledTableCell>
                <StyledTableCell align="left">Operations</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <StyledTableRow
                  key={book._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{book.title}</StyledTableCell>
                  <StyledTableCell align="left">{book.author}</StyledTableCell>
                  <StyledTableCell align="left">{book.publishYear}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={`/books/details/${book._id}`}>
                      <InfoRounded color='info' sx={{ margin: '1rem' }} />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <Edit sx={{ margin: '1rem' }} />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <Delete color='error' sx={{ margin: '1rem' }} />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
