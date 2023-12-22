"use client";
import React, {useContext, useEffect, useRef} from "react";
import {UploadContext} from "@/app/upload/UploadContext";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {useRouter} from "next/navigation";

export default function Computer() {
	const {dispatch} = useContext(UploadContext);
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!fileInputRef?.current?.files || fileInputRef.current.files.length === 0) {
			showFilePicker();
		}
	}, [fileInputRef]);

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files) {
			// update the uploadedFiles state with the selected files
			dispatch({type: "ADD_FILES", files: Array.from(event.target.files)});
			router.push("/upload/view");
		}
	}

	function showFilePicker() {
		fileInputRef.current?.click();
	}

	return <>
		<input
			type="file"
			ref={fileInputRef}
			style={{display: 'none'}}
			multiple
			onChange={handleFileChange}
		/>
		<h1 className="m-5 text-xl text-neutral-100 text-center font-semibold">Upload from your computer</h1>
		<div className={"w-2/3 max-sm:w-full flex flex-col items-center justify-center flex-1"}>
			<PrimaryActionButton text={"Select files"} onClick={showFilePicker}/>
		</div>
		<PrimaryActionButton url={"/upload"} text={"Back"}/>
	</>;
}