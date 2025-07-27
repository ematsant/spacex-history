import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LaunchList } from './pages/LaunchList';
import { LaunchDetails } from './pages/LaunchDetails'; // Importa a nova página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchList />} />
        {/* :launchId é um parâmetro dinâmico */}
        <Route path="/launch/:launchId" element={<LaunchDetails />} />
      </Routes>
    </Router>
  );
}

export default App;