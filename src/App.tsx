import { useState, useEffect } from 'react';
import { ScreenView, UserRole, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExplorarScreen } from './components/ExplorarScreen';
import { SeguimientoScreen } from './components/SeguimientoScreen';
import { HitosEscrowScreen } from './components/HitosEscrowScreen';
import { AuditorScreen } from './components/AuditorScreen';
import { CarteraScreen } from './components/CarteraScreen';
import { PublicarScreen } from './components/PublicarScreen';
import { LoginScreen } from './components/LoginScreen';
import { InvestModal, VotingModal } from './components/Modals';
import { INITIAL_PROJECTS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('explorar');
  const [userRole, setUserRole] = useState<UserRole>('investor');
  const [investModalOpen, setInvestModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[2]); // Default Raíz Circular
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNavigate = (screen: ScreenView) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInvest = (project: Project) => {
    setSelectedProject(project);
    setInvestModalOpen(true);
  };

  const handleConfirmInvest = (projectId: string, amount: number) => {
    setToastMessage(`¡Aporte exitoso! Has comprometido $${amount} USDC con custodia escrow en Base Sepolia.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleVoteSuccess = () => {
    setToastMessage('¡Voto emitido y verificado en la asamblea descentralizada!');
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary p-4 rounded-2xl shadow-2xl border border-primary-fixed flex items-center gap-3 animate-slideUp">
          <span className="material-symbols-outlined text-2xl text-primary-fixed">verified</span>
          <div>
            <div className="font-bold text-sm">Transacción Confirmada</div>
            <div className="text-xs text-white/80">{toastMessage}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        onRoleChange={setUserRole}
        bookmarksCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentScreen === 'explorar' && (
          <ExplorarScreen
            onNavigate={handleNavigate}
            onOpenInvestModal={handleOpenInvest}
          />
        )}

        {currentScreen === 'seguimiento' && (
          <SeguimientoScreen
            onNavigate={handleNavigate}
            onOpenInvestModal={handleOpenInvest}
          />
        )}

        {currentScreen === 'hitos-escrow' && (
          <HitosEscrowScreen
            onNavigate={handleNavigate}
            onOpenVoteModal={() => setVoteModalOpen(true)}
          />
        )}

        {currentScreen === 'auditor' && (
          <AuditorScreen
            onNavigate={handleNavigate}
            userRole={userRole}
          />
        )}

        {currentScreen === 'cartera' && (
          <CarteraScreen
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'publicar' && (
          <PublicarScreen
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={handleNavigate}
            onLoginSuccess={(email) => {
              setToastMessage(`Bienvenido, sesión iniciada como ${email || 'usuario'}`);
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shared Modals */}
      <InvestModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        project={selectedProject}
        onConfirmInvest={handleConfirmInvest}
      />

      <VotingModal
        isOpen={voteModalOpen}
        onClose={() => setVoteModalOpen(false)}
        milestoneTitle="Hito 2: Montaje del galpón de bio-fermentación"
        projectTitle="Biofábrica Serrana de Insumos Vivos"
        amount="$5,000 USDC"
        onVoteSuccess={handleVoteSuccess}
      />
    </div>
  );
}
