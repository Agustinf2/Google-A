import { useState } from 'react';
import { ScreenView, UserRole, Project, Investment, UserAccount } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExplorarScreen } from './components/ExplorarScreen';
import { SeguimientoScreen } from './components/SeguimientoScreen';
import { HitosEscrowScreen } from './components/HitosEscrowScreen';
import { AuditorScreen } from './components/AuditorScreen';
import { CarteraScreen } from './components/CarteraScreen';
import { PublicarScreen } from './components/PublicarScreen';
import { LoginScreen } from './components/LoginScreen';
import { GobernanzaScreen } from './components/GobernanzaScreen';
import { InvestModal, VotingModal } from './components/Modals';
import { NftContractModal } from './components/NftContractModal';
import { INITIAL_PROJECTS, INITIAL_INVESTMENTS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('explorar');
  const [userRole, setUserRole] = useState<UserRole>('investor');
  const [investModalOpen, setInvestModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[2]); // Default Raíz Circular
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authenticated User State (supports Web3 Wallet or Google)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    type: 'google',
    addressOrEmail: 'agusfau@gmail.com',
    name: 'agusfau',
    network: 'Base Sepolia',
    balanceUSDC: 3450,
  });

  // NFT & Smart Contract Explorer Modal state
  const [nftModalOpen, setNftModalOpen] = useState<boolean>(false);
  const [selectedInvestmentForNft, setSelectedInvestmentForNft] = useState<Investment | null>(INITIAL_INVESTMENTS[0]);
  const [nftModalTab, setNftModalTab] = useState<'nft' | 'contract'>('nft');

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
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setToastMessage('Has cerrado sesión correctamente');
          setTimeout(() => setToastMessage(null), 3500);
        }}
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
            onOpenContractModal={() => {
              setNftModalTab('contract');
              setNftModalOpen(true);
            }}
          />
        )}

        {currentScreen === 'hitos-escrow' && (
          <HitosEscrowScreen
            onNavigate={handleNavigate}
            onOpenVoteModal={() => setVoteModalOpen(true)}
            userRole={userRole}
            onRoleChange={setUserRole}
          />
        )}

        {currentScreen === 'auditor' && (
          <AuditorScreen
            onNavigate={handleNavigate}
            userRole={userRole}
            currentUser={currentUser}
            onRoleChange={setUserRole}
          />
        )}

        {currentScreen === 'gobernanza' && (
          <GobernanzaScreen
            onNavigate={handleNavigate}
            onOpenVoteModal={() => setVoteModalOpen(true)}
            onOpenContractModal={() => {
              setNftModalTab('contract');
              setNftModalOpen(true);
            }}
            userRole={userRole}
            onRoleChange={setUserRole}
          />
        )}

        {currentScreen === 'cartera' && (
          <CarteraScreen
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onOpenNftModal={(inv) => {
              setSelectedInvestmentForNft(inv);
              setNftModalTab('nft');
              setNftModalOpen(true);
            }}
          />
        )}

        {currentScreen === 'publicar' && (
          <PublicarScreen
            onNavigate={handleNavigate}
            userRole={userRole}
            onRoleChange={setUserRole}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onLogout={() => {
              setCurrentUser(null);
              setToastMessage('Has cerrado sesión correctamente');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              const label = user.type === 'wallet' ? 'Billetera Web3' : user.type === 'google' ? 'Google' : 'Email';
              setToastMessage(`¡Conexión exitosa! Sesión iniciada con ${label} (${user.addressOrEmail})`);
              setTimeout(() => setToastMessage(null), 5000);
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
        currentUser={currentUser}
      />

      <VotingModal
        isOpen={voteModalOpen}
        onClose={() => setVoteModalOpen(false)}
        milestoneTitle="Hito 2: Montaje del galpón de bio-fermentación"
        projectTitle="Biofábrica Serrana de Insumos Vivos"
        amount="$5,000 USDC"
        onVoteSuccess={handleVoteSuccess}
        currentUser={currentUser}
      />

      <NftContractModal
        isOpen={nftModalOpen}
        onClose={() => setNftModalOpen(false)}
        investment={selectedInvestmentForNft}
        initialTab={nftModalTab}
      />
    </div>
  );
}
