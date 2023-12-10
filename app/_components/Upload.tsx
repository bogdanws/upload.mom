"use client";
import "./Upload.scss";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadMethods} from "@/app/_components/UploadMethods";
import React, {useEffect, useState} from "react";
import {UploadContainer} from "@/app/_components/UploadContainer";
import {FileDisplay} from "@/app/_components/FileDisplay";

enum UploadStep {
	UploadMethods,
	ViewFiles,
}

export function Upload() {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [uploadStep, setUploadStep] = useState<UploadStep>(UploadStep.UploadMethods);
	useEffect(() => {
		if (uploadedFiles.length === 0) {
			setUploadStep(UploadStep.UploadMethods);
		}
	}, [uploadedFiles]);

	function addFiles(files: File[]) {
		console.log("Adding files", files);
		// check old files to make sure none have the same name
		const newFiles = files.filter(file => !uploadedFiles.some(oldFile => oldFile.name === file.name));
		setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
		setUploadStep(UploadStep.ViewFiles);
	}

	function deleteFile(file: File) {
		setUploadedFiles(prevFiles => prevFiles.filter(f => f !== file));
	}

	return (
		<UploadContainer addFiles={addFiles}>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{uploadStep === UploadStep.UploadMethods && <>
				{uploadedFiles.length === 0 &&
					<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
				<UploadMethods uploadedFiles={uploadedFiles} addFiles={addFiles}/>
				{uploadedFiles.length > 0 &&
					<PrimaryActionButton text={"Next"} onClick={() => setUploadStep(UploadStep.ViewFiles)}/>}
			</>}
			{uploadStep === UploadStep.ViewFiles && <>
				<PrimaryActionButton text={"Upload"}/>
				{/*	show all files*/}
				<div className={"flex flex-col items-stretch justify-between w-full"}>
					{uploadedFiles.map((file, index) =>
						<FileDisplay key={index} onClick={() => deleteFile(file)} file={file}/>
					)}
				</div>
			</>}
		</UploadContainer>
	);
}

