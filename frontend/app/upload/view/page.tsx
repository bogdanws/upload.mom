"use client";
import React, {useContext, useEffect} from "react";
import {UploadContext} from "@/app/upload/UploadContext";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {AnimatePresence} from "framer-motion";
import {File} from "@/app/upload/view/File";
import {useRouter} from "next/navigation";
import {uploadFiles} from "@/utils/upload";

export default function ViewFiles() {
	const router = useRouter();
	const {state, dispatch} = useContext(UploadContext);

	useEffect(() => {
		if (state.length === 0) {
			router.replace("/upload");
		}
	}, [state]);

	return <>
		<div className="w-full flex flex-row items-center justify-between">
			<p className="text-neutral-200 text-center">Click on a file to <span className="text-red-300">remove</span> it:
			</p>
			<PrimaryActionButton url={"/upload"} text={"Add more"}/>
		</div>
		<ul
			className={"w-full my-2 flex-1 overflow-y-scroll overflow-x-hidden relative"}>
			<AnimatePresence mode="popLayout">
				{state.map((file) => <File key={file.name} onClick={() => dispatch({type: "REMOVE_FILE", file})} file={file}/>)}
			</AnimatePresence>
		</ul>
		<PrimaryActionButton text={"Upload"} onClick={() => {
			uploadFiles(state).then((res) => {
				console.log(res);
				router.push("/" + res.id);
			}).catch((err) => {
				console.error(err);
			});
		}
		}/>
	</>;
}

