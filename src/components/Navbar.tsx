import React, { useState } from 'react';
import { ScreenView, UserRole, UserAccount } from '../types';
import { LOGO_URL } from '../data/mockData';

interface NavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  bookmarksCount: number;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
  onConnectWallet?: () => void;
  onOpenKycModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  bookmarksCount,
  currentUser,
  onLogout,
  onOpenKycModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [userAccountMenuOpen, setUserAccountMenuOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const copyAddressOrEmail = () => {
    if (currentUser?.addressOrEmail) {
      navigator.clipboard?.writeText(currentUser.addressOrEmail);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  const getRoleInfo = () => {
    switch (userRole) {
      case 'investor':
        return {
          title: 'Inversor: Martina',
          tag: 'Aportante',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          permissionsSummary: 'Aportar capital, votar en gobernanza y custodiar NFTs.',
        };
      case 'creator':
        return {
          title: 'Creador: Mariano P.',
          tag: 'Promotor / Coop',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          permissionsSummary: 'Publicar proyectos, rendir gastos y solicitar desembolsos.',
        };
      case 'auditor':
        return {
          title: 'Auditor: Ing. Morales',
          tag: 'Auditor CIAPC',
          badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
          permissionsSummary: 'Revisión técnica, dictamen notarial y firmas en Firestore.',
        };
    }
  };

  // Role-specific navigation links to prevent navbar overcrowding and enforce role context
  const getNavLinks = () => {
    switch (userRole) {
      case 'investor':
        return [
          { id: 'explorar' as ScreenView, label: 'Explorar proyectos', icon: 'explore' },
          { id: 'cartera' as ScreenView, label: 'Mi cartera', icon: 'account_balance_wallet' },
          { id: 'gobernanza' as ScreenView, label: 'Gobernanza', icon: 'how_to_vote' },
          { id: 'seguimiento' as ScreenView, label: 'Seguimiento', icon: 'visibility' },
        ];
      case 'creator':
        return [
          { id: 'hitos-escrow' as ScreenView, label: 'Gestión Escrow', badge: 'Biofábrica', icon: 'lock' },
          { id: 'seguimiento' as ScreenView, label: 'Seguimiento Lote', icon: 'sensors' },
          { id: 'explorar' as ScreenView, label: 'Explorar proyectos', icon: 'explore' },
          { id: 'gobernanza' as ScreenView, label: 'Asamblea Votación', icon: 'how_to_vote' },
        ];
      case 'auditor':
        return [
          { id: 'auditor' as ScreenView, label: 'Mesa Auditoría', badge: 'Firestore', icon: 'gavel' },
          { id: 'hitos-escrow' as ScreenView, label: 'Hitos a Auditar', icon: 'lock' },
          { id: 'seguimiento' as ScreenView, label: 'Expediente & Docs', icon: 'description' },
          { id: 'gobernanza' as ScreenView, label: 'Salud de Lotes', icon: 'how_to_vote' },
        ];
    }
  };

  // Dynamic Right CTA button strictly according to active role
  const getRoleCtaButton = () => {
    switch (userRole) {
      case 'creator':
        return {
          label: '+ Publicar proyecto',
          screen: 'publicar' as ScreenView,
          icon: 'add_circle',
          className:
            currentScreen === 'publicar'
              ? 'bg-[#012d1d] text-white ring-2 ring-[#92f7c3]'
              : 'bg-[#1b4332] text-white hover:bg-[#012d1d]',
        };
      case 'auditor':
        return {
          label: 'Firmar Dictamen',
          screen: 'auditor' as ScreenView,
          icon: 'draw',
          className:
            currentScreen === 'auditor'
              ? 'bg-[#006c48] text-white ring-2 ring-[#92f7c3]'
              : 'bg-[#006c48] text-white hover:bg-[#012d1d]',
        };
      case 'investor':
      default:
        return {
          label: 'Mi Cartera & NFTs',
          screen: 'cartera' as ScreenView,
          icon: 'account_balance_wallet',
          className:
            currentScreen === 'cartera'
              ? 'bg-[#012d1d] text-white ring-2 ring-[#92f7c3]'
              : 'bg-[#1b4332] text-white hover:bg-[#012d1d]',
        };
    }
  };

  const navLinks = getNavLinks();
  const ctaButton = getRoleCtaButton();
  const roleInfo = getRoleInfo();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fef8f3]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(27,67,50,0.04)]">
      {/* Top Banner / Ticker with Role Indicator */}
      <div className="w-full bg-[#f2ede8] py-1 px-4 md:px-8 text-center text-[#414844] font-bold text-[11px] tracking-wide flex items-center justify-between border-b border-[#e2dcd6] overflow-hidden">
        <div className="flex items-center gap-2 truncate min-w-0 pr-2">
          <span className="material-symbols-outlined text-[#006c48] text-[15px] shrink-0">rocket_launch</span>
          <span className="truncate">Seed &amp; Grow · Custodia Escrow Inteligente · Base L2</span>
        </div>

        {/* Quick Role Switcher Pill in Top Banner */}
        <div className="flex items-center gap-2 relative shrink-0">
          <span className="text-[10px] text-[#717973] uppercase tracking-wider hidden md:inline">
            Modo rol:
          </span>
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#012d1d] font-bold text-[11px] shadow-xs border border-[#c1c8c2] hover:bg-[#f8f3ee] transition-colors cursor-pointer"
            title="Cambiar perspectiva de rol y permisos"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                userRole === 'investor'
                  ? 'bg-emerald-500'
                  : userRole === 'creator'
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
            />
            <span>{roleInfo.title}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-7 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#c1c8c2] py-2 z-50 text-left text-xs animate-scaleUp">
              <div className="px-3 py-1 font-bold text-[10px] uppercase text-[#717973] border-b border-gray-100 flex items-center justify-between">
                <span>Cambiar Rol y Permisos</span>
                <span className="material-symbols-outlined text-xs">tune</span>
              </div>

              {/* Inversor Option */}
              <button
                onClick={() => {
                  onRoleChange('investor');
                  onNavigate('cartera');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#f2ede8] transition-colors cursor-pointer ${
                  userRole === 'investor' ? 'font-bold text-[#006c48] bg-emerald-50/80' : 'text-[#1d1b19]'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Martina (Inversora)</span>
                    {userRole === 'investor' && <span className="text-[10px] text-emerald-600 font-extrabold">✓ Activo</span>}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">
                    Permiso: Aportar USDC, votar hitos y gestionar cartera NFT.
                  </div>
                </div>
              </button>

              {/* Creador Option */}
              <button
                onClick={() => {
                  onRoleChange('creator');
                  onNavigate('hitos-escrow');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#f2ede8] transition-colors cursor-pointer ${
                  userRole === 'creator' ? 'font-bold text-[#006c48] bg-amber-50/80' : 'text-[#1d1b19]'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm">potted_plant</span>
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Mariano Peralta (Creador)</span>
                    {userRole === 'creator' && <span className="text-[10px] text-amber-600 font-extrabold">✓ Activo</span>}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">
                    Permiso: Publicar proyectos, subir evidencias y pedir desembolsos.
                  </div>
                </div>
              </button>

              {/* Auditor Option */}
              <button
                onClick={() => {
                  onRoleChange('auditor');
                  onNavigate('auditor');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-[#f2ede8] transition-colors cursor-pointer ${
                  userRole === 'auditor' ? 'font-bold text-[#006c48] bg-blue-50/80' : 'text-[#1d1b19]'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm">gavel</span>
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Ing. Morales (Auditora)</span>
                    {userRole === 'auditor' && <span className="text-[10px] text-blue-600 font-extrabold">✓ Activo</span>}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">
                    Permiso: Peritaje en sitio y Firma Digital en Firestore DB.
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-18 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand & Dynamic Nav Links */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <button
            onClick={() => onNavigate(currentUser ? 'explorar' : 'landing')}
            className="flex items-center gap-2 shrink-0 cursor-pointer text-left focus:outline-none"
            title="Ir a inicio / portada"
          >
            <img alt="Seed & Grow Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
            <span className="font-bold text-xl text-[#012d1d] tracking-tight">Seed &amp; Grow</span>
          </button>

          {/* Role-tailored Nav Links: Never overcrowded */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`px-1.5 py-0.2 text-[9px] rounded-full font-bold ${
                        link.badge === 'Firestore'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-[#92f7c3] text-[#00734d]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right CTA Actions: Dynamic based on Active Role */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Main Bar Role Indicator Pill (Fast switcher) */}
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-bold text-xs border transition cursor-pointer shadow-2xs shrink-0 whitespace-nowrap ${
              userRole === 'investor'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                : userRole === 'creator'
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100'
            }`}
            title="Clic para cambiar de rol y ver sus permisos"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                userRole === 'investor'
                  ? 'bg-emerald-500'
                  : userRole === 'creator'
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
            />
            <span>{userRole === 'investor' ? 'Rol: Inversor' : userRole === 'creator' ? 'Rol: Creador' : 'Rol: Auditor'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {/* KYC Status Badge / Quick Trigger */}
          {currentUser && (
            currentUser.kycStatus === 'verified' ? (
              <span
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 shrink-0"
                title="Identidad verificada conforme a normativa CNV y UIF (Ley 25.246)"
              >
                <span className="material-symbols-outlined text-sm text-emerald-700">verified</span>
                <span>KYC Verificado</span>
              </span>
            ) : (
              <button
                onClick={onOpenKycModal}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300 hover:bg-amber-200 transition cursor-pointer shrink-0"
                title="Completa la validación requerida por UIF para invertir"
              >
                <span className="material-symbols-outlined text-sm text-amber-700">badge</span>
                <span>Validar KYC/UIF</span>
              </button>
            )
          )}

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserAccountMenuOpen(!userAccountMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-semibold hover:bg-[#d1fae5] transition cursor-pointer shadow-xs"
                title="Cuenta conectada"
              >
                {currentUser.type === 'wallet' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0"></span>
                    <span className="font-mono font-bold">
                      {currentUser.addressOrEmail.length > 12
                        ? `${currentUser.addressOrEmail.slice(0, 6)}...${currentUser.addressOrEmail.slice(-4)}`
                        : currentUser.addressOrEmail}
                    </span>
                  </>
                ) : currentUser.type === 'google' ? (
                  <>
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="truncate max-w-[110px] font-bold text-[#064e3b]">
                      {currentUser.addressOrEmail}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px] text-[#006c48]">account_circle</span>
                    <span className="truncate max-w-[100px] font-bold">{currentUser.name || currentUser.addressOrEmail}</span>
                  </>
                )}
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </button>

              {/* Account Dropdown Menu */}
              {userAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#ece7e2] p-3 z-50 animate-fadeIn space-y-3">
                  <div className="p-2.5 rounded-xl bg-[#f8f6f2] border border-[#ece7e2] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span className="font-semibold uppercase tracking-wider">
                        {currentUser.type === 'wallet' ? 'Billetera Web3' : currentUser.type === 'google' ? 'Cuenta Google' : 'Cuenta Email'}
                      </span>
                      <span className="text-[10px] bg-[#92f7c3] text-[#006c48] px-1.5 py-0.2 rounded font-bold">
                        {currentUser.network || 'Base Sepolia'}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#1d1b19] break-all select-all">
                      {currentUser.addressOrEmail}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-gray-600">Saldo disponible:</span>
                      <span className="font-mono font-bold text-xs text-[#006c48]">
                        ${currentUser.balanceUSDC?.toLocaleString() || '3,450'} USDC
                      </span>
                    </div>
                  </div>

                  {/* KYC Verification status row */}
                  {currentUser.kycStatus === 'verified' ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
                        <span>KYC / AML: Verificado</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-white px-1.5 py-0.2 rounded border border-emerald-200">
                        UIF OK
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setUserAccountMenuOpen(false);
                        onOpenKycModal && onOpenKycModal();
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 flex items-center justify-between transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-600 text-base">badge</span>
                        <div>
                          <div className="font-bold text-xs">Validar Identidad KYC / UIF</div>
                          <div className="text-[10px] text-amber-800">Requerido para invertir en lotes</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-xs text-amber-700">arrow_forward</span>
                    </button>
                  )}

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={copyAddressOrEmail}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f2ede8] text-[#1d1b19] flex items-center justify-between transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Copiar {currentUser.type === 'wallet' ? 'dirección' : 'correo'}</span>
                      </span>
                      {copiedNotification && <span className="text-[10px] text-[#006c48] font-bold">¡Copiado!</span>}
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('cartera');
                        setUserAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f2ede8] text-[#1d1b19] flex items-center gap-2 transition cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                      <span>Ir a Mi Cartera &amp; Cobros</span>
                    </button>

                    {onLogout && (
                      <button
                        onClick={() => {
                          onLogout();
                          setUserAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-[#ba1a1a] flex items-center gap-2 transition cursor-pointer font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        <span>Cerrar sesión</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-[#ece7e2] ${
                currentScreen === 'login' ? 'bg-[#1b4332] text-white' : 'bg-white hover:bg-[#f2ede8] text-[#012d1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#006c48]">account_balance_wallet</span>
              <span>Ingresar</span>
            </button>
          )}

          {/* DYNAMIC CTA BUTTON BASED ON ACTIVE ROLE */}
          <button
            onClick={() => onNavigate(ctaButton.screen)}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer shrink-0 whitespace-nowrap ${ctaButton.className}`}
          >
            <span className="material-symbols-outlined text-sm">{ctaButton.icon}</span>
            <span>{ctaButton.label}</span>
          </button>

          {/* Role Avatar with Role Switcher Quick trigger */}
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#ece7e2] hover:bg-[#92f7c3] flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-outline-variant/30"
            title={`Rol actual: ${roleInfo.title} (Clic para cambiar permisos)`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                userRole === 'investor' ? 'text-emerald-700' : userRole === 'creator' ? 'text-amber-700' : 'text-blue-700'
              }`}
            >
              {userRole === 'investor' ? 'account_circle' : userRole === 'creator' ? 'agriculture' : 'gavel'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1d1b19] hover:bg-[#f2ede8]"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fef8f3] border-b border-[#ece7e2] px-4 py-3 space-y-2 shadow-lg">
          <div className="p-2.5 rounded-xl bg-white border border-[#ece7e2] text-xs space-y-1">
            <span className="font-bold text-gray-500 uppercase text-[10px]">Rol Actual:</span>
            <div className="font-bold text-[#012d1d] flex items-center justify-between">
              <span>{roleInfo.title}</span>
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="text-primary text-[11px] underline font-bold"
              >
                Cambiar Rol
              </button>
            </div>
            <div className="text-[10px] text-gray-500">{roleInfo.permissionsSummary}</div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1d1b19] hover:bg-[#f2ede8] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] bg-[#92f7c3] text-[#00734d] px-1.5 py-0.5 rounded font-bold">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#ece7e2]">
            <button
              onClick={() => {
                onNavigate(ctaButton.screen);
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${ctaButton.className}`}
            >
              <span className="material-symbols-outlined text-sm">{ctaButton.icon}</span>
              <span>{ctaButton.label}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
