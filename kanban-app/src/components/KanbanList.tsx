import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { List as ListType, Card } from '../types';
import KanbanCard from './KanbanCard.tsx';
import AddCardDialog from './AddCardDialog.tsx';

interface KanbanListProps {
  list: ListType;
  index: number;
}

const KanbanList: React.FC<KanbanListProps> = ({ list, index }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            width: 280,
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            {...provided.dragHandleProps}
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6">{list.title}</Typography>
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  p: 1,
                  flexGrow: 1,
                  overflowY: 'auto',
                  minHeight: 100,
                }}
              >
                {list.cards.map((card, index) => (
                  <KanbanCard key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Box
            sx={{
              p: 1,
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setIsAddCardOpen(true)}
          >
            <IconButton size="small">
              <AddIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Add Card
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Rename List</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete List</MenuItem>
          </Menu>

          <AddCardDialog
            open={isAddCardOpen}
            onClose={() => setIsAddCardOpen(false)}
            listId={list.id}
            cardCount={list.cards.length}
          />
        </Paper>
      )}
    </Draggable>
  );
};

export default KanbanList; 