import {useState} from "react";
import {PopupNotification} from "@/components/PopupNotification";

export function UploadButton({uploadedFiles}: { uploadedFiles: File[] }) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	// make the button disabled if there are no files selected
	const isDisabled = uploadedFiles.length === 0;

	return (
		<div className={"relative flex flex-col items-center justify-center"}>
			<button
				disabled={isDisabled}
				className={"bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded " +
					"transition duration-700 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"}
				onMouseOver={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				Upload
			</button>
			{isDisabled && <PopupNotification text={"No files selected"} show={isHovered}/>}
		</div>
	);
}