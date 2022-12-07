import React, { useState } from "react";
import { Note, NoteDetails } from "../../models/note";
import Checkbox from "../inputs/checkbox/checkbox";
import Textbox from "../inputs/textbox/textbox";
import NotesList from "../notesList/notesList";
import "./app.css";

export const classNames = {
	app: "app",
	manageNotes: "manage-notes",
	toggleCompleteAllNotes: "toggle-complete-all-notes",
	createNoteContentInput: "create-note-content-input",
	appWrapper: "app-wrapper",
};

export function App(): JSX.Element {
	const [notes, setNotes] = useState<Note[]>([]);

	function onNoteUpdated(
		updatedNoteId: string,
		updatedNoteDetails: Partial<NoteDetails>,
	) {
		if (updatedNoteDetails.content === "") {
			onRemoveNotes([updatedNoteId]);
		} else {
			setNotes(
				notes.map(note => {
					return note.id === updatedNoteId
						? { ...note, ...updatedNoteDetails }
						: note;
				}),
			);
		}
	}

	function onRemoveNotes(noteIdsToRemove: string[]) {
		setNotes(
			notes.filter(note => {
				return !noteIdsToRemove.includes(note.id);
			}),
		);
	}

	function onSubmitNewNote(noteContent: string) {
		if (noteContent === "") {
			return;
		}

		const newNote = new Note({ content: noteContent, isComplete: false });
		setNotes([...notes, newNote]);
	}

	function onToggleCompleteAllChange() {
		const areAllNotesComplete =
			notes.length && notes.every(note => note.isComplete);

		setNotes(
			notes.map(note => ({
				...note,
				isComplete: !areAllNotesComplete,
			})),
		);
	}

	return (
		<div className={classNames.appWrapper}>
			<div className={classNames.app}>
				<h1>TODOS</h1>
				<div className={classNames.manageNotes}>
					{notes.length > 0 && (
						<div className={classNames.toggleCompleteAllNotes}>
							<Checkbox
								isChecked={
									notes.length &&
									notes.every(note => note.isComplete)
								}
								onChange={onToggleCompleteAllChange}
							/>
						</div>
					)}
					<div className={classNames.createNoteContentInput}>
						<Textbox
							defaultValue=""
							onSubmit={onSubmitNewNote}
							clearValueAfterSubmit={true}
							placeholderText={"Describe here the task to do..."}
						/>
					</div>
				</div>
				<NotesList
					notes={notes}
					onNoteUpdated={onNoteUpdated}
					onRemoveNotes={onRemoveNotes}
				/>
			</div>
		</div>
	);
}

export default App;
