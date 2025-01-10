import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Register from "./components/Register";
import Login from "./components/Login";
import Body from "./components/Body";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
