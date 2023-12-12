import {BsCameraFill, BsDisplayFill, BsFolderFill, BsLink45Deg, BsMicFill} from "react-icons/bs";
import React from "react";
import {UploadSteps} from "./UploadSteps";

export const UploadMethods = React.memo(function UploadMethods(props: {
	uploadedFiles: File[],
	addFiles: (files: File[]) => void,
	setUploadStep: (step: UploadSteps) => void,
}) {
	function goToStep(step: UploadSteps) {
		props.setUploadStep(step);
	}

	return <div id={"uploadMethodsContainer"}>
		<p className="text-neutral-200 text-center"><span
			className={"font-semibold text-blue-200"}>Drag and drop</span> your files here, or import from:</p>
		<div className={"flex flex-row items-stretch justify-center flex-wrap m-5"}>
			<UploadComputer addFiles={props.addFiles}/> {/* TODO: Refactor for consistency */}
			<Button Icon={BsLink45Deg} text={"Link"} onClick={() => goToStep(UploadSteps.UploadLink)}/>
			<Button Icon={BsCameraFill} text={"Camera"} onClick={() => goToStep(UploadSteps.UploadCamera)}/>
			<Button Icon={BsDisplayFill} text={"Screen recording"} onClick={() => goToStep(UploadSteps.UploadScreen)}/>
			<Button Icon={BsMicFill} text={"Audio recording"} onClick={() => goToStep(UploadSteps.UploadMicrophone)}/>
		</div>
	</div>;
});

function Button({Icon, text, onClick}: { Icon: any, text: string, onClick: () => void }) {
	return <button
		onClick={onClick}
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24">
		<Icon size={20}/>
		<span className="opacity-75 mt-2">{text}</span>
	</button>;
}

type UploadProps = {
	addFiles: (files: File[]) => void;
}

export function UploadComputer({addFiles}: UploadProps) {
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		// programmatically click the hidden file input on button click
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			// update the uploadedFiles state with the selected files
			addFiles(Array.from(event.target.files));
		}
	};

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				style={{display: 'none'}}
				multiple
				onChange={handleFileChange}
			/>
			<Button Icon={BsFolderFill} text={"Your computer"} onClick={handleButtonClick}/>
		</>
	);
}