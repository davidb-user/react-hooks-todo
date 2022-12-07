import React, { useRef, useState } from "react";
import "./textbox.css";

interface TextProps {
	onSubmit(newValue: string): void;
	defaultValue?: string;
	doubleClickToEdit?: boolean;
	clearValueAfterSubmit?: boolean;
	placeholderText?: string;
}

export function Textbox(props: TextProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement>();
	const [value, setValue] = useState(props.defaultValue || "");
	const [editEnabled, setEditEnabled] = useState(!props.doubleClickToEdit);

	const onInputDoubleClick = () => {
		if (props.doubleClickToEdit) {
			setEditEnabled(true);
			setTimeout(() => {
				if (inputRef.current) {
					inputRef.current.focus();
					inputRef.current.select();
				}
			});
		}
	};

	const onSubmit = () => {
		if (props.doubleClickToEdit) {
			setEditEnabled(false);
		}

		props.onSubmit(value);

		if (props.clearValueAfterSubmit) {
			setValue("");
		}
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			onSubmit();
		}
	};

	const onChange = (newValue: string) => {
		setValue(newValue);
	};

	const classNames = ["text-input"];

	if (props.doubleClickToEdit) {
		classNames.push("border-on-focus");
	}

	return (
		<div
			className={classNames.join(" ")}
			onDoubleClick={onInputDoubleClick}
		>
			<input
				value={value}
				type={"text"}
				onChange={e => {
					onChange(e.target.value);
				}}
				onBlur={onSubmit}
				onKeyDown={onKeyDown}
				disabled={!editEnabled}
				ref={inputRef}
				autoFocus
				placeholder={props.placeholderText}
			/>
		</div>
	);
}

export default Textbox;
