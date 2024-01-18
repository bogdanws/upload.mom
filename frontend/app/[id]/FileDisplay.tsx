"use client";
import {useEffect, useState} from "react";

export function FileDisplay({id}: { id: string }) {
	const [files, setFiles] = useState([]);
	useEffect(() => {
		const fetchFiles = async () => {
			const fileList = await getFileList(id);
			setFiles(fileList.files);
		};

		fetchFiles();
	}, [id]);

	return (
		<>
			<h1>Files in {id}:</h1>
			<ul>
				{files.map((file) => (
					<li key={file}>{file}</li>
				))}
			</ul>
		</>
	);
}

async function getFileList(id: string) {
	const res = await fetch(`/api/files/${id}`);
	return await res.json();
}