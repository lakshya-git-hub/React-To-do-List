import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../config/firebase.ts';
import { collection, addDoc } from 'firebase/firestore';

interface AddCardDialogProps {
  open: boolean;
  onClose: () => void;
  listId: string;
  cardCount: number;
}

const AddCardDialog: React.FC<AddCardDialogProps> = ({
  open,
  onClose,
  listId,
  cardCount,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, 'cards'), {
        title: title.trim(),
        description: description.trim(),
        listId,
        order: cardCount,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Add New Card
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Card Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          autoFocus
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!title.trim()}
        >
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardDialog; 