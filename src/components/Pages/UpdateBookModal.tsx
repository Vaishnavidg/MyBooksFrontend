import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Paper, Grid, TextField, Snackbar, Alert } from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import { IBook, bookApi } from '../../api/BookApi';

interface UpdateBookModalProps {
  open: boolean;
  handleClose: () => void;
  book: IBook | undefined;
  fetchBooks: () => void;
}

export const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ open, handleClose, book, fetchBooks }) => {
  const [editedBook, setEditedBook] = useState<IBook | undefined>(book);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Update the editedBook state when the book prop changes
    setEditedBook(book);
  }, [book]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedBook) {
      setEditedBook({ ...editedBook, [name]: value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editedBook) {
        await bookApi.UpdateBookDetail(editedBook,editedBook._id);
        fetchBooks();
        handleClose();
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
    <>
     <Modal open={open} onClose={handleClose}>
      <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Edit Book</Typography>
          <Button onClick={handleClose} endIcon={<Close />} />
        </Grid>
        <form onSubmit={handleSave}>
          <TextField
            fullWidth
            margin="normal"
            id="title"
            name="title"
            label="Title"
            value={editedBook?.title || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="author"
            name="author"
            label="Author"
            value={editedBook?.author || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="publishYear"
            name="publishYear"
            label="Publish Year"
            type="number"
            value={editedBook?.publishYear || ''}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
            Save
          </Button>
        </form>
      </Paper>
    </Modal>
     <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
     <Alert
       onClose={handleSnackbarClose}
       severity="success"
       variant="filled"
       sx={{ width: '100%' }}
     >
       Updated successfully!
     </Alert>
   </Snackbar>
    </>
   
  );
};
