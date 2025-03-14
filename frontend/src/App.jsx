import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import { Navbar } from "./components/Navbar";
import BaseState from "./context/base/Basestate.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Messages from "./components/Messages";
import SignUpPage from "./components/SignUp";
import Login from "./components/Login.jsx";
import AddProperty from "./components/AddProperty.jsx";
import FindProperty from "./components/FindProperty.jsx";
import FindFlatmate from "./components/FindFlatmate.jsx";
import OTPPage from "./components/OTPPage/OTPPage.jsx";
import TenantProfilePage from "./components/TenantProfilePage/TenantProfilePage.jsx";
import TenantEditPage from "./components/TenantProfilePage/TenantEditPage.jsx";
import BookmarkedFlatmates from "./components/BookmarkedFlatmates.jsx";
function App() {
  const [id, setID] = useState("");
  useEffect(() => {
    function handleConnection() {
      console.log("a user connected");
    }
    socket.on("connect", handleConnection);
    socket.emit("join", socket.id); //TODO: send user id here
    socket.on("online_users", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <BaseState>
      <Navbar />
      <Routes>
        <Route path="/messages" element={<Messages />} />
        <Route path="/signup" element={<SignUpPage setID={setID} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/find-property" element={<FindProperty />} />
        <Route path="/find-flatmate" element={<FindFlatmate />} />
        <Route path="/otp-page" element={<OTPPage id={id} />} />
        <Route path="/tenant-profile-page" element={<TenantProfilePage />} />
        <Route path="/tenant-edit-page" element={<TenantEditPage />} />
        <Route path="/home" element ={<BookmarkedFlatmates/>}/>
      </Routes>
    </BaseState>
  );
}

export default App;

