import './App.css';
import Preview from './pages/music-preview';
import Info from './pages/music-info';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="navbar">
        <Link to='/preview'>Previas de musicas</Link>
        <Link to='/info'>buscar letras de musicas</Link>
      </div>
      <Routes>
        <Route path="/preview" element={<Preview />} />
        <Route path="/info" element={<Info />} />
      </Routes>

    </Router>
  )
}

export default App;
