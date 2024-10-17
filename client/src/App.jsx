import Card from "./components/Card";
import "./App.css";
import Header from "./components/header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";

function App() {

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
        </Routes>



      </BrowserRouter>
    </div>
  );
}

export default App;
