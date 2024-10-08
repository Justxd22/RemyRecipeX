import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";

function App() {
  return (
    <Router>
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
