import { useState } from 'react';
import { ScreenView, UserRole, Project, Investment, UserAccount, KycData } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingScreen } from './components/LandingScreen';
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
import { KycModal } from './components/KycModal';
import { LegalFaqModal } from './components/LegalFaqModal';
import { HelpBotModal } from './components/HelpBotModal';
import { INITIAL_PROJECTS, INITIAL_INVESTMENTS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('explorar');
  
  // Persist active role in localStorage so user role choice survives reload
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('seedgrow_active_role');
      if (saved === 'creator' || saved === 'auditor' || saved === 'investor') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'investor';
  });

  const [investModalOpen, setInvestModalOpen] = useState<boolean>(false);
  const [kycModalOpen, setKycModalOpen] = useState<boolean>(false);
  const [legalFaqModalOpen, setLegalFaqModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[2]); // Default Raíz Circular
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authenticated User State (supports Web3 Wallet or Google)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    type: 'google',
    addressOrEmail: 'agusfau@gmail.com',
    name: 'Martina Gómez',
    network: 'Base Sepolia',
    balanceUSDC: 3450,
    kycStatus: 'unverified',
  });

  const handleKycSuccess = (data: KycData) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: data.fullName,
        kycStatus: 'verified',
        kycData: data,
      });
    }
    setToastMessage('¡Verificación KYC/UIF aprobada con éxito! Perfil de inversor legalmente acreditado.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Role change handler with persistent storage & context navigation
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    try {
      localStorage.setItem('seedgrow_active_role', newRole);
    } catch {}

    if (newRole === 'investor') {
      setToastMessage('Modo Inversor (Martina) activado: Permisos para aportar USDC, votar hitos y custodiar NFTs.');
      if (currentScreen === 'publicar') {
        setCurrentScreen('cartera');
      }
    } else if (newRole === 'creator') {
      setToastMessage('Modo Creador (Mariano Peralta) activado: Permisos para publicar proyectos y rendir hitos escrow.');
      if (currentScreen === 'cartera') {
        setCurrentScreen('hitos-escrow');
      }
    } else if (newRole === 'auditor') {
      setToastMessage('Modo Auditor (Ing. Morales) activado: Permisos para peritaje técnico y firma digital en Firestore.');
      if (currentScreen === 'publicar' || currentScreen === 'cartera') {
        setCurrentScreen('auditor');
      }
    }
    setTimeout(() => setToastMessage(null), 5000);
  };

  // NFT & Smart Contract Explorer Modal state
  const [nftModalOpen, setNftModalOpen] = useState<boolean>(false);
  const [selectedInvestmentForNft, setSelectedInvestmentForNft] = useState<Investment | null>(INITIAL_INVESTMENTS[0]);
  const [nftModalTab, setNftModalTab] = useState<'nft' | 'contract'>('nft');

  const handleNavigate = (screen: ScreenView) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInvest = (project: Project) => {
    if (!currentUser) {
      setCurrentScreen('login');
      setToastMessage('Por normativa de la CNV, debes autenticarte para participar en rondas de financiamiento.');
      setTimeout(() => setToastMessage(null), 4500);
      return;
    }

    if (currentUser.kycStatus !== 'verified') {
      setSelectedProject(project);
      setKycModalOpen(true);
      setToastMessage('Requisito UIF (Ley 25.246): Completa la validación KYC para autorizar aportes en escrow.');
      setTimeout(() => setToastMessage(null), 5000);
      return;
    }

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
        onRoleChange={handleRoleChange}
        bookmarksCount={2}
        currentUser={currentUser}
        onOpenKycModal={() => setKycModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          setCurrentScreen('landing');
          setToastMessage('Has cerrado sesión correctamente. Mostrando portada pública informativa.');
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Role Permissions Indicator & Switcher Strip */}
      <div className="mt-[102px] bg-[#f5f1eb] border-b border-[#e2ddd6] py-2 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#64748b] uppercase text-[10px] tracking-wider">
              Permisos Activos:
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-xs ${
                userRole === 'investor'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : userRole === 'creator'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  userRole === 'investor'
                    ? 'bg-emerald-600'
                    : userRole === 'creator'
                    ? 'bg-amber-600'
                    : 'bg-blue-600'
                }`}
              />
              {userRole === 'investor'
                ? 'Inversor: Martina'
                : userRole === 'creator'
                ? 'Creador: Mariano Peralta'
                : 'Auditor: Ing. Morales'}
            </span>
            <span className="text-[#64748b] hidden md:inline">·</span>
            <span className="text-[#334155] font-medium hidden md:inline">
              {userRole === 'investor'
                ? 'Aportar capital USDC, votar asamblea y custodiar NFTs. (Sin botón de publicar)'
                : userRole === 'creator'
                ? 'Publicar nuevos proyectos, rendir gastos y solicitar desembolsos de hitos.'
                : 'Mesa de peritaje técnico y Firma Digital de Auditoría en Firestore DB.'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <span className="text-[#64748b] text-[11px] font-medium">Cambiar vista:</span>
            <button
              onClick={() => handleRoleChange('investor')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                userRole === 'investor'
                  ? 'bg-[#1b4332] text-white shadow-2xs'
                  : 'bg-white text-[#414844] hover:bg-emerald-50 border border-[#c1c8c2]'
              }`}
            >
              Inversor
            </button>
            <button
              onClick={() => handleRoleChange('creator')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                userRole === 'creator'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-white text-[#414844] hover:bg-amber-50 border border-[#c1c8c2]'
              }`}
            >
              Creador
            </button>
            <button
              onClick={() => handleRoleChange('auditor')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                userRole === 'auditor'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-white text-[#414844] hover:bg-blue-50 border border-[#c1c8c2]'
              }`}
            >
              Auditor
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentScreen === 'landing' && (
          <LandingScreen
            onNavigate={handleNavigate}
            onOpenLogin={() => handleNavigate('login')}
            onOpenKycModal={() => setKycModalOpen(true)}
            onOpenLegalFaq={() => setLegalFaqModalOpen(true)}
            currentUser={currentUser}
          />
        )}

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
            onRoleChange={handleRoleChange}
          />
        )}

        {currentScreen === 'auditor' && (
          <AuditorScreen
            onNavigate={handleNavigate}
            userRole={userRole}
            currentUser={currentUser}
            onRoleChange={handleRoleChange}
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
            onRoleChange={handleRoleChange}
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
            onRoleChange={handleRoleChange}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onLogout={() => {
              setCurrentUser(null);
              setCurrentScreen('landing');
              setToastMessage('Has cerrado sesión correctamente');
              setTimeout(() => setToastMessage(null), 3500);
            }}
            onLoginSuccess={(user) => {
              setCurrentUser({
                ...user,
                kycStatus: user.kycStatus || 'unverified',
              });
              setCurrentScreen('explorar');
              const label = user.type === 'wallet' ? 'Billetera Web3' : user.type === 'google' ? 'Google' : 'Email';
              setToastMessage(`¡Conexión exitosa! Sesión iniciada con ${label} (${user.addressOrEmail})`);
              setTimeout(() => setToastMessage(null), 5000);
            }}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalFaq={() => setLegalFaqModalOpen(true)}
      />

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

      <KycModal
        isOpen={kycModalOpen}
        onClose={() => setKycModalOpen(false)}
        currentUser={currentUser}
        onKycSuccess={handleKycSuccess}
      />

      <LegalFaqModal
        isOpen={legalFaqModalOpen}
        onClose={() => setLegalFaqModalOpen(false)}
      />

      {/* Floating Interactive AI Assistant (SeedBot) */}
      <HelpBotModal
        onNavigate={handleNavigate}
        onOpenLegalFaq={() => setLegalFaqModalOpen(true)}
      />
    </div>
  );
}
