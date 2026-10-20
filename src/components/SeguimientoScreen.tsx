import React, { useState } from 'react';
import { ScreenView, Project } from '../types';
import { BIOFABRICA_PROJECT_DETAILS, BIOFABRICA_MILESTONES } from '../data/mockData';
import { ProjectDataVisualization } from './ProjectDataVisualization';

interface SeguimientoScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenInvestModal: (project: Project) => void;
  onOpenEvidenceModal?: (title: string, items: any[]) => void;
  onOpenContractModal?: () => void;
}

export const SeguimientoScreen: React.FC<SeguimientoScreenProps> = ({
  onNavigate,
  onOpenInvestModal,
  onOpenEvidenceModal,
  onOpenContractModal,
}) => {
  const [activeTab, setActiveTab] = useState<'ecologia' | 'finanzas' | 'graficos' | 'legal' | 'hitos'>('graficos');
  const [selectedLabDoc, setSelectedLabDoc] = useState<any | null>(null);
  const [copiedLabHash, setCopiedLabHash] = useState(false);
  const [selectedIpfsDoc, setSelectedIpfsDoc] = useState<{
    title: string;
    notary: string;
    date: string;
    ipfsCid: string;
  } | null>(null);
  const [copiedIpfsCid, setCopiedIpfsCid] = useState(false);
  const [docNotice, setDocNotice] = useState<string | null>(null);

  const project = BIOFABRICA_PROJECT_DETAILS;

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-outline">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('explorar')}
            className="hover:text-primary transition flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Explorar proyectos
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">{project.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenContractModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-bold hover:bg-primary-fixed-dim transition cursor-pointer"
            title="Inspeccionar Smart Contract y Certificados NFT"
          >
            <span className="material-symbols-outlined text-xs">verified</span>
            Auditoría en Base Sepolia (0x8f3c...b49e)
          </button>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
            <span className="material-symbols-outlined text-xs">lock</span>
            Multi-Sig 3/5 Activo
          </span>
        </div>
      </div>

      {/* Project Header Banner */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary">
                {project.category}
              </span>
              <span className="text-xs text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                {project.location}
              </span>
              <button
                onClick={onOpenContractModal}
                className="text-xs text-primary font-mono font-bold hover:underline flex items-center gap-1"
                title="Inspeccionar contrato en BaseScan"
              >
                <span className="material-symbols-outlined text-xs">code</span>
                Contrato: {project.smartContractAddress}
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant font-normal leading-relaxed">
              {project.subtitle}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-3">
                <img
                  src={project.creator.avatar}
                  alt={project.creator.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                />
                <div>
                  <div className="text-sm font-bold text-on-surface flex items-center gap-1">
                    {project.creator.name}
                    <span className="material-symbols-outlined text-primary text-base">verified</span>
                  </div>
                  <div className="text-xs text-outline">{project.creator.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Widget */}
          <div className="lg:col-span-4 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 space-y-5">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-on-surface">
                  ${project.fundedAmount.toLocaleString()} USDC
                </span>
                <span className="text-xs text-outline font-medium">
                  de ${project.goalAmount.toLocaleString()} USDC
                </span>
              </div>
              <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-outline mt-1.5">
                <span className="text-primary">{project.percentage}% comprometido</span>
                <span>{project.daysLeft} días restantes</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-surface rounded-xl p-2.5 border border-outline-variant/20">
                <div className="text-outline text-[11px]">Aportantes</div>
                <div className="font-bold text-on-surface text-sm">{project.investorsCount} personas</div>
              </div>
              <div className="bg-surface rounded-xl p-2.5 border border-outline-variant/20">
                <div className="text-outline text-[11px]">Rendimiento Est.</div>
                <div className="font-bold text-primary text-sm">{project.financials.irrTarget}</div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() =>
                  onOpenInvestModal({
                    id: project.id,
                    title: project.title,
                    category: 'agro',
                    categoryLabel: project.category,
                    location: project.location,
                    daysLeft: project.daysLeft,
                    description: project.summary,
                    fundedAmount: project.fundedAmount,
                    goalAmount: project.goalAmount,
                    percentage: project.percentage,
                    modality: 'participacion',
                    modalityDetail: 'Participación Comunitaria',
                    creatorName: project.creator.name,
                    creatorInitials: 'BS',
                    image: project.heroImage,
                  })
                }
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                Aportar al Proyecto ($10+ USDC)
              </button>

              <button
                onClick={() => setActiveTab('graficos')}
                className="w-full py-2.5 rounded-xl bg-primary-fixed/40 text-primary font-bold text-xs hover:bg-primary-fixed transition flex items-center justify-center gap-2 border border-primary/20"
              >
                <span className="material-symbols-outlined text-base">insights</span>
                Ver Gráficos de Recaudación &amp; Escrow
              </button>

              <button
                onClick={() => onNavigate('hitos-escrow')}
                className="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container transition flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-primary">how_to_vote</span>
                Ver Hitos &amp; Votar Desembolso
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-outline-variant/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('graficos')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'graficos'
              ? 'border-primary text-primary bg-primary-fixed/10 rounded-t-xl'
              : 'border-transparent text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">insights</span>
          Flujo &amp; Gráficos Escrow (Recharts)
        </button>

        <button
          onClick={() => setActiveTab('finanzas')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'finanzas'
              ? 'border-primary text-primary bg-primary-fixed/10 rounded-t-xl'
              : 'border-transparent text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">account_balance</span>
          Finanzas, Escrow &amp; Multi-Sig
        </button>

        <button
          onClick={() => setActiveTab('ecologia')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'ecologia'
              ? 'border-primary text-primary bg-primary-fixed/10 rounded-t-xl'
              : 'border-transparent text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">science</span>
          Impacto &amp; Validación Técnica
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'legal'
              ? 'border-primary text-primary bg-primary-fixed/10 rounded-t-xl'
              : 'border-transparent text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">gavel</span>
          Legal, Constitución &amp; Título
        </button>

        <button
          onClick={() => setActiveTab('hitos')}
          className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'hitos'
              ? 'border-primary text-primary bg-primary-fixed/10 rounded-t-xl'
              : 'border-transparent text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">timeline</span>
          Hitos &amp; Liberación de Fondos
        </button>
      </div>

      {/* Tab: Flujo & Gráficos Escrow (Recharts) */}
      {activeTab === 'graficos' && (
        <div className="space-y-8 animate-fadeIn">
          <ProjectDataVisualization
            goalAmount={project.goalAmount}
            fundedAmount={project.fundedAmount}
            currency="USDC"
            smartContractAddress={project.smartContractAddress}
          />
        </div>
      )}

      {/* Tab 1: Impacto Ecológico & Validación Técnica */}
      {activeTab === 'ecologia' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Soil & Impact Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Carbono Orgánico (COS)</span>
                <span className="material-symbols-outlined text-primary text-lg">compost</span>
              </div>
              <div className="text-2xl font-black text-on-surface">{project.ecologicalImpact.carbonOrganicSoil.current}</div>
              <div className="text-xs text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                Base: {project.ecologicalImpact.carbonOrganicSoil.initial} → Meta: {project.ecologicalImpact.carbonOrganicSoil.target}
              </div>
              <div className="text-[11px] text-outline pt-1 border-t border-outline-variant/20">
                {project.ecologicalImpact.carbonOrganicSoil.sequesteredEstimatedTonCO2}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Relación Hongos/Bacterias</span>
                <span className="material-symbols-outlined text-secondary text-lg">biotech</span>
              </div>
              <div className="text-2xl font-black text-on-surface">{project.ecologicalImpact.microbiology.fungiBacteriaRatio}</div>
              <div className="text-xs text-secondary font-semibold">
                Carga viva: {project.ecologicalImpact.microbiology.activeMicroorganisms}
              </div>
              <div className="text-[11px] text-outline pt-1 border-t border-outline-variant/20">
                Indica suelo regenerativo maduro
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Retención Hídrica en Suelo</span>
                <span className="material-symbols-outlined text-primary text-lg">water_drop</span>
              </div>
              <div className="text-2xl font-black text-on-surface">{project.ecologicalImpact.waterFootprint.soilRetentionIncrease}</div>
              <div className="text-xs text-primary font-semibold">
                {project.ecologicalImpact.waterFootprint.rainHarvestedLiters}
              </div>
              <div className="text-[11px] text-outline pt-1 border-t border-outline-variant/20">
                {project.ecologicalImpact.waterFootprint.erosionReduction}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Rúbrica de Impacto Global</span>
                <span className="material-symbols-outlined text-tertiary text-lg">radar</span>
              </div>
              <div className="text-2xl font-black text-tertiary">{project.ecologicalImpact.radarScore} / 100</div>
              <div className="text-xs text-on-surface font-semibold">
                Clasificación Excelente (Grado A+)
              </div>
              <div className="text-[11px] text-outline pt-1 border-t border-outline-variant/20">
                Auditoría agronómica colegiada
              </div>
            </div>
          </div>

          {/* Microbiota Deep Dive */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">coronavirus</span>
                  Consorcio Microbiológico Inoculado en Biorreactores
                </h3>
                <p className="text-xs text-outline mt-0.5">
                  Microorganismos benéficos aislados de monte nativo virgen de las Sierras Grandes
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary">
                Libre de Patógenos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.ecologicalImpact.microbiology.dominantSpecies.map((species, i) => (
                <div
                  key={i}
                  className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
                    0{i + 1}
                  </div>
                  <div className="font-bold text-sm text-on-surface">{species.split(' (')[0]}</div>
                  <div className="text-xs text-outline-variant text-on-surface-variant">
                    {species.split(' (')[1]?.replace(')', '') || 'Agente de biocontrol nativo'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Laboratory Documents */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">assignment_turned_in</span>
                  Ensayos de Laboratorio & Certificaciones Oficiales
                </h3>
                <p className="text-xs text-outline mt-0.5">
                  Estudios edafológicos y químicos con firma digital y hash inmutable en blockchain
                </p>
              </div>
              <span className="text-xs font-mono text-outline">Protocolo ISO 14064-2</span>
            </div>

            <div className="space-y-3">
              {project.ecologicalImpact.officialDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 gap-4 hover:border-primary/40 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-on-surface">{doc.title}</div>
                      <div className="text-xs text-outline flex items-center gap-2 mt-0.5">
                        <span>{doc.institution}</span>
                        <span>·</span>
                        <span>{doc.date}</span>
                        <span>·</span>
                        <span className="font-mono text-[11px] text-primary">Hash: {doc.hash}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedLabDoc(doc);
                        setCopiedLabHash(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-semibold text-xs border border-outline-variant/40 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-sm text-primary">visibility</span>
                      Ver Certificado
                    </button>
                    <button
                      onClick={() => {
                        setDocNotice(`Descarga iniciada: ${doc.title} con firma digital válida y sello de tiempo blockchain.`);
                        const blob = new Blob([
                          `CERTIFICADO OFICIAL Y AVAL TÉCNICO\n\nDocumento: ${doc.title}\nInstitución: ${doc.institution}\nProtocolo: ${doc.protocol || 'ISO 14064-2'}\nFecha: ${doc.date}\nHash Inmutable: ${doc.fullHash || doc.hash}\nIPFS CID: ${doc.ipfsCid || 'bafybeigx7v2...'}\nAutoridad Firmante: ${doc.authority || 'Comité Técnico'}\nEstado: VÁLIDO Y VIGENTE EN BLOCKCHAIN`
                        ], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${doc.title.replace(/\s+/g, '_')}_Certificado.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      PDF Firmado
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {docNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between text-xs animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-base">file_download_done</span>
                  <span>{docNotice}</span>
                </div>
                <button
                  onClick={() => setDocNotice(null)}
                  className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Finanzas, Escrow & Multi-Sig */}
      {activeTab === 'finanzas' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Data Visualization with Recharts */}
          <ProjectDataVisualization
            goalAmount={project.goalAmount}
            fundedAmount={project.fundedAmount}
            currency="USDC"
            smartContractAddress={project.smartContractAddress}
          />

          {/* Financial Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-1">
              <span className="text-xs text-outline font-medium">Presupuesto Total Escrow</span>
              <div className="text-2xl font-black text-on-surface">
                ${project.financials.totalBudget.toLocaleString()} USDC
              </div>
              <div className="text-xs text-primary font-semibold">100% Auditado en Blockchain</div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-1">
              <span className="text-xs text-outline font-medium">Custodiado en Smart Contract</span>
              <div className="text-2xl font-black text-primary">
                ${project.financials.inEscrow.toLocaleString()} USDC
              </div>
              <div className="text-xs text-outline">Bloqueado hasta cumplimiento de hitos</div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-1">
              <span className="text-xs text-outline font-medium">Ratio Cobertura de Deuda (DSCR)</span>
              <div className="text-2xl font-black text-secondary">
                {project.financials.dscrRatio}
              </div>
              <div className="text-xs text-secondary font-semibold">Alta solvencia operativa (&gt; 1.3x)</div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 space-y-1">
              <span className="text-xs text-outline font-medium">Punto de Equilibrio (Break-Even)</span>
              <div className="text-2xl font-black text-on-surface">
                {project.financials.breakEvenMonth}
              </div>
              <div className="text-xs text-outline">Basado en demanda asegurada de 60 fincas</div>
            </div>
          </div>

          {/* Cost Allocation & Multi-Sig Schema */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cost Breakdown */}
            <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pie_chart</span>
                Asignación Presupuestaria por Rubro
              </h3>

              <div className="space-y-4">
                {project.financials.allocation.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-on-surface">{item.category}</span>
                      <span className="text-primary font-bold">
                        ${item.amount.toLocaleString()} USDC ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Sig Schema */}
            <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">shield</span>
                  Gobernanza Multi-Sig (3 de 5 Firmas)
                </h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary">
                  Gnosis / Safe
                </span>
              </div>

              <p className="text-xs text-outline">
                Para liberar cada tramo de dinero es imprescindible que al menos 3 entidades criptográficas independientes firmen la transacción.
              </p>

              <div className="space-y-3">
                {project.financials.multisigSigners.map((signer, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          signer.signed
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-high text-outline'
                        }`}
                      >
                        {signer.signed ? (
                          <span className="material-symbols-outlined text-base">check</span>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">{signer.name}</div>
                        <div className="text-outline text-[11px]">{signer.role}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-semibold ${
                          signer.signed ? 'text-primary' : 'text-outline'
                        }`}
                      >
                        {signer.signed ? 'Firmado' : 'Pendiente'}
                      </div>
                      <div className="text-[10px] text-outline font-mono">{signer.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supplier Bids & Tenders Table */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Licitaciones y Ofertas de Proveedores Auditadas
              </h3>
              <p className="text-xs text-outline mt-0.5">
                Precios testigos y facturas proforma cotejadas antes del desembolso
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-outline">
                    <th className="pb-3 font-semibold">Proveedor</th>
                    <th className="pb-3 font-semibold">Ítem / Servicio</th>
                    <th className="pb-3 font-semibold">Presupuesto</th>
                    <th className="pb-3 font-semibold">Calificación Técnica</th>
                    <th className="pb-3 font-semibold">Estado</th>
                    <th className="pb-3 font-semibold">Registro Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {project.financials.supplierBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-surface-container-low transition">
                      <td className="py-3.5 font-bold text-on-surface">{bid.provider}</td>
                      <td className="py-3.5 text-on-surface-variant">{bid.service}</td>
                      <td className="py-3.5 font-bold text-primary">${bid.amount.toLocaleString()} USDC</td>
                      <td className="py-3.5 font-semibold text-secondary">{bid.score}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            bid.status === 'Adjudicado'
                              ? 'bg-primary-fixed text-primary'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {bid.status}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono text-[11px] text-outline">{bid.txHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Legal & Título de Tierra */}
      {activeTab === 'legal' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Land Title & Cadastral Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  Certeza Jurídica & Tenencia de la Tierra
                </h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed text-primary">
                  100% Regularizado
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="text-outline text-[11px]">Título de Dominio</span>
                  <div className="font-bold text-on-surface text-sm">{project.legal.propertyTitle}</div>
                  <div className="text-outline text-[11px]">{project.legal.notaryOffice}</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="text-outline text-[11px]">Nomenclatura Catastral</span>
                  <div className="font-bold text-on-surface text-sm">{project.legal.cadastralId}</div>
                  <div className="text-outline text-[11px]">Dirección General de Catastro Córdoba</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="text-outline text-[11px]">Superficie Afectada</span>
                  <div className="font-bold text-on-surface text-sm">{project.legal.totalAreaHa}</div>
                  <div className="text-outline text-[11px]">Con zonificación rural productiva</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="text-outline text-[11px]">Régimen de Uso</span>
                  <div className="font-bold text-on-surface text-sm">{project.legal.contractType}</div>
                  <div className="text-outline text-[11px]">Inembargable por terceros ajenos</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary-fixed/30 border border-primary-fixed-dim/40 space-y-2 text-xs">
                <div className="font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">eco</span>
                  Resolución Ambiental Oficial:
                </div>
                <div className="text-on-surface-variant font-medium">
                  {project.legal.environmentalPermit}. Autorización de biofermentación aeróbica/anaeróbica de residuos orgánicos sin vertidos efluentes.
                </div>
              </div>
            </div>

            {/* Geo Satellite Verification */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">satellite_alt</span>
                  Geolocalización & Teledetección
                </h3>
                <p className="text-xs text-outline mt-0.5">
                  Coordenadas poligonales registradas en el oráculo descentralizado
                </p>
              </div>

              {/* Map representation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-primary/20 border border-outline-variant/30 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                  alt="Vista aérea predio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg animate-bounce mb-2">
                    <span className="material-symbols-outlined text-xl">pin_drop</span>
                  </div>
                  <div className="text-sm font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md">
                    Predio El Remanso (San Javier)
                  </div>
                  <div className="text-[11px] font-mono text-white/80 mt-1">
                    {project.legal.coordinates}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-outline">
                El oráculo satelital Sentinel-2 monitorea el índice NDVI de biomasa vegetal cada 5 días para validar la absorción de carbono en el suelo.
              </div>
            </div>
          </div>

          {/* Notarized IPFS Documents */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              Instrumentos Notariales en Custodia IPFS
            </h3>

            <div className="space-y-3">
              {project.legal.notarizedPdfs.map((pdf, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">folder_open</span>
                    <div>
                      <div className="font-bold text-sm text-on-surface">{pdf.title}</div>
                      <div className="text-outline text-[11px] mt-0.5">
                        {pdf.notary} · {pdf.date}
                      </div>
                      <div className="text-primary font-mono text-[10px] mt-1 break-all">
                        IPFS CID: {pdf.ipfsCid}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedIpfsDoc(pdf);
                      setCopiedIpfsCid(false);
                    }}
                    className="shrink-0 px-3.5 py-1.5 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-semibold text-xs border border-outline-variant/40 flex items-center gap-1.5 transition hover:border-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-primary">verified</span>
                    Inspeccionar en IPFS
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Hitos & Liberación de Fondos */}
      {activeTab === 'hitos' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-on-surface">
                Cronograma de Hitos & Protocolo de Desembolso
              </h3>
              <p className="text-xs text-outline mt-0.5">
                Cada tramo se libera únicamente cuando se completan las condiciones y se alcanza el quórum
              </p>
            </div>

            <button
              onClick={() => onNavigate('hitos-escrow')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm"
            >
              <span className="material-symbols-outlined text-base">how_to_vote</span>
              Ir a Sala de Votación del Hito 2
            </button>
          </div>

          <div className="space-y-6">
            {BIOFABRICA_MILESTONES.map((m) => {
              const isDisbursed = m.status === 'disbursed';
              const isActive = m.status === 'audit_active';
              return (
                <div
                  key={m.id}
                  className={`p-6 sm:p-8 rounded-2xl border transition ${
                    isActive
                      ? 'bg-surface-container-lowest border-primary shadow-lg ring-1 ring-primary/30'
                      : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isDisbursed
                            ? 'bg-primary text-on-primary'
                            : isActive
                            ? 'bg-tertiary text-on-tertiary animate-pulse'
                            : 'bg-surface-container-high text-outline'
                        }`}
                      >
                        {isDisbursed ? '✓' : `0${m.id}`}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base sm:text-lg font-bold text-on-surface">
                            Hito {m.id}: {m.title}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isDisbursed
                                ? 'bg-primary-fixed text-primary'
                                : isActive
                                ? 'bg-tertiary-container text-on-tertiary-container'
                                : 'bg-surface-container-high text-outline'
                            }`}
                          >
                            {m.statusLabel}
                          </span>
                        </div>
                        <p className="text-xs text-outline mt-1 font-medium">{m.estimatedDate}</p>
                      </div>
                    </div>

                    <div className="text-left lg:text-right">
                      <div className="text-xl font-black text-on-surface">
                        ${m.amount.toLocaleString()} USDC
                      </div>
                      <div className="text-xs text-outline font-semibold">
                        {m.percentageTotal}% del fondo total
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {m.description}
                    </p>

                    <div>
                      <div className="text-xs font-bold text-on-surface mb-2">
                        Criterios de Verificación Obligatorios:
                      </div>
                      <ul className="space-y-1.5 text-xs text-outline">
                        {m.criteria.map((crit, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm text-primary shrink-0">
                              check_circle
                            </span>
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Active Voting Progress if active */}
                    {m.voting && (
                      <div className="p-4 rounded-xl bg-surface-container-low border border-primary/30 space-y-3">
                        <div className="flex justify-between items-baseline text-xs font-bold">
                          <span className="text-on-surface">Quórum Aportante: {m.voting.quorum}% (Mínimo: {m.voting.requiredQuorum}%)</span>
                          <span className="text-primary">{m.voting.favorablePercentage}% A Favor</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${m.voting.favorablePercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-outline font-medium">
                          <span>{m.voting.totalVotes} votos registrados</span>
                          <span className="text-error font-bold">Quedan {m.voting.hoursLeft} horas para el cierre</span>
                        </div>
                      </div>
                    )}

                    {/* Disbursed evidence if disbursed */}
                    {m.evidence && (
                      <div className="pt-2">
                        <div className="text-xs font-bold text-on-surface mb-2">
                          Evidencia Registrada & Verificada:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {m.evidence.map((ev, eIdx) => (
                            <div
                              key={eIdx}
                              className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3 text-xs"
                            >
                              {ev.thumb ? (
                                <img
                                  src={ev.thumb}
                                  alt={ev.label}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-lg">
                                    {ev.icon || 'verified'}
                                  </span>
                                </div>
                              )}
                              <div className="overflow-hidden">
                                <div className="font-bold text-on-surface truncate">{ev.label}</div>
                                <div className="text-outline text-[11px] truncate">{ev.meta}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal de Inspección IPFS & Garantía Notarial */}
      {selectedIpfsDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-2xl">history_edu</span>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Custodia Descentralizada IPFS
                  </span>
                  <h3 className="text-lg font-bold text-on-surface mt-1">
                    Inspección de Instrumento Notarial
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedIpfsDoc(null)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Document Details */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                <div className="font-bold text-base text-on-surface">
                  {selectedIpfsDoc.title}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-outline-variant/20 text-on-surface">
                  <div>
                    <span className="text-outline text-[11px] block">Autoridad Notarial / Emisor:</span>
                    <strong className="text-xs">{selectedIpfsDoc.notary}</strong>
                  </div>
                  <div>
                    <span className="text-outline text-[11px] block">Fecha de Certificación:</span>
                    <strong className="text-xs">{selectedIpfsDoc.date}</strong>
                  </div>
                </div>
              </div>

              {/* IPFS CID Box */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">tag</span>
                    Content Identifier (CID v1) en IPFS:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(selectedIpfsDoc.ipfsCid);
                      setCopiedIpfsCid(true);
                      setTimeout(() => setCopiedIpfsCid(false), 2000);
                    }}
                    className="text-primary hover:text-primary-dim font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">
                      {copiedIpfsCid ? 'check' : 'content_copy'}
                    </span>
                    {copiedIpfsCid ? '¡Copiado!' : 'Copiar CID'}
                  </button>
                </div>
                <div className="p-2.5 bg-surface rounded-xl font-mono text-[11px] text-on-surface break-all border border-outline-variant/30 select-all">
                  {selectedIpfsDoc.ipfsCid}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-outline pt-1">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    Pinneado en 3 Nodos (Pinata, Web3.Storage, Protocol Labs)
                  </span>
                  <span>·</span>
                  <span>Formato: DAG-PB / SHA2-256</span>
                </div>
              </div>

              {/* Legal explanation */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-outline">
                <div className="font-bold text-on-surface text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">gavel</span>
                  ¿Cómo funciona la custodia legal en Seed & Grow?
                </div>
                <p className="text-[11px] leading-relaxed">
                  Este instrumento notarial vincula la garantía del mundo físico (escrituras de dominio, comodatos a 15 años y permisos ambientales oficiales) con el <strong>Smart Contract de Escrow</strong> en Base Sepolia.
                </p>
                <p className="text-[11px] leading-relaxed">
                  Al estar registrado en la red distribuida IPFS con este CID único, <strong>ninguna de las partes (ni los creadores ni los escribanos) puede alterar, sustituir o revocar retroactivamente el texto</strong> sin romper la firma digital criptográfica.
                </p>
              </div>

              {/* IPFS Gateways URLs */}
              <div className="space-y-2">
                <span className="font-bold text-on-surface text-[11px] block">
                  Compuertas (Gateways) de verificación pública:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`https://ipfs.io/ipfs/${selectedIpfsDoc.ipfsCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface border border-outline-variant/30 hover:border-primary flex items-center justify-between text-xs transition"
                  >
                    <span className="truncate">ipfs.io Gateway</span>
                    <span className="material-symbols-outlined text-xs text-primary">open_in_new</span>
                  </a>
                  <a
                    href={`https://dweb.link/ipfs/${selectedIpfsDoc.ipfsCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface border border-outline-variant/30 hover:border-primary flex items-center justify-between text-xs transition"
                  >
                    <span className="truncate">dweb.link Gateway</span>
                    <span className="material-symbols-outlined text-xs text-primary">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/20">
              <button
                onClick={() => setSelectedIpfsDoc(null)}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition cursor-pointer"
              >
                Entendido / Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ensayos de Laboratorio & Certificaciones Científicas */}
      {selectedLabDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner shrink-0">
                  <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Certificación Oficial ISO 14064-2 · Oráculo dMRV
                  </span>
                  <h3 className="text-lg font-bold text-on-surface mt-1">
                    {selectedLabDoc.title}
                  </h3>
                  <p className="text-xs text-outline">{selectedLabDoc.institution}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLabDoc(null)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Institutional Credentials */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface">
                <div>
                  <span className="text-outline text-[11px] block">Organismo Emisor:</span>
                  <strong className="text-xs text-on-surface">{selectedLabDoc.institution}</strong>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Responsable Técnico Colegiado:</span>
                  <strong className="text-xs text-on-surface">{selectedLabDoc.authority || 'Comisión de Acreditación'}</strong>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Normativa / Protocolo de Calidad:</span>
                  <span className="font-mono text-xs text-primary font-bold">{selectedLabDoc.protocol || 'ISO 14064-2'}</span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Fecha de Muestreo y Ensayo:</span>
                  <strong className="text-xs text-on-surface">{selectedLabDoc.date}</strong>
                </div>
              </div>
            </div>

            {/* Scientific Parameters & Lab Results Grid */}
            {selectedLabDoc.metrics && selectedLabDoc.metrics.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">biotech</span>
                    Resultados Analíticos Cuantitativos
                  </h4>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                    Aprobado 100% de Parámetros
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedLabDoc.metrics.map((m: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs text-outline">{m.label}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {m.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-base font-black text-on-surface">{m.value}</span>
                        <span className="text-[11px] text-outline font-mono">{m.range}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Summary */}
            {selectedLabDoc.summary && (
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1.5 text-xs">
                <span className="font-bold text-on-surface flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-sm text-primary">fact_check</span>
                  Conclusión del Dictamen Edafológico / Ambiental:
                </span>
                <p className="text-on-surface-variant leading-relaxed text-[11px]">
                  {selectedLabDoc.summary}
                </p>
              </div>
            )}

            {/* Cryptographic Hash & Smart Contract Oracle Link */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">enhanced_encryption</span>
                  Hash Criptográfico Inmutable (SHA-256 / Keccak):
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(selectedLabDoc.fullHash || selectedLabDoc.hash);
                    setCopiedLabHash(true);
                    setTimeout(() => setCopiedLabHash(false), 2000);
                  }}
                  className="text-primary hover:text-primary-dim font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">
                    {copiedLabHash ? 'check' : 'content_copy'}
                  </span>
                  {copiedLabHash ? '¡Copiado!' : 'Copiar Hash'}
                </button>
              </div>
              <div className="p-2.5 bg-surface rounded-xl font-mono text-[11px] text-on-surface break-all border border-outline-variant/30 select-all">
                {selectedLabDoc.fullHash || selectedLabDoc.hash}
              </div>

              {selectedLabDoc.roleInContract && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-700">lock</span>
                    Condición Mandatoria en Smart Contract Escrow:
                  </span>
                  <p className="text-amber-800 leading-normal">
                    {selectedLabDoc.roleInContract}. Si este hash no está validado por el oráculo dMRV en la blockchain, el contrato inteligente mantiene bloqueados los fondos.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-outline-variant/20">
              <button
                onClick={() => {
                  setDocNotice(`Certificado descargado con éxito: ${selectedLabDoc.title}`);
                  const blob = new Blob([
                    `DICTAMEN DE LABORATORIO Y ENSAYO OFICIAL\n\n` +
                    `Documento: ${selectedLabDoc.title}\n` +
                    `Institución: ${selectedLabDoc.institution}\n` +
                    `Norma: ${selectedLabDoc.protocol || 'ISO 14064-2'}\n` +
                    `Responsable Técnico: ${selectedLabDoc.authority}\n` +
                    `Fecha: ${selectedLabDoc.date}\n` +
                    `Hash Blockchain: ${selectedLabDoc.fullHash || selectedLabDoc.hash}\n` +
                    `Red: ${selectedLabDoc.network || 'Polygon PoS'}\n\n` +
                    `Dictamen: ${selectedLabDoc.summary}\n\n` +
                    `Certificación con validez jurídica conforme a la Ley de Firma Digital y Oráculo dMRV.`
                  ], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedLabDoc.title.replace(/\s+/g, '_')}_Acreditado.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 hover:bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Descargar Comprobante Acreditado
              </button>

              <button
                onClick={() => setSelectedLabDoc(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition cursor-pointer"
              >
                Cerrar Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
