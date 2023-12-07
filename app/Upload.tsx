import "./Upload.scss";
import {UploadButton} from "@/app/UploadButton";
import {UploadCamera, UploadComputer, UploadLink, UploadMicrophone, UploadScreen} from "@/app/UploadMethods";
import {useState} from "react";

export function Upload({}) {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	return (
		<div className="uploadOuterContainer p-1 bg-neutral-800 rounded flex flex-col items-center justify-center relative">
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{/* Content: */}
			<div
				className="uploadInnerContainer p-7 border-2 border-neutral-500 border-dotted rounded flex flex-col items-center justify-center">
				<div>
					<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>
					<p className="text-neutral-200 text-center"><span
						className={"font-semibold text-blue-200"}>Drag and drop</span> your files here, or import from:</p>
					<div className={"flex flex-row items-stretch justify-center flex-wrap m-5"}>
						<UploadComputer/>
						<UploadLink/>
						<UploadCamera/>
						<UploadScreen/>
						<UploadMicrophone/>
					</div>
				</div>
				<UploadButton/>
			</div>
		</div>
	);
}