import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Register from "./components/Register";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
