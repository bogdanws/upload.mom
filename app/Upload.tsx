import "./Upload.scss";
import {UploadButton} from "@/components/UploadButton";
import {UploadCamera, UploadComputer, UploadLink, UploadMicrophone, UploadScreen} from "@/app/UploadMethods";
import {useCallback, useState} from "react";

export function Upload({}) {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	const dragOverHandler = useCallback((event: React.DragEvent) => {
		event.preventDefault();
	}, []);

	const dragEnterHandler = useCallback(() => {
		setIsDragging(true);
	}, []);

	const dragLeaveHandler = useCallback((event: React.DragEvent) => {
		if (event.currentTarget.contains(event.relatedTarget as Node)) {
			// If the mouse pointer is entering a child element, do not execute the rest of the code
			return;
		}
		setIsDragging(false);
	}, []);

	const dropHandler = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		setIsDragging(false);

		if (event.dataTransfer.items) {
			const files = Array.from(event.dataTransfer.items)
				.filter((item) => item.kind === 'file')
				.map((item) => item.getAsFile())
				.filter((file): file is File => file !== null);
			setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
		}
	}, []);

	return (
		<div
			className={`uploadOuterContainer p-1 ${isDragging ? 'bg-gray-800' : 'bg-neutral-800'} transition duration-300 rounded flex flex-col items-center justify-center relative`}
			onDragOver={dragOverHandler}
			onDrop={dropHandler}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
		>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			<div
				className={`uploadInnerContainer p-7 pt-4 border-2 ${isDragging ? 'border-blue-500' : 'border-neutral-500'} border-dotted rounded transition duration-300 flex flex-col items-center justify-center`}>
				{uploadedFiles.length === 0 &&
					<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
				<div id={"uploadMethodsContainer"}>
					<p className="text-neutral-200 text-center"><span
						className={"font-semibold text-blue-200"}>Drag and drop</span> your files here, or import from:</p>
					<div className={"flex flex-row items-stretch justify-center flex-wrap m-5"}>
						<UploadComputer uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
						<UploadLink uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
						<UploadCamera uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
						<UploadScreen uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
						<UploadMicrophone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
					</div>
				</div>
				{uploadedFiles.length > 0 && <UploadButton uploadedFiles={uploadedFiles}/>}
			</div>
		</div>
	);
}