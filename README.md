# React + Vite TODO App

This project is a TODO application built with React and Vite. It uses IndexedDB for offline storage and a service worker for offline capabilities.

## Setup

### Prerequisites

- Node.js (version 14 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/pwaTODO_Vite.git
   cd pwaTODO_Vite 
   ```
2. Install the dependencies:
   ```sh 
   npm install 
   ```

### Running the App

To start the development server:
```sh
npm run dev
```

## Functionality

### Adding a Todo
- Enter the text for the new todo in the input field.
- Select the priority of the new todo from the dropdown menu (Urgent, Normal, Low).
- Click the "Add" button to add the new todo to the list.

### Updating Todo Priority
- Hover over a todo item to reveal the priority dropdown menu.
- Select a new priority from the dropdown menu to update the todo's priority.

### Toggling Todo Completion
- Click the checkbox next to a todo item to toggle its completion status.
- Completed todos are shown with a line-through style.

### Deleting a Todo
- Completed todos have a "Delete" button.
- Click the "Delete" button to remove the todo from the list.

## Offline Capabilities

### IndexedDB
- Todos are stored in IndexedDB for offline access.
- When the app is loaded, todos are fetched from IndexedDB.

### Service Worker
- The service worker caches the app's assets for offline access.
- When the app is offline, cached assets are served to ensure the app remains functional.

