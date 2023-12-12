import {useState} from "react";
import {PopupNotification} from "./PopupNotification";

type PrimaryActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string,
	isDisabled?: boolean,
	disabledPopup?: string,
};

export function PrimaryActionButton({text, isDisabled, disabledPopup, ...props}: PrimaryActionButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={"flex flex-col items-center justify-center bottom-8"}>
			<button
				disabled={isDisabled}
				className={"bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded " +
					"transition duration-700 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"}
				onMouseOver={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				{text}
			</button>
			{isDisabled && disabledPopup && disabledPopup.length > 0 &&
				<PopupNotification text={disabledPopup} show={isHovered}/>}
		</div>
	);
}