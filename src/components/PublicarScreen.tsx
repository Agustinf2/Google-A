import React, { useState } from 'react';
import { ScreenView } from '../types';

interface PublicarScreenProps {
  onNavigate: (screen: ScreenView) => void;
  onProjectCreated?: (newProject: any) => void;
}

export const PublicarScreen: React.FC<PublicarScreenProps> = ({
  onNavigate,
  onProjectCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedSuccess, setDeployedSuccess] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'agro',
    location: '',
    description: '',
    goalAmount: 25000,
    modality: 'participacion',
    impactTarget: '120 ton CO2eq / año y regeneración de 25 hectáreas',
    propertyTitle: '',
    cadastralNumber: '',
    milestone1Name: 'Preparación de suelo e inoculantes nativos',
    milestone1Percent: 25,
    milestone2Name: 'Infraestructura de biofermentación y riego',
    milestone2Percent: 35,
    milestone3Name: 'Distribución y análisis de impacto microbiológico',
    milestone3Percent: 40,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeployContract = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedSuccess(true);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-fixed text-primary">
              Lanzador de Proyectos
            </span>
            <span className="text-xs text-outline font-medium">Estandar Escrow ERC-20 / Base</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Publicar Proyecto de Financiamiento Regenerativo
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1">
            Estructura tus hitos agronómicos con custodia inteligente y auditoría colegiada
          </p>
        </div>

        <button
          onClick={() => onNavigate('explorar')}
          className="text-xs text-outline hover:text-on-surface font-semibold flex items-center gap-1 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">close</span>
          Cancelar
        </button>
      </div>

      {/* Step Stepper */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { step: 1, label: 'Básicos & Suelo' },
          { step: 2, label: 'Presupuesto & Hitos' },
          { step: 3, label: 'Legal & Auditoría' },
          { step: 4, label: 'Despliegue On-Chain' },
        ].map((s) => (
          <div
            key={s.step}
            onClick={() => s.step < currentStep && setCurrentStep(s.step)}
            className={`p-3 rounded-xl border text-center transition cursor-pointer ${
              currentStep === s.step
                ? 'bg-primary text-on-primary border-primary font-bold shadow-md'
                : currentStep > s.step
                ? 'bg-primary-fixed/20 text-primary border-primary/30 font-semibold'
                : 'bg-surface-container-low text-outline border-outline-variant/30'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider">Paso {s.step}</div>
            <div className="text-xs sm:text-sm truncate">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Step 1: Datos Básicos */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">rocket_launch</span>
            Paso 1: Información General del Proyecto y Propuesta de Valor
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Título del Proyecto / Emprendimiento</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej. Nexo Cloud, Biofábrica Comunitaria, VoltGrid Solar..."
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                >
                  <option value="tecnologia">Tecnología &amp; Software</option>
                  <option value="salud">Salud &amp; Biotecnología</option>
                  <option value="diseno">Diseño &amp; Hardware</option>
                  <option value="energia">Energía Limpia &amp; Clima</option>
                  <option value="agro">Agro &amp; Bioeconomía</option>
                  <option value="sustentabilidad">Sustentabilidad &amp; Reforestación</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Ubicación Geográfica</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ej. Buenos Aires, Córdoba, Santiago, Remoto..."
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Resumen Ejecutivo &amp; Misión</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe la propuesta de valor, el problema que resuelve, clientes objetivo y plan de escalamiento..."
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Métricas de Tracción o Impacto Proyectadas</label>
              <input
                type="text"
                name="impactTarget"
                value={formData.impactTarget}
                onChange={handleChange}
                placeholder="Ej. 10.000 usuarios activos mensuales, 120 ton CO2eq/año o $50k MRR"
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-outline-variant/20">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition flex items-center gap-1.5"
            >
              Siguiente: Presupuesto & Hitos
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Presupuesto & Hitos */}
      {currentStep === 2 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
            Paso 2: Meta de Financiamiento y Estructuración Escrow
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Meta Total Solicitada (USDC)</label>
                <input
                  type="number"
                  name="goalAmount"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Modalidad de Retorno</label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                >
                  <option value="participacion">Participación en Resultados (Equity 0.8% - 5%)</option>
                  <option value="prestamo">Préstamo de Impacto a Tasa Fija (8.5% TNA)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
              <span className="font-bold text-on-surface text-sm">
                Desglose de Hitos de Custodia Escrow (Suma = 100%)
              </span>

              <div className="space-y-3">
                <div className="p-3 bg-surface rounded-xl border border-outline-variant/20 space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Hito 1 (Tramo Inicial)</span>
                    <span className="text-primary">{formData.milestone1Percent}% (${(formData.goalAmount * formData.milestone1Percent / 100).toLocaleString()} USDC)</span>
                  </div>
                  <input
                    type="text"
                    name="milestone1Name"
                    value={formData.milestone1Name}
                    onChange={handleChange}
                    className="w-full p-2 bg-surface-container-low border rounded-lg text-xs"
                  />
                </div>

                <div className="p-3 bg-surface rounded-xl border border-outline-variant/20 space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Hito 2 (Ejecución Principal)</span>
                    <span className="text-primary">{formData.milestone2Percent}% (${(formData.goalAmount * formData.milestone2Percent / 100).toLocaleString()} USDC)</span>
                  </div>
                  <input
                    type="text"
                    name="milestone2Name"
                    value={formData.milestone2Name}
                    onChange={handleChange}
                    className="w-full p-2 bg-surface-container-low border rounded-lg text-xs"
                  />
                </div>

                <div className="p-3 bg-surface rounded-xl border border-outline-variant/20 space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Hito 3 (Cierre y Validación de Impacto)</span>
                    <span className="text-primary">{formData.milestone3Percent}% (${(formData.goalAmount * formData.milestone3Percent / 100).toLocaleString()} USDC)</span>
                  </div>
                  <input
                    type="text"
                    name="milestone3Name"
                    value={formData.milestone3Name}
                    onChange={handleChange}
                    className="w-full p-2 bg-surface-container-low border rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant/20">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold"
            >
              Atrás
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition flex items-center gap-1.5"
            >
              Siguiente: Legal & Auditoría
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Legal & Auditoría */}
      {currentStep === 3 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">gavel</span>
            Paso 3: Certeza Jurídica, Propiedad Intelectual &amp; Auditoría Técnica
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Razón Social / Registro de Entidad o Titularidad</label>
                <input
                  type="text"
                  name="propertyTitle"
                  value={formData.propertyTitle}
                  onChange={handleChange}
                  placeholder="Ej. S.A.S. / SRL / Escritura / Patente INPI #4819"
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Identificación Fiscal / Matrícula</label>
                <input
                  type="text"
                  name="cadastralNumber"
                  value={formData.cadastralNumber}
                  onChange={handleChange}
                  placeholder="Ej. CUIT 30-71829384-2 / Folio Catastral / Registro"
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary-fixed/20 border border-primary/30 space-y-2">
              <div className="font-bold text-on-surface flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                Auditoría Técnica Imparcial por Sector
              </div>
              <p className="text-outline text-xs leading-relaxed">
                El protocolo de Seed &amp; Grow asigna un perito auditor acreditado e imparcial según la disciplina de tu proyecto (ingeniería técnica, auditoría contable colegiada, peritaje agronómico o tecnológico) para fiscalizar las evidencias antes de cada desembolso.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant/20">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold"
            >
              Atrás
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition flex items-center gap-1.5"
            >
              Siguiente: Revisión y Despliegue
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Despliegue On-Chain */}
      {currentStep === 4 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-6">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">rocket_launch</span>
            Paso 4: Despliegue del Smart Contract Escrow en Base
          </h2>

          {deployedSuccess ? (
            <div className="p-8 rounded-2xl bg-primary-fixed/20 border border-primary text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto text-3xl shadow-lg">
                <span className="material-symbols-outlined text-4xl">check</span>
              </div>
              <h3 className="text-2xl font-black text-on-surface">¡Smart Contract Desplegado con Éxito!</h3>
              <p className="text-xs sm:text-sm text-outline max-w-md mx-auto">
                Tu proyecto <strong>{formData.title || 'Biofábrica Comunitaria'}</strong> ha sido registrado en la red Base Sepolia con custodia escrow multi-sig.
              </p>
              <div className="p-3 bg-surface rounded-xl font-mono text-xs text-primary max-w-sm mx-auto">
                Contrato: 0x4a92...b81e
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => onNavigate('explorar')}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition"
                >
                  Ir al Catálogo de Proyectos
                </button>
                <button
                  onClick={() => onNavigate('seguimiento')}
                  className="px-6 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-bold text-xs hover:opacity-90 transition"
                >
                  Ver Ficha de Seguimiento
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 text-xs">
                <div className="font-bold text-on-surface text-sm">Resumen de Contrato a Inicializar:</div>
                <div className="grid grid-cols-2 gap-2 text-outline">
                  <div>Proyecto: <strong className="text-on-surface">{formData.title || 'Biofábrica Serrana'}</strong></div>
                  <div>Meta: <strong className="text-primary">${formData.goalAmount.toLocaleString()} USDC</strong></div>
                  <div>Red: <strong className="text-on-surface">Base Sepolia L2</strong></div>
                  <div>Custodia: <strong className="text-on-surface">Safe Multi-Sig 3/5</strong></div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-outline-variant/20">
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={isDeploying}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  onClick={handleDeployContract}
                  disabled={isDeploying}
                  className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition shadow-lg flex items-center gap-2"
                >
                  {isDeploying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Desplegando en Base...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">electric_bolt</span>
                      Desplegar Smart Contract Escrow
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
