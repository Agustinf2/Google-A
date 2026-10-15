import React, { useState } from 'react';
import { ScreenView, UserRole } from '../types';
import { LOGO_URL } from '../data/mockData';

interface NavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  bookmarksCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

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
          <span className="material-symbols-outlined text-[#006c48] text-[15px]">eco</span>
          <span>Financiamiento colectivo regenerativo y trazable · Rendición comunitaria transparente · Red Base USDC</span>
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
          <button
            onClick={() => onNavigate('login')}
            className={`hidden sm:inline-flex px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'login'
                ? 'bg-[#f2ede8] text-[#012d1d]'
                : 'text-[#1d1b19] hover:bg-[#f2ede8]'
            }`}
          >
            Iniciar sesión
          </button>

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
            onClick={() => { onNavigate('auditor'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1d1b19] hover:bg-[#f2ede8] flex items-center justify-between"
          >
            <span>Dictamen Revisor Colegiado</span>
            <span className="text-xs bg-[#ffdad6] px-2 py-0.5 rounded text-[#93000a] font-bold">Auditor</span>
          </button>
          <div className="pt-2 border-t border-[#ece7e2] flex items-center justify-between">
            <button
              onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
              className="text-sm font-semibold text-[#006c48]"
            >
              Iniciar sesión / Wallet
            </button>
            <div className="text-xs text-gray-500">
              {bookmarksCount > 0 && `Guardados: ${bookmarksCount}`}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
