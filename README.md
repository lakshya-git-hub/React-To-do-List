# Kanban Application

A modern task management application built with React, TypeScript, and Firebase. This application allows users to create and manage tasks using a Kanban board interface.

## Features

- User authentication (signup/login)
- Create and manage multiple boards
- Create lists and cards
- Drag and drop functionality for cards
- Add descriptions, due dates, and attachments to cards
- Responsive design for all devices
- Real-time updates using Firebase

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd kanban-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage

4. Configure Firebase:
   - Create a new file `src/config/firebase.ts`
   - Add your Firebase configuration:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Sign up for a new account or log in with existing credentials
2. Create a new board
3. Add lists to your board
4. Create cards within lists
5. Drag and drop cards between lists
6. Add details to cards (description, due date, attachments)

## Technologies Used

- React
- TypeScript
- Material-UI
- Firebase (Authentication, Firestore, Storage)
- React Beautiful DnD
- React Router

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 