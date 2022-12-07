import React from "react";
import "./checkbox.css";

interface CheckboxProps {
	isChecked: boolean;

	onChange(newValue: boolean): void;
}

export function Checkbox(props: CheckboxProps): JSX.Element {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.target.checked);
	};

	const { isChecked } = props;
	return (
		<div className="checkbox-wrapper">
			<input
				type={"checkbox"}
				className="checkbox"
				checked={isChecked}
				onChange={onChange}
			/>
			{isChecked === true && <span className="checkmark">✔️</span>}
		</div>
	);
}

export default Checkbox;
