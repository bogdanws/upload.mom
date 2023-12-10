"use client";
import "./Upload.scss";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadMethods} from "@/app/_components/UploadMethods";
import React, {useCallback, useEffect, useState} from "react";
import {UploadContainer} from "@/app/_components/UploadContainer";
import {FileDisplay} from "@/app/_components/FileDisplay";
import {AnimatePresence} from "framer-motion";
import {UploadSteps} from "@/app/_components/UploadSteps";

export function Upload() {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [uploadStep, setUploadStep] = useState<UploadSteps>(UploadSteps.UploadMethods);

	// If there are no files, go back to the upload methods
	useEffect(() => {
		if (uploadedFiles.length === 0) {
			setUploadStep(UploadSteps.UploadMethods);
		}
	}, [uploadedFiles]);

	const addFiles = useCallback((files: File[]) => {
		if (files.length === 0) return;

		// check old files to make sure none have the same name
		const newFiles = files.filter(file => !uploadedFiles.some(oldFile => oldFile.name === file.name)) // filter out files with the same name
			.filter(file => file.size !== 0 && file.size < 1000000000); // filter out files that are too large or empty

		setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
		setUploadStep(UploadSteps.ViewFiles);
	}, [uploadedFiles]);

	const deleteFile = useCallback((file: File) => {
		setUploadedFiles(prevFiles => prevFiles.filter(f => f !== file));
	}, []);

	return (
		<UploadContainer addFiles={addFiles}>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{uploadStep === UploadSteps.UploadMethods && <>
				{uploadedFiles.length === 0 &&
					<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
				<UploadMethods uploadedFiles={uploadedFiles} addFiles={addFiles} setUploadStep={setUploadStep}/>
				{uploadedFiles.length > 0 &&
					<PrimaryActionButton text={"View files"} onClick={() => setUploadStep(UploadSteps.ViewFiles)}/>}
			</>}
			{uploadStep === UploadSteps.ViewFiles && <>
				<div className="w-full flex flex-row items-center justify-between">
					<p className="text-neutral-200 text-center">Click on a file to <span className="text-red-300">remove</span> it
					</p>
					<PrimaryActionButton text={"Add more"} onClick={() => setUploadStep(UploadSteps.UploadMethods)}/>
				</div>
				{/*	show all files*/}
				<ul
					className={"w-full my-2 flex-1 overflow-y-scroll overflow-x-hidden relative"}>
					<AnimatePresence mode="popLayout">
						{uploadedFiles.map((file, index) =>
							<FileDisplay key={file.name} onClick={() => deleteFile(file)} file={file}/>
						)}
					</AnimatePresence>
				</ul>
				<PrimaryActionButton text={"Upload"}/>
			</>}
		</UploadContainer>
	);
}

