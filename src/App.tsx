import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import GalleryPage from './pages/GalleryPage';
import GalleryItemPage from './pages/GalleryItemPage';
import AboutPage from './pages/AboutPage';
import WritingPage from './pages/WritingPage';
import ArticlePage from './pages/ArticlePage';
import ClioPage from './pages/ClioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="clio" element={<ClioPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="gallery/:slug" element={<GalleryItemPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="writing/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
