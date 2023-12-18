import {CameraRecorder} from "@/app/upload/camera/CameraRecorder";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";

export default function Camera() {
	return <div className={"flex flex-col items-center justify-center flex-1"}>
		<h1 className="m-5 text-xl text-neutral-100 text-center font-semibold">Record your camera</h1>
		<CameraRecorder/>
		<PrimaryActionButton text={"Back"} url={"/upload"}/>
	</div>;
}