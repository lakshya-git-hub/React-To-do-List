import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Card as CardType } from '../types';
import { db, storage } from '../config/firebase.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface CardDialogProps {
  open: boolean;
  onClose: () => void;
  card: CardType;
}

const CardDialog: React.FC<CardDialogProps> = ({ open, onClose, card }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [dueDate, setDueDate] = useState<Date | null>(
    card.dueDate ? new Date(card.dueDate) : null
  );
  const [attachments, setAttachments] = useState<string[]>(card.attachments || []);

  const handleSave = async () => {
    try {
      const cardRef = doc(db, 'cards', card.id);
      await updateDoc(cardRef, {
        title,
        description,
        dueDate: dueDate?.toISOString(),
        attachments,
      });
      onClose();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    try {
      const newAttachments = [...attachments];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `attachments/${card.id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newAttachments.push(downloadURL);
      }
      setAttachments(newAttachments);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Edit Card
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            sx={{ mt: 2, width: '100%' }}
          />
        </LocalizationProvider>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Attachments
          </Typography>
          <Button
            component="label"
            startIcon={<AttachFileIcon />}
            variant="outlined"
            size="small"
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileUpload}
            />
          </Button>
          {attachments.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {attachments.map((url, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <AttachFileIcon fontSize="small" />
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Attachment {index + 1}
                  </a>
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog; 