"use client";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import React, {useCallback, useContext} from "react";
import {UploadContext} from "@/app/upload/UploadContext";
import {useRouter} from "next/navigation";

export default function Link() {
	const [link, setLink] = React.useState("");
	const {dispatch} = useContext(UploadContext);
	const router = useRouter();

	const handleDownload = useCallback(async function handleDownload() {
		try {
			const response = await fetch(link);
			if (!response.ok) {
				// noinspection ExceptionCaughtLocallyJS
				throw new Error("Network response was not ok");
			}

			const blob = await response.blob();

			const fileName =
				(link.split("/").pop() ?? Math.random().toString(36).substring(7))
				+ "." + getExtensionFromMIME(blob.type);

			const file = new File([blob], fileName, {type: blob.type});

			dispatch({type: "ADD_FILES", files: [file]});
			router.push("/upload/view");
		} catch (e) {
			console.error(e);
			router.push("/upload");
		}
	}, [link, dispatch, router]);

	return <>
		<h1 className="m-5 text-xl text-neutral-100 text-center font-semibold">Upload from a link</h1>
		<div className={"w-2/3 max-sm:w-full flex flex-row max-sm:flex-col items-center justify-center flex-1"}>
			<input
				type="text"
				className="w-full bg-gray-700 text-white rounded p-2 m-2 mr-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				placeholder="Direct link to file"
				value={link}
				onChange={e => setLink(e.target.value)}
			/>
			<PrimaryActionButton text={"Upload"} onClick={handleDownload}/>
		</div>
		<PrimaryActionButton url={"/upload"} text={"Back"}/>
	</>
}

function getExtensionFromMIME(mime: string) {
  const splitMime = mime.split("/");
  return splitMime.length > 1 ? splitMime[1] : "";
}