import {BsCameraFill, BsDisplayFill, BsFolderFill, BsLink45Deg, BsMicFill} from "react-icons/bs";
import React, {useState} from "react";

export const UploadMethods = React.memo((props: {
	uploadedFiles: File[],
	setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
	setUploadStep: React.Dispatch<React.SetStateAction<number>>
}) => {
	return <div id={"uploadMethodsContainer"}>
		<p className="text-neutral-200 text-center"><span
			className={"font-semibold text-blue-200"}>Drag and drop</span> your files here, or import from:</p>
		<div className={"flex flex-row items-stretch justify-center flex-wrap m-5"}>
			<UploadComputer uploadedFiles={props.uploadedFiles} setUploadedFiles={props.setUploadedFiles} setUploadStep={props.setUploadStep}/>
			<UploadLink uploadedFiles={props.uploadedFiles} setUploadedFiles={props.setUploadedFiles} setUploadStep={props.setUploadStep}/>
			<UploadCamera uploadedFiles={props.uploadedFiles} setUploadedFiles={props.setUploadedFiles} setUploadStep={props.setUploadStep}/>
			<UploadScreen uploadedFiles={props.uploadedFiles} setUploadedFiles={props.setUploadedFiles} setUploadStep={props.setUploadStep}/>
			<UploadMicrophone uploadedFiles={props.uploadedFiles} setUploadedFiles={props.setUploadedFiles} setUploadStep={props.setUploadStep}/>
		</div>
	</div>;
});

type UploadProps = {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
	setUploadStep: React.Dispatch<React.SetStateAction<number>>;
}

export function UploadComputer({uploadedFiles, setUploadedFiles, setUploadStep}: UploadProps) {
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		// programmatically click the hidden file input on button click
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			// update the uploadedFiles state with the selected files
			setUploadedFiles([...uploadedFiles, ...Array.from(event.target.files)]);
			setUploadStep(1);
		}
	};

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				multiple
				onChange={handleFileChange}
			/>
			<button
				className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24"
				onClick={handleButtonClick}
			>
				<BsFolderFill size={20}/>
				<span className="opacity-75 mt-2">Your computer</span>
			</button>
		</>
	);
}

export function UploadLink({uploadedFiles, setUploadedFiles, setUploadStep}: UploadProps) {
	const [url, setUrl] = useState('');

	const handleButtonClick = async () => {
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			const file = new File([blob], 'downloadedFile');
			setUploadedFiles([...uploadedFiles, file]);
			setUploadStep(1);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	return (
		<>
			<button
				className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24"
			>
				<BsLink45Deg size={20}/>
				<span className="opacity-75 mt-2">Link</span>
			</button>
		</>
	);
}

export function UploadCamera({uploadedFiles, setUploadedFiles, setUploadStep}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsCameraFill size={20}/>
		<span className="opacity-75 mt-2">Camera</span>
	</button>;
}

export function UploadScreen({uploadedFiles, setUploadedFiles, setUploadStep}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsDisplayFill size={20}/>
		<span className="opacity-75 mt-2">Screen recording</span>
	</button>;
}

export function UploadMicrophone({uploadedFiles, setUploadedFiles, setUploadStep}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsMicFill size={20}/>
		<span className="opacity-75 mt-2">Audio recording</span>
	</button>;
}

