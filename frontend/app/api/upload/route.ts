import {NextRequest, NextResponse} from "next/server";
import B2 from "backblaze-b2";
import jszip from "jszip";

function generateRandomString(length: number): string {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const cwd = process.cwd();

export async function POST(req: NextRequest) {
	const files = (await req.formData()).getAll('files') as File[];
	if (!files) {
		return NextResponse.json({error: 'No files found'}, {status: 400});
	}
	let buffers = [];
	for (const file of files) {
		buffers.push(await file.arrayBuffer());
	}

	const uploadId = generateRandomString(5);

	const data = await upload(files, uploadId);
	return NextResponse.json({id: uploadId});
}

async function upload(files: File[], id: string) {
	const b2 = new B2({
		applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
		applicationKey: process.env.BACKBLAZE_APP_KEY!,
	});

	const {data: authData} = await b2.authorize();
	const {data: uploadUrl} = await b2.getUploadUrl({bucketId: process.env.BACKBLAZE_BUCKET_ID!});
	const bucket = await b2.getBucket({bucketName: process.env.BACKBLAZE_BUCKET_NAME!});

	const zip = new jszip();
	for (const file of files) {
		zip.file(file.name, file.arrayBuffer());
	}

	const buffer = await zip.generateAsync({type: 'nodebuffer'});
	const {data} = await b2.uploadFile({
		uploadUrl: uploadUrl.uploadUrl!,
		uploadAuthToken: uploadUrl.authorizationToken!,
		fileName: `${id}.zip`,
		data: buffer,
	});

	return data;
}

async function getFileUrl(id: string) {
	const b2 = new B2({
		applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
		applicationKey: process.env.BACKBLAZE_APP_KEY!,
	});

	const {data: authData} = await b2.authorize();
	const {data: downloadUrl} = await b2.getDownloadAuthorization({
		bucketId: process.env.BACKBLAZE_BUCKET_ID!,
		fileNamePrefix: id,
		validDurationInSeconds: 3600,
	});

	return downloadUrl;
}