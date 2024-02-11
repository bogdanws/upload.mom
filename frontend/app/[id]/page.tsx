import {FileDisplay} from "@/app/[id]/FileDisplay";
import React from "react";

export default function Page({params: {id}}: { params: { id: string } }) {

	return <div
		className={"absolute w-full h-full inset-0 overflow-hidden flex items-center justify-center flex-col bg-neutral-900"}>
		<div
			className={`uploadOuterContainer p-1 bg-neutral-800 transition duration-300 rounded flex flex-col items-center justify-center relative`}
			role={"menu"}
			tabIndex={0}
		>
			<div
				className={`uploadInnerContainer p-7 pt-4 border-2 border-neutral-500 border-dotted rounded transition duration-300 flex flex-col items-center justify-center`}>
				<FileDisplay id={id}/>
			</div>
		</div>
	</div>
}