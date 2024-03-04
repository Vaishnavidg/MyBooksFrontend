import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { bookApi } from '../../api/BookApi';

interface ConfirmationProps {
    open: boolean;
    fetchBooks: () => void;
    id: string | null | undefined;
    handleClose: () => void;
}
export const Confirmation: React.FC<ConfirmationProps> = ({ open, fetchBooks, id, handleClose }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    //delete Function
    async function deleteBook(id: string | null | undefined) {
        try {
            const response = await bookApi.DeletBook(id);
            // console.log(response);
            // const booksData: IBook[] = response;
            // setBooks(booksData);
        } catch (error) {
            console.error('Error:', error);
        }
        setOpenSnackbar(true);
        handleClose();
        fetchBooks();
    }
    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{color: 'black'}}>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteBook(id)} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Customise Snackbar  */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
                {/* <SnackbarAlert onClose={handleClose} severity='error' variant='filled'>
                                Deleted successfully!
                            </SnackbarAlert> */}
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Deleted successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}
