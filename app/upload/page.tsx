"use client";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import React, {useContext} from "react";
import {UploadContext} from "@/app/upload/UploadContext";
import {BsCameraFill, BsDisplayFill, BsFolderFill, BsLink45Deg, BsMicFill} from "react-icons/bs";
import Link from "next/link";

export default function Upload() {
	const {state} = useContext(UploadContext);

	return (
		<>
			{/*<div className="gradient" TODO: Hide overflow />*/}
			{state.length === 0 &&
				<h1 className="mb-5 text-3xl text-neutral-100 font-bold text-center">Upload your files</h1>}
			<div id={"uploadMethodsContainer"}>
				<p className="text-neutral-200 text-center"><span
					className={"font-semibold text-blue-200"}>Drag and drop</span> your files here, or import from:</p>
				<div className={"flex flex-row items-stretch justify-center flex-wrap m-5"}>
					<Button Icon={BsFolderFill} text="Your computer" url="/upload/computer"/>
					<Button Icon={BsLink45Deg} text="Link" url="/upload/link"/>
					<Button Icon={BsCameraFill} text="Camera" url="/upload/camera"/>
					<Button Icon={BsDisplayFill} text="Screen recording" url="/upload/screen"/>
					<Button Icon={BsMicFill} text="Audio recording" url="/upload/mic"/>
				</div>
			</div>
			{state.length > 0 &&
				<PrimaryActionButton url={"/upload/view"} text={"View files"}/>}
		</>
	);
}

function Button({Icon, text, url}: { Icon: any, text: string, url: string }) {
	return <Link href={url}
		className="p-2 m-1 rounded hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center w-24 text-center">
		<Icon size={20}/>
		<span className="opacity-75 mt-2">{text}</span>
	</Link>;
}