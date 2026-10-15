import React, { useState } from 'react';
import { ScreenView, Investment } from '../types';
import { INITIAL_INVESTMENTS } from '../data/mockData';

interface CarteraScreenProps {
  onNavigate: (screen: ScreenView) => void;
}

export const CarteraScreen: React.FC<CarteraScreenProps> = ({ onNavigate }) => {
  const [filterType, setFilterType] = useState<string>('todos');
  const [claimToast, setClaimToast] = useState<string | null>(null);

  const filteredInvestments = INITIAL_INVESTMENTS.filter((inv) => {
    if (filterType === 'equity') return inv.type.toLowerCase().includes('equity') || inv.type.toLowerCase().includes('participación');
    if (filterType === 'prestamo') return inv.type.toLowerCase().includes('préstamo');
    return true;
  });

  const totalInvested = INITIAL_INVESTMENTS.reduce((acc, curr) => acc + curr.investedAmount, 0);

  const handleClaim = (inv: Investment) => {
    setClaimToast(`Cobro de dividendos/cuota de ${inv.title} procesado exitosamente en tu wallet.`);
    setTimeout(() => setClaimToast(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {claimToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary p-4 rounded-2xl shadow-2xl border border-primary-fixed flex items-center gap-3 animate-slideUp">
          <span className="material-symbols-outlined text-2xl text-primary-fixed">paid</span>
          <div className="text-xs font-bold">{claimToast}</div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary">
              Portafolio de Impacto
            </span>
            <span className="text-xs text-outline font-medium">Billetera Conectada</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Mi Cartera de Inversiones Regenerativas
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1">
            Seguimiento de capital aportado, retornos periódicos y métricas biológicas alcanzadas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('explorar')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Invertir en Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Portfolio Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Capital Total Aportado</span>
            <span className="material-symbols-outlined text-primary text-lg">account_balance_wallet</span>
          </div>
          <div className="text-3xl font-black text-on-surface">${totalInvested.toLocaleString()} USDC</div>
          <div className="text-xs text-primary font-semibold">Distribuido en 3 proyectos</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Rendimiento Estimado / Cobrado</span>
            <span className="material-symbols-outlined text-secondary text-lg">payments</span>
          </div>
          <div className="text-3xl font-black text-secondary">+$434.00 USDC</div>
          <div className="text-xs text-secondary font-semibold">TIR ponderada: 11.4%</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Hectáreas Regeneradas</span>
            <span className="material-symbols-outlined text-primary text-lg">forest</span>
          </div>
          <div className="text-3xl font-black text-on-surface">42.5 ha</div>
          <div className="text-xs text-primary font-semibold">Monte nativo y suelo vivo</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>CO₂eq Secuestrado</span>
            <span className="material-symbols-outlined text-tertiary text-lg">cloud_done</span>
          </div>
          <div className="text-3xl font-black text-tertiary">18.4 ton</div>
          <div className="text-xs text-outline font-semibold">Auditado satelitalmente</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3">
        <button
          onClick={() => setFilterType('todos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filterType === 'todos'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Todos los proyectos ({INITIAL_INVESTMENTS.length})
        </button>
        <button
          onClick={() => setFilterType('equity')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filterType === 'equity'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Participación / Equity
        </button>
        <button
          onClick={() => setFilterType('prestamo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filterType === 'prestamo'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Préstamos de Impacto
        </button>
      </div>

      {/* Investment List */}
      <div className="space-y-6">
        {filteredInvestments.map((inv) => (
          <div
            key={inv.id}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 hover:border-primary/40 transition shadow-sm space-y-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={inv.image}
                  alt={inv.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-on-surface">{inv.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-primary">
                      {inv.typeBadge}
                    </span>
                    <span className="text-xs text-outline">· {inv.location}</span>
                  </div>
                  <p className="text-xs text-outline">{inv.category}</p>
                  <p className="text-xs text-on-surface-variant font-medium line-clamp-1">
                    {inv.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between lg:justify-end">
                <div className="text-left lg:text-right">
                  <div className="text-xs text-outline font-semibold">Tu Aporte</div>
                  <div className="text-xl font-black text-on-surface">
                    ${inv.investedAmount.toLocaleString()} USDC
                  </div>
                </div>

                {inv.nextPayoutAmount && (
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-outline font-semibold">Próximo Cobro</div>
                    <div className="text-base font-bold text-primary">{inv.nextPayoutAmount}</div>
                    <div className="text-[11px] text-outline">{inv.nextPayoutDate}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress & Milestone Tracking */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface">{inv.progressLabel}</span>
                <span className="text-primary font-bold">{inv.progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${inv.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-outline-variant/20">
              <div className="text-xs text-outline flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-sm text-primary">lock</span>
                Custodia Escrow Base Sepolia
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Descargando certificado de aportante de ${inv.title} con firma criptográfica`)}
                  className="px-3.5 py-1.5 rounded-lg bg-surface hover:bg-surface-container text-on-surface text-xs font-semibold border border-outline-variant/30 flex items-center gap-1.5 transition"
                >
                  <span className="material-symbols-outlined text-sm">badge</span>
                  Certificado NFT/PDF
                </button>

                <button
                  onClick={() => handleClaim(inv)}
                  className="px-3.5 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container hover:opacity-90 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">paid</span>
                  Reclamar Retorno
                </button>

                <button
                  onClick={() => onNavigate('seguimiento')}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Seguimiento
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
