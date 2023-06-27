import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Space from './pages/space/space';

function App() {
  return (
    <Router>
      
      <div className="row">
        <div className="column-1">
        <Navbar />
          
        </div>
        <div className="column-2">
          <Routes>
            <Route path='/space' element={<Space />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
