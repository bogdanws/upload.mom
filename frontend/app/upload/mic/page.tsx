import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {MicrophoneRecorder} from "./MicrophoneRecorder";

export default function Page() {
	return <div className={"flex flex-col items-center justify-center flex-1"}>
		<h1 className="m-5 text-xl text-neutral-100 text-center font-semibold">Record your microphone</h1>
		<MicrophoneRecorder/>
		<PrimaryActionButton text={"Back"} url={"/upload"}/>
	</div>;
}