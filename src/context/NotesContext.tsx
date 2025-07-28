import React from "react";
import { Note } from "../types/note";

type NotesContextType = {
  notes: Note[];
  addNote: (text: string) => void;
  removeNote: (id: string) => void;
  editNote: (id: string, newText: string) => void;
}

const NotesContext = React.createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = React.useState<Note[]>([]);

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Math.random().toString(),
      text,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  const removeNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

 const editNote = (id: string, newText: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, editNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}