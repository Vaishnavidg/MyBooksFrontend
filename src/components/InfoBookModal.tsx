import React, { useEffect, useState } from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import { bookApi, IBook } from '../api/BookApi';

interface InfoBookModalProps {
    open: boolean;
    handleClose: () => void;
    id: string | null | undefined;
}

const InfoBookModal: React.FC<InfoBookModalProps> = ({ open, handleClose, id }) => {
    const [bookInfo, setBookInfo] = useState<IBook[]>([]);
    console.log(id);
    async function fetchInfo(id: string | null | undefined) {
        try {
            if (!id) {
                return;
            }
            const response = await bookApi.getBookDetails(id);
            console.log(response)
            setBookInfo(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchInfo(id);
    }, [id]);

    // useEffect(() => {
    //     console.log(bookInfo); // Log the value of bookInfo
    // }, [bookInfo]); // Run this effect whenever bookInfo changes

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {/* <Typography>Info</Typography> */}
                {bookInfo && (
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>Title
                            {/* {bookInfo.title} */}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>Author
                            {/* Author: {bookInfo.author} */}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>Published year
                            {/* Published Year: {bookInfo.publishYear} */}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione perferendis deserunt ut accusamus, aspernatur quis sequi dolorem rerum placeat dolores quam animi a ullam quaerat minima at sint aliquid labore.
                        </Typography>
                    </>
                )}
                <Button onClick={handleClose} variant="contained" color="primary">
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default InfoBookModal;
