import {CameraRecorder} from "@/app/upload/camera/CameraRecorder";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";

export default function Camera() {
	return <div className={"flex flex-col items-center justify-center flex-1"}>
		<CameraRecorder/>
		<PrimaryActionButton text={"Back"} url={"/upload"}/>
	</div>;
}