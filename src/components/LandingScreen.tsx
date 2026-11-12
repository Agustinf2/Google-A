import React, { useState } from 'react';
import { ScreenView, UserAccount } from '../types';
import { INITIAL_PROJECTS, LOGO_URL } from '../data/mockData';
import { LEGAL_FAQS } from '../data/legalFaqData';

interface LandingScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenLogin: () => void;
  onOpenKycModal: () => void;
  onOpenLegalFaq?: () => void;
  currentUser?: UserAccount | null;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigate,
  onOpenLogin,
  onOpenKycModal,
  onOpenLegalFaq,
  currentUser,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#012d1d] via-[#004b32] to-[#012d1d] text-white p-8 sm:p-12 lg:p-16 border border-[#006c48]/40 shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#92f7c3]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#006c48]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#92f7c3] animate-pulse" />
            <span>Financiamiento Colectivo · Custodia Escrow Base L2 · Argentina</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Capital Semilla con Custodia Escrow Inteligente.
          </h1>

          <p className="text-sm sm:text-lg text-white/85 leading-relaxed font-normal max-w-2xl">
            Conectamos inversores con proyectos productivos y startups mediante rendición de cuentas transparente por hitos verificados y auditoría técnica colegiada.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            {currentUser ? (
              <button
                onClick={() => onNavigate('explorar')}
                className="px-6 py-3.5 rounded-2xl bg-[#92f7c3] hover:bg-[#7be6af] text-[#012d1d] font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">explore</span>
                <span>Explorar Catálogo de Proyectos</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="px-6 py-3.5 rounded-2xl bg-[#92f7c3] hover:bg-[#7be6af] text-[#012d1d] font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>Iniciar Sesión para Ver Proyectos</span>
                </button>
                <button
                  onClick={() => onNavigate('explorar')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Probar Vista Pública (Demo)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </>
            )}

            <a
              href="/manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
              download="manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#92f7c3]">gavel</span>
              <span>Marco Legal Argentina (PDF)</span>
            </a>

            {onOpenLegalFaq && (
              <button
                onClick={onOpenLegalFaq}
                className="px-4 py-3.5 rounded-2xl bg-[#006c48]/50 hover:bg-[#006c48]/70 border border-[#92f7c3]/40 text-[#92f7c3] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">help</span>
                <span>FAQ Legal</span>
              </button>
            )}
          </div>

          {/* Trust badges strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#92f7c3]">lock</span>
              <span>Escrow Segregado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#92f7c3]">gavel</span>
              <span>Auditoría Colegiada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#92f7c3]">badge</span>
              <span>Verificación KYC/UIF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#92f7c3]">hub</span>
              <span>Smart Contracts Base</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do in Seed & Grow (The 3 Personas) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary">
            Arquitectura de Roles &amp; Permisos
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            ¿Qué puedes hacer en Seed &amp; Grow?
          </h2>
          <p className="text-xs sm:text-sm text-outline">
            Diseñado para conectar a los tres actores esenciales del financiamiento productivo en Argentina
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Inversor */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 hover:border-emerald-500/50 transition-all shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                  Rol Inversor · Martina
                </span>
                <h3 className="text-lg font-black text-on-surface">
                  Invertir con Seguridad Escrow
                </h3>
              </div>
              <p className="text-xs text-outline leading-relaxed">
                Tus fondos no van a la cuenta corriente del promotor. Se depositan en un contrato inteligente en Base Sepolia que solo libera fondos contra hitos cumplidos.
              </p>
              <ul className="space-y-1.5 text-xs text-on-surface-variant font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  <span>Aportar en stablecoin USDC o transferencia ARS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  <span>Votar en asambleas descentralizadas de hitos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  <span>Custodiar NFTs de participación en tu wallet</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('cartera')}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Ver Panel de Cartera &amp; Gráficos</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Creador */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 hover:border-amber-500/50 transition-all shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">agriculture</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                  Rol Creador · Mariano Peralta
                </span>
                <h3 className="text-lg font-black text-on-surface">
                  Financiar tu Proyecto o Empresa
                </h3>
              </div>
              <p className="text-xs text-outline leading-relaxed">
                Postula tu biofábrica, desarrollo industrial, proyecto de energías limpias o desarrollo tecnológico. Estructura el presupuesto en tramos (hitos) y rinde cuentas con facturas y fotos en IPFS.
              </p>
              <ul className="space-y-1.5 text-xs text-on-surface-variant font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-amber-600">check_circle</span>
                  <span>Publicar proyectos y metas de financiamiento</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-amber-600">check_circle</span>
                  <span>Cargar comprobantes contables y remitos a IPFS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-amber-600">check_circle</span>
                  <span>Solicitar desembolsos por tramos a medida que avanzas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('hitos-escrow')}
              className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Ver Gestión Escrow del Promotor</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Auditor */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 hover:border-blue-500/50 transition-all shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">gavel</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                  Panel Pericial · Perito Colegiado
                </span>
                <h3 className="text-lg font-black text-on-surface">
                  Peritaje &amp; Firma Digital
                </h3>
              </div>
              <p className="text-xs text-outline leading-relaxed">
                Como perito técnico colegiado (ingeniero industrial, civil, en sistemas, ambiental o contador público), verificas el avance real y emites el dictamen digital que autoriza el desbloqueo en el smart contract.
              </p>
              <ul className="space-y-1.5 text-xs text-on-surface-variant font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-blue-600">check_circle</span>
                  <span>Verificar evidencias técnicas, físicas o documentales</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-blue-600">check_circle</span>
                  <span>Firma Digital con validez legal y matrícula habilitada</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-blue-600">check_circle</span>
                  <span>Condición técnica del multi-sig 3/5 en Base L2</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('auditor')}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Ver Mesa de Auditoría Colegiada</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Protected Project Catalog (Gated Content Explainer) */}
      <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-lg">lock</span>
              </span>
              <span className="font-bold text-xs uppercase tracking-wider text-primary">
                Acceso a Catálogo de Proyectos
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight mt-1">
              ¿Dónde puedo entrar y mirar los proyectos?
            </h3>
            <p className="text-xs text-outline mt-1 max-w-xl">
              Por disposiciones de la CNV (Comisión Nacional de Valores) sobre oferta privada y protección de secretos comerciales, los expedientes completos y la posibilidad de fondear requieren usuario registrado.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {currentUser ? (
              <button
                onClick={() => onNavigate('explorar')}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">explore</span>
                <span>Ir al Catálogo Abierto</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>Iniciar Sesión para Desbloquear</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Teaser Cards (Simulating gated view with blur/lock) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {INITIAL_PROJECTS.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-xs relative group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#92f7c3] text-[#012d1d]">
                    {p.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-white/80">{p.location}</div>
                  <h4 className="font-extrabold text-base leading-tight truncate">{p.title}</h4>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-outline line-clamp-2">{p.description}</p>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-outline">Recaudado</span>
                    <span className="text-primary font-bold">
                      ${p.fundedAmount.toLocaleString()} / ${p.goalAmount.toLocaleString()} USDC
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${p.percentage}%` }} />
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-outline">
                    {p.modalityDetail}
                  </span>
                  <button
                    onClick={() => {
                      if (currentUser) {
                        onNavigate('explorar');
                      } else {
                        onOpenLogin();
                      }
                    }}
                    className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{currentUser ? 'Ver Proyecto' : 'Desbloquear'}</span>
                    <span className="material-symbols-outlined text-xs">
                      {currentUser ? 'arrow_forward' : 'lock'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Escrow Works in 4 Steps */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary-fixed text-secondary">
            Transparencia Blockchain
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            El Ciclo Escrow en 4 Pasos
          </h2>
          <p className="text-xs sm:text-sm text-outline">
            Garantía fiduciaria y determinismo criptográfico en la red Base Sepolia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary font-black text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-extrabold text-sm text-on-surface">Estructuración</h4>
            <p className="text-xs text-outline leading-relaxed">
              El creador postula su proyecto y define el cronograma de hitos verificables con presupuesto específico.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary font-black text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-extrabold text-sm text-on-surface">Custodia Segregada</h4>
            <p className="text-xs text-outline leading-relaxed">
              Los inversores aportan fondos que quedan bloqueados en el contrato escrow. Se emite un NFT de participación.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary font-black text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-extrabold text-sm text-on-surface">Auditoría Colegiada</h4>
            <p className="text-xs text-outline leading-relaxed">
              El perito técnico matriculado según la disciplina realiza la inspección técnica fáctica y firma el dictamen digital en Firestore.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary font-black text-sm flex items-center justify-center">
              4
            </div>
            <h4 className="font-extrabold text-sm text-on-surface">Liberación Gradual</h4>
            <p className="text-xs text-outline leading-relaxed">
              La asamblea de inversores vota la conformidad del tramo y el contrato transfiere los fondos al promotor.
            </p>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory FAQ Section */}
      <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <span className="material-symbols-outlined text-lg">gavel</span>
              </span>
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                Marco Legal Argentina · Preguntas Frecuentes
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Cumplimiento Normativo &amp; Seguridad Jurídica
            </h2>
            <p className="text-xs sm:text-sm text-outline max-w-2xl leading-relaxed">
              Resolvemos las principales dudas sobre la validez del escrow, los fideicomisos de garantía y la sujeción a las normativas de la CNV, UIF y ARCA.
            </p>
          </div>

          {onOpenLegalFaq && (
            <button
              onClick={onOpenLegalFaq}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Ver las 8 Preguntas Legales</span>
            </button>
          )}
        </div>

        {/* Top 4 FAQs preview in accordion */}
        <div className="space-y-3">
          {LEGAL_FAQS.slice(0, 4).map((faq) => {
            const isExpanded = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between text-left gap-3 hover:bg-surface-container-high/30 transition cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {faq.badge}
                      </span>
                      <span className="text-[10px] text-outline font-semibold">
                        {faq.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-on-surface leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-outline leading-relaxed">
                      {faq.shortAnswer}
                    </p>
                  </div>

                  <span
                    className={`material-symbols-outlined text-primary transition-transform duration-200 shrink-0 text-xl mt-1 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-outline-variant/20 bg-surface-container-high/10 space-y-3">
                    <p className="text-xs text-on-surface-variant leading-relaxed font-normal">
                      {faq.detailedAnswer}
                    </p>
                    <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/20 text-[11px] text-outline flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">balance</span>
                      <div>
                        <strong className="text-on-surface font-semibold">Fundamento Normativo: </strong>
                        <span>{faq.legalReference}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Regulatory footer banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/5 via-emerald-800/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-on-surface">
                Manual de Cumplimiento Regulatorio Argentina (Edición 2025)
              </h4>
              <p className="text-[11px] text-outline">
                Documento técnico legal completo de 4 páginas con cuadro comparativo de normativas y artículos citados.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {onOpenLegalFaq && (
              <button
                onClick={onOpenLegalFaq}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-primary">search</span>
                <span>Explorar FAQ</span>
              </button>
            )}
            <a
              href="/manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
              download="manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Descargar PDF</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
