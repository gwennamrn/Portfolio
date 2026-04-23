import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { COLORS, type PageId, type Project } from './components/constants';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectPreview } from './components/ProjectPreview';
import { ProjectList } from './components/ProjectList';
import { ProjectDetail } from './components/ProjectDetail';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactForm';
import { CherryCursor } from './components/CherryCursor';
import { FallingCherries } from './components/FallingCherries';
import { Footer } from './components/Footer';

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigateTo = useCallback((targetPage: PageId) => {
    setPage(targetPage);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToProjects = useCallback(() => {
    navigateTo('projects');
  }, [navigateTo]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg,
        fontFamily: '"Inter", sans-serif',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CherryCursor />
      <Navigation currentPage={page} onNavigate={navigateTo} />

      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <div key="home">
              <FallingCherries />
              <HeroSection onNavigate={navigateTo} />
              <ProjectPreview onOpenProject={openProject} />
            </div>
          )}

          {page === 'projects' && !selectedProject && (
            <div key="projects">
              <ProjectList onOpenProject={openProject} />
            </div>
          )}

          {page === 'project-detail' && selectedProject && (
            <ProjectDetail
              key={`project-${selectedProject.id}`}
              project={selectedProject}
              onBack={handleBackToProjects}
            />
          )}

          {page === 'about' && (
            <div key="about">
              <AboutPage onNavigate={navigateTo} />
            </div>
          )}

          {page === 'contact' && (
            <div key="contact">
              <ContactPage />
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
