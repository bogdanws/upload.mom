import React, {useCallback, useContext, useState} from "react";
import {UploadContext} from "@/app/upload/UploadContext";

export function UploadContainer({children}: { children: React.ReactNode }) {
	const {dispatch} = useContext(UploadContext);
	const [isDragging, setIsDragging] = useState(false);

	// Prevent default behavior when dragging files over the window
	const dragOverHandler = useCallback((event: React.DragEvent) => {
		event.preventDefault();
	}, []);

	// Set isDragging to true when the mouse pointer enters the container
	const dragEnterHandler = useCallback(() => {
		setIsDragging(true);
	}, []);

	// Set isDragging to false when the mouse pointer leaves the container
	const dragLeaveHandler = useCallback((event: React.DragEvent) => {
		// If the mouse pointer is entering a child element, do not execute the rest of the code
		if (event.currentTarget.contains(event.relatedTarget as Node)) {
			return;
		}
		setIsDragging(false);
	}, []);

	const dropHandler = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		setIsDragging(false);

		if (event.dataTransfer.items) {
			const files = Array.from(event.dataTransfer.items)
				.filter((item) => item.kind === 'file') // Only accept files
				.map((item) => item.getAsFile()) // Convert DataTransferItem to File
				.filter((file): file is File => file !== null); // Remove null values

			// add files to the upload context
			dispatch({type: 'ADD_FILES', files});
		}
	}, [dispatch]);

	return <div
		className={"absolute w-full h-full inset-0 overflow-hidden flex items-center justify-center flex-col bg-neutral-900"}>
		<div
			className={`uploadOuterContainer p-1 ${isDragging ? 'bg-gray-800' : 'bg-neutral-800'} transition duration-300 rounded flex flex-col items-center justify-center relative`}
			onDragOver={dragOverHandler}
			onDrop={dropHandler}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			role={"menu"}
			tabIndex={0}
		>
			<div
				className={`uploadInnerContainer p-7 pt-4 border-2 ${isDragging ? 'border-blue-500' : 'border-neutral-500'} border-dotted rounded transition duration-300 flex flex-col items-center justify-center`}>
				{children}
			</div>
		</div>
	</div>;
}