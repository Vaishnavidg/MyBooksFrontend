import React, { useEffect, useState } from 'react';
import { Modal, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Book, bookApi, IBook } from '../../api/BookApi';
import { Close, Delete, Edit, Margin, Save } from '@mui/icons-material';
import { Confirmation } from './Confirmation';
import { UpdateBookModal } from './UpdateBookModal';

interface InfoBookModalProps {
    open: boolean;
    handleClose: () => void;
    id: string | null | undefined;
    fetchBooks: () => void;
}

const InfoBookModal: React.FC<InfoBookModalProps> = ({ open, handleClose, id, fetchBooks }) => {
    const [bookInfo, setBookInfo] = useState<IBook>();
    const [openDialog, setOpenDialog] = useState(false);
    const [bookId, setBookId] = useState<string | null | undefined>(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    console.log(id);

    async function fetchInfo(id: string | null | undefined) {
        try {
            if (!id) {
                return;
            }
            const response = await bookApi.getBookDetails(id);
            // console.log(response)
            setBookInfo(response);
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(bookInfo);
    }

    useEffect(() => {
        fetchInfo(id);
    }, [id, open]);

    // useEffect(() => {
    //     console.log(bookInfo); // Log the value of bookInfo
    // }, [bookInfo]); // Run this effect whenever bookInfo changes

    //delete data

    const deleteBook = (id: string | null | undefined) => {
        handleClose();
        setOpenDialog(true);
    }
    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleUpdateModal = (id: string | null | undefined) => {

        setBookId(id);
        setOpenUpdateModal(true);
        handleClose();
    };
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
                    {bookInfo && (
                        <>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h4"sx={{ marginBottom: 1 }}>{bookInfo.title}</Typography>
                                <Button onClick={handleClose} color='inherit' endIcon={<Close />} />
                            </Grid>
                            <Typography variant="body1">
                                {/* {bookInfo.autho} */}
                                {/* <Typography variant="h5" component="h2" gutterBottom>
                                Title:{bookInfo.title}
                            </Typography> */}
                                <Typography variant="subtitle1" gutterBottom>
                                    Author: {bookInfo.author}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Published Year: {bookInfo.publishYear}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione perferendis deserunt ut accusamus, aspernatur quis sequi dolorem rerum placeat dolores quam animi a ullam quaerat minima at sint aliquid labore.
                                </Typography>
                            </Typography>  </>
                    )}
                    <Grid container spacing={2} justifyContent="flex-end" mt={2}>
                        {/* <Button variant="contained" startIcon={<Save />}>Save</Button> */}
                        <Button variant="contained" color='error' sx={{ margin: 1 }} startIcon={<Delete />} onClick={() => deleteBook(id)}>Delete</Button>
                        <Button variant="contained" sx={{ margin: 1 }} startIcon={<Edit />} onClick={() => handleUpdateModal(id)}>Edit</Button>
                    </Grid>
                </Paper>

            </Modal>
            <Confirmation open={openDialog} fetchBooks={fetchBooks} id={id} handleClose={handleDialogClose} />
            <UpdateBookModal open={openUpdateModal} handleClose={handleCloseUpdateModal} book={bookInfo}  fetchBooks={fetchBooks}/>
        </div>
        // <Modal open={open} onClose={handleClose}>
        //     <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        //         {/* <Typography>Info</Typography> */}
        //         {bookInfo && (
        //             <>
        //                 <Typography variant="h5" component="h2" gutterBottom>Title
        //                     {/* {bookInfo.title} */}
        //                 </Typography>
        //                 <Typography variant="subtitle1" gutterBottom>Author
        //                     {/* Author: {bookInfo.author} */}
        //                 </Typography>
        //                 <Typography variant="subtitle1" gutterBottom>Published year
        //                     {/* Published Year: {bookInfo.publishYear} */}
        //                 </Typography>
        //                 <Typography variant="body1" gutterBottom>
        //                     Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione perferendis deserunt ut accusamus, aspernatur quis sequi dolorem rerum placeat dolores quam animi a ullam quaerat minima at sint aliquid labore.
        //                 </Typography>
        //             </>
        //         )}
        //         <Button onClick={handleClose} variant="contained" color="primary">
        //             Close
        //         </Button>
        //     </Box>
        // </Modal>

    );
};

export default InfoBookModal;


