import Sidebar from "./Sidebar";
import Header from "./Header"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Routes>
        <Route exact path="/" element={} />
      </Routes> */}
      <><header><Header /></header><main><Sidebar /></main></>
    </>
  );
}

export default App;