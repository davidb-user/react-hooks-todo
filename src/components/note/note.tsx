import React from "react";
import { Note as NoteModel, NoteId, NoteDetails } from "../../models/note";
import Button from "../inputs/button/button";
import Checkbox from "../inputs/checkbox/checkbox";
import Textbox from "../inputs/textbox/textbox";
import "./note.css";

interface NoteProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>,
	) => void;
	onRemoveNote: (noteId: NoteId) => void;
	note: NoteModel;
}

export const classNames = {
	note: "note",
};

export function Note(props: NoteProps): JSX.Element {
	const { note } = props;

	const onCompleteStatusChange = (newValue: boolean) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			isComplete: newValue,
		};
		props.onNoteUpdated(note.id, updatedNoteDetails);
	};

	const onNoteContentChange = (noteContent: NoteModel["content"]) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			content: noteContent,
		};
		props.onNoteUpdated(note.id, updatedNoteDetails);
	};

	const onRemoveNote = () => {
		props.onRemoveNote(note.id);
	};

	return (
		<div className={classNames.note}>
			<Checkbox
				isChecked={note.isComplete}
				onChange={onCompleteStatusChange}
			/>
			<Textbox
				defaultValue={note.content}
				doubleClickToEdit={true}
				onSubmit={onNoteContentChange}
			/>
			<Button onClick={onRemoveNote}>🗑</Button>
		</div>
	);
}

export default Note;
