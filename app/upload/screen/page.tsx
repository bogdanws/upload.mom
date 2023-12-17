import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {ScreenRecorder} from "@/app/upload/screen/ScreenRecorder";

export default function Screen() {
	return <div className={"flex flex-col items-center justify-center flex-1"}>
		<ScreenRecorder/>
		<PrimaryActionButton text={"Back"} url={"/upload"}/>
	</div>;
}