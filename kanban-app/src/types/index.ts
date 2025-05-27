export interface Card {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  assignedTo?: string;
  attachments?: string[];
  listId: string;
  order: number;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  userId: string;
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
} 