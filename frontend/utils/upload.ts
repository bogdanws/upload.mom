export async function uploadFiles(files: File[]): Promise<any> {
	try {
		// Create a new FormData instance
		const formData = new FormData();

		// Append each file to the FormData instance
		files.forEach((file) => formData.append("files", file));

		// Send a POST request to the server with the FormData instance
		const res = await fetch(process.env.NEXT_PUBLIC_STORAGE_HOST + "/api/upload", {
			method: "POST",
			body: formData
		});

		// If the request was not successful, throw an error
		if (!res.ok) {
			throw new Error(await res.text());
		}

		// Return the server response as a JSON object
		//const jsonRes = await res.json();
		alert("Files uploaded successfully!");
		return res;
	} catch (error) {
		// Log any errors that occur during the file upload
		console.error('Error uploading files:', error);
	}
}