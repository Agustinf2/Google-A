import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface ProjectDataVisualizationProps {
  goalAmount?: number;
  fundedAmount?: number;
  currency?: string;
  smartContractAddress?: string;
}

export const ProjectDataVisualization: React.FC<ProjectDataVisualizationProps> = ({
  goalAmount = 25000,
  fundedAmount = 20000,
  currency = 'USDC',
  smartContractAddress = '0x8f3c...b49e',
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'flujo' | 'hitos' | 'distribucion'>('flujo');
  const [showEscrowExplainer, setShowEscrowExplainer] = useState<boolean>(false);

  // 1. Datos del Flujo Temporal de Recaudación vs Liberación de Fondos Escrow
  const timelineData = [
    { periodo: 'Sem 1', recaudado: 3500, liberado: 0, enEscrow: 3500, meta: 25000 },
    { periodo: 'Sem 2', recaudado: 8200, liberado: 0, enEscrow: 8200, meta: 25000 },
    { periodo: 'Sem 3 (Hito 1)', recaudado: 12500, liberado: 5000, enEscrow: 7500, meta: 25000 },
    { periodo: 'Sem 4', recaudado: 16000, liberado: 5000, enEscrow: 11000, meta: 25000 },
    { periodo: 'Sem 5 (Hoy)', recaudado: 20000, liberado: 5000, enEscrow: 15000, meta: 25000 },
    { periodo: 'Sem 6 (Hito 2 Est.)', recaudado: 22500, liberado: 10000, enEscrow: 12500, meta: 25000 },
    { periodo: 'Sem 8 (Hito 3 Est.)', recaudado: 25000, liberado: 17500, enEscrow: 7500, meta: 25000 },
    { periodo: 'Sem 10 (Hito 4 Fin)', recaudado: 25000, liberado: 25000, enEscrow: 0, meta: 25000 },
  ];

  // 2. Datos de Liberación por Hito Escrow
  const milestoneEscrowBars = [
    {
      name: 'Hito 1: Preparación inicial',
      montoTotal: 5000,
      liberado: 5000,
      retenido: 0,
      estado: 'Desembolsado (100%)',
      color: '#006c48',
    },
    {
      name: 'Hito 2: Galpón & Estructura',
      montoTotal: 5000,
      liberado: 0,
      retenido: 5000,
      estado: 'En Auditoría / Votación Activa',
      color: '#2a9d8f',
    },
    {
      name: 'Hito 3: Reactores 5.000L',
      montoTotal: 7500,
      liberado: 0,
      retenido: 7500,
      estado: 'Bloqueado en Escrow',
      color: '#86af99',
    },
    {
      name: 'Hito 4: Distribución & Test',
      montoTotal: 7500,
      liberado: 0,
      retenido: 7500,
      estado: 'Bloqueado en Escrow',
      color: '#c1ecd4',
    },
  ];

  // 3. Desglose de Asignación Presupuestaria
  const budgetAllocationData = [
    { name: 'Equipamiento & Reactores', value: 10000, percent: '40%', color: '#012d1d' },
    { name: 'Infraestructura & Obra', value: 6250, percent: '25%', color: '#006c48' },
    { name: 'Insumos Clave & Cepas', value: 5000, percent: '20%', color: '#2d6a4f' },
    { name: 'Auditoría & Seguros', value: 2500, percent: '10%', color: '#86af99' },
    { name: 'Fondo de Contingencia', value: 1250, percent: '5%', color: '#c1ecd4' },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header with Title and Escrow Explanation CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">analytics</span>
              Visualización de Datos con Recharts
            </span>
            <span className="font-mono text-xs text-outline font-semibold">
              Contrato Escrow: {smartContractAddress}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
            Progreso de Recaudación &amp; Liberación Escrow por Hitos
          </h3>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            Monitoreo en tiempo real de los fondos captados frente a los tramos desbloqueados del smart contract
          </p>
        </div>

        {/* Button to explain What is Smart Escrow */}
        <button
          onClick={() => setShowEscrowExplainer(!showEscrowExplainer)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-fixed/30 hover:bg-primary-fixed text-primary font-bold text-xs border border-primary/20 transition self-start md:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-base">help_outline</span>
          <span>¿Qué es la Custodia Escrow Inteligente?</span>
          <span className="material-symbols-outlined text-xs">
            {showEscrowExplainer ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>

      {/* Educational Explainer Panel: ¿Qué es la Custodia Escrow Inteligente? */}
      {showEscrowExplainer && (
        <div className="p-6 rounded-2xl bg-linear-to-br from-primary-fixed/20 via-surface-container-low to-secondary-container/20 border-2 border-primary/30 space-y-5 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-2xl text-primary-fixed">lock_clock</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-on-surface">
                  ¿Qué es la Custodia Escrow Inteligente (Smart Escrow)?
                </h4>
                <p className="text-xs text-outline">
                  El mecanismo que elimina el riesgo del crowdfunding tradicional
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowEscrowExplainer(false)}
              className="text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <div className="text-xs text-on-surface-variant leading-relaxed space-y-3 font-normal">
            <p>
              Un <strong>Escrow</strong> (o depósito en garantía) es un mecanismo legal y financiero donde un tercero de confianza retiene los fondos de una transacción hasta que se cumplen condiciones acordadas.
            </p>
            <p>
              En <strong>Seed &amp; Grow</strong>, este escrow es <strong>&quot;Inteligente&quot; (Smart)</strong> porque está ejecutado directamente por un <strong>Smart Contract en la red Base (Ethereum L2)</strong>, sin intermediarios bancarios costosos ni discrecionalidad humana:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 bg-surface rounded-xl border border-outline-variant/30 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="font-bold text-xs text-on-surface">Tu Aporte entra a la Bóveda</div>
              <div className="text-[11px] text-outline leading-tight">
                El capital aportado queda custodiado en el contrato de forma 100% visible on-chain.
              </div>
            </div>

            <div className="p-3.5 bg-surface rounded-xl border border-outline-variant/30 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="font-bold text-xs text-on-surface">El Creador NO cobra todo junto</div>
              <div className="text-[11px] text-outline leading-tight">
                Los fondos se dividen en tramos vinculados a cada hito de desarrollo y roadmap.
              </div>
            </div>

            <div className="p-3.5 bg-surface rounded-xl border border-outline-variant/30 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div className="font-bold text-xs text-on-surface">Auditoría Técnica en Terreno</div>
              <div className="text-[11px] text-outline leading-tight">
                Para desbloquear el siguiente tramo, un perito matriculado certifica los entregables.
              </div>
            </div>

            <div className="p-3.5 bg-surface rounded-xl border border-outline-variant/30 space-y-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div className="font-bold text-xs text-on-surface">Votación Comunitaria Multi-Sig</div>
              <div className="text-[11px] text-outline leading-tight">
                Los aportantes auditan facturas y votan; el Smart Contract gira los fondos solo si hay quórum.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
          <div className="text-[11px] text-outline font-semibold uppercase tracking-wider">
            Recaudación Total
          </div>
          <div className="text-2xl font-black text-on-surface">
            ${fundedAmount.toLocaleString()} {currency}
          </div>
          <div className="text-xs text-primary font-bold">
            80% de la meta (${goalAmount.toLocaleString()})
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
          <div className="text-[11px] text-outline font-semibold uppercase tracking-wider">
            Fondos Ya Liberados
          </div>
          <div className="text-2xl font-black text-primary">
            $5,000 {currency}
          </div>
          <div className="text-xs text-primary font-bold">
            Hito 1 Aprobado (20% del total)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
          <div className="text-[11px] text-outline font-semibold uppercase tracking-wider">
            Bajo Custodia Escrow Bloqueada
          </div>
          <div className="text-2xl font-black text-secondary">
            $15,000 {currency}
          </div>
          <div className="text-xs text-outline font-medium">
            Protegidos en Bóveda Multi-Sig 3/5
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
          <div className="text-[11px] text-outline font-semibold uppercase tracking-wider">
            Próximo Desembolso (Hito 2)
          </div>
          <div className="text-2xl font-black text-tertiary">
            $5,000 {currency}
          </div>
          <div className="text-xs text-tertiary font-bold animate-pulse">
            Votación y Quórum en Curso (96% SI)
          </div>
        </div>
      </div>

      {/* Chart Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
        <button
          onClick={() => setActiveChartTab('flujo')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeChartTab === 'flujo'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'bg-surface-container-low text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-sm">show_chart</span>
          Curva Temporal: Recaudación vs Liberación
        </button>

        <button
          onClick={() => setActiveChartTab('hitos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeChartTab === 'hitos'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'bg-surface-container-low text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-sm">stacked_bar_chart</span>
          Fondos por Hito Escrow
        </button>

        <button
          onClick={() => setActiveChartTab('distribucion')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeChartTab === 'distribucion'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'bg-surface-container-low text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-sm">donut_large</span>
          Asignación de Presupuesto
        </button>
      </div>

      {/* Chart 1: Curva Temporal de Recaudación y Liberación Escrow */}
      {activeChartTab === 'flujo' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-on-surface">
              Evolución acumulada de fondos ingresados vs fondos liberados por el contrato inteligente
            </span>
            <span className="text-outline font-medium text-[11px]">
              Valores expresados en {currency}
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timelineData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="recaudadoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006c48" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#006c48" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="escrowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2a9d8f" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2a9d8f" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#717973' }} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#717973' }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                  domain={[0, 26000]}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `$${Number(value).toLocaleString()} ${currency}`,
                    name === 'recaudado'
                      ? 'Total Recaudado'
                      : name === 'liberado'
                      ? 'Fondos Liberados al Proyecto'
                      : name === 'enEscrow'
                      ? 'Fondos en Custodia Escrow'
                      : 'Meta del Proyecto',
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
                      {val === 'recaudado'
                        ? 'Capital Recaudado'
                        : val === 'liberado'
                        ? 'Liberado por Hitos'
                        : val === 'enEscrow'
                        ? 'Retenido en Escrow'
                        : 'Meta Total'}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="recaudado"
                  stroke="#006c48"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#recaudadoGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="enEscrow"
                  stroke="#2a9d8f"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#escrowGrad)"
                />
                <Line
                  type="stepAfter"
                  dataKey="liberado"
                  stroke="#012d1d"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#012d1d' }}
                />
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="#e76f51"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-wrap items-center justify-between text-xs text-outline gap-2">
            <span>
              💡 <strong>Observación:</strong> La línea negra escalonada muestra cómo los fondos se liberan exclusivamente cuando cada hito es auditado y votado favorablemente.
            </span>
            <span className="font-mono text-primary font-bold">Estado: En custodia segura</span>
          </div>
        </div>
      )}

      {/* Chart 2: Estado de Fondos por Hito Escrow */}
      {activeChartTab === 'hitos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-on-surface">
              Distribución de los 4 tramos del proyecto: Fondos liberados vs retenidos en el contrato
            </span>
            <span className="text-outline font-medium text-[11px]">
              Custodia Smart Contract Base Sepolia
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={milestoneEscrowBars}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#717973' }}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                  domain={[0, 8000]}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: '#1d1b19', fontWeight: 600 }}
                  width={150}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `$${Number(val).toLocaleString()} ${currency}`,
                    name === 'liberado' ? 'Fondos Desembolsados' : 'Fondos Retenidos en Escrow',
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
                      {val === 'liberado' ? 'Fondos Liberados al Proyecto' : 'Fondos Bloqueados en Escrow'}
                    </span>
                  )}
                />
                <Bar dataKey="liberado" stackId="a" fill="#006c48" radius={[0, 0, 0, 0]} />
                <Bar dataKey="retenido" stackId="a" fill="#86af99" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
            {milestoneEscrowBars.map((m, idx) => (
              <div key={idx} className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="font-bold text-on-surface text-[11px] truncate">{m.name}</div>
                <div className="text-sm font-black text-primary mt-0.5">
                  ${m.montoTotal.toLocaleString()} {currency}
                </div>
                <div className="text-[10px] text-outline font-semibold mt-1">
                  {m.estado}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart 3: Asignación Presupuestaria del Contrato */}
      {activeChartTab === 'distribucion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {budgetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()} ${currency}`, 'Presupuesto']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #c1c8c2',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-sm text-on-surface">
              Asignación Presupuestaria Auditada ($25,000 {currency})
            </h4>
            <div className="space-y-2">
              {budgetAllocationData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-on-surface">{item.name}</span>
                  </div>
                  <div className="font-bold text-on-surface">
                    ${item.value.toLocaleString()} <span className="text-outline font-normal">({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
