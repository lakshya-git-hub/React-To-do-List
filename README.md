# React Todo List Application

A feature-rich Todo List application built with React and TypeScript. This application allows users to manage their tasks with features like adding, removing, and marking tasks as complete, along with filtering and sorting capabilities.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks (All, Active, Completed)
- Sort tasks (Newest, Oldest, Alphabetical)
- Persistent storage using localStorage
- Responsive design
- TypeScript support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd react-todo-list
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Testing the Application

1. **Adding Tasks**
   - Type a task in the input field
   - Click "Add" or press Enter
   - Verify the task appears in the list

2. **Completing Tasks**
   - Click the checkbox next to a task
   - Verify the task gets strikethrough styling
   - Click again to mark as incomplete

3. **Deleting Tasks**
   - Click the "Delete" button next to a task
   - Verify the task is removed from the list

4. **Filtering Tasks**
   - Use the filter dropdown to switch between:
     - All tasks
     - Active tasks
     - Completed tasks
   - Verify the list updates accordingly

5. **Sorting Tasks**
   - Use the sort dropdown to change the order:
     - Newest First
     - Oldest First
     - Alphabetical
   - Verify the tasks are reordered correctly

6. **Persistence**
   - Add some tasks
   - Refresh the page
   - Verify your tasks are still there

## Built With

- React
- TypeScript
- Create React App
- localStorage for data persistence

## License

This project is licensed under the MIT License.
