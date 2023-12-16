"use client";
import {useMemo, useReducer} from "react";
import {UploadContext, uploadReducer} from "@/app/(upload)/UploadContext";
import {UploadContainer} from "@/app/(upload)/UploadContainer";
import "./Upload.scss";

export default function Upload({children}: {
	children: React.ReactNode
}) {
	const [state, dispatch] = useReducer(uploadReducer, []);
	const contextValue = useMemo(() => {
		return {state, dispatch};
	}, [state, dispatch]);

	return <div
		className={"absolute w-full h-full inset-0 overflow-hidden flex items-center justify-center flex-col bg-neutral-900"}>
		<UploadContext.Provider value={contextValue}>
			<UploadContainer>
				{children}
			</UploadContainer>
		</UploadContext.Provider>
	</div>;
}