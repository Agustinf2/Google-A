import React, { useState } from 'react';
import { ScreenView } from '../types';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenLegalFaq?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalFaq }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="w-full bg-[#f8f3ee] mt-10 pt-10 pb-6 shadow-[0_1px_8px_rgba(27,67,50,0.03)] border-t border-[#ece7e2]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">
          {/* Brand & mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('explorar')}>
              <img 
                alt="Seed & Grow Logo" 
                className="h-8 w-auto object-contain" 
                src={LOGO_URL} 
              />
              <span className="font-bold text-xl text-[#012d1d] tracking-tight">Seed &amp; Grow</span>
            </div>
            <p className="text-[15px] leading-relaxed text-[#414844] max-w-sm">
              Plataforma de capital semilla (Seed) y financiamiento colectivo. Conectamos aportantes con proyectos y fundadores innovadores con custodia escrow inteligente, auditoría técnica y rendición transparente por hitos (Grow).
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ede8] text-[#414844] font-bold text-[11px] tracking-wide">
              <span className="material-symbols-outlined text-[#006c48] text-[16px]">verified</span>
              <span>Custodia Escrow Inteligente &amp; Rendición On-Chain</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-bold text-sm text-[#012d1d] mb-4">Navegación</h4>
            <ul className="space-y-2 text-[13px] text-[#414844]">
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Explorar proyectos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seguimiento')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Seguimiento de hitos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cartera')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Mi cartera
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hitos-escrow')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Gestión Escrow (Productor)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gobernanza')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Gobernanza de Proyectos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('auditor')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Panel Auditor Colegiado
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('publicar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Publicar proyecto
                </button>
              </li>
            </ul>
          </div>

          {/* Impact Sectors */}
          <div>
            <h4 className="font-bold text-sm text-[#012d1d] mb-4">Sectores de Impacto</h4>
            <ul className="space-y-2 text-[13px] text-[#414844]">
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Biotecnología &amp; Biofábricas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Energías Limpias &amp; Renovables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Software, Robótica &amp; Tecnología
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Desarrollos Productivos &amp; Suelos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar')} className="hover:text-[#012d1d] transition-colors cursor-pointer text-left">
                  Energía Limpia &amp; Obras Civiles
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#012d1d]">Boletín de Impacto</h4>
            <p className="text-[13px] text-[#414844]">
              Entérate de convocatorias activas, auditorías abiertas e hitos completados de los proyectos.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@ejemplo.org"
                className="w-full px-3 py-2 rounded-lg bg-white text-[#1d1b19] text-xs placeholder:text-[#717973] border border-[#c1c8c2] focus:outline-none focus:ring-1 focus:ring-[#006c48]"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-lg bg-[#012d1d] text-white text-xs font-semibold hover:bg-[#1b4332] transition-colors cursor-pointer"
              >
                Suscribirme
              </button>
            </form>
            {subscribed && (
              <p className="text-xs font-bold text-[#006c48] animate-fade-in">
                ✓ Te has suscrito al boletín oficial de impacto.
              </p>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 border-t border-[#ece7e2] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#414844] text-[11px] font-bold">
          <p>© 2025 Seed &amp; Grow Co-op. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 flex-wrap">
            {onOpenLegalFaq && (
              <button
                onClick={onOpenLegalFaq}
                className="hover:text-[#012d1d] text-[#006c48] transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                <span className="material-symbols-outlined text-[14px]">gavel</span>
                <span>Marco Legal &amp; FAQ</span>
              </button>
            )}
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Seed & Grow opera bajo custodia segregada en contratos inteligentes de red Base y gobernanza colegiada."); }} className="hover:text-[#1d1b19] transition-colors">
              Términos &amp; Gobernanza
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Los datos personales y balances de custodia se resguardan bajo cifrado AES-256."); }} className="hover:text-[#1d1b19] transition-colors">
              Privacidad de Datos
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('seguimiento'); }} className="hover:text-[#1d1b19] transition-colors">
              Metodología de Impacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
