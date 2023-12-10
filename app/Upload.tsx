"use client";
import "./Upload.scss";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadMethods} from "@/app/UploadMethods";
import React, {useEffect, useState} from "react";
import {UploadContainer} from "@/app/UploadContainer";
import {BsFileEarmarkBinaryFill} from "react-icons/bs";

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
						<div key={index}
						     className="flex flex-row items-center justify-between p-2 m-1 rounded-lg bg-neutral-700 text-neutral-100 hover:text-red-500 transition-all duration-300"
						     onClick={() => {
							     const newFiles = [...uploadedFiles];
							     newFiles.splice(index, 1);
							     setUploadedFiles(newFiles);
						     }}>
							<div className="flex flex-row items-center">
								{file.type.includes("image") &&
									<img src={URL.createObjectURL(file)} alt={file.name} className="w-10 h-10 rounded-full"/>}
								{!file.type.includes("image") && <div
									className="w-10 h-10 rounded-full bg-neutral-500 text-neutral-200 flex items-center justify-center">
									<BsFileEarmarkBinaryFill size={20}/>
								</div>}
								<p className="ml-2 font-semibold">{file.name}</p>
							</div>
							<p className="text-neutral-200 ml-2">{convertBytes(file.size)}</p>
						</div>
					)}
				</div>
			</>}
		</UploadContainer>
	)
		;
}

function convertBytes(bytes: number) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	if (bytes === 0) {
		return "n/a";
	}

	const i = Math.floor(Math.log(bytes) / Math.log(1024));

	if (i === 0) {
		return `${bytes} ${sizes[i]}`;
	}

	return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}