import { Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NewPost from "./Pages/NewPost/NewPost";
import PageSettings from "./Pages/Settings/PageSettings";
import Home from "./Pages/Home/Home";
import SinglePost from "./Pages/Post/SinglePost";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <><Topbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/newpost" element={user ? <NewPost /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/user-settings" element={user ? <PageSettings /> : <Register />} />
      </Routes>

    </>
  );
}

export default App;
