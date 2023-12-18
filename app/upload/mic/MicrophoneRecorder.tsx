"use client";
import { useContext, useEffect, useState } from "react";
import { PrimaryActionButton } from "@/components/PrimaryActionButton";
import { UploadContext } from "@/app/upload/UploadContext";
import { useRouter } from "next/navigation";

type Stream = MediaStream | null;
type Recorder = MediaRecorder | null;

export function MicrophoneRecorder() {
  const { dispatch } = useContext(UploadContext);
  const [mediaStream, setMediaStream] = useState<Stream>(null);
  const [mediaRecorder, setMediaRecorder] = useState<Recorder>(null);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      cleanupMicrophoneStream();
    };
  }, [mediaStream]);

  const startMicrophoneCapture = async () => {
    try {
      const stream: Stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const startRecording = () => {
    if (!mediaStream) {
      console.error('Microphone stream not available');
      return;
    }
    const recorder: Recorder = new MediaRecorder(mediaStream);
    let blobsRecorded: BlobPart[] = [];

    recorder.ondataavailable = event => {
      blobsRecorded.push(event.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(blobsRecorded, { type: 'audio/webm' });
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const audioFile = new File([audioBlob], `audio-recording-${timestamp}.webm`, { type: 'audio/webm' });
      dispatch({ type: "ADD_FILES", files: [audioFile] });
    };

    recorder.start();
    setIsRecording(true);
    setMediaRecorder(recorder);
  };

  const cleanupMicrophoneStream = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    setMediaRecorder(null);
    cleanupMicrophoneStream();
    router.push("/upload/view");
  };

  return (
    <div className={"flex flex-col justify-center items-center flex-1"}>
      {mediaStream && (!isRecording ?
        <PrimaryActionButton onClick={startRecording} text={"Start Recording"} /> :
        <PrimaryActionButton onClick={stopRecording} text={"Stop Recording"} />)}
      {!mediaStream ?
        <PrimaryActionButton onClick={startMicrophoneCapture} text={"Start Microphone Capture"} /> : null}
    </div>
  );
}