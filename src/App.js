import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './component/header';
import ListingPage from './template/listing-page';
import './App.css';

function App() {
  const headerProps = {
    title: 'Manage your ToDo list'
  }
  return (
    <div className="app-container">
      <Header {...headerProps} />
      <Router>
        <Routes>
          <Route path='/' element={<ListingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
