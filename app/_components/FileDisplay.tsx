import {BsFileEarmarkBinaryFill} from "react-icons/bs";
import React from "react";

export function FileDisplay(props: { onClick: () => void, file: File }) {
	return <div
		className="flex flex-row items-center justify-between p-2 m-1 rounded-lg bg-neutral-700 text-neutral-100 hover:text-red-500 transition-all duration-300"
		onClick={props.onClick}>
		<div className="flex flex-row items-center">
			{props.file.type.includes("image") &&
				<img src={URL.createObjectURL(props.file)} alt={props.file.name} className="w-10 h-10 rounded-full"/>}
			{!props.file.type.includes("image") && <div
				className="w-10 h-10 rounded-full bg-neutral-500 text-neutral-200 flex items-center justify-center">
				<BsFileEarmarkBinaryFill size={20}/>
			</div>}
			<p className="ml-2 font-semibold">{props.file.name}</p>
		</div>
		<p className="text-neutral-200 ml-2">{convertBytes(props.file.size)}</p>
	</div>;
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