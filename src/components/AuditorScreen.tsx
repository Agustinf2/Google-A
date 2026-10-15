import React, { useState } from 'react';
import { ScreenView, UserRole } from '../types';
import { AUDITOR_REPORT } from '../data/mockData';

interface AuditorScreenProps {
  onNavigate: (screen: ScreenView) => void;
  userRole?: UserRole;
}

export const AuditorScreen: React.FC<AuditorScreenProps> = ({ onNavigate, userRole = 'auditor' }) => {
  const report = AUDITOR_REPORT;
  const [signedState, setSignedState] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);

  const handleDownloadCertificate = () => {
    setToast('Generando y descargando Certificado Notarial de Auditoría con sello criptográfico...');
    setTimeout(() => setToast(null), 4000);
  };

  const handleReSign = () => {
    setSignedState(true);
    setToast('Firma digital ratificada en Base Sepolia con hash 0x7e8b91c...19d2');
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary p-4 rounded-2xl shadow-2xl border border-primary-fixed flex items-center gap-3 animate-slideUp">
          <span className="material-symbols-outlined text-2xl text-primary-fixed">verified</span>
          <div className="text-xs font-bold">{toast}</div>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => onNavigate('hitos-escrow')}
              className="text-xs text-outline hover:text-primary transition flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver a Hitos Escrow
            </button>
            <span className="text-xs text-outline">/</span>
            <span className="text-xs font-semibold text-on-surface">Expediente {report.inspectionId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Dictamen Técnico de Auditoría Agronómica
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-0.5">
            Colegio de Ingenieros Agrónomos de Córdoba · Protocolo de Verificación en Sitio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCertificate}
            className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/30 flex items-center gap-2 transition"
          >
            <span className="material-symbols-outlined text-base text-primary">download</span>
            Descargar Certificado PDF
          </button>
          <button
            onClick={() => onNavigate('seguimiento')}
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            Ver Proyecto
          </button>
        </div>
      </div>

      {/* Inspector Identification Certificate Box */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-on-surface">{report.auditorName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-on-primary">
                  Auditor Matriculado Acreditado
                </span>
              </div>
              <p className="text-xs text-outline">{report.credentials}</p>
              <p className="text-xs text-on-surface-variant font-medium">
                Referencia: <strong>{report.projectRef}</strong> · Ubicación: {report.locationVerified}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 shrink-0">
            <div className="text-3xl font-black text-primary">{report.verdictScore}</div>
            <div className="text-xs font-bold text-on-surface mt-0.5">Calificación Técnica</div>
            <div className="text-[11px] text-primary font-semibold">Desembolso Recomendado</div>
          </div>
        </div>

        {/* Blockchain proof bar */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-on-surface">Firma Inmutable On-Chain:</span>
            <span className="font-mono text-outline truncate max-w-xs">{report.blockchainProof.txHash}</span>
          </div>
          <div className="flex items-center gap-3 text-outline text-[11px]">
            <span>Bloque: #{report.blockchainProof.blockNumber}</span>
            <span>·</span>
            <span>{report.blockchainProof.network}</span>
          </div>
        </div>

        {/* Checklist of inspection points */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span>
            Puntos de Control & Acta de Inspección en Sitio
          </h3>

          <div className="space-y-3">
            {report.checklist.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2 hover:border-primary/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                    <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <span>{item.item}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-fixed text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check</span>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                  {item.description}
                </p>

                <div className="pl-8 pt-1 text-xs">
                  <span className="font-semibold text-outline">Constatación del Auditor: </span>
                  <span className="text-on-surface font-medium italic">&quot;{item.observation}&quot;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auditor Concluding Remarks */}
        <div className="p-6 rounded-2xl bg-primary-fixed/20 border border-primary/30 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <span className="material-symbols-outlined">gavel</span>
            Conclusiones y Dictamen de Desembolso
          </div>
          <p className="text-xs sm:text-sm text-on-surface font-normal leading-relaxed">
            {report.concludingRemarks}
          </p>

          <div className="pt-3 border-t border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">vpn_key</span>
              <span className="font-mono text-outline">Clave Pública ECDSA: 0x93FA...4819</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReSign}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition"
              >
                Ratificar Firma de Auditoría
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
