import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import About from "../routes/About";
import Jalandhar from "../routes/Jalandhar";
import Layout from "./Layout";
import Wedding from "../routes/Wedding";
import Phagwara from "../routes/Phagwara";
import StandUp from "../routes/StandUp";
import Birthday from "../routes/Birthday";
import Conference from "../routes/Conference";
import Upto20 from "../routes/Upto20";
import Upto50 from "../routes/Upto50";
import Upto100 from "../routes/Upto100";
import Upto500 from "../routes/Upto500";
import Login from "../routes/Login";
import Signup from "../routes/Signup";

import ForgetPasswordPage from "../routes/ForgetPasswordPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route index element={<Home />} /> */}
        <Route path="about" element={<About />} />
        <Route path="Upto20" element={<Upto20 />} />
        <Route path="Upto50" element={<Upto50 />} />
        <Route path="Upto100" element={<Upto100 />} />
        <Route path="Upto500" element={<Upto500 />} />
        <Route path="Wedding" element={<Wedding />} />
        <Route path="StandUp" element={<StandUp />} />
        <Route path="Jalandhar" element={<Jalandhar />} />
        <Route path="Phagwara" element={<Phagwara />} />
        <Route path="Birthday" element={<Birthday />} />
        <Route path="Conference" element={<Conference />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<p>Not found!</p>} />

        <Route path="forget-password" element={<ForgetPasswordPage />} />
      </Routes>
    </>
  );
};

export default App;
