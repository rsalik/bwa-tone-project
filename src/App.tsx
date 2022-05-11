import React, { useCallback } from 'react';
import './App.css';
import ColumnLabels from './components/ColumnLabels';
import MachineRow from './components/MachineRow';
import { NOTES, start as toggleStart } from './music';

function App() {
  const [activeColumn, setActiveColumn] = React.useState(undefined as number | undefined);
  const [playing, setPlaying] = React.useState(false);

  const onPlayColumn = useCallback((column: number) => {
    setActiveColumn(column);
  }, []);

  return (
    <div className="App">
      <div className="machine">
        <ColumnLabels />
        {NOTES.map((note) => {
          return <MachineRow note={note} activeColumn={activeColumn} key={note} />;
        })}
      </div>
      <br />
      <div
        className="btn"
        onClick={() => {
          setPlaying(!playing);
          toggleStart(onPlayColumn);
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </div>
    </div>
  );
}

export default App;
