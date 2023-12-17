"use client";
import {useContext, useEffect, useRef, useState} from "react";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadContext} from "@/app/upload/UploadContext";
import {useRouter} from "next/navigation";

type Stream = MediaStream | null;
type Recorder = MediaRecorder | null;

/*
	TODO: Add countdown timer before recording starts
	TODO: Add error handling for when screen capture is denied by the user
	TODO: Implement a timer to show the duration of the recording
*/

export function ScreenRecorder() {
	const {dispatch} = useContext(UploadContext);
	const [screenStream, setScreenStream] = useState<Stream>(null);
	const [mediaRecorder, setMediaRecorder] = useState<Recorder>(null);
	const [isRecording, setIsRecording] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const router = useRouter();

	useEffect(() => {
		if (videoRef.current && screenStream) {
			videoRef.current.srcObject = screenStream;
		}

		return () => {
			cleanupScreenStream();
		};
	}, [videoRef, screenStream]);

	const startScreenCapture = async () => {
		try {
			const stream: Stream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
			setScreenStream(stream);
		} catch (error) {
			console.error('Error accessing the screen', error);
		}
	};

	const startRecording = () => {
		if (!screenStream) {
			console.error('Screen stream not available');
			return;
		}
		const recorder: Recorder = new MediaRecorder(screenStream, {mimeType: 'video/webm'});
		let blobsRecorded: BlobPart[] = [];

		recorder.ondataavailable = event => {
			blobsRecorded.push(event.data);
		};

		recorder.onstop = () => {
			const videoBlob = new Blob(blobsRecorded, {type: 'video/webm'});
			const timestamp = new Date().toISOString().replace(/:/g, "-");
			const videoFile = new File([videoBlob], `screen-recording-${timestamp}.webm`, {type: 'video/webm'});
			dispatch({type: "ADD_FILES", files: [videoFile]});
		};

		recorder.start(1000);
		setIsRecording(true);
		setMediaRecorder(recorder);
	};

	const cleanupScreenStream = () => {
		if (screenStream) {
			// Stop all tracks on the stream
			screenStream.getVideoTracks().forEach((track) => track.stop());
			screenStream.getAudioTracks().forEach((track) => track.stop());
			setScreenStream(null);

			// Remove the stream from the video source
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
		}
	};

	const stopRecording = () => {
		mediaRecorder?.stop();
		setIsRecording(false);
		setMediaRecorder(null);
		cleanupScreenStream();
		router.push("/upload/view");
	};

	return (
		<div className={"flex flex-col justify-center items-center flex-1"}>
			{screenStream ?
				<video ref={videoRef} width="320" height="240" autoPlay/> :
				<PrimaryActionButton onClick={startScreenCapture} text={"Start screen capture"}/>}
			{screenStream && (!isRecording ?
				<PrimaryActionButton onClick={startRecording} text={"Start Recording"}/> :
				<PrimaryActionButton onClick={stopRecording} text={"Stop Recording"}/>)}
		</div>
	);
}