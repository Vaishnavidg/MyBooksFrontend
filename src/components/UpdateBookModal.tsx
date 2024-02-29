import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { bookApi } from "../api/BookApi";

interface UpdateBookModalProps {
  open: boolean;
  handleClose: () => void;
  fetchBooks:()=>void;
  id: string | null | undefined
}

interface FormData {
  title: string;
  author: string;
  publishYear: number;
}

export const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ open, handleClose,fetchBooks,id }) => {
    // console.log(id);
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
    const response = await bookApi.UpdateBookDetail(formData,id);
    // console.log(response);
    setFormData({
      title: '',
      author: '',
      publishYear: 0,
    });
    fetchBooks();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
      <Typography>Update Form</Typography>
        <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Author" name="author" value={formData.author} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Published Year" type="number" name="publishYear" value={formData.publishYear === 0 ? '' : formData.publishYear.toString()} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
