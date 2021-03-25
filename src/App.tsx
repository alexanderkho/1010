import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Board />
      </div>
    </DndProvider>
  );
}

export default App;
