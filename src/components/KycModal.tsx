import React, { useState } from 'react';
import { UserAccount, KycData } from '../types';

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onKycSuccess: (kycData: KycData) => void;
}

export const KycModal: React.FC<KycModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onKycSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 1: Personal Data
  const [fullName, setFullName] = useState<string>(currentUser?.name || 'Martina Gómez');
  const [dniCuil, setDniCuil] = useState<string>('27-38491024-4');
  const [nationality, setNationality] = useState<string>('Argentina');
  const [taxStatus, setTaxStatus] = useState<string>('Monotributo');
  const [address, setAddress] = useState<string>('Av. Hipólito Yrigoyen 450, Córdoba Capital');

  // Step 2: Document upload simulated
  const [docUploaded, setDocUploaded] = useState<boolean>(true);
  const [biometricVerified, setBiometricVerified] = useState<boolean>(true);

  // Step 3: AML / UIF Declaration
  const [isPep, setIsPep] = useState<boolean>(false);
  const [fundsOrigin, setFundsOrigin] = useState<string>('Actividad profesional independiente / Servicios');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedHash = `0xkyc_${Math.random().toString(16).substring(2, 10)}${Date.now().toString(16)}`;
      const completedKyc: KycData = {
        fullName,
        dniCuil,
        nationality,
        isPep,
        fundsOrigin,
        taxStatus,
        verificationHash: generatedHash,
        verifiedAt: new Date().toLocaleDateString('es-AR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        riskScore: 'low',
      };

      setIsSubmitting(false);
      onKycSuccess(completedKyc);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#012d1d] to-[#006c48] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#92f7c3]/20 flex items-center justify-center text-[#92f7c3] border border-[#92f7c3]/30">
              <span className="material-symbols-outlined text-xl">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">
                  Verificación de Identidad KYC / UIF
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#92f7c3] text-[#012d1d]">
                  Ley 25.246
                </span>
              </div>
              <p className="text-xs text-white/80">
                Cumplimiento normativo para inversores de financiamiento colectivo en Argentina
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="bg-surface-container-low px-6 py-3 border-b border-outline-variant/20 flex items-center justify-between text-xs">
          {[
            { num: 1, label: 'Identidad' },
            { num: 2, label: 'Documentos' },
            { num: 3, label: 'Declaración UIF' },
            { num: 4, label: 'Certificado' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 font-bold ${
                step === s.num
                  ? 'text-primary'
                  : step > s.num
                  ? 'text-emerald-700'
                  : 'text-outline/60'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === s.num
                    ? 'bg-primary text-white'
                    : step > s.num
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-surface-container-high text-outline'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-on-surface">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 rounded-xl bg-primary-fixed/20 border border-primary-fixed text-primary flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg shrink-0">badge</span>
                <span>
                  Validación requerida por la Comisión Nacional de Valores (CNV) y la UIF para vincular tu wallet a un perfil fiduciario real.
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Nombre Completo y Apellido *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Ej. Martina Gómez"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">CUIT / CUIL / DNI *</label>
                    <input
                      type="text"
                      value={dniCuil}
                      onChange={(e) => setDniCuil(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="27-xxxxxxxx-x"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Nacionalidad *</label>
                    <input
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Condición Fiscal ARCA *</label>
                    <select
                      value={taxStatus}
                      onChange={(e) => setTaxStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="Monotributo">Monotributista</option>
                      <option value="Responsable Inscripto">Responsable Inscripto (IVA)</option>
                      <option value="Empleado en Relación de Dependencia">Relación de Dependencia</option>
                      <option value="Consumidor Final">Consumidor Final</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Domicilio Fiscal (Provincia)</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
                <span className="font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">photo_camera</span>
                  Documento Nacional de Identidad (DNI)
                </span>
                <p className="text-outline text-[11px]">
                  Carga fotográfica de frente y dorso de tu DNI argentino vigente para cotejo con el Registro Nacional de las Personas (RENAPER).
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary-fixed/10 flex flex-col items-center justify-center text-center space-y-1">
                    <span className="material-symbols-outlined text-2xl text-primary">id_card</span>
                    <span className="font-bold text-[11px] text-primary">DNI Frente (Cargado)</span>
                    <span className="text-[10px] text-outline">dni_frente_38491024.jpg ✓</span>
                  </div>
                  <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary-fixed/10 flex flex-col items-center justify-center text-center space-y-1">
                    <span className="material-symbols-outlined text-2xl text-primary">flip</span>
                    <span className="font-bold text-[11px] text-primary">DNI Dorso (Cargado)</span>
                    <span className="text-[10px] text-outline">dni_dorso_38491024.jpg ✓</span>
                  </div>
                </div>
              </div>

              {/* Biometrics Check */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 text-xl">face</span>
                  <div>
                    <div className="font-bold text-xs">Prueba Biométrica Facial</div>
                    <div className="text-[10px] text-emerald-800">Cotejo de vida facial completado con 99.4% de coincidencia</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                  Verificado
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <span className="material-symbols-outlined text-base">gavel</span>
                  Declaración Jurada Anti-Lavado (Resolución UIF N° 35/2023)
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Para participar en fideicomisos de financiamiento colectivo con custodia segregada en blockchain, debes manifestar bajo juramento el origen legítimo de los fondos.
                </p>
              </div>

              {/* PEP Question */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
                <label className="font-bold text-on-surface block">
                  ¿Reviste la condición de Persona Expuesta Políticamente (PEP)?
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="pep"
                      checked={!isPep}
                      onChange={() => setIsPep(false)}
                      className="accent-primary"
                    />
                    <span>No soy Persona Expuesta Políticamente (Estándar)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-outline">
                    <input
                      type="radio"
                      name="pep"
                      checked={isPep}
                      onChange={() => setIsPep(true)}
                      className="accent-primary"
                    />
                    <span>Sí, soy PEP</span>
                  </label>
                </div>
              </div>

              {/* Funds Origin */}
              <div>
                <label className="block font-bold text-on-surface mb-1">
                  Origen y Licitud de los Fondos a Invertir *
                </label>
                <select
                  value={fundsOrigin}
                  onChange={(e) => setFundsOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="Actividad profesional independiente / Servicios">
                    Actividad profesional independiente / Servicios profesionales
                  </option>
                  <option value="Ahorros bancarizados de ingresos legítimos">
                    Ahorros bancarizados de ingresos legítimos acumulados
                  </option>
                  <option value="Venta de inmueble o rodado registrado">
                    Venta de inmueble o rodado registrado
                  </option>
                  <option value="Dividendos / Retiros de utilidades societarias">
                    Dividendos / Retiros de utilidades societarias
                  </option>
                  <option value="Cobro de herencia o donación familiar">
                    Cobro de herencia o donación familiar acreditada
                  </option>
                </select>
              </div>

              {/* Sworn statement checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="mt-0.5 accent-primary"
                />
                <span className="text-[11px] text-outline leading-tight">
                  Declaro bajo juramento que los fondos que aporto a los proyectos de Seed &amp; Grow tienen origen lícito y no provienen de ninguna actividad contemplada en la Ley 25.246 de Prevención de Lavado de Activos ni financiamiento del terrorismo.
                </span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="py-6 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-on-surface">
                  ¡Perfil de Inversor Verificado!
                </h4>
                <p className="text-xs text-outline max-w-sm mx-auto">
                  Tu identidad ha sido validada conforme al régimen de la CNV y la UIF. Ya estás habilitado para comprometer capital en contratos escrow en Base Sepolia.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 max-w-sm mx-auto text-left font-mono text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline">Titular:</span>
                  <span className="font-bold text-on-surface">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">CUIT/CUIL:</span>
                  <span className="font-bold text-on-surface">{dniCuil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Nivel de Riesgo UIF:</span>
                  <span className="text-emerald-700 font-extrabold">BAJO (Aprobado)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-outline-variant/20">
                  <span className="text-outline">Hash de Certificación:</span>
                  <span className="text-primary truncate max-w-[150px]">
                    0xkyc_7e28b4a...92f1
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between shrink-0">
          {step < 4 ? (
            <>
              <button
                type="button"
                onClick={step > 1 ? () => setStep(step - 1) : onClose}
                className="px-4 py-2 rounded-xl font-bold text-outline hover:text-on-surface transition cursor-pointer"
              >
                {step > 1 ? 'Atrás' : 'Cancelar'}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || (step === 3 && !termsAccepted)}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    <span>Validando con UIF / RENAPER...</span>
                  </>
                ) : step === 3 ? (
                  <>
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Confirmar y Obtener Verificación</span>
                  </>
                ) : (
                  <>
                    <span>Siguiente</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition shadow-sm cursor-pointer"
            >
              Comenzar a Invertir con Perfil Verificado
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
