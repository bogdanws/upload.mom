import {BsCameraFill, BsDisplayFill, BsFolderFill, BsLink45Deg, BsMicFill} from "react-icons/bs";
import React, {useState} from "react";

interface UploadProps {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export function UploadComputer({uploadedFiles, setUploadedFiles}: UploadProps) {
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		// programmatically click the hidden file input on button click
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			// update the uploadedFiles state with the selected files
			setUploadedFiles([...uploadedFiles, ...Array.from(event.target.files)]);
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

function LinkInputPopup({ setUrl, handleButtonClick }: { setUrl: React.Dispatch<React.SetStateAction<string>>, handleButtonClick: () => void }) {
	return (
		<div className="inset-0 flex items-center justify-center transform bg-white p-5 rounded-lg shadow-md">
			<input
				type="text"
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter file URL"
			/>
			<button onClick={handleButtonClick}>
				<BsLink45Deg size={20}/>
				<span className="opacity-75 mt-2">Link</span>
			</button>
		</div>
	);
}

export function UploadLink({uploadedFiles, setUploadedFiles}: UploadProps) {
	const [url, setUrl] = useState('');
	const [showPopup, setShowPopup] = useState(false);

	const handleButtonClick = async () => {
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			const file = new File([blob], 'downloadedFile');
			setUploadedFiles([...uploadedFiles, file]);
			setShowPopup(false);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	return (
		<>
			<button
				className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24"
				onClick={() => setShowPopup(true)}
			>
				<BsLink45Deg size={20}/>
				<span className="opacity-75 mt-2">Link</span>
			</button>
			{showPopup && <LinkInputPopup setUrl={setUrl} handleButtonClick={handleButtonClick} />}
		</>
	);
}

export function UploadCamera({uploadedFiles, setUploadedFiles}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsCameraFill size={20}/>
		<span className="opacity-75 mt-2">Camera</span>
	</button>;
}

export function UploadScreen({uploadedFiles, setUploadedFiles}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsDisplayFill size={20}/>
		<span className="opacity-75 mt-2">Screen recording</span>
	</button>;
}

export function UploadMicrophone({uploadedFiles, setUploadedFiles}: UploadProps) {
	return <button
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<BsMicFill size={20}/>
		<span className="opacity-75 mt-2">Audio recording</span>
	</button>;
}