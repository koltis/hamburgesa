import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DraggableComponent } from './dragableComponent';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
function App() {
  return (
    <>
      <DndProvider backend={Backend}>
        <DraggableComponent />
      </DndProvider>
    </>
  );
}

export default App;
