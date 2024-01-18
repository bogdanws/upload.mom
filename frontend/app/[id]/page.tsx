import {FileDisplay} from "@/app/[id]/FileDisplay";

export default function Page({params: {id}}: { params: { id: string } }) {

	return <>
		<FileDisplay id={id}/>
		<DownloadButton id={id}/>
	</>
}

function DownloadButton({id}: {id: string}) {
	return <a target="_blank" href={"/api/download/" + id}>
		Download files
	</a>;
}