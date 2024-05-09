"use client";
import React, {useEffect, useState} from "react";
import {File, LoadingFile} from "./File";
import "../upload/Upload.scss";
import {useRouter} from "next/navigation";
import {convertBytes} from "@/utils/convertBytes";

export function FileDisplay({id}: { id: string }) {
	const router = useRouter();
	const [files, setFiles] = useState<string[]>([]);
	const [size, setSize] = useState<number>(0);
	useEffect(() => {
		const fetchFiles = async () => {
			const uploadData = await getUploadData(id);
			console.log(uploadData.files);
			setFiles(uploadData.files);
			setSize(uploadData.size);
		};

		fetchFiles().catch(() => {
			alert("The download link is invalid or expired.")
			// redirect to home
			router.push("/");
		});
	}, [id]);

	return (
		<>
			<p className="text-neutral-200 text-center text-xl font-bold">Contents:</p>
			<ul
				className={"w-full my-2 flex-1 overflow-y-scroll overflow-x-hidden relative"}>
				{files.length === 0 ? <><LoadingFile/><LoadingFile/></> : null}
				{files.map((file, index) => <File key={index} file={{name:file}}/>)}
			</ul>
			<DownloadButton downloadId={id} downloadSize={convertBytes(size)}/>
		</>
	);
}

async function getUploadData(id: string): Promise<UploadData> {
	const res = await fetch(process.env.NEXT_PUBLIC_STORAGE_HOST + `/api/download/files?id=${id}`);
	const data = await res.json();

	if (!res.ok) {
		return Promise.reject(new Error("Failed to fetch files"));
	}
	return data;
}

type UploadData = {
	id: string;
	files: string[];
	size: number;
};

function DownloadButton({downloadId, downloadSize}: { downloadId: string, downloadSize: string }) {
	return (
		<a href={process.env.NEXT_PUBLIC_STORAGE_HOST + `/api/download/${downloadId}`} download={true}
		   className={"bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded " +
			   "transition duration-500 ease-in-out transform hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"}
		>
			Download <span className={"text-sm text-blue-100"}>({downloadSize})</span>
		</a>
	);
}