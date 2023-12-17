import {PrimaryActionButton} from "@/components/PrimaryActionButton";

export default function ErrorPage() {
	return <div className="flex flex-col items-center justify-center h-screen">
		<div className="flex flex-col items-center justify-center h-screen flex-1">
			<h1 className="text-4xl font-bold text-neutral-100 p-3">Error</h1>
			<p className="text-xl text-neutral-200">Invalid upload method</p>
		</div>
		<PrimaryActionButton url={"/upload"} text={"Go back"}/>
	</div>;
}