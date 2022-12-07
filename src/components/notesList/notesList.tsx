import React, { useState } from "react";
import { Note as NoteModel, NoteDetails, NoteId } from "../../models/note";
import Button from "../inputs/button/button";
import Note from "../note/note";
import "./notesList.css";

export enum NotesFilter {
	All = "all",
	Active = "active",
	Completed = "completed",
}

interface NotesListProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>,
	) => void;
	onRemoveNotes: (noteIds: NoteId[]) => void;
	notes: NoteModel[];
}

export const classNames = {
	notesList: "notes-list",
	notes: "notes",
	notesManagement: "notes-management",
	notesInfo: "notes-info",
	notesFilterButtons: "notes-filter-buttons",
	clearCompletedNotesButton: "clear-completed-notes-button",
};

export function NotesList({
	notes,
	onNoteUpdated,
	onRemoveNotes,
}: NotesListProps): JSX.Element {
	const [activeFilter, setActiveFilter] = useState(NotesFilter.All);

	const getFilteredNotes = (
		activeFilter: NotesFilter,
		notes: NoteModel[],
	) => {
		return notes.filter(note => {
			if (
				(activeFilter === NotesFilter.Active && note.isComplete) ||
				(activeFilter === NotesFilter.Completed && !note.isComplete)
			) {
				return false;
			}

			return true;
		});
	};

	const onClearCompletedNotes = () => {
		const completedNotes = notes.filter(note => note.isComplete);
		onRemoveNotes(completedNotes.map(note => note.id));
	};

	const getFilterButtons = (activeFilter: NotesFilter): React.ReactNode => {
		return Object.entries(NotesFilter).map(
			([filterEnumKey, filterEnumValue]) => {
				return (
					<span key={filterEnumValue} className={filterEnumValue}>
						<Button
							isSelected={activeFilter === filterEnumValue}
							onClick={() => setActiveFilter(filterEnumValue)}
						>
							{filterEnumKey}
						</Button>
					</span>
				);
			},
		);
	};

	const filteredNotes = getFilteredNotes(activeFilter, notes);

	const completedNotesLength = notes.filter(note => !note.isComplete).length;

	return (
		<div className={classNames.notesList}>
			<div role={"list"} className={classNames.notes}>
				<div role={"listitem"}>
					{filteredNotes.map(note => (
						<Note
							key={note.id}
							note={note}
							onNoteUpdated={onNoteUpdated}
							onRemoveNote={noteId => onRemoveNotes([noteId])}
						/>
					))}
				</div>
			</div>
			{notes.length > 0 && (
				<div className={classNames.notesManagement}>
					<div className={classNames.notesInfo}>
						<span>
							{completedNotesLength} item
							{completedNotesLength === 1 ? "" : "s"} left
						</span>
					</div>
					<div className={classNames.notesFilterButtons}>
						{getFilterButtons(activeFilter)}
					</div>
					<div className={classNames.clearCompletedNotesButton}>
						{notes.filter(note => note.isComplete).length !== 0 && (
							<Button onClick={onClearCompletedNotes}>
								Clear completed
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default NotesList;
