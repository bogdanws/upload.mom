"use client";
import React, {useEffect, useState} from "react";
import {File, LoadingFile} from "./File";
import "../upload/Upload.scss";
import {useRouter} from "next/navigation";

export function FileDisplay({id}: { id: string }) {
	const router = useRouter();
	const [files, setFiles] = useState<File[]>([]);
	useEffect(() => {
		const fetchFiles = async () => {
			const fileList = await getFileList(id);
			console.log(fileList.files);
			setFiles(fileList.files);
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
				{files.map((file) => <File key={file.name} file={file}/>)}
			</ul>
			<DownloadButton downloadId={id}/>
		</>
	);
}

async function getFileList(id: string): Promise<{ files: File[] }> {
	const res = await fetch(`/api/files/${id}`);
	const data = await res.json().then((data) => data);

	if (!res.ok) {
		return Promise.reject(new Error("Failed to fetch files"));
	}
	return data;
}

type File = {
	name: string;
	size: number;
};

function DownloadButton({downloadId}: { downloadId: string }) {
	return (
		<a href={`/api/download/${downloadId}`} download={true}
		   className={"bg-blue-500 disabled:opacity-50 hover:bg-blue-600 disabled:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded " +
			   "transition duration-500 ease-in-out transform hover:scale-105 disabled:hover:-translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed"}
		>
			Download
		</a>
	);
}