import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { Investment, ScreenView } from '../types';

interface PortfolioDistributionChartProps {
  investments: Investment[];
  onNavigate?: (screen: ScreenView) => void;
  onOpenNftModal?: (investment: Investment) => void;
}

interface ChartItem {
  id: string;
  projectId?: string;
  name: string;
  value: number;
  percentage: string;
  detail: string;
  category?: string;
  location?: string;
  typeBadge?: string;
  color: string;
  rawInvestment?: Investment;
}

const PROJECT_COLORS: Record<string, { fill: string; accent: string }> = {
  'raiz-circular': {
    fill: '#006c48', // Deep Forest Green
    accent: '#92f7c3',
  },
  'bioterra-nativas': {
    fill: '#0284c7', // Sky / Forest Stream Blue
    accent: '#bae6fd',
  },
  'oficio-studio': {
    fill: '#d97706', // Warm Amber / Bio-composite
    accent: '#fde68a',
  },
};

const DEFAULT_COLORS = ['#006c48', '#0284c7', '#d97706', '#8b5cf6', '#ec4899', '#14b8a6'];

export const PortfolioDistributionChart: React.FC<PortfolioDistributionChartProps> = ({
  investments,
  onNavigate,
  onOpenNftModal,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'project' | 'category' | 'modality'>('project');

  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);

  // Group data according to active view mode into uniform ChartItem[]
  const getChartData = (): ChartItem[] => {
    if (viewMode === 'category') {
      const map = new Map<string, { value: number; count: number; color: string }>();
      investments.forEach((inv, i) => {
        const cat = inv.category;
        const current = map.get(cat) || {
          value: 0,
          count: 0,
          color: PROJECT_COLORS[inv.projectId]?.fill || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
        };
        current.value += inv.investedAmount;
        current.count += 1;
        map.set(cat, current);
      });

      return Array.from(map.entries()).map(([name, data]) => ({
        id: name,
        name,
        value: data.value,
        percentage: totalInvested > 0 ? ((data.value / totalInvested) * 100).toFixed(1) : '0',
        detail: `${data.count} proyecto${data.count > 1 ? 's' : ''} asignado${data.count > 1 ? 's' : ''}`,
        color: data.color,
      }));
    }

    if (viewMode === 'modality') {
      const map = new Map<string, { value: number; count: number; color: string }>();
      investments.forEach((inv, i) => {
        const mod = inv.type;
        const current = map.get(mod) || {
          value: 0,
          count: 0,
          color: PROJECT_COLORS[inv.projectId]?.fill || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
        };
        current.value += inv.investedAmount;
        current.count += 1;
        map.set(mod, current);
      });

      return Array.from(map.entries()).map(([name, data]) => ({
        id: name,
        name,
        value: data.value,
        percentage: totalInvested > 0 ? ((data.value / totalInvested) * 100).toFixed(1) : '0',
        detail: `Contratos escrow bajo modalidad ${name}`,
        color: data.color,
      }));
    }

    // Default: by individual project
    return investments.map((inv, i) => {
      const colorConfig = PROJECT_COLORS[inv.projectId] || {
        fill: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
        accent: '#e2e8f0',
      };
      return {
        id: inv.id,
        projectId: inv.projectId,
        name: inv.title,
        value: inv.investedAmount,
        percentage: totalInvested > 0 ? ((inv.investedAmount / totalInvested) * 100).toFixed(1) : '0',
        detail: `${inv.category} · ${inv.location}`,
        category: inv.category,
        location: inv.location,
        typeBadge: inv.typeBadge,
        color: colorConfig.fill,
        rawInvestment: inv,
      };
    });
  };

  const chartData = getChartData();

  // Active slice data (for center donut details)
  const hoveredItem = activeIndex !== null && chartData[activeIndex] ? chartData[activeIndex] : null;

  // Custom sleek tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ChartItem = payload[0].payload;
      return (
        <div className="bg-[#012d1d] text-white p-3.5 rounded-2xl shadow-xl border border-[#92f7c3]/30 text-xs min-w-[210px] space-y-2 z-50 animate-fadeIn backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
            <span className="font-bold text-white text-sm truncate">{data.name}</span>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: data.color }}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Aporte en Escrow:</span>
              <span className="font-mono font-extrabold text-[#92f7c3]">
                ${data.value.toLocaleString()} USDC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Ponderación:</span>
              <span className="font-bold text-white bg-white/10 px-1.5 py-0.2 rounded font-mono">
                {data.percentage}%
              </span>
            </div>
            {data.category && (
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <span className="text-white/60">Categoría:</span>
                <span className="text-white/90 truncate max-w-[120px]">{data.category}</span>
              </div>
            )}
            {data.typeBadge && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/60">Modalidad:</span>
                <span className="text-[#92f7c3] font-semibold">{data.typeBadge}</span>
              </div>
            )}
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-mono">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#92f7c3]">verified_user</span>
              Base Sepolia
            </span>
            <span>Escrow 100% auditado</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xs space-y-6">
      {/* Top Header & View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-lg">pie_chart</span>
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-on-surface tracking-tight">
                Distribución de Fondos en Proyectos Regenerativos
              </h2>
              <p className="text-xs text-outline">
                Visualización en tiempo real del capital asignado bajo custodia en smart contracts
              </p>
            </div>
          </div>
        </div>

        {/* View mode toggle tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low border border-outline-variant/30 self-start md:self-auto">
          <button
            onClick={() => {
              setViewMode('project');
              setActiveIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'project'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Por Proyecto
          </button>
          <button
            onClick={() => {
              setViewMode('category');
              setActiveIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'category'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Por Categoría
          </button>
          <button
            onClick={() => {
              setViewMode('modality');
              setActiveIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'modality'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Por Modalidad
          </button>
        </div>
      </div>

      {/* Main Visualizer Area: Donut Chart + Interactive Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Recharts Donut Pie Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-w-0">
          <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={98}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((entry, index) => {
                    const isHovered = activeIndex === index;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={isHovered ? '#012d1d' : '#ffffff'}
                        strokeWidth={isHovered ? 3 : 2}
                        className="cursor-pointer transition-all duration-200"
                        opacity={activeIndex === null || isHovered ? 1 : 0.45}
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label (Interactive Dynamic Content) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
              {hoveredItem ? (
                <div className="animate-fadeIn space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-outline tracking-wider truncate max-w-[120px]">
                    {hoveredItem.name}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-on-surface font-mono tracking-tight">
                    ${hoveredItem.value.toLocaleString()}
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary-fixed text-primary">
                    {hoveredItem.percentage}% del total
                  </div>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase font-bold text-outline tracking-wider">
                    Total Invertido
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono tracking-tight">
                    ${totalInvested.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-bold text-primary">
                    USDC en Escrow
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-outline text-center mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-primary">touch_app</span>
            <span>Pasa el cursor sobre los segmentos o tarjetas para inspeccionar detalles</span>
          </div>
        </div>

        {/* Right: Interactive Allocation Cards & Breakdown */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-outline uppercase tracking-wider px-1">
            <span>Asignación de Cartera</span>
            <span>Monto / %</span>
          </div>

          <div className="space-y-2.5">
            {chartData.map((item, index) => {
              const isHovered = activeIndex === index;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? 'bg-surface-container-low border-primary shadow-sm ring-1 ring-primary/30 transform -translate-y-0.5'
                      : 'bg-surface-container-lowest border-outline-variant/25 hover:border-outline-variant/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-3.5 h-3.5 rounded-lg shrink-0 transition-transform duration-200"
                        style={{
                          backgroundColor: item.color,
                          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-on-surface truncate">
                            {item.name}
                          </span>
                          {item.typeBadge && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
                              {item.typeBadge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-outline truncate mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-black text-sm sm:text-base text-on-surface">
                        ${item.value.toLocaleString()} USDC
                      </div>
                      <div className="text-xs font-bold text-primary font-mono">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>

                  {/* Progress allocation bar */}
                  <div className="mt-3 space-y-1">
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Contextual Action when hovered or for project view */}
                  {viewMode === 'project' && item.rawInvestment && (
                    <div className="mt-2.5 pt-2 border-t border-outline-variant/15 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-outline flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-xs text-primary">task_alt</span>
                        {item.rawInvestment.progressLabel}
                      </span>
                      {onOpenNftModal && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenNftModal(item.rawInvestment!);
                          }}
                          className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Ver NFT / Contrato
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ecological & Security Co-benefits Strip */}
      <div className="pt-4 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
          <span className="material-symbols-outlined text-primary text-lg">shield</span>
          <div>
            <div className="font-bold text-on-surface">100% Custodia Escrow</div>
            <div className="text-[11px] text-outline">Base Sepolia L2 con auditoría notarial</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
          <span className="material-symbols-outlined text-primary text-lg">nature_people</span>
          <div>
            <div className="font-bold text-on-surface">Diversificación Multisectorial</div>
            <div className="text-[11px] text-outline">Industria, infraestructura, tecnología y bioinsumos</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary text-lg">trending_up</span>
          <div>
            <div className="font-bold text-on-surface">Rendimientos Mixtos</div>
            <div className="text-[11px] text-outline">Cuotas de préstamo + dividendos de equity</div>
          </div>
        </div>
      </div>
    </div>
  );
};
