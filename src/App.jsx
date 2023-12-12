import './App.css'
import {Upload} from "./Upload/Upload.tsx";

function App() {
  return <div className={"absolute w-full h-full inset-0 overflow-hidden flex items-center justify-center flex-col bg-neutral-900"}>
    <Upload />
  </div>;
}

export default App
