import express from 'express';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';

const router = express.Router();

router.get('/files/:id', (req, res) => {
	const fileId = req.params.id;
	const folderPath = getFilePathById(fileId);

	if (!folderPath) {
		res.status(404).send('File not found');
		return;
	}

	const filePath = getFileInsideFolder(folderPath);
	if (!filePath) {
		res.status(404).send('File not found');
		return;
	}

	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			res.status(404).send('File not found');
			return;
		}

		let files : {name: string, size: number}[];
		// check if it contains a single file or a zip archive
		if (!filePath.endsWith('.zip')) {
			// send the file name and size
			const stats = fs.statSync(filePath);
			files = [{
				name: path.basename(filePath),
				size: stats.size
			}];
		} else {
			const zip = new AdmZip(filePath);
			const zipEntries = zip.getEntries();

			files = zipEntries.map(entry => {
				return {
					name: entry.entryName,
					size: entry.header.size
				};
			});
		}

		res.json({files});
	});
});

router.get('/download/:id', (req, res) => {
	const fileId = req.params.id;
	const filePath = getFilePathById(fileId);
	if (!filePath) {
		res.status(404).send('File not found');
		return;
	}

	// Get a list of all files in the directory
	fs.readdir(filePath, (err, files) => {
		if (err) {
			res.status(500).send('Error reading directory');
			return;
		}

		// Send the first file to the client
		if (files.length > 0) {
			const fileToSend = path.resolve(filePath, files[0]);
			res.sendFile(fileToSend);
		} else {
			res.status(404).send('No files found');
		}
	});
});

function getFilePathById(id: string): string | null {
	// check if the id exists in the uploads directory
	const filePath = path.join('uploads', id);
	// if it does, return the path
	if (fs.existsSync(filePath)) {
		return filePath;
	}
	// if it doesn't, return null
	return null;
}

function getFileInsideFolder(folderPath: string): string | null {
	// check if the folder exists
	if (!fs.existsSync(folderPath)) {
		return null;
	}

	// get a list of all files in the directory
	const files = fs.readdirSync(folderPath);
	// return the first file
	return folderPath + '/' + files[0];
}

export default router;
