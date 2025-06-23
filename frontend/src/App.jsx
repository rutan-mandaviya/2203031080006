
import { Route, Routes } from "react-router-dom";

import ShortenerPage from "./pages/Shortnerpage";
import RedirectHandler from "./pages/Redirecthandle";
// import RedirectHandler from "./pages/RedirectHandler";
// import ShortenerPage from "./pages/ShortenerPage";

export default function App() {
  return (
  
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    
  );
}
