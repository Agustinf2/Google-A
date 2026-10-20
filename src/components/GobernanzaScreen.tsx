import React, { useState, useMemo } from 'react';
import { ScreenView, Milestone } from '../types';
import { GOVERNANCE_DATA, GovernanceProjectItem } from '../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface GobernanzaScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenVoteModal?: (milestone: Milestone) => void;
  onOpenContractModal?: () => void;
}

export const GobernanzaScreen: React.FC<GobernanzaScreenProps> = ({
  onNavigate,
  onOpenVoteModal,
  onOpenContractModal,
}) => {
  const [selectedSort, setSelectedSort] = useState<'participacion' | 'salud' | 'votacion_activa' | 'escrow'>('participacion');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterActiveVotingOnly, setFilterActiveVotingOnly] = useState<boolean>(false);

  const { globalMetrics, projects } = GOVERNANCE_DATA;

  // Filtrado y ordenamiento de proyectos
  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter((proj) => {
        const matchesCategory = selectedCategory === 'todos' || proj.category === selectedCategory;
        const matchesSearch =
          proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          proj.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          proj.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesActiveVoting = !filterActiveVotingOnly || proj.activeVoting.hasActiveVoting;
        return matchesCategory && matchesSearch && matchesActiveVoting;
      })
      .sort((a, b) => {
        if (selectedSort === 'participacion') {
          return b.participationRate - a.participationRate; // Mayor participación primero
        }
        if (selectedSort === 'salud') {
          return b.healthScore - a.healthScore; // Mayor salud primero
        }
        if (selectedSort === 'votacion_activa') {
          if (a.activeVoting.hasActiveVoting && !b.activeVoting.hasActiveVoting) return -1;
          if (!a.activeVoting.hasActiveVoting && b.activeVoting.hasActiveVoting) return 1;
          return b.participationRate - a.participationRate;
        }
        if (selectedSort === 'escrow') {
          return b.funds.inEscrow - a.funds.inEscrow;
        }
        return 0;
      });
  }, [projects, selectedSort, selectedCategory, searchQuery, filterActiveVotingOnly]);

  // Datos para gráficos Recharts
  const participationChartData = useMemo(() => {
    return projects.map((p) => ({
      name: p.title.length > 15 ? p.title.substring(0, 14) + '...' : p.title,
      participacion: p.participationRate,
      salud: p.healthScore,
      favorable: p.favorableVotesPercent,
    }));
  }, [projects]);

  const globalVoteDistribution = [
    { name: 'Votos a Favor', value: 94.8, color: '#006c48' },
    { name: 'Con Observaciones', value: 3.6, color: '#e76f51' },
    { name: 'Votos en Contra / Impugnados', value: 1.6, color: '#ba1a1a' },
  ];

  return (
    <div className="space-y-10">
      {/* Header & Governance Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-container/95 via-primary to-primary-container p-8 sm:p-10 text-on-primary shadow-xl">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-tertiary-container/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed/20 px-3.5 py-1 backdrop-blur-md border border-primary-fixed/30 text-primary-fixed text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">how_to_vote</span>
            Gobernanza On-Chain &amp; Transparencia Comunitaria
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface">
            Gobernanza de Proyectos &amp; Estado de Salud del Ecosistema
          </h1>

          <p className="text-sm sm:text-base text-primary-fixed/90 max-w-3xl leading-relaxed font-normal">
            Supervisión descentralizada de todos los proyectos activos. Monitorea el quórum de votantes, la validación de hitos por parte de los auditores y el cumplimiento riguroso de cada contrato escrow inteligente.
          </p>

          {/* Global Governance KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/10">
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Votos Emitidos</div>
              <div className="text-xl sm:text-2xl font-black text-primary-fixed mt-0.5">
                {globalMetrics.totalVotesCast.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/60">Firmas on-chain</div>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Quórum Promedio</div>
              <div className="text-xl sm:text-2xl font-black text-primary-fixed mt-0.5">
                {globalMetrics.averageQuorum}%
              </div>
              <div className="text-[10px] text-green-300 font-semibold">Min. 60% superado</div>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Aprobación Global</div>
              <div className="text-xl sm:text-2xl font-black text-primary-fixed mt-0.5">
                {globalMetrics.communityApprovalRate}%
              </div>
              <div className="text-[10px] text-white/60">Votos favorables</div>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Votaciones Abiertas</div>
              <div className="text-xl sm:text-2xl font-black text-tertiary mt-0.5 animate-pulse">
                {globalMetrics.activeVotingCount} hitos
              </div>
              <div className="text-[10px] text-white/60">Requieren voto</div>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Escrow Auditado</div>
              <div className="text-xl sm:text-2xl font-black text-primary-fixed mt-0.5">
                ${(globalMetrics.totalEscrowManagedUsdc / 1000000).toFixed(2)}M
              </div>
              <div className="text-[10px] text-white/60">En custodia Safe L2</div>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <div className="text-xs text-white/70 font-medium">Salud General</div>
              <div className="text-xl sm:text-2xl font-black text-primary-fixed mt-0.5">
                5 / 6
              </div>
              <div className="text-[10px] text-white/60">Proyectos óptimos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Activity Analytics Charts (Recharts) */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Actividad Global de Votación &amp; Comparativa de Participación
            </h3>
            <p className="text-xs text-outline mt-0.5">
              Nivel de involucramiento comunitario (% de Quórum) frente al Índice de Salud de cada proyecto
            </p>
          </div>
          <span className="font-mono text-xs text-primary font-bold bg-primary-fixed/20 px-3 py-1 rounded-full">
            Estandar Safe Multi-Sig
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* BarChart: Participación y Salud */}
          <div className="lg:col-span-8 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationChartData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#717973' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#717973' }} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val}%`,
                    name === 'participacion' ? 'Participación Comunitaria (Quórum)' : 'Índice de Salud General',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #c1c8c2',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(val) => (
                    <span className="text-xs font-semibold text-on-surface">
                      {val === 'participacion' ? 'Participación Comunitaria (% Quórum)' : 'Índice de Salud (Score 0-100)'}
                    </span>
                  )}
                />
                <Bar dataKey="participacion" fill="#006c48" radius={[4, 4, 0, 0]} />
                <Bar dataKey="salud" fill="#2a9d8f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PieChart: Sentido de Voto Global */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-3">
            <div className="text-center">
              <div className="text-xs font-bold text-on-surface">Sentido de Voto de los Aportantes</div>
              <div className="text-[11px] text-outline">Consolidado sobre 1,482 firmas</div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalVoteDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {globalVoteDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Porcentaje']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #c1c8c2',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-1.5 text-[11px]">
              {globalVoteDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-on-surface-variant font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-on-surface">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Primary Sort Selector (Highlighted as requested) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-primary">sort</span>
              Ordenar por:
            </span>

            <button
              onClick={() => setSelectedSort('participacion')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSort === 'participacion'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              Mayor Participación (% Quórum)
            </button>

            <button
              onClick={() => setSelectedSort('salud')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSort === 'salud'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">health_and_safety</span>
              Mayor Índice de Salud
            </button>

            <button
              onClick={() => setSelectedSort('votacion_activa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSort === 'votacion_activa'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">how_to_vote</span>
              Votaciones Abiertas Primero
            </button>

            <button
              onClick={() => setSelectedSort('escrow')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSort === 'escrow'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">account_balance</span>
              Mayor Escrow
            </button>
          </div>

          {/* Search and Active Voting Filter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterActiveVotingOnly(!filterActiveVotingOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                filterActiveVotingOnly
                  ? 'bg-tertiary-container text-on-tertiary-container border-tertiary'
                  : 'bg-surface-container-low text-outline border-outline-variant/30 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              Solo con Votación Abierta
            </button>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2 text-outline text-base">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar proyecto o promotor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary w-48 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'todos', label: 'Todos los sectores' },
            { id: 'salud', label: 'Salud & Biotec' },
            { id: 'agro', label: 'Agro & Bioeconomía' },
            { id: 'energia', label: 'Energía & Clima' },
            { id: 'tecnologia', label: 'Tecnología' },
            { id: 'diseno', label: 'Diseño & Hardware' },
            { id: 'sustentabilidad', label: 'Sustentabilidad' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Governance Cards Grid */}
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs text-outline">
          <span>Mostrando {filteredAndSortedProjects.length} proyectos bajo gobernanza</span>
          <span className="font-semibold">
            Ordenado por: {selectedSort === 'participacion' ? 'Mayor Participación' : selectedSort === 'salud' ? 'Índice de Salud' : selectedSort === 'votacion_activa' ? 'Votación Abierta' : 'Monto en Escrow'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((p) => {
            const hasActiveVoting = p.activeVoting.hasActiveVoting;
            const isQuorumReached = p.participationRate >= 60;
            const isHealthy = p.healthScore >= 85;

            return (
              <div
                key={p.id}
                className={`bg-surface-container-lowest rounded-3xl p-6 border transition flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md ${
                  hasActiveVoting
                    ? 'border-tertiary/70 ring-1 ring-tertiary/20'
                    : !isHealthy
                    ? 'border-error/40'
                    : 'border-outline-variant/30'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Category & Health Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                          {p.categoryLabel}
                        </span>
                        <h4 className="font-bold text-sm text-on-surface line-clamp-1">{p.title}</h4>
                        <div className="text-[11px] text-outline">{p.creator}</div>
                      </div>
                    </div>

                    {/* Health Score Pill */}
                    <div
                      className={`px-3 py-1.5 rounded-2xl flex flex-col items-center shrink-0 border ${
                        p.healthScore >= 95
                          ? 'bg-primary-fixed text-primary border-primary/30'
                          : p.healthScore >= 85
                          ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
                          : 'bg-error/15 text-error border-error/30'
                      }`}
                    >
                      <span className="text-base font-black leading-none">{p.healthScore}</span>
                      <span className="text-[9px] font-extrabold uppercase mt-0.5">{p.healthStatus}</span>
                    </div>
                  </div>

                  {/* Participation & Quorum Progress Bar */}
                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-primary">groups</span>
                        Participación: {p.participationRate}%
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          isQuorumReached ? 'text-primary' : 'text-error animate-pulse'
                        }`}
                      >
                        {isQuorumReached ? '✓ Quórum Alcanzado' : '⚠️ Bajo Quórum (Min. 60%)'}
                      </span>
                    </div>

                    {/* Visual Bar with 60% Quorum Mark */}
                    <div className="relative h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isQuorumReached ? 'bg-primary' : 'bg-error'
                        }`}
                        style={{ width: `${p.participationRate}%` }}
                      />
                      {/* Vertical line at 60% mark */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-black/40 z-10"
                        style={{ left: '60%' }}
                        title="Quórum mínimo requerido (60%)"
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-outline">
                      <span>{p.totalVotesCount} votos emitidos</span>
                      <span>{p.favorableVotesPercent}% votos favorables</span>
                    </div>
                  </div>

                  {/* Milestone Voting Status Alert */}
                  {hasActiveVoting ? (
                    <div className="p-3.5 rounded-2xl bg-tertiary-container/40 border border-tertiary/40 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-on-tertiary-container flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">alarm</span>
                          Votación Abierta: {p.activeVoting.hoursLeft}h restantes
                        </span>
                        <span className="font-extrabold text-primary">
                          ${p.activeVoting.amountToRelease?.toLocaleString()} USDC
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant line-clamp-1 font-medium">
                        {p.activeVoting.milestoneTitle}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-xs flex items-center justify-between text-outline">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-primary">task_alt</span>
                        Hitos al día · Próximo en preparación
                      </span>
                      <span className="font-mono text-[10px]">Safe Escrow</span>
                    </div>
                  )}

                  {/* Auditor Verification Details */}
                  <div className="p-3 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-outline font-semibold">Auditor Colegiado:</div>
                      <div className="font-bold text-on-surface text-[11px] truncate max-w-[180px]">
                        {p.auditorApproval.auditorName}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.auditorApproval.status === 'Certificado'
                          ? 'bg-primary-fixed text-primary'
                          : 'bg-error/15 text-error'
                      }`}
                    >
                      {p.auditorApproval.status} ({p.auditorApproval.score}/100)
                    </span>
                  </div>

                  {/* Escrow Funds Summary */}
                  <div className="flex justify-between items-baseline text-xs px-1">
                    <span className="text-outline">Fondos en Custodia Escrow:</span>
                    <span className="font-black text-on-surface">
                      ${p.funds.inEscrow.toLocaleString()} / ${p.funds.totalBudget.toLocaleString()} USDC
                    </span>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center gap-2">
                  {hasActiveVoting ? (
                    <button
                      onClick={() => onNavigate('hitos-escrow')}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">how_to_vote</span>
                      Votar Hito
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('seguimiento')}
                      className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Ver Hitos
                    </button>
                  )}

                  <button
                    onClick={onOpenContractModal}
                    className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition border border-outline-variant/30"
                    title="Inspeccionar Smart Contract y Safe Vault"
                  >
                    <span className="material-symbols-outlined text-base">code</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
