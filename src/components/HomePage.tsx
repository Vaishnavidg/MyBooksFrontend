import React, { Key, forwardRef, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Box, Paper, Typography, SpeedDial, SpeedDialIcon, Button, Snackbar, AlertProps, Alert } from '@mui/material';
import { IBook, bookApi } from '../api/BookApi';
import { Masonry } from '@mui/lab';
import { Delete, Edit, InfoRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AddBookModal } from './AddBookModal';


// import { UpdateBookModal } from './';
import InfoBookModal from './InfoBookModal';

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)

export default function HomePage() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [bookInfo, setBookInfo] = useState<IBook | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);

    //Get All Books -> call getAllBookDetails API
   async function fetchBooks() {
        try {
            const response = await bookApi.getAllBookDetails();
            const booksData: IBook[] = response;
            setBooks(booksData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    async function deleteBook(id: string | null | undefined) {
        try {
            const response = await bookApi.DeletBook(id);
            console.log(response);
            // const booksData: IBook[] = response;
            // setBooks(booksData);
        } catch (error) {
            console.error('Error:', error);
        }
        setOpen(true);
        fetchBooks();
    }

    const [open, setOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    // async function fetchInfo(id: string | null | undefined) {

    //     console.log(id);
    //     try {

    //         if (!id) {
    //             return;
    //         }
    //         const response = await bookApi.getBookDetails(id); // Destructure the response
    //         // const bookData: IBook[] = response;
    //         console.log(response);
    //         setBookInfo(response[0]); // Set the book
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    //     handleInfoModal();
    // }

    //For Info Modal
    const handleInfoModal = () => {
        setOpenInfoModal(true);
    };

    const handleCloseInfoModal = () => {
        setOpenInfoModal(false);
    };

    //For Add Modal
    const handleAddModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    //For Update Modal
    const handleUpdateModal = () => {
        setUpdateModal(true);
    }
    const handleUpdateCloseModal = () => {
        setUpdateModal(false);
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ margin: 5 }}>
                {books.length > 0 && (
                    <Masonry columns={5} spacing={2}>
                        {books.map((book, index) => (
                            <Paper key={index} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start', // Align content to left
                                height: 250,
                                border: '1px solid',
                                position: 'relative' // Necessary for positioning the SpeedDial
                            }}>
                                <Typography variant='h4' color='secondary' sx={{ marginLeft: 2, marginTop: 2 }}>{book.title}</Typography>
                                <Typography variant='body1' sx={{ marginLeft: 2, marginTop: 2 }}>Author: {book.author}</Typography>
                                <Typography variant='body1' sx={{ marginLeft: 2 }}>Published Year: {book.publishYear}</Typography>
                                <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>

                                    {/* <Button onClick={()=>fetchInfo(book._id)}> */}
                                    <Button onClick={handleInfoModal}>
                                        <InfoRounded color='info' />
                                        <InfoBookModal open={openInfoModal} handleClose={handleCloseInfoModal} id={book._id} />
                                        {/* <InfoBookModal open={openInfoModal} handleClose={handleCloseInfoModal}  book= {bookInfo} />  */}
                                    </Button>

                                    <Button onClick={handleUpdateModal}>
                                        <Edit/>
                                        {/* <UpdateBookModal open={openModal} handleClose={handleCloseModal} /> */}
                                    </Button>

                                    <Button onClick={() => deleteBook(book._id)}>
                                        <Delete color='error' />
                                    </Button>

                                </Box>

                            </Paper>
                        ))}
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                            onClose={() => { }}
                            onOpen={() => { }}
                            onClick={handleAddModal}
                        />
                        {/* Customise Snackbar  */}
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            {/* <SnackbarAlert onClose={handleClose} severity='error' variant='filled'>
                                Deleted successfully!
                            </SnackbarAlert> */}
                            <Alert
                                onClose={handleClose}
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                 Deleted successfully!
                            </Alert>
                        </Snackbar>
                        <AddBookModal open={openModal} handleClose={handleCloseModal} fetchBooks={fetchBooks} />

                        {/* </Paper> */}

                    </Masonry>
                )}
            </Box>
        </div>
    );
}
