import React, { useState } from 'react';
import { ScreenView, Milestone } from '../types';
import { BIOFABRICA_MILESTONES, BIOFABRICA_PROJECT_DETAILS } from '../data/mockData';
import { ProjectDataVisualization } from './ProjectDataVisualization';

interface HitosEscrowScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenVoteModal?: (milestone: Milestone) => void;
  onOpenEvidenceModal?: (title: string, items: any[]) => void;
}

export const HitosEscrowScreen: React.FC<HitosEscrowScreenProps> = ({
  onNavigate,
  onOpenVoteModal,
  onOpenEvidenceModal,
}) => {
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<'favor' | 'contra' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);

  const activeMilestone = BIOFABRICA_MILESTONES.find((m) => m.status === 'audit_active') || BIOFABRICA_MILESTONES[1];

  const handleQuickVote = (favor: boolean) => {
    setHasVoted(true);
    setVoteType(favor ? 'favor' : 'contra');
    setToastMessage(
      favor
        ? '¡Tu voto favorable ha sido registrado y firmado en Base Sepolia!'
        : 'Tu impugnación ha sido enviada al auditor y promotor.'
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary p-4 rounded-2xl shadow-2xl border border-primary-fixed flex items-center gap-3 animate-slideUp">
          <span className="material-symbols-outlined text-2xl text-primary-fixed">verified</span>
          <div>
            <div className="font-bold text-sm">Voto On-Chain Confirmado</div>
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary">
              Custodia Escrow Inteligente
            </span>
            <span className="text-xs text-outline font-medium">Red Base Sepolia</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Gestión de Hitos & Liberación de Fondos
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1">
            Supervisión comunitaria para <strong>{BIOFABRICA_PROJECT_DETAILS.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowChart(!showChart)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-fixed/40 hover:bg-primary-fixed text-primary font-bold text-xs border border-primary/20 transition"
          >
            <span className="material-symbols-outlined text-base">insights</span>
            {showChart ? 'Ocultar Gráficos' : 'Ver Gráficos Recharts Escrow'}
          </button>
          <button
            onClick={() => onNavigate('auditor')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/30 transition"
          >
            <span className="material-symbols-outlined text-base text-primary">assignment_turned_in</span>
            Ver Dictamen del Auditor
          </button>
          <button
            onClick={() => onNavigate('seguimiento')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            Ver Proyecto Completo
          </button>
        </div>
      </div>

      {/* Recharts Data Visualization Section if toggled */}
      {showChart && (
        <div className="animate-fadeIn">
          <ProjectDataVisualization
            goalAmount={BIOFABRICA_PROJECT_DETAILS.goalAmount}
            fundedAmount={BIOFABRICA_PROJECT_DETAILS.fundedAmount}
            currency="USDC"
            smartContractAddress={BIOFABRICA_PROJECT_DETAILS.smartContractAddress}
          />
        </div>
      )}

      {/* Escrow Smart Vault Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
          <div className="text-outline text-xs font-semibold">Fondos en Escrow Total</div>
          <div className="text-2xl font-black text-on-surface">$20,000 USDC</div>
          <div className="text-[11px] text-primary font-medium">80% de $25,000 en bóveda</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
          <div className="text-outline text-xs font-semibold">Desembolso en Votación (Hito 2)</div>
          <div className="text-2xl font-black text-secondary">$5,000 USDC</div>
          <div className="text-[11px] text-secondary font-medium">20% del fondo global</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
          <div className="text-outline text-xs font-semibold">Fondos ya Liberados (Hito 1)</div>
          <div className="text-2xl font-black text-on-surface">$5,000 USDC</div>
          <div className="text-[11px] text-primary font-medium">Comprobantes aprobados</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
          <div className="text-outline text-xs font-semibold">Smart Contract Seguro</div>
          <div className="text-sm font-mono font-bold text-on-surface truncate">0x8f3c...b49e</div>
          <div className="text-[11px] text-outline font-medium">Safe Multi-Sig 3/5</div>
        </div>
      </div>

      {/* Active Milestone Card (Spotlight) */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border-2 border-primary/40 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tertiary text-on-tertiary animate-pulse">
                Hito Activo en Votación
              </span>
              <span className="text-xs text-error font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">alarm</span>
                Cierra en 41h 18m
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
              Hito 2: {activeMilestone.title}
            </h2>
            <p className="text-xs text-outline font-medium">
              San Javier, Traslasierra · Trámite #{activeMilestone.id} de 4
            </p>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-3xl font-black text-primary">
              ${activeMilestone.amount.toLocaleString()} USDC
            </div>
            <div className="text-xs text-outline font-semibold">
              Monto a transferir al contratista
            </div>
          </div>
        </div>

        {/* Voting & Quorum Progress Bar */}
        <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">how_to_vote</span>
              <span>Quórum Aportante: 74% de participación (Mínimo requerido: 60%)</span>
              <span className="text-primary">✓ Quórum superado</span>
            </div>
            <div className="text-primary font-extrabold text-sm">
              96% Votos a Favor (142 votos emitidos)
            </div>
          </div>

          {/* Dual bar: Quorum & Vote */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
              <div
                className="h-full bg-primary rounded-l-full transition-all duration-700"
                style={{ width: '96%' }}
                title="96% A favor"
              />
              <div
                className="h-full bg-error rounded-r-full transition-all duration-700"
                style={{ width: '4%' }}
                title="4% En contra / Observaciones"
              />
            </div>

            <div className="flex justify-between text-[11px] text-outline font-medium">
              <span className="text-primary font-semibold">136 Aprobaciones (96%)</span>
              <span className="text-error font-semibold">6 Observaciones (4%)</span>
            </div>
          </div>

          {/* Voting Action Area */}
          <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-outline">
              {hasVoted ? (
                <div className="text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Ya has participado con tu firma en este hito (Voto: {voteType === 'favor' ? 'Aprobado' : 'Impugnado'}).
                </div>
              ) : (
                <span>Como aportante verificado, tu firma criptográfica autoriza el desembolso.</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleQuickVote(false)}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs transition border ${
                  voteType === 'contra'
                    ? 'bg-error text-white border-error'
                    : 'bg-surface text-error border-error/30 hover:bg-error/10'
                }`}
              >
                Impugnar / Pedir Datos
              </button>

              <button
                onClick={() => handleQuickVote(true)}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2 ${
                  voteType === 'favor'
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-base">how_to_vote</span>
                Votar Aprobación de Desembolso
              </button>
            </div>
          </div>
        </div>

        {/* Evidence & Auditor Report Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Auditor seal */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-primary-fixed/20 border border-primary/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <span className="font-bold text-sm text-on-surface">Dictamen Agrónomo Favorable</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary text-on-primary">
                98 / 100
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              &quot;Se constata la plena ejecución de los trabajos contemplados en el Hito 2: Galpón bioclimático de 180m², piso sanitario epoxi continuo y reservorio de 30.000L sin pérdidas.&quot;
            </p>

            <div className="pt-2 border-t border-primary/20 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-on-surface">Ing. Agr. Valentín Morales</div>
                <div className="text-outline text-[11px]">Matrícula CIAPC Nº 4819</div>
              </div>
              <button
                onClick={() => onNavigate('auditor')}
                className="text-primary hover:underline font-bold text-xs"
              >
                Ver Informe Completo →
              </button>
            </div>
          </div>

          {/* Right: Evidence Attached */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface">Evidencias Adjuntas por el Promotor:</span>
              <span className="text-outline">3 archivos verificados</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=120&q=80"
                    alt="Evidencia obra"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-bold text-on-surface">6 Fotografías en Sitio con Geo-EXIF</div>
                    <div className="text-outline text-[11px]">Lat -31.9842, Long -65.0418 · Timestamp verificado</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Abriendo galería de 6 fotografías en alta resolución')}
                  className="px-3 py-1 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/40"
                >
                  Ver Fotos
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">receipt_long</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">Factura Fiscal AFIP Tipo A (#0004-000128)</div>
                    <div className="text-outline text-[11px]">Cuadrilla Constructora San Javier · $5,120.00 USD</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Descargando Factura AFIP Electrónica CAE validada')}
                  className="px-3 py-1 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/40"
                >
                  Ver Factura
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">water_drop</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">Prueba Manométrica de Cisterna 30.000L</div>
                    <div className="text-outline text-[11px]">Estanqueidad 72hs certificada por técnico hidráulico</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Visualizando informe de presión hidráulica')}
                  className="px-3 py-1 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/40"
                >
                  Ver Acta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Milestones Sequence List */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
        <h3 className="text-xl font-bold text-on-surface">
          Historial & Proyección de Todos los Hitos Escrow
        </h3>

        <div className="space-y-4">
          {BIOFABRICA_MILESTONES.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                m.status === 'disbursed'
                  ? 'bg-primary-fixed/10 border-primary/30'
                  : m.status === 'audit_active'
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-low/60 border-outline-variant/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    m.status === 'disbursed'
                      ? 'bg-primary text-on-primary'
                      : m.status === 'audit_active'
                      ? 'bg-tertiary text-on-tertiary'
                      : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {m.status === 'disbursed' ? '✓' : `0${m.id}`}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-on-surface">
                      Hito {m.id}: {m.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'disbursed'
                          ? 'bg-primary-fixed text-primary'
                          : m.status === 'audit_active'
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-surface-container-high text-outline'
                      }`}
                    >
                      {m.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-outline mt-0.5">{m.estimatedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div className="text-right">
                  <div className="font-extrabold text-sm text-on-surface">
                    ${m.amount.toLocaleString()} USDC
                  </div>
                  <div className="text-[11px] text-outline font-medium">
                    {m.percentageTotal}% del total
                  </div>
                </div>

                {m.status === 'disbursed' && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-base">done_all</span>
                    Desembolsado
                  </span>
                )}
                {m.status === 'audit_active' && (
                  <span className="inline-flex items-center gap-1 text-xs text-tertiary font-bold animate-pulse">
                    <span className="material-symbols-outlined text-base">how_to_vote</span>
                    En Votación
                  </span>
                )}
                {(m.status === 'pending' || m.status === 'planned') && (
                  <span className="inline-flex items-center gap-1 text-xs text-outline font-semibold">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    Bloqueado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
