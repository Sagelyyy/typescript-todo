import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { nanoid } from "nanoid";
import "../styles/Note.css";

interface NoteInterface {
  notes: {
    text: string;
    id: string;
  }[];
  id: string;
  color: string;
}

export default function Note() {
  const [notes, setNotes] = useState([
    {
      notes: [
        {
          text: "Hello World",
          id: nanoid(),
        },
      ],
      id: nanoid(),
      color: "transparent",
    },
  ]);

  function newNote() {
    const newNote = {
      notes: [{ text: "", id: nanoid() }],
      id: nanoid(),
      color: "#242424",
    };
    setNotes([...notes, newNote]);
  }

  function deleteNote(id: string) {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes([...filtered]);
  }

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

  function handleChange(e: React.FormEvent<HTMLInputElement>, id: string) {
    const { value } = e.currentTarget;
    const currentIndex = notes.findIndex(
      (item) => item.notes.findIndex((innerNote) => innerNote.id === id) !== -1
    );
    const updatedNotes = { ...notes[currentIndex] };
    const innerNotesIndex = updatedNotes.notes.findIndex(
      (innerNote) => innerNote.id === id
    );
    updatedNotes.notes[innerNotesIndex] = {
      ...updatedNotes.notes[innerNotesIndex],
      text: value,
    };
    const newNotes = [
      ...notes.slice(0, currentIndex),
      updatedNotes,
      ...notes.slice(currentIndex + 1),
    ];
    setNotes(newNotes);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, id: string) {
    if (e.key == "Enter") {
      const currentIndex = notes.findIndex((item) => item.id == id);
      const filtered = notes.find((note) => note.id == id);
      filtered?.notes.push({ text: "", id: nanoid() });
      if (filtered) {
        const newNotes = [
          ...notes.slice(0, currentIndex),
          filtered,
          ...notes.slice(currentIndex + 1),
        ];
        setNotes(newNotes);
      }
    }
  }

  function dragHandler(e: React.DragEvent<HTMLDivElement>, id: string) {
    // const currentIndex = notes.findIndex((note) => note.id == id);
    // const newNotes = [
    //   ...notes.slice(0, currentIndex),
    //   updatedNotes,
    //   ...notes.slice(currentIndex + 1),
    // ];
    // setNotes(newNotes);
    console.log(id);
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, id: string) {
    console.log(e);
  }

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="note-content">
      <span className="add material-symbols-outlined" onClick={() => newNote()}>
        add
      </span>
      {notes &&
        notes.map((note: NoteInterface) => {
          return (
            <div
              draggable
              key={note.id}
              className="note-container"
              style={{ backgroundColor: note.color }}
            >
              <div className="controls">
                <ColorPicker
                  handleColor={handleColor}
                  id={note.id}
                  currentColor={note.color}
                />
                <span
                  onClick={() => deleteNote(note.id)}
                  className="trash material-symbols-outlined"
                >
                  close
                </span>
              </div>
              {note.notes.map((item) => (
                <input
                  autoFocus
                  onKeyDown={(e) => handleKeyDown(e, note.id)}
                  onChange={(e) => handleChange(e, item.id)}
                  className="note"
                  key={item.id}
                  value={item.text}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
}
