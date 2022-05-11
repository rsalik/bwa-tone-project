import { useState } from 'react';
import { MACHINE_LENGTH, notes as globalNotes, toggleNote } from '../music';

export default function MachineRow(props: { note: string; activeColumn?: number }) {
  const [notes, setNotes] = useState(globalNotes[props.note]);

  function updateNote(i: number) {
    console.log(props.note + ' ' + i);
    let newArr = [...notes];
    newArr[i] = !notes[i];

    setNotes(newArr);
    toggleNote(props.note, i);
  }

  return (
    <div className={`row ${props.note.includes('#') ? 'sharp' : 'natural'}`}>
      <div className="inner">
        <div className="note-name">{props.note}</div>
        {[...Array(MACHINE_LENGTH)].map((v, i) => {
          return (
            <div
              className={`cell ${notes[i] ? 'on' : ''} ${props.activeColumn === i ? 'active' : ''}`}
              key={i}
              onClick={() => updateNote(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
