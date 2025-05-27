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

interface AddListDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  listCount: number;
}

const AddListDialog: React.FC<AddListDialogProps> = ({
  open,
  onClose,
  boardId,
  listCount,
}) => {
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, 'lists'), {
        title: title.trim(),
        boardId,
        order: listCount,
        cards: [],
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      onClose();
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Add New List
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="List Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          autoFocus
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
          Add List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListDialog; 