"use client";
import {useContext, useEffect, useRef, useState} from "react";
import {PrimaryActionButton} from "@/components/PrimaryActionButton";
import {UploadContext} from "@/app/upload/UploadContext";
import {useRouter} from "next/navigation";

type Stream = MediaStream | null;
type Recorder = MediaRecorder | null;

/*
	TODO: Add error handling for when camera capture is denied by the user
	TODO: Implement a timer to show the duration of the recording
*/

export function CameraRecorder() {
	const {dispatch} = useContext(UploadContext);
	const [cameraStream, setCameraStream] = useState<Stream>(null);
	const [mediaRecorder, setMediaRecorder] = useState<Recorder>(null);
	const [isRecording, setIsRecording] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const router = useRouter();

	useEffect(() => {
		if (videoRef.current && cameraStream) {
			videoRef.current.srcObject = cameraStream;
		}

		return () => {
			cleanupCameraStream();
		};
	}, [videoRef, cameraStream]);

	const startCamera = async () => {
		try {
			const stream: Stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
			setCameraStream(stream);
		} catch (error) {
			console.error('Error accessing the camera', error);
		}
	};

	const startRecording = () => {
		if (!cameraStream) {
			console.error('Camera stream not available');
			return;
		}
		const recorder: Recorder = new MediaRecorder(cameraStream, {mimeType: 'video/webm'});
		let blobsRecorded: BlobPart[] = [];

		recorder.ondataavailable = event => {
			blobsRecorded.push(event.data);
		};

		recorder.onstop = () => {
			const videoBlob = new Blob(blobsRecorded, {type: 'video/webm'});
			const timestamp = new Date().toISOString().replace(/:/g, "-");
			const videoFile = new File([videoBlob], `recording-${timestamp}.webm`, {type: 'video/webm'});
			dispatch({type: "ADD_FILES", files: [videoFile]});
		};

		recorder.start(1000);
		setIsRecording(true);
		setMediaRecorder(recorder);
	};

	const cleanupCameraStream = () => {
		if (cameraStream) {
			// Stop all tracks on the stream
			cameraStream.getVideoTracks().forEach((track) => track.stop());
			cameraStream.getAudioTracks().forEach((track) => track.stop());
			setCameraStream(null);

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
		cleanupCameraStream();
		router.push("/upload/view");
	};

	return (
		<div className={"flex flex-col justify-center items-center flex-1"}>
			{cameraStream ?
				<video ref={videoRef} width="320" height="240" autoPlay/> :
				<PrimaryActionButton onClick={startCamera} text={"Start camera"}/>}
			{cameraStream && (!isRecording ?
				<PrimaryActionButton onClick={startRecording} text={"Start Recording"}/> :
				<PrimaryActionButton onClick={stopRecording} text={"Stop Recording"}/>)}
		</div>
	);
}