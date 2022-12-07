import React from "react";
import "./button.css";

interface ButtonProps extends React.PropsWithChildren {
	isSelected?: boolean;
	onClick(): void;
}

export function Button({
	onClick,
	children,
	isSelected,
}: ButtonProps): JSX.Element {
	const classNames = ["button"];

	if (isSelected) {
		classNames.push("selected");
	}
	const className = classNames.join(" ");

	return (
		<button onClick={onClick} className={className}>
			{children}
		</button>
	);
}

export default Button;
