import {NextRequest} from "next/server";
import fs from 'fs/promises'
import path from 'path'

function makeid(length: number) {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const cwd = process.cwd();

export async function POST(req: NextRequest) {
	const id = makeid(8);

	// read the FormData from the request
	const formData = await req.formData();
	const files = formData.getAll("files") as File[];

	const uploadPath = path.join(cwd, "files");
	await fs.mkdir(path.join(uploadPath, id), {recursive: true});
	// read the files into a buffer
	for (const file of files) {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		// write the file to the file system
		// make a directory for the ID
		try {
			await fs.writeFile(path.join(uploadPath, id, file.name), buffer);
		} catch (e) {
			return Response.json({message: "Error saving file"}, {status: 500});
		}
	}

	return Response.json({id: id}, {status: 200});
}