import { Routes, Route } from "react-router-dom";
import Index from "../component/Layout/Index";
import Explore from "../pages/Explore";
import ForgottPassword from "../pages/ForgottPassword";
import Offers from "../pages/Offers";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function Routers() {
  return (
    <>
      <Routes>
        <Route index element={<Index />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgottPassword />} />
        <Route path="*" element={<Explore />} />
      </Routes>
    </>
  );
}

export default Routers;