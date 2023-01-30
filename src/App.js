import Sidebar from "./Sidebar";
import Header from "./Header"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <header>
              <Header />
            </header>
            <main>
              <Sidebar />
            </main>
          </>
        }
        />
      </Routes>
    </>
  );
}

export default App;