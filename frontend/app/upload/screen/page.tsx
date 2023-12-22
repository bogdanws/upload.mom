import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {ScreenRecorder} from "@/app/upload/screen/ScreenRecorder";

export default function Screen() {
	return <div className={"flex flex-col items-center justify-center flex-1"}>
		<h1 className="m-5 text-xl text-neutral-100 text-center font-semibold">Record your screen</h1>
		<ScreenRecorder/>
		<PrimaryActionButton text={"Back"} url={"/upload"}/>
	</div>;
}