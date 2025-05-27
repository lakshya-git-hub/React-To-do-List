import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Card as CardType } from '../types';
import CardDialog from './CardDialog.tsx';

interface KanbanCardProps {
  card: CardType;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, index }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              p: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={() => setIsCardDialogOpen(true)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">{card.title}</Typography>
              <IconButton size="small" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {card.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {card.dueDate && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={formatDate(card.dueDate)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {card.attachments && card.attachments.length > 0 && (
                <Chip
                  icon={<AttachFileIcon />}
                  label={card.attachments.length}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
          </Paper>
        )}
      </Draggable>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit Card</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete Card</MenuItem>
      </Menu>

      <CardDialog
        open={isCardDialogOpen}
        onClose={() => setIsCardDialogOpen(false)}
        card={card}
      />
    </>
  );
};

export default KanbanCard; 