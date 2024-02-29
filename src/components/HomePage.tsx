import React, { Key, forwardRef, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Box, Paper, Typography, SpeedDial, SpeedDialIcon, Button, Snackbar, AlertProps, Alert, IconButton } from '@mui/material';
import { IBook, bookApi } from '../api/BookApi';
import { Masonry } from '@mui/lab';
import { Delete, Edit, InfoRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AddBookModal } from './AddBookModal';


// import { UpdateBookModal } from './';
import InfoBookModal from './InfoBookModal';
import { UpdateBookModal } from './UpdateBookModal';

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)

export default function HomePage() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [bookInfo, setBookInfo] = useState<IBook | null>(null);
    const [openModal, setOpenModal] = useState(false);
    // const [openInfoModal, setOpenInfoModal] = useState(false);
    // const [openUpdateModal, setUpdateModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false); // State for AddBookModal
    const [openInfoModal, setOpenInfoModal] = useState(false); // State for InfoBookModal
    const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for UpdateBookModal
    const [bookId, setBookId] = useState<string | null | undefined>(null); // State to store the book id for UpdateBookModal


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
            // console.log(response);
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

    // Handlers for opening and closing modals
    const handleInfoModal = (id: string | null | undefined) =>{
        setBookId(id);
        setOpenInfoModal(true);
    }
    const handleCloseInfoModal = () => setOpenInfoModal(false);
    const handleAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);
    const handleUpdateModal = (id: string | null | undefined) => {
        setBookId(id);
        setOpenUpdateModal(true);
    };
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);
    return (
        <div>  
            <Box sx={{ margin: 5,marginTop:10 }}>
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
                                    <IconButton onClick={() => handleInfoModal(book._id)}>
                                        <InfoRounded color='info' />
                                    </IconButton>
                                    {/* Add button to open UpdateBookModal */}
                                    <IconButton onClick={() => handleUpdateModal(book._id)}>
                                        <Edit />
                                    </IconButton>
                                    {/* Add button to delete book */}
                                    <IconButton onClick={() => deleteBook(book._id)}>
                                        <Delete color='error' />
                                    </IconButton>
                                </Box>

                            </Paper>
                        ))}
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
                        {/* Modals */}
                        <InfoBookModal open={openInfoModal} handleClose={handleCloseInfoModal} id={bookId} />
                        <AddBookModal open={openAddModal} handleClose={handleCloseAddModal} fetchBooks={fetchBooks} />
                        <UpdateBookModal open={openUpdateModal} handleClose={handleCloseUpdateModal} fetchBooks={fetchBooks} id={bookId} />

                    </Masonry>
                )}
            </Box>
        </div>
    );
}
