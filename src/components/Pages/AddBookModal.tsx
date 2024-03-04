import { Alert, Button, Grid, Modal, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { bookApi } from "../../api/BookApi";
import { Close, CloseOutlined, CloseRounded } from "@mui/icons-material";

interface AddBookModalProps {
  open: boolean;
  handleClose: () => void;
  fetchBooks: () => void;
}

interface FormData {
  title: string;
  author: string;
  publishYear: number;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ open, handleClose, fetchBooks }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    publishYear: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "publishYear" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("formData:", formData);
    const response = await bookApi.AddBookDetails(formData);
    // console.log(response);
    setFormData({
      title: '',
      author: '',
      publishYear: 0,
    });
    setOpenSnackbar(true);
    fetchBooks();
    handleClose();
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
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Add Book</Typography>
            <Button onClick={handleClose} size="small" color="inherit" endIcon={<CloseOutlined />} />
          </Grid>
          <Typography variant="body1">
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Author" name="author" value={formData.author} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Published Year" type="number" name="publishYear" value={formData.publishYear === 0 ? '' : formData.publishYear.toString()} onChange={handleChange} fullWidth margin="normal" />
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
            Add
          </Button>
        </Paper>
      </Modal>
      {/* Customise Snackbar  */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Added successfully!
        </Alert>
      </Snackbar>
    </>

  );
};
