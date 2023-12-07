import {useState} from "react";
import {motion} from "framer-motion";

export function UploadButton() {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={"relative flex flex-col items-center justify-center"}>
			<button
				disabled={true}
				className="bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded transition duration-700 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"
				onMouseOver={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				Upload
			</button>
			<motion.div
				className={`noFilesNotification mt-2 text-sm text-white bg-neutral-500 p-2 rounded text-center`}
				initial={{opacity: 0}}
				animate={{
					opacity: isHovered ? 1 : 0,
					y: isHovered ? 0 : -3,
					display: "block",
					transitionEnd: {
						display: isHovered ? "block" : "none",
					}
				}}
				transition={{duration: 0.3, ease: "easeInOut"}}
			>
				No files selected
			</motion.div>
		</div>
	);
}