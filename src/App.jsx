import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import HackerNews from "./pages/HackerNews.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/hacker-news" element={<HackerNews />} />
      </Routes>
    </Router>
  );
}

export default App;