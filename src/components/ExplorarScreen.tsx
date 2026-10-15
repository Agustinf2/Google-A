import React, { useState } from 'react';
import { Project, ScreenView } from '../types';
import { INITIAL_PROJECTS, BIOFABRICA_PROJECT_DETAILS } from '../data/mockData';

interface ExplorarScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenInvestModal: (project: Project) => void;
  onSelectProject?: (projectId: string) => void;
}

export const ExplorarScreen: React.FC<ExplorarScreenProps> = ({
  onNavigate,
  onOpenInvestModal,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('todos');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['raiz-circular']));

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [
    { id: 'todos', label: 'Todos los proyectos', icon: 'apps' },
    { id: 'agro', label: 'Agroecología & Suelo', icon: 'agriculture' },
    { id: 'sustentabilidad', label: 'Reforestación Serrana', icon: 'forest' },
    { id: 'tecnologia', label: 'Tecnología Rural', icon: 'sensors' },
    { id: 'diseno', label: 'Biofabricación', icon: 'recycling' },
  ];

  const filteredProjects = INITIAL_PROJECTS.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'todos' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality =
      selectedModality === 'todos' || proj.modality === selectedModality;
    return matchesCategory && matchesSearch && matchesModality;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-container/90 via-primary to-primary-container p-8 sm:p-12 text-on-primary shadow-xl">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-tertiary-container/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed/20 px-4 py-1.5 backdrop-blur-md border border-primary-fixed/30 text-primary-fixed text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Financiamiento Regenerativo con Escrow Inteligente
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-surface">
            Financia la regeneración de la tierra con custodia escrow transparente.
          </h1>

          <p className="text-base sm:text-lg text-primary-fixed/90 max-w-2xl font-normal leading-relaxed">
            Plataforma comunitaria donde cada desembolso de fondos está respaldado por auditoría técnica en terreno,
            muestreo microbiológico y votación transparente de la comunidad de aportantes.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-fixed">$1.48M</div>
              <div className="text-xs text-white/70 font-medium">Bajo Custodia Escrow</div>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-fixed">94%</div>
              <div className="text-xs text-white/70 font-medium">Hitos Validados con Éxito</div>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-fixed">4.200+</div>
              <div className="text-xs text-white/70 font-medium">Hectáreas Regeneradas</div>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-fixed">Base</div>
              <div className="text-xs text-white/70 font-medium">Red L2 On-Chain Segura</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Spotlight: Biofábrica Serrana */}
      <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tertiary-container text-on-tertiary-container">
                <span className="material-symbols-outlined text-xs">local_fire_department</span>
                Proyecto Destacado · Votación en Curso
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-xs">lock</span>
                Multi-Sig 3/5
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">
              {BIOFABRICA_PROJECT_DETAILS.title}
            </h2>
            <p className="text-sm text-outline font-medium">
              {BIOFABRICA_PROJECT_DETAILS.location} · {BIOFABRICA_PROJECT_DETAILS.category}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('seguimiento')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">visibility</span>
              Ver Seguimiento & Auditoría
            </button>
            <button
              onClick={() => onNavigate('hitos-escrow')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-semibold text-sm hover:opacity-90 transition border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-lg">how_to_vote</span>
              Votar Hito 2
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner group">
              <img
                src={BIOFABRICA_PROJECT_DETAILS.heroImage}
                alt={BIOFABRICA_PROJECT_DETAILS.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Auditoría en Terreno Aprobada (98/100)
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 text-xs flex items-center justify-between text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">verified</span>
                  <span className="font-semibold">Smart Contract Escrow:</span>
                  <span className="font-mono text-outline">{BIOFABRICA_PROJECT_DETAILS.smartContractAddress}</span>
                </div>
                <span className="text-primary font-bold">Base Sepolia</span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {BIOFABRICA_PROJECT_DETAILS.summary}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-surface-container-low/70 rounded-2xl p-6 border border-outline-variant/30">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-3xl font-extrabold text-on-surface">
                    ${BIOFABRICA_PROJECT_DETAILS.fundedAmount.toLocaleString()} USDC
                  </div>
                  <div className="text-xs text-outline font-medium">
                    recaudados de ${BIOFABRICA_PROJECT_DETAILS.goalAmount.toLocaleString()} USDC objetivo
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {BIOFABRICA_PROJECT_DETAILS.percentage}%
                  </div>
                  <div className="text-xs text-outline font-medium">
                    {BIOFABRICA_PROJECT_DETAILS.daysLeft} días restantes
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-primary-container rounded-full transition-all duration-700"
                  style={{ width: `${BIOFABRICA_PROJECT_DETAILS.percentage}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
                  <div className="text-outline">Hito en Votación</div>
                  <div className="font-bold text-on-surface text-sm mt-0.5">Hito 2: Galpón 180m²</div>
                  <div className="text-primary font-medium text-[11px] mt-1">96% Votos a favor</div>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
                  <div className="text-outline">Impacto Verificado</div>
                  <div className="font-bold text-on-surface text-sm mt-0.5">148 ton CO₂eq/año</div>
                  <div className="text-secondary font-medium text-[11px] mt-1">+42% agua en suelo</div>
                </div>
              </div>

              <div className="p-3.5 bg-primary-fixed/30 rounded-xl border border-primary-fixed-dim/40 flex items-center gap-3">
                <img
                  src={BIOFABRICA_PROJECT_DETAILS.creator.avatar}
                  alt={BIOFABRICA_PROJECT_DETAILS.creator.name}
                  className="w-10 h-10 rounded-full object-cover border border-primary/20"
                />
                <div className="text-xs">
                  <div className="font-bold text-on-surface">{BIOFABRICA_PROJECT_DETAILS.creator.name}</div>
                  <div className="text-outline text-[11px]">{BIOFABRICA_PROJECT_DETAILS.creator.role}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() =>
                  onOpenInvestModal({
                    id: BIOFABRICA_PROJECT_DETAILS.id,
                    title: BIOFABRICA_PROJECT_DETAILS.title,
                    category: 'agro',
                    categoryLabel: BIOFABRICA_PROJECT_DETAILS.category,
                    location: BIOFABRICA_PROJECT_DETAILS.location,
                    daysLeft: BIOFABRICA_PROJECT_DETAILS.daysLeft,
                    description: BIOFABRICA_PROJECT_DETAILS.summary,
                    fundedAmount: BIOFABRICA_PROJECT_DETAILS.fundedAmount,
                    goalAmount: BIOFABRICA_PROJECT_DETAILS.goalAmount,
                    percentage: BIOFABRICA_PROJECT_DETAILS.percentage,
                    modality: 'participacion',
                    modalityDetail: 'Participación Comunitaria',
                    creatorName: BIOFABRICA_PROJECT_DETAILS.creator.name,
                    creatorInitials: 'BS',
                    image: BIOFABRICA_PROJECT_DETAILS.heroImage,
                  })
                }
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                Aportar a Biofábrica ($10+ USDC)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box & Modality select */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre o lugar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="py-2 px-3 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="todos">Toda modalidad</option>
              <option value="participacion">Participación (Equity)</option>
              <option value="prestamo">Préstamo de Impacto</option>
            </select>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredProjects.map((project) => {
            const isBookmarked = bookmarkedIds.has(project.id);
            return (
              <div
                key={project.id}
                onClick={() => {
                  if (project.id === 'raiz-circular') {
                    onNavigate('seguimiento');
                  } else {
                    onOpenInvestModal(project);
                  }
                }}
                className="group cursor-pointer flex flex-col justify-between bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(project.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition"
                      title="Guardar proyecto"
                    >
                      <span className="material-symbols-outlined text-base">
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>

                    <div className="absolute bottom-2.5 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                      {project.location}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-outline">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {project.modalityDetail}
                      </span>
                      <span>{project.daysLeft} días restantes</span>
                    </div>

                    <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-outline-variant font-normal text-on-surface-variant line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-4">
                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-on-surface">
                        ${project.fundedAmount.toLocaleString()} USDC
                      </span>
                      <span className="text-primary font-bold">{project.percentage}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInvestModal(project);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary-fixed text-primary font-bold text-xs hover:bg-primary-fixed-dim transition text-center"
                    >
                      Aportar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('seguimiento');
                      }}
                      className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition"
                      title="Ver auditoría y detalles"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="rounded-3xl bg-surface-container-low p-8 border border-outline-variant/30">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Arquitectura de Confianza On-Chain
          </span>
          <h2 className="text-2xl font-bold text-on-surface">
            ¿Cómo garantiza Seed & Grow que tu aporte llegue a la tierra?
          </h2>
          <p className="text-xs sm:text-sm text-outline">
            Superamos la opacidad del crowdfunding tradicional uniendo smart contracts con inspecciones agronómicas reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">lock_clock</span>
            </div>
            <h3 className="text-base font-bold text-on-surface">1. Custodia Escrow Multi-Firma</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              El 100% de los fondos se resguarda en bóvedas inteligentes en la red Base. Ningún tramo se gira al promotor por adelantado; se liberan exclusivamente por hitos completados.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">science</span>
            </div>
            <h3 className="text-base font-bold text-on-surface">2. Dictamen Agronómico Colegiado</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Ingenieros agrónomos matriculados y laboratorios acreditados (INTA / Universidades) realizan inspecciones en terreno con coordenadas GPS verificadas y análisis microbiológicos.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">how_to_vote</span>
            </div>
            <h3 className="text-base font-bold text-on-surface">3. Votación Comunitaria de Aportantes</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cada aportante tiene poder de voto ponderado para auditar la evidencia fotográfica, facturas fiscales electrónicas y autorizar la liberación del desembolso en 48 horas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
