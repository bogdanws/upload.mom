import {BsFileEarmarkBinaryFill} from "react-icons/bs";
import React, {forwardRef} from "react";
import {convertBytes} from "@/utils/convertBytes";

export const File = forwardRef(function FileDisplay(props: { file: {name: string, size: number} }, ref: any) {
	return <li
		ref={ref}
		className="flex flex-row items-center justify-between p-2 m-1 my-1.5 rounded-lg bg-neutral-700 text-neutral-100"
	>
		<div className="flex flex-row items-center">
			<div
				className="w-10 h-10 rounded-full bg-neutral-500 text-neutral-200 flex items-center justify-center">
				<BsFileEarmarkBinaryFill size={20}/>
			</div>
			<p className="ml-2 font-semibold">{props.file.name}</p>
		</div>
		<p className="text-neutral-200 ml-2">{convertBytes(props.file.size)}</p>
	</li>;
});

export const LoadingFile = () => {
	return (
		<div className="flex flex-row items-center justify-between p-2 m-1 my-1.5 rounded-lg bg-neutral-700 text-neutral-100">
			<div className="flex flex-row items-center">
				<div className="w-10 h-10 !rounded-full bg-neutral-500 text-neutral-200 flex items-center justify-center shimmer">
				</div>
				<div className="ml-2 shimmer" style={{width: '100px', height: '20px'}}>
				</div>
			</div>
			<div className="text-neutral-200 ml-2 shimmer" style={{width: '50px', height: '20px'}}>
			</div>
		</div>
	);
};