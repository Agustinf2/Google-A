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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  bookmarksCount,
  currentUser,
  onLogout,
  onConnectWallet,
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

  const getRoleLabel = () => {
    switch (userRole) {
      case 'investor': return 'Inversor: Martina';
      case 'creator': return 'Creador: Mariano P.';
      case 'auditor': return 'Auditor: Ing. Morales';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fef8f3]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(27,67,50,0.04)]">
      {/* Top Banner / Ticker */}
      <div className="w-full bg-[#f2ede8] py-1 px-4 md:px-12 text-center text-[#414844] font-bold text-[11px] tracking-wide flex items-center justify-between">
        <div className="mx-auto flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[#006c48] text-[15px]">rocket_launch</span>
          <span>Capital Semilla (Seed) &amp; Crecimiento (Grow) · Custodia Escrow Inteligente · Rendición por Hitos · Base L2</span>
        </div>

        {/* Quick Role Switcher Pill */}
        <div className="hidden sm:flex items-center gap-1.5 relative">
          <span className="text-[10px] text-[#717973] uppercase tracking-wider">Modo rol:</span>
          <button 
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#012d1d] font-semibold text-[11px] shadow-xs border border-[#c1c8c2]/50 hover:bg-[#f8f3ee] transition-colors"
            title="Cambiar perspectiva de demostración"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c48]"></span>
            <span>{getRoleLabel()}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-6 mt-1 w-52 bg-white rounded-lg shadow-lg border border-[#c1c8c2] py-1 z-50 text-left text-xs">
              <div className="px-3 py-1 font-bold text-[10px] uppercase text-[#717973] border-b border-gray-100">
                Cambiar Vista de Usuario
              </div>
              <button
                onClick={() => { onRoleChange('investor'); onNavigate('cartera'); setRoleMenuOpen(false); }}
                className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#f2ede8] transition-colors ${userRole === 'investor' ? 'font-bold text-[#006c48] bg-[#f8f3ee]' : 'text-[#1d1b19]'}`}
              >
                <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                <div>
                  <div className="font-semibold">Martina (Inversora)</div>
                  <div className="text-[10px] text-gray-500">Panel Mi Cartera & Cobros</div>
                </div>
              </button>
              <button
                onClick={() => { onRoleChange('creator'); onNavigate('hitos-escrow'); setRoleMenuOpen(false); }}
                className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#f2ede8] transition-colors ${userRole === 'creator' ? 'font-bold text-[#006c48] bg-[#f8f3ee]' : 'text-[#1d1b19]'}`}
              >
                <span className="material-symbols-outlined text-[16px]">potted_plant</span>
                <div>
                  <div className="font-semibold">Mariano Peralta (Coop.)</div>
                  <div className="text-[10px] text-gray-500">Gestión de Hitos & Escrow</div>
                </div>
              </button>
              <button
                onClick={() => { onRoleChange('auditor'); onNavigate('auditor'); setRoleMenuOpen(false); }}
                className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#f2ede8] transition-colors ${userRole === 'auditor' ? 'font-bold text-[#006c48] bg-[#f8f3ee]' : 'text-[#1d1b19]'}`}
              >
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                <div>
                  <div className="font-semibold">Ing. Morales (Auditora)</div>
                  <div className="text-[10px] text-gray-500">Dictamen Revisor Colegiado</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('explorar')}
            className="flex items-center gap-2 shrink-0 cursor-pointer text-left focus:outline-none"
          >
            <img 
              alt="Seed & Grow Logo" 
              className="h-8 w-auto object-contain" 
              src={LOGO_URL} 
            />
            <span className="font-bold text-xl text-[#012d1d] tracking-tight">Seed &amp; Grow</span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            <button
              onClick={() => onNavigate('explorar')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentScreen === 'explorar'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              Explorar proyectos
            </button>
            <button
              onClick={() => onNavigate('seguimiento')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentScreen === 'seguimiento'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              Seguimiento
            </button>
            <button
              onClick={() => onNavigate('cartera')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentScreen === 'cartera'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              Mi cartera
            </button>
            <button
              onClick={() => onNavigate('hitos-escrow')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentScreen === 'hitos-escrow'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              <span>Gestión Escrow</span>
              <span className="px-1.5 py-0.2 bg-[#92f7c3] text-[#00734d] text-[10px] rounded-full font-bold">Biofábrica</span>
            </button>
            <button
              onClick={() => onNavigate('gobernanza')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentScreen === 'gobernanza'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
              <span>Gobernanza</span>
            </button>
            <button
              onClick={() => onNavigate('auditor')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentScreen === 'auditor'
                  ? 'bg-[#1b4332] text-white'
                  : 'text-[#414844] hover:bg-[#f2ede8] hover:text-[#1d1b19]'
              }`}
            >
              <span>Panel Auditor</span>
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" title="Expediente en dictamen"></span>
            </button>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 md:gap-3">
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
                    <span className="hidden sm:inline-block text-[10px] bg-white px-1.5 py-0.5 rounded text-[#047857] font-bold border border-[#a7f3d0]">
                      Base
                    </span>
                  </>
                ) : currentUser.type === 'google' ? (
                  <>
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span className="truncate max-w-[120px] font-bold text-[#064e3b]">
                      {currentUser.addressOrEmail}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px] text-[#006c48]">account_circle</span>
                    <span className="truncate max-w-[110px] font-bold">{currentUser.name || currentUser.addressOrEmail}</span>
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

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={copyAddressOrEmail}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f2ede8] text-[#1d1b19] flex items-center justify-between transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Copiar {currentUser.type === 'wallet' ? 'dirección' : 'correo'}</span>
                      </span>
                      {copiedNotification && (
                        <span className="text-[10px] text-[#006c48] font-bold">¡Copiado!</span>
                      )}
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
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border border-[#ece7e2] ${
                currentScreen === 'login'
                  ? 'bg-[#1b4332] text-white'
                  : 'bg-white hover:bg-[#f2ede8] text-[#012d1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] text-[#006c48]">account_balance_wallet</span>
              <span>Conectar / Ingresar</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('publicar')}
            className={`inline-flex items-center justify-center px-3.5 py-2 text-sm font-semibold rounded-lg transition-all shadow-[0_2px_6px_-1px_rgba(27,67,50,0.15)] cursor-pointer ${
              currentScreen === 'publicar'
                ? 'bg-[#012d1d] text-white ring-2 ring-[#92f7c3]'
                : 'bg-[#1b4332] text-white hover:bg-[#012d1d]'
            }`}
          >
            + Publicar proyecto
          </button>

          {/* User Profile Avatar with dropdown toggle */}
          <button
            onClick={() => {
              if (currentScreen === 'cartera') onNavigate('auditor');
              else if (currentScreen === 'auditor') onNavigate('hitos-escrow');
              else onNavigate('cartera');
            }}
            className="w-9 h-9 rounded-full bg-[#ece7e2] hover:bg-[#92f7c3] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title={`Perfil actual: ${getRoleLabel()}`}
          >
            <span className="material-symbols-outlined text-[#012d1d] text-[20px]">account_circle</span>
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
          <button
            onClick={() => { onNavigate('explorar'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8]"
          >
            Explorar proyectos
          </button>
          <button
            onClick={() => { onNavigate('seguimiento'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8]"
          >
            Seguimiento de hitos
          </button>
          <button
            onClick={() => { onNavigate('cartera'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8]"
          >
            Mi cartera (Inversiones)
          </button>
          <button
            onClick={() => { onNavigate('hitos-escrow'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8] flex items-center justify-between"
          >
            <span>Gestión Hitos & Escrow</span>
            <span className="text-xs bg-[#92f7c3] px-2 py-0.5 rounded text-[#00734d] font-bold">Cooperativa</span>
          </button>
          <button
            onClick={() => { onNavigate('gobernanza'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8] flex items-center justify-between"
          >
            <span>Gobernanza &amp; Salud Global</span>
            <span className="text-xs bg-[#c1ecd4] px-2 py-0.5 rounded text-[#006c48] font-bold">Votación</span>
          </button>
          <button
            onClick={() => { onNavigate('auditor'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8] flex items-center justify-between"
          >
            <span>Dictamen Revisor Colegiado</span>
            <span className="text-xs bg-[#ffdad6] px-2 py-0.5 rounded text-[#93000a] font-bold">Auditor</span>
          </button>
          <div className="pt-2 border-t border-[#ece7e2] space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between text-xs bg-[#ecfdf5] p-2.5 rounded-xl border border-[#a7f3d0]">
                <div>
                  <div className="font-bold text-[#065f46] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                    <span>{currentUser.type === 'wallet' ? 'Billetera' : currentUser.type === 'google' ? 'Google' : 'Email'}</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#047857] truncate max-w-[180px]">
                    {currentUser.addressOrEmail}
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-[#ba1a1a] font-bold px-2 py-1 rounded bg-white border border-red-200"
                  >
                    Salir
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                  className="text-sm font-semibold text-[#006c48] flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  <span>Conectar Wallet / Google</span>
                </button>
                <div className="text-xs text-gray-500">
                  {bookmarksCount > 0 && `Guardados: ${bookmarksCount}`}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
