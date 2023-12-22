import fs from 'fs/promises';
import path from 'path';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  try {
    const dir = path.join(process.cwd(), 'files', id);
    const files = await fs.readdir(dir);

    return (
      <>
        <h1>Files in {id}:</h1>
        <ul>
          {files.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    return <div>Error loading files</div>;
  }
}