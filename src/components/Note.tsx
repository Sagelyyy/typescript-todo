import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { nanoid } from "nanoid";
import "../styles/Note.css";

interface NoteInterface {
  note: string;
  id: string;
  color: string;
}

export default function Note() {
  const [notes, setNotes] = useState([
    {
      note: "Hello World",
      id: nanoid(),
      color: "#242424",
    },
    {
      note: "Hello Amanda",
      id: nanoid(),
      color: "#242424",
    },
    {
      note: "Hello nova",
      id: nanoid(),
      color: "#242424",
    },
  ]);

  function handleColor(color: string, id: string) {
    // Find index of the selected note
    const currentIndex = notes.findIndex((note) => note.id == id);
    // Create a copy using Object.assign
    const updatedNotes = Object.assign({}, notes[currentIndex]);
    // Update the new Object to the new color
    updatedNotes.color = color;
    // Create a new array with all the notes before the selected note,
    // Then pass in the new updated note
    // Then pass in all the notes after that
    const newNotes = [
      ...notes.slice(0, currentIndex),
      updatedNotes,
      ...notes.slice(currentIndex + 1),
    ];
    // Set the notes to the updated array
    setNotes(newNotes);
  }

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div>
      {notes &&
        notes.map((note: NoteInterface) => {
          return (
            <div
              key={note.id}
              className="note-container"
              style={{ backgroundColor: note.color }}
            >
              <input className="note" type="text" value={note.note} />
              <ColorPicker handleColor={handleColor} id={note.id} />
            </div>
          );
        })}
    </div>
  );
}
