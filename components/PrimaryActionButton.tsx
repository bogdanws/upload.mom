"use client";
import React, {useState} from "react";
import {PopupNotification} from "@/components/PopupNotification";
import Link from "next/link";

type PrimaryActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string,
	url?: string,
	isDisabled?: boolean,
	disabledPopup?: string,
};

export function PrimaryActionButton({text, url, isDisabled, disabledPopup, ...props}: PrimaryActionButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const button = <button
		disabled={isDisabled}
		className={"bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded " +
			"transition duration-500 ease-in-out transform hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"}
		onMouseOver={handleMouseEnter}
		onFocus={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
		{...props}
	>
		{text}
	</button>;

	return (
		<div className={"flex flex-col items-center justify-center bottom-8"}>
			{url ? <Link href={url}>{button}</Link> : button}
			{isDisabled && disabledPopup && disabledPopup.length > 0 &&
				<PopupNotification text={disabledPopup} show={isHovered}/>}
		</div>
	);
}