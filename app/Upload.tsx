import "./Upload.scss";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadMethods} from "@/app/UploadMethods";
import React, {useState} from "react";
import {UploadContainer} from "@/app/UploadContainer";

export function Upload({}) {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	return (
		<UploadContainer setUploadedFiles={setUploadedFiles}>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{uploadedFiles.length === 0 &&
				<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
			<UploadMethods uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
			{uploadedFiles.length > 0 && <PrimaryActionButton text={"Upload"}/>}
		</UploadContainer>
	);
}

