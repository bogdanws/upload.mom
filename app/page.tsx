import React from 'react';
import {Upload} from "@/app/Upload";


export default function Home() {
	return <div className={"absolute w-full h-full inset-0 overflow-hidden flex items-center justify-center flex-col bg-neutral-900"}>
		<Upload />
	</div>;
}
