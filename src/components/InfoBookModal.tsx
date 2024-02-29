import React, { useEffect, useState } from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import { bookApi, IBook } from '../api/BookApi';

interface Book {
    title: string;
    author: string;
    publishYear: number;
}

interface InfoBookModalProps {
    open: boolean;
    handleClose: () => void;
    // book: IBook | null;
    id: string | null | undefined
}

const InfoBookModal: React.FC<InfoBookModalProps> = ({ open, handleClose, id }) => {
    console.log(id);
    const [bookInfo, setBookInfo] = useState<IBook | null>(null);

    async function fetchInfo(id: string | null | undefined) {
        
        console.log(id);
        try {
            
            if (!id) {
                return;
            }
            const response = await bookApi.getBookDetails(id); // Destructure the response
            // const bookData: IBook[] = response;
            console.log(response);
            setBookInfo(response[0]); // Set the book
        } catch (error) {
            console.error('Error:', error);
        }
        // handleInfoModal();
    }
    // const { title, author, publishYear } = book;
    // async function fetchInfo(id: string | null | undefined) {
    //     try {
    //         if (!id) {
    //             return;
    //         }
    //         const [response] = await bookApi.getBookDetails(id); // Destructure the response
    //         console.log(response);
    //         setBook(response); // Set the book
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    // useEffect(() => {
    //     if (open) {
    //         fetchInfo(_id);
    //     }
    // }, [_id, open]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {/* {book && (
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Author: {book.author}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Published Year: {book.publishYear}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione perferendis deserunt ut accusamus, aspernatur quis sequi dolorem rerum placeat dolores quam animi a ullam quaerat minima at sint aliquid labore.
                        </Typography>
                    </>
                )} */}
                <Button onClick={handleClose} variant="contained" color="primary">
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default InfoBookModal;
