"use client";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadMethods} from "@/app/(upload)/UploadMethods";
import React, {useContext, useEffect, useState} from "react";
import {File, FileList} from "@/app/(upload)/FileList";
import {UploadSteps} from "@/app/(upload)/UploadSteps";
import {UploadContext} from "@/app/(upload)/UploadContext";

export default function Upload() {
	const {state, dispatch} = useContext(UploadContext);
	const [uploadStep, setUploadStep] = useState<UploadSteps>(UploadSteps.UploadMethods);

	// If there are no files, go back to the upload methods
	useEffect(() => {
		if (state.length === 0) {
			setUploadStep(UploadSteps.UploadMethods);
		}
	}, [state]);

	// TODO: Refactor
	const addFiles = (files: File[]) => dispatch({type: "ADD_FILES", files});

	return (
		<>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{uploadStep === UploadSteps.UploadMethods && <>
				{state.length === 0 &&
					<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
				<UploadMethods addFiles={addFiles} setUploadStep={setUploadStep}/>
				{state.length > 0 &&
					<PrimaryActionButton text={"View files"} onClick={() => setUploadStep(UploadSteps.ViewFiles)}/>}
			</>}
			{uploadStep === UploadSteps.ViewFiles && <FileList onClick={() => setUploadStep(UploadSteps.UploadMethods)}/>}
			{uploadStep === UploadSteps.UploadLink && <>
				<p className="m-5 text-2xl text-neutral-100 text-center font-semibold">Upload from a link</p>
				<div className={"w-2/3 max-sm:w-full flex flex-row max-sm:flex-col items-center justify-center flex-1"}>
					<input
						type="text"
						className="w-full bg-gray-700 text-white rounded p-2 m-2 mr-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Direct link to file"
					/>
					<PrimaryActionButton text={"Upload"}/>
				</div>
				<PrimaryActionButton text={"Back"} onClick={() => setUploadStep(UploadSteps.UploadMethods)}/>
			</>}
		</>
	);
}

