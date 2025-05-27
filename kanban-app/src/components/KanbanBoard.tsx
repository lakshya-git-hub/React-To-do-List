import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { List as ListType, Card } from '../types';
import { db } from '../config/firebase.ts';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import KanbanList from './KanbanList.tsx';
import AddListDialog from './AddListDialog.tsx';

interface KanbanBoardProps {
  boardId: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ boardId }) => {
  const [lists, setLists] = useState<ListType[]>([]);
  const [isAddListOpen, setIsAddListOpen] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'lists'),
      where('boardId', '==', boardId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listsData: ListType[] = [];
      snapshot.forEach((doc) => {
        listsData.push({ id: doc.id, ...doc.data() } as ListType);
      });
      setLists(listsData.sort((a, b) => a.order - b.order));
    });

    return () => unsubscribe();
  }, [boardId]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);

      const updatedLists = newLists.map((list, index) => ({
        ...list,
        order: index,
      }));

      setLists(updatedLists);

      // Update order in Firestore
      for (const list of updatedLists) {
        await updateDoc(doc(db, 'lists', list.id), { order: list.order });
      }
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destList = lists.find((list) => list.id === destination.droppableId);

      if (!sourceList || !destList) return;

      const newSourceCards = Array.from(sourceList.cards);
      const [removed] = newSourceCards.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        newSourceCards.splice(destination.index, 0, removed);
        const newLists = lists.map((list) =>
          list.id === sourceList.id
            ? { ...list, cards: newSourceCards }
            : list
        );
        setLists(newLists);
      } else {
        const newDestCards = Array.from(destList.cards);
        newDestCards.splice(destination.index, 0, removed);
        const newLists = lists.map((list) => {
          if (list.id === sourceList.id) {
            return { ...list, cards: newSourceCards };
          }
          if (list.id === destList.id) {
            return { ...list, cards: newDestCards };
          }
          return list;
        });
        setLists(newLists);
      }

      // Update card in Firestore
      await updateDoc(doc(db, 'cards', draggableId), {
        listId: destination.droppableId,
        order: destination.index,
      });
    }
  };

  return (
    <Box sx={{ p: 2, height: '100vh', overflow: 'auto' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                display: 'flex',
                gap: 2,
                minHeight: '100%',
              }}
            >
              {lists.map((list, index) => (
                <KanbanList key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <Paper
                sx={{
                  p: 2,
                  minWidth: 280,
                  height: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setIsAddListOpen(true)}
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
                <Typography>Add List</Typography>
              </Paper>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <AddListDialog
        open={isAddListOpen}
        onClose={() => setIsAddListOpen(false)}
        boardId={boardId}
        listCount={lists.length}
      />
    </Box>
  );
};

export default KanbanBoard; 