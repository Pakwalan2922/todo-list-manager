import React from 'react';
import CategoryManager from './features/categories/CategoryManager';
import TaskManager from './features/tasks/TaskManager';

function App() {
  return (
    <div className="max-w-[1000px] container mx-auto p-4">
      <h1 className="text-[40px] font-bold mb-8">To-Do List Manager</h1>
      <CategoryManager />
      <TaskManager />
    </div>
  );
}

export default App;