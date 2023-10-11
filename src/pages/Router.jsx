import { Route, Routes } from "react-router-dom";
import Sign from "./sign-Up-In/Sign";
import Home from "./Home/Home";

function Router() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route index path="/auth" element={<Sign />} />
    </Routes>
  );
}

export default Router;
