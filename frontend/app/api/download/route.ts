import {NextRequest, NextResponse} from "next/server";
import B2 from "backblaze-b2";

export async function GET(req: NextRequest) {
	const params = new URL(req.url).searchParams;
	const fileId = params.get('id');

	if (!fileId) {
		return NextResponse.json({error: 'No file id found'}, {status: 400});
	}

	const url = (await download(fileId)).config.url;
	return NextResponse.json({url});
}

async function download(id: string) {
	const b2 = new B2({
		applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
		applicationKey: process.env.BACKBLAZE_APP_KEY!,
	});
	const {data: authData} = await b2.authorize();

	const data = await b2.downloadFileByName({
		bucketName: process.env.BACKBLAZE_BUCKET_NAME!,
		fileName: `${id}.zip`,
		responseType: 'arraybuffer',
	});

	return data;
}