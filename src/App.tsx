import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Activities from './pages/Activities';
import Investment from './pages/Investment';
import News from './pages/News';
import Contact from './pages/Contact';
import NewsDetail from './pages/NewsDetail';
import CouncilDesk from './pages/CouncilDesk';
import NotFound from './pages/NotFound';

export default function App() {
  const legacyBase = '/syrian-egyptian-business-council';
  if (window.location.pathname === legacyBase || window.location.pathname.startsWith(`${legacyBase}/`)) {
    const normalizedPath = window.location.pathname.slice(legacyBase.length) || '/';
    window.history.replaceState(window.history.state, '', `${normalizedPath}${window.location.search}${window.location.hash}`);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/council-desk-83" element={<CouncilDesk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
