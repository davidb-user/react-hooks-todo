import React from "react";
import { Note } from "../models/note";

interface INotesContext {
	notes: Note[];
}

const NotesContext = React.createContext<INotesContext>({ notes: [] });

export default NotesContext;
