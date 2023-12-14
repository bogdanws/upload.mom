import './App.css'
import {Upload} from "./Upload/Upload.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return <Routes>
    <Route path="/">
      <Route index element={<Upload/>}/>
    </Route>
  </Routes>
}

export default App
