import {BsFileEarmarkBinaryFill} from "react-icons/bs";
import React, {forwardRef, useContext} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadContext} from "@/app/(upload)/UploadContext";

export function FileList(props: { onClick: () => void}) {
	const {state, dispatch} = useContext(UploadContext);
	const deleteFile = (file: File) => dispatch({type: "REMOVE_FILE", file});

	return <>
		<div className="w-full flex flex-row items-center justify-between">
			<p className="text-neutral-200 text-center">Click on a file to <span className="text-red-300">remove</span> it
			</p>
			<PrimaryActionButton text={"Add more"} onClick={props.onClick}/>
		</div>
		{/*	show all files*/}
		<ul
			className={"w-full my-2 flex-1 overflow-y-scroll overflow-x-hidden relative"}>
			<AnimatePresence mode="popLayout">
				{state.map((file) => <File key={file.name} onClick={() => deleteFile(file)} file={file}/>)}
			</AnimatePresence>
		</ul>
		<PrimaryActionButton text={"Upload"}/>
	</>;
}

export const File = forwardRef(function FileDisplay(props: { onClick: () => void, file: File }, ref: any) {
	return <motion.li
		ref={ref}
		className="flex flex-row items-center justify-between p-2 m-1 my-1.5 rounded-lg bg-neutral-700 text-neutral-100 hover:text-red-500 transition-colors duration-500"
		onClick={props.onClick}
		layout
		animate={{opacity: 1, x: 0}}
		exit={{opacity: 0, x: 200}}
		transition={{duration: 0.5, ease: "easeInOut"}}
	>
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
	</motion.li>;
});

function convertBytes(bytes: number) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	if (bytes === 0) {
		return "n/a";
	}

	// Determine the size index
	const i = Math.floor(Math.log(bytes) / Math.log(1024));

	if (i === 0) {
		return `${bytes} ${sizes[i]}`;
	}

	return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

