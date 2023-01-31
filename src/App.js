import Sidebar from "./Sidebar";
import Header from "./Header"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/gh-pages-url" element={<><header><Header /></header><main><Sidebar /></main></>} exact />
      </Routes>
    </>
  );
}

export default App;