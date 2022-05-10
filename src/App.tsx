import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RocketDetails from "./components/RocketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:flightNumber" element={<RocketDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
