import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HomePage } from '@/pages/home-page';
import { LoginPage } from '@/pages/login-page';
import { ProfilePage } from '@/pages/profile-page';
import { FavoritesPage } from '@/pages/favorites-page';
import { PostDetailPage } from '@/pages/post-detail-page';
import { AboutPage } from '@/pages/about-page';
import { TermsPage } from '@/pages/terms-page';
import { PrivacyPage } from '@/pages/privacy-page';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="acolhe-ui-theme">
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/termos" element={<TermsPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </ThemeProvider>
  );
}

export default App;