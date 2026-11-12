import React, { useState } from 'react';
import { Project, UserAccount } from '../types';

interface InvestModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmInvest: (projectId: string, amount: number) => void;
  currentUser?: UserAccount | null;
}

export const InvestModal: React.FC<InvestModalProps> = ({
  project,
  isOpen,
  onClose,
  onConfirmInvest,
  currentUser,
}) => {
  const FX_RATE = 1280; // 1 USDC = $1,280 ARS
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');
  const [amountUsd, setAmountUsd] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<'bank_ars' | 'mp_ars' | 'usdc_base'>('bank_ars');
  const [transferVoucher, setTransferVoucher] = useState<string>('');
  const [bankOrigin, setBankOrigin] = useState<string>('Mercado Pago');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    id: string;
    date: string;
    amountUsd: number;
    amountArs: number;
    voucher: string;
    methodLabel: string;
  } | null>(null);

  if (!isOpen || !project) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleAmountChange = (val: number, cur: 'USD' | 'ARS') => {
    if (cur === 'USD') {
      setAmountUsd(Math.max(10, val));
    } else {
      setAmountUsd(Math.max(10, Math.round(val / FX_RATE)));
    }
  };

  const amountArs = amountUsd * FX_RATE;

  const handleInvest = () => {
    setIsProcessing(true);
    const generatedId = `SG-ARS-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-AR')} ${now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
    
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptData({
        id: generatedId,
        date: formattedDate,
        amountUsd,
        amountArs,
        voucher: transferVoucher || `TX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        methodLabel: paymentMethod === 'usdc_base'
          ? 'USDC (Base Sepolia L2)'
          : paymentMethod === 'mp_ars'
          ? 'Mercado Pago / CVU'
          : 'Transferencia Bancaria CBU (Pesos ARS)',
      });
      setSuccess(true);
      onConfirmInvest(project.id, amountUsd);
    }, 1400);
  };

  const handleFinish = () => {
    setSuccess(false);
    setReceiptData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-[#ffffff] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#ece7e2] text-[#1d1b19] relative max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f2ede8] hover:bg-[#e2dcd6] flex items-center justify-center text-gray-500 hover:text-gray-800 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {success && receiptData ? (
          <div className="py-4 space-y-5 animate-scaleUp overflow-y-auto pr-1">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#92f7c3] text-[#006c48] flex items-center justify-center mx-auto text-2xl shadow-sm">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <h3 className="font-extrabold text-xl text-[#012d1d]">
                ¡Aporte Fiduciario Confirmado!
              </h3>
              <p className="text-xs text-[#414844] max-w-sm mx-auto">
                Tu aporte ha ingresado formalmente a la custodia segregada del Fideicomiso en red Base Sepolia.
              </p>
            </div>

            {/* Receipt Certificate Card */}
            <div className="p-4 rounded-2xl bg-[#f8f6f2] border border-[#d6cfc7] space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#e2dcd6] pb-2.5">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Comprobante Oficial</span>
                  <div className="font-mono font-bold text-sm text-[#012d1d]">{receiptData.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Fecha y Hora</span>
                  <div className="font-medium text-xs text-[#012d1d]">{receiptData.date} hs</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Proyecto Destino:</span>
                  <strong className="text-[#012d1d] text-right truncate max-w-[200px]">{project.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Beneficiario / Inversor:</span>
                  <span className="font-medium text-[#012d1d]">{currentUser?.name || 'Martina Gómez'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CUIT / DNI Aportante:</span>
                  <span className="font-mono text-[#012d1d]">{currentUser?.kycData?.dniCuil || '27-38492019-4'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medio de Pago:</span>
                  <span className="font-semibold text-[#006c48]">{receiptData.methodLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">N° Comprobante / Tx:</span>
                  <span className="font-mono text-xs text-gray-700">{receiptData.voucher}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#e2dcd6] flex items-center justify-between">
                <span className="font-bold text-sm text-[#012d1d]">Total Integrado:</span>
                <div className="text-right">
                  <div className="font-black text-base text-[#006c48]">${receiptData.amountUsd.toLocaleString()} USDC</div>
                  <div className="text-[11px] text-gray-500 font-medium">(${receiptData.amountArs.toLocaleString('es-AR')} ARS)</div>
                </div>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="p-3 bg-[#ecfdf5] rounded-xl border border-[#a7f3d0] text-[11px] text-[#065f46] flex items-start gap-2">
              <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">verified_user</span>
              <span>
                Se ha emitido el NFT de Participación correspondiente y la acreditación queda registrada en tu perfil fiscal para la DDJJ de ARCA.
              </span>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Aceptar y Ver en Mi Cartera</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto pr-1">
            {/* Project Header Mini */}
            <div className="flex items-center gap-3">
              <img
                src={project.image}
                alt={project.title}
                className="w-12 h-12 rounded-xl object-cover border border-[#ece7e2]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold text-[#006c48] uppercase tracking-wide bg-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#a7f3d0]">
                    {project.categoryLabel}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">{project.location}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#012d1d] truncate mt-0.5">{project.title}</h3>
              </div>
            </div>

            {/* Payment Method Switcher (Fiat ARS vs Crypto USDC) */}
            <div>
              <label className="block text-xs font-bold text-[#012d1d] mb-1.5">
                1. Selecciona Medio de Pago &amp; Moneda
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_ars')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'bank_ars'
                      ? 'border-[#006c48] bg-[#006c48]/10 font-bold text-[#006c48] ring-1 ring-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee] text-gray-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                  <span className="text-[11px] leading-tight">Transferencia CBU</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mp_ars')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'mp_ars'
                      ? 'border-[#006c48] bg-[#006c48]/10 font-bold text-[#006c48] ring-1 ring-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee] text-gray-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">phone_android</span>
                  <span className="text-[11px] leading-tight">Mercado Pago / CVU</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('usdc_base')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'usdc_base'
                      ? 'border-[#006c48] bg-[#006c48]/10 font-bold text-[#006c48] ring-1 ring-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee] text-gray-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">token</span>
                  <span className="text-[11px] leading-tight">USDC (Base L2)</span>
                </button>
              </div>
            </div>

            {/* Amount input with Dual Currency Converter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#012d1d]">
                  2. Monto a Invertir
                </label>
                <div className="inline-flex rounded-lg bg-[#f2ede8] p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      currency === 'USD' ? 'bg-[#012d1d] text-white shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    USD / USDC
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('ARS')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      currency === 'ARS' ? 'bg-[#012d1d] text-white shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    Pesos (ARS)
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-500 font-bold text-sm">
                  {currency === 'USD' ? 'USD $' : 'ARS $'}
                </span>
                <input
                  type="number"
                  min={currency === 'USD' ? 10 : 12800}
                  step={currency === 'USD' ? 10 : 5000}
                  value={currency === 'USD' ? amountUsd : amountArs}
                  onChange={(e) => handleAmountChange(Number(e.target.value), currency)}
                  className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-[#f8f6f2] text-[#012d1d] font-black text-xl border border-[#d6cfc7] focus:outline-none focus:ring-2 focus:ring-[#006c48]"
                />
              </div>

              {/* Conversion Preview Strip */}
              <div className="flex items-center justify-between px-2 text-[11px] text-gray-600">
                <span>
                  Equivalente: <strong className="text-[#006c48] font-bold">
                    {currency === 'USD' ? `$${amountArs.toLocaleString('es-AR')} ARS` : `$${amountUsd.toLocaleString()} USDC`}
                  </strong>
                </span>
                <span className="text-[10px] bg-[#f2ede8] px-2 py-0.5 rounded text-gray-600">
                  Cotización ref.: 1 USDC = ${FX_RATE} ARS
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="flex gap-1.5 pt-1">
                {(currency === 'USD' ? [50, 100, 250, 500] : [64000, 128000, 320000, 640000]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAmountChange(preset, currency)}
                    className="flex-1 py-1 rounded-lg text-[11px] font-semibold border border-[#d6cfc7] bg-white hover:bg-[#f8f3ee] text-[#414844] cursor-pointer transition"
                  >
                    {currency === 'USD' ? `$${preset}` : `$${(preset / 1000)}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Payment Details (ARS Fiduciary Account vs Base Web3) */}
            {paymentMethod !== 'usdc_base' ? (
              <div className="p-3.5 rounded-2xl bg-[#f8f6f2] border border-[#d6cfc7] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006c48] text-base">verified</span>
                    <span className="font-extrabold text-xs text-[#012d1d]">
                      Cuenta Fiduciaria Oficial (Segregada)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-[#ecfdf5] text-[#065f46] px-2 py-0.5 rounded border border-[#a7f3d0]">
                    Ley 27.349 / BIND
                  </span>
                </div>

                <div className="space-y-1.5 text-xs bg-white p-3 rounded-xl border border-[#ece7e2]">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Titular:</span>
                    <strong className="text-[#012d1d]">Fideicomiso Seed &amp; Grow Co-op</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">CUIT Fiduciario:</span>
                    <span className="font-mono font-semibold text-[#012d1d]">30-71894231-9</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-gray-500">Alias:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-[#006c48]">SEED.GROW.FIDEICOMISO</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('SEED.GROW.FIDEICOMISO', 'alias')}
                        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 cursor-pointer"
                        title="Copiar Alias"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedField === 'alias' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">CBU:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-gray-800">0000003100012345678901</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('0000003100012345678901', 'cbu')}
                        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 cursor-pointer"
                        title="Copiar CBU"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedField === 'cbu' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Transfer voucher input */}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <label className="block text-[10px] font-bold text-gray-600 mb-0.5">
                        Origen
                      </label>
                      <select
                        value={bankOrigin}
                        onChange={(e) => setBankOrigin(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#d6cfc7] text-xs font-medium text-[#012d1d] focus:outline-none"
                      >
                        <option value="Mercado Pago">Mercado Pago</option>
                        <option value="Banco Galicia">Galicia</option>
                        <option value="Santander">Santander</option>
                        <option value="Brubank">Brubank</option>
                        <option value="Ualá">Ualá</option>
                        <option value="Otro">Otro Banco</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <label className="block text-[10px] font-bold text-gray-600 mb-0.5">
                        N° de Comprobante / Control COELSA
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: MP-98421049 o 00384912"
                        value={transferVoucher}
                        onChange={(e) => setTransferVoucher(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#d6cfc7] text-xs font-mono text-[#012d1d] focus:outline-none focus:ring-1 focus:ring-[#006c48]"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    * Puedes transferir desde tu app bancaria y colocar el comprobante aquí para liquidación inmediata.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-[#065f46]">
                    <span className="material-symbols-outlined text-base">hub</span>
                    <span>Custodia Smart Contract (Base L2)</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#047857]">Gas: &lt;$0.01 USD</span>
                </div>
                <div className="text-[11px] text-[#065f46] space-y-1">
                  <div>Bóveda Escrow: <strong className="font-mono">0x84f2...b91E (Base Sepolia)</strong></div>
                  <div>Tu Saldo Disponible: <strong className="font-mono">{currentUser?.balanceUSDC || 3450} USDC</strong></div>
                </div>
              </div>
            )}

            {/* Regulatory Tax note */}
            <div className="p-2.5 bg-[#f8f6f2] rounded-xl border border-[#ece7e2] text-[10.5px] text-[#414844] flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006c48] text-sm shrink-0 mt-0.5">balance</span>
              <span>
                <strong>Tratamiento Fiscal ARCA:</strong> Aporte de capital no alcanzado por IVA. Cuenta fiduciaria exenta de Impuesto al Cheque (Dec. 380/2001).
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl bg-[#f2ede8] text-[#414844] font-bold text-xs hover:bg-[#ece7e2] transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleInvest}
                className="w-2/3 py-2.5 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                    <span>Verificando Aporte...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>
                      {paymentMethod === 'usdc_base'
                        ? `Aportar $${amountUsd} USDC`
                        : `Confirmar $${amountArs.toLocaleString('es-AR')} ARS`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneTitle: string;
  projectTitle: string;
  amount: string;
  onVoteSuccess: () => void;
  currentUser?: UserAccount | null;
}

export const VotingModal: React.FC<VotingModalProps> = ({
  isOpen,
  onClose,
  milestoneTitle,
  projectTitle,
  amount,
  onVoteSuccess,
  currentUser,
}) => {
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | 'abstain'>('yes');
  const [comment, setComment] = useState('');
  const [voted, setVoted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVoted(true);
    setTimeout(() => {
      onVoteSuccess();
      setVoted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ece7e2] text-[#1d1b19] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <span className="material-symbols-outlined">close</span>
        </button>

        {voted ? (
          <div className="text-center py-8 space-y-3">
            <span className="material-symbols-outlined text-[#006c48] text-5xl">how_to_vote</span>
            <h3 className="font-bold text-xl text-[#012d1d]">¡Voto Registrado en Cadena!</h3>
            <p className="text-sm text-[#414844]">
              Tu voto ha sido transmitido mediante firma ECDSA a la asamblea digital de <strong>{projectTitle}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-[#006c48] font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Gobernanza Participativa Escrow</span>
            </div>

            <h3 className="font-bold text-lg text-[#012d1d]">
              Votación de Desembolso: {milestoneTitle}
            </h3>
            <p className="text-xs text-[#414844]">
              Proyecto: <strong>{projectTitle}</strong> · Tranche en disputa: <strong>{amount}</strong>
            </p>

            <div className="p-3 bg-[#f8f3ee] rounded-xl text-xs space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Quórum actual:</span>
                <span className="text-[#006c48]">78.4% (Requerido: 60%)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Votos a favor:</span>
                <span className="font-bold text-[#012d1d]">94% de patrocinadores</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ventana restante:</span>
                <span className="text-[#ba1a1a] font-bold">36 horas</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#012d1d]">Tu Veredicto de Custodia:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVote('yes')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVote === 'yes'
                      ? 'border-[#006c48] bg-[#92f7c3]/40 text-[#006c48] font-bold'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[20px]">thumb_up</span>
                  <span className="text-xs">Aprobar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVote('no')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVote === 'no'
                      ? 'border-[#ba1a1a] bg-[#ffdad6] text-[#ba1a1a] font-bold'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[20px]">thumb_down</span>
                  <span className="text-xs">Objetar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVote('abstain')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVote === 'abstain'
                      ? 'border-gray-500 bg-gray-100 text-gray-800 font-bold'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[20px]">flaky</span>
                  <span className="text-xs">Abstención</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012d1d] mb-1">
                Comentario para el acta comunitaria (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Evidencia fotográfica y planillas revisadas satisfactoriamente..."
                className="w-full p-2.5 text-xs rounded-lg bg-[#f2ede8] text-[#1d1b19] focus:outline-none focus:ring-1 focus:ring-[#006c48]"
                rows={2}
              ></textarea>
            </div>

            {currentUser ? (
              <div className="p-2.5 bg-[#ecfdf5] rounded-xl border border-[#a7f3d0] flex items-center justify-between text-xs">
                <span className="text-[#065f46] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  <span>Votando con:</span>
                </span>
                <span className="font-mono font-bold text-[#064e3b] truncate max-w-[190px]">
                  {currentUser.addressOrEmail}
                </span>
              </div>
            ) : null}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-lg bg-[#f2ede8] text-[#414844] font-semibold text-xs hover:bg-[#ece7e2]"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                <span>Emitir Voto de Patrocinador</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
