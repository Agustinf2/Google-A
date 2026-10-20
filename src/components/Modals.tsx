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
  const [amount, setAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState<'usdc' | 'card' | 'bank'>('usdc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !project) return null;

  const handleInvest = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onConfirmInvest(project.id, amount);
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ece7e2] text-[#1d1b19] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {success ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#92f7c3] text-[#006c48] flex items-center justify-center mx-auto text-3xl">
              <span className="material-symbols-outlined text-[36px]">check</span>
            </div>
            <h3 className="font-bold text-xl text-[#012d1d]">¡Aporte Confirmado!</h3>
            <p className="text-sm text-[#414844]">
              Tu inversión de <strong>${amount} USD</strong> ha sido resguardada en la bóveda escrow de <strong>{project.title}</strong> en red Base.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={project.image}
                alt={project.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <span className="text-[11px] font-bold text-[#006c48] uppercase tracking-wide">
                  {project.categoryLabel}
                </span>
                <h3 className="font-bold text-lg text-[#012d1d]">{project.title}</h3>
                <p className="text-xs text-[#717973]">{project.location}</p>
              </div>
            </div>

            <div className="p-3 bg-[#f8f3ee] rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#414844]">Modalidad:</span>
                <span className="font-bold text-[#012d1d]">{project.modalityDetail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414844]">Financiamiento alcanzado:</span>
                <span className="font-bold text-[#006c48]">{project.percentage}% (${project.fundedAmount.toLocaleString()} USD)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414844]">Contrato Escrow:</span>
                <span className="font-mono text-[10px] text-gray-600">Base Sepolia #0x84f...b91E</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012d1d] mb-1">
                Monto a Invertir (USD / USDC)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-[#f2ede8] text-[#012d1d] font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#006c48]"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[25, 50, 100, 250, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`flex-1 py-1 rounded text-xs font-semibold border ${
                      amount === preset
                        ? 'bg-[#1b4332] text-white border-[#1b4332]'
                        : 'bg-white text-[#414844] border-[#ece7e2] hover:bg-[#f2ede8]'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012d1d] mb-1">
                Método de Pago &amp; Custodia
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('usdc')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    paymentMethod === 'usdc'
                      ? 'border-[#006c48] bg-[#92f7c3]/30 font-bold text-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[18px]">account_balance_wallet</span>
                  <span>USDC (Base)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#006c48] bg-[#92f7c3]/30 font-bold text-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[18px]">account_balance</span>
                  <span>Transferencia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#006c48] bg-[#92f7c3]/30 font-bold text-[#006c48]'
                      : 'border-[#ece7e2] hover:bg-[#f8f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined block text-[18px]">credit_card</span>
                  <span>Tarjeta</span>
                </button>
              </div>
            </div>

            {currentUser ? (
              <div className="p-2.5 bg-[#ecfdf5] rounded-xl border border-[#a7f3d0] flex items-center justify-between text-xs">
                <span className="text-[#065f46] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  <span>Firmando desde:</span>
                </span>
                <span className="font-mono font-bold text-[#064e3b] truncate max-w-[170px]">
                  {currentUser.addressOrEmail}
                </span>
              </div>
            ) : null}

            <div className="p-3 bg-[#e6e2dd]/40 rounded-lg text-[11px] text-[#414844] flex items-start gap-2">
              <span className="material-symbols-outlined text-[#006c48] text-[16px] shrink-0 mt-0.5">verified_user</span>
              <span>Los fondos se custodian en contratos multifirma. La liberación se vota en cada hito con más del 60% de quórum.</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-lg bg-[#f2ede8] text-[#414844] font-semibold text-xs hover:bg-[#ece7e2]"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleInvest}
                className="w-2/3 py-2.5 rounded-lg bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                    <span>Procesando custodia...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>Confirmar Aporte (${amount})</span>
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
