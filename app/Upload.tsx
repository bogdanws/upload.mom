import "./Upload.scss";
import {UploadButton} from "@/app/UploadButton";

export function Upload({}) {
	return (
		<div className="p-1 bg-neutral-800 rounded flex flex-col items-center justify-center">
			<div className="p-10 border-2 border-neutral-500 border-dotted rounded flex flex-col items-center justify-center">
				<UploadButton/>
			</div>
		</div>
	);
}