import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/files/:id', (req, res) => {
	const fileId = req.params.id;
	const filePath = getFilePathById(fileId);

	if (!filePath) {
		res.status(404).send('File not found');
		return;
	}

	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			res.status(404).send('File not found');
			return;
		}

		fs.readdir(filePath, (err, files) => {
			if (err) {
				res.status(500).send('Error reading directory');
				return;
			}

			res.json({files});
		});
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

export default router;
