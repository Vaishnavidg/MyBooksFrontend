import { Box, Grid, Paper, SpeedDial, SpeedDialIcon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import { AddBookModal } from './AddBookModal';
import { IBook, bookApi } from '../../api/BookApi';
import InfoBookModal from './InfoBookModal';

export default function HomePage() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [bookId, setBookId] = useState<string | null | undefined>(null);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    // Array of image paths
    const imagePaths = ["https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg", 
 "https://img.freepik.com/free-photo/hard-cover-book_1101-915.jpg"];

    const handleCloseAddModal = () => setOpenAddModal(false);
    const handleAddModal = () => setOpenAddModal(true);
    const handleCloseInfoModal = () => setOpenInfoModal(false);
    const handleInfoModal = (id: string | null | undefined) => {
        setBookId(id);
        setOpenInfoModal(true);
    }

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

    return (
        <div>
            {/* <Navbar /> */}
            <Box sx={{ margin: 5, marginTop: 15 }}>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        {books.length > 0 && (
                            <Grid container justifyContent="center" spacing={3}>
                                {books.map((book, index) => (
                                    <Grid key={index} item onClick={() => handleInfoModal(book._id)}>
                                        <Paper
                                            sx={{
                                                height: 200,
                                                width: 150,
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                backgroundImage: `url("${imagePaths[index % imagePaths.length]}")`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                boxShadow: '0px 4px 6px rgba(0.2, 0.2, 0.2, 0.5)'
                                            }}

                                        /><Typography sx={{ boxShadow: '0px 4px 6px rgba(0.0, 0.0, 0.0, 0.0)', marginTop: 1 }}>
                                            {book.title}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>

            <SpeedDial
                ariaLabel="SpeedDial example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={() => { }}
                onOpen={() => { }}
                onClick={handleAddModal}
            />
            <AddBookModal open={openAddModal} handleClose={handleCloseAddModal} fetchBooks={fetchBooks} />
            <InfoBookModal open={openInfoModal} handleClose={handleCloseInfoModal} id={bookId} fetchBooks={fetchBooks} />
        </div>
    )
}
