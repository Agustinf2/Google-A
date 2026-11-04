import React, { useState } from 'react';
import { Investment, Project } from '../types';
import { LOGO_URL } from '../data/mockData';

interface NftContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment?: Investment | null;
  project?: Project | any | null;
  initialTab?: 'nft' | 'contract';
}

export const NftContractModal: React.FC<NftContractModalProps> = ({
  isOpen,
  onClose,
  investment,
  project,
  initialTab = 'nft',
}) => {
  const [activeTab, setActiveTab] = useState<'nft' | 'contract'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [contractSubTab, setContractSubTab] = useState<'overview' | 'read' | 'code' | 'txs'>('overview');

  if (!isOpen) return null;

  const projectTitle = investment?.title || project?.title || 'Biofábrica Serrana de Insumos Vivos';
  const investedAmount = investment?.investedAmount || 1500;
  const tokenId = '#0142';
  const contractAddress = '0x8f3c19a084bc67d2e8b01239845761c89012b49e';
  const ownerAddress = '0x7f3e82a93c72190db981465243109a876123b49e';
  const ipfsCid = 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(`¡${label} copiado!`);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title SeedGrowEscrowVault
 * @notice Contrato inteligente de custodia escrow con liberacion por hitos y votacion multisig.
 */
contract SeedGrowEscrowVault is ERC721 {
    using ECDSA for bytes32;

    IERC20 public immutable usdcToken;
    address public immutable projectBeneficiary;
    address public immutable certifiedAuditor;
    
    uint256 public immutable totalBudget;
    uint256 public totalDisbursed;
    uint256 public activeMilestoneId;
    uint256 public constant REQUIRED_QUORUM_PERCENT = 60;
    uint256 public constant MULTISIG_THRESHOLD = 3; // 3 de 5 firmas

    enum MilestoneStatus { Planned, AuditActive, Disbursed, Disputed }

    struct Milestone {
        uint256 id;
        uint256 amount;
        MilestoneStatus status;
        bytes32 evidenceIpfsHash;
        uint256 favorableVotes;
        uint256 totalVotes;
    }

    mapping(uint256 => Milestone) public milestones;
    mapping(address => uint256) public investorShareBalance;

    event FundsDeposited(address indexed investor, uint256 amount, uint256 tokenId);
    event MilestoneAudited(uint256 indexed milestoneId, address indexed auditor, uint256 score);
    event MilestoneDisbursed(uint256 indexed milestoneId, uint256 amountReleased, address to);

    constructor(
        address _usdc,
        address _beneficiary,
        address _auditor,
        uint256 _totalBudget
    ) ERC721("SeedGrow Certificate", "SGCERT") {
        usdcToken = IERC20(_usdc);
        projectBeneficiary = _beneficiary;
        certifiedAuditor = _auditor;
        totalBudget = _totalBudget;
        activeMilestoneId = 1;
    }

    function releaseMilestone(
        uint256 milestoneId,
        bytes[] calldata multisigSignatures
    ) external {
        require(milestones[milestoneId].status == MilestoneStatus.AuditActive, "Hito no listo");
        require(multisigSignatures.length >= MULTISIG_THRESHOLD, "Quorum multisig insuficiente");
        
        uint256 amountToRelease = milestones[milestoneId].amount;
        milestones[milestoneId].status = MilestoneStatus.Disbursed;
        totalDisbursed += amountToRelease;
        
        require(usdcToken.transfer(projectBeneficiary, amountToRelease), "Transferencia fallida");
        emit MilestoneDisbursed(milestoneId, amountToRelease, projectBeneficiary);
    }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl text-primary-fixed">token</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-on-surface">
                  {activeTab === 'nft' ? 'Certificado de Aportante NFT' : 'Explorador del Smart Contract'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed text-primary">
                  Base Sepolia L2
                </span>
              </div>
              <p className="text-xs text-outline font-medium">
                {projectTitle} · Token ID: {tokenId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface hover:bg-surface-container text-on-surface flex items-center justify-center transition border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-surface-container-low/60 border-b border-outline-variant/30">
          <button
            onClick={() => setActiveTab('nft')}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'nft'
                ? 'border-primary text-primary bg-surface rounded-t-xl shadow-xs'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">badge</span>
            Certificado NFT (ERC-721)
          </button>

          <button
            onClick={() => setActiveTab('contract')}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'contract'
                ? 'border-primary text-primary bg-surface rounded-t-xl shadow-xs'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            Smart Contract Escrow (BaseScan)
          </button>
        </div>

        {/* Copied Feedback Toast */}
        {copiedText && (
          <div className="bg-primary text-on-primary text-xs font-bold py-1.5 px-4 text-center">
            {copiedText}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: NFT VISUAL CERTIFICATE */}
          {activeTab === 'nft' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Visual Holographic NFT Card */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-full max-w-xs rounded-2xl p-5 bg-linear-to-b from-primary via-primary-container to-primary text-on-primary border-2 border-primary-fixed/40 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" />
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-tertiary-container/30 blur-2xl pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                      {/* NFT Top Badges */}
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <div className="flex items-center gap-1.5 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                          <img src={LOGO_URL} alt="Seed & Grow" className="w-3.5 h-3.5 object-contain" />
                          <span>Seed &amp; Grow</span>
                        </div>
                        <span className="bg-primary-fixed/20 text-primary-fixed px-2 py-0.5 rounded-md font-mono">
                          {tokenId}
                        </span>
                      </div>

                      {/* NFT Asset Graphic */}
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-black/40 border border-white/10 relative flex items-center justify-center p-3 text-center">
                        <div className="space-y-1">
                          <span className="material-symbols-outlined text-4xl text-primary-fixed">
                            workspace_premium
                          </span>
                          <div className="font-extrabold text-xs text-white uppercase tracking-wider">
                            Certificado de Capital Semilla
                          </div>
                          <div className="text-[10px] text-primary-fixed/90 font-mono">
                            Multi-Sig Escrow Protected
                          </div>
                        </div>
                      </div>

                      {/* Project info inside NFT */}
                      <div className="space-y-1 text-xs">
                        <div className="font-black text-sm text-white truncate">{projectTitle}</div>
                        <div className="flex justify-between items-baseline pt-1 border-t border-white/10">
                          <span className="text-[11px] text-white/70">Aporte Respaldado:</span>
                          <span className="font-extrabold text-primary-fixed">${investedAmount.toLocaleString()} USDC</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] text-white/70">Derecho Registrado:</span>
                          <span className="font-bold text-white text-[11px]">Equity · 0.8% Utilidades</span>
                        </div>
                      </div>

                      {/* NFT Bottom Bar */}
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-white/60">
                        <span>Base Sepolia L2</span>
                        <span className="truncate max-w-[120px]">Hash: 0x7e8b91...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NFT Technical Metadata Details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">Metadatos del Token On-Chain</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed text-primary">
                        ERC-721 Soulbound
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                        <span className="text-outline">Estándar:</span>
                        <span className="font-semibold text-on-surface">ERC-721 (Non-Fungible Token)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                        <span className="text-outline">Token ID:</span>
                        <span className="font-mono font-bold text-primary">{tokenId}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                        <span className="text-outline">Billetera Titular (Owner):</span>
                        <span className="font-mono text-outline truncate max-w-[180px] sm:max-w-none">{ownerAddress}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                        <span className="text-outline">Contrato Minteador:</span>
                        <span className="font-mono text-primary truncate max-w-[180px] sm:max-w-none">{contractAddress}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                        <span className="text-outline">IPFS Metadata URI:</span>
                        <button
                          onClick={() => copyToClipboard(ipfsCid, 'CID de IPFS')}
                          className="font-mono text-[11px] text-primary hover:underline truncate max-w-[200px]"
                          title="Haga clic para copiar CID"
                        >
                          {ipfsCid}
                        </button>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-outline">Red Blockchain:</span>
                        <span className="font-semibold text-on-surface">Base Sepolia (Chain ID: 84532)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for NFT */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify({
                        tokenId: 142,
                        name: `Seed & Grow Certificate - ${projectTitle}`,
                        description: `Certificado de capital semilla por $${investedAmount} USDC en ${projectTitle}.`,
                        image: ipfsCid,
                        attributes: [
                          { trait_type: "Aporte USDC", value: investedAmount },
                          { trait_type: "Proyecto", value: projectTitle },
                          { trait_type: "Escrow Status", value: "Activo Multi-Sig 3/5" }
                        ]
                      }, null, 2), 'JSON de Metadatos')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/30 flex items-center justify-center gap-2 transition"
                    >
                      <span className="material-symbols-outlined text-base text-primary">data_object</span>
                      Copiar JSON Metadatos
                    </button>

                    <button
                      onClick={() => setActiveTab('contract')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base">code</span>
                      Inspeccionar Smart Contract
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SMART CONTRACT EXPLORER */}
          {activeTab === 'contract' && (
            <div className="space-y-6">
              {/* Contract Sub-nav */}
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-bold text-xs text-on-surface">Dirección del Contrato:</span>
                  <span className="font-mono text-xs text-primary font-bold">{contractAddress}</span>
                  <button
                    onClick={() => copyToClipboard(contractAddress, 'Dirección de Contrato')}
                    className="p-1 hover:text-primary text-outline"
                    title="Copiar dirección"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setContractSubTab('overview')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      contractSubTab === 'overview'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    Resumen
                  </button>
                  <button
                    onClick={() => setContractSubTab('read')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      contractSubTab === 'read'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    Read Contract (ABI)
                  </button>
                  <button
                    onClick={() => setContractSubTab('code')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      contractSubTab === 'code'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    Código Solidity
                  </button>
                  <button
                    onClick={() => setContractSubTab('txs')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      contractSubTab === 'txs'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    Transacciones
                  </button>
                </div>
              </div>

              {/* Subtab 1: Contract Overview */}
              {contractSubTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                      <div className="text-[11px] text-outline font-semibold">Fondos Totales Bloqueados</div>
                      <div className="text-xl font-black text-on-surface">$15,000 USDC</div>
                      <div className="text-[10px] text-secondary font-bold">Bóveda Safe Escrow (Hitos 2, 3, 4)</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                      <div className="text-[11px] text-outline font-semibold">Fondos Liberados al Proyecto</div>
                      <div className="text-xl font-black text-primary">$5,000 USDC</div>
                      <div className="text-[10px] text-primary font-bold">Hito 1 Aprobado &amp; Transferido</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                      <div className="text-[11px] text-outline font-semibold">Esquema Multi-Firma</div>
                      <div className="text-xl font-black text-on-surface">3 de 5 Firmas</div>
                      <div className="text-[10px] text-outline">Fundador + Auditor + Comunidad</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
                    <div className="font-bold text-on-surface text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">verified</span>
                      Información de Verificación del Compilador
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-outline pt-1">
                      <div>Nombre: <strong className="text-on-surface">SeedGrowEscrowVault</strong></div>
                      <div>Compilador: <strong className="text-on-surface">v0.8.24+commit.e11b9ed9</strong></div>
                      <div>Optimización: <strong className="text-on-surface">200 runs (Enabled)</strong></div>
                      <div>Licencia: <strong className="text-on-surface">MIT Open Source</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 2: Read Contract Interactive Functions */}
              {contractSubTab === 'read' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
                    <div className="font-mono font-bold text-primary">1. getMilestoneStatus(uint256 milestoneId = 2)</div>
                    <div className="p-3 bg-surface rounded-lg font-mono text-[11px] text-on-surface space-y-1">
                      <div>[0] amount: <strong>5000000000 (5,000 USDC)</strong></div>
                      <div>[1] status: <strong>MilestoneStatus.AuditActive (1)</strong></div>
                      <div>[2] favorableVotesPercent: <strong>96%</strong></div>
                      <div>[3] quorumReached: <strong>true (74% / 60% requerido)</strong></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
                    <div className="font-mono font-bold text-primary">2. certifiedAuditor() view returns (address)</div>
                    <div className="p-2.5 bg-surface rounded-lg font-mono text-[11px] text-on-surface">
                      0x93FA2810C249B194819024A8B910481928394819 (Ing. Agr. Valentín Morales)
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
                    <div className="font-mono font-bold text-primary">3. requiredMultisigThreshold() view returns (uint256)</div>
                    <div className="p-2.5 bg-surface rounded-lg font-mono text-[11px] text-on-surface">
                      3 (Requiere al menos 3 firmas para ejecutar releaseMilestone)
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 3: Source Code Solidity */}
              {contractSubTab === 'code' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-outline flex-wrap gap-2">
                    <span>Código fuente del contrato verificado en Base Sepolia</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="/manual_blockchain_desde_cero_con_graficos.pdf"
                        download="manual_blockchain_desde_cero_con_graficos.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-bold text-xs flex items-center gap-1 border border-outline-variant/30 transition shadow-xs"
                        title="Descargar Manual Técnico de Blockchain con Gráficos en PDF"
                      >
                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                        Manual Blockchain (PDF)
                      </a>
                      <button
                        onClick={() => copyToClipboard(solidityCode, 'Código Solidity')}
                        className="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        Copiar Código
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 rounded-2xl bg-primary text-primary-fixed font-mono text-[11px] overflow-x-auto max-h-80 leading-relaxed border border-primary-fixed/20">
                    {solidityCode}
                  </pre>
                </div>
              )}

              {/* Subtab 4: Recent On-Chain Transactions */}
              {contractSubTab === 'txs' && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-on-surface mb-2">Transacciones Recientes del Contrato:</div>
                  <div className="space-y-2 text-xs">
                    {[
                      {
                        method: 'depositAndMint()',
                        from: '0x7f3e...b49e (Martina)',
                        amount: '+$1,500 USDC',
                        txHash: '0x39fa8210984ba102948123904810293849102938',
                        time: 'Hace 3 horas',
                      },
                      {
                        method: 'voteMilestoneApproval(hito=2)',
                        from: '0x88ea...61c2 (Aportante #42)',
                        amount: 'Voto Favor (96%)',
                        txHash: '0x9481203948102938491029384910293849102938',
                        time: 'Hace 5 horas',
                      },
                      {
                        method: 'submitAuditReport(hito=2)',
                        from: '0x93fa...4819 (Auditor Morales)',
                        amount: 'Dictamen 98/100',
                        txHash: '0x7e8b91c045bfa3224b17cf90234e891c89012cd4',
                        time: 'Hace 1 día',
                      },
                      {
                        method: 'releaseMilestone(hito=1)',
                        from: '0xSafe...Multisig',
                        amount: '-$5,000 USDC',
                        txHash: '0x1029384910293849102938491029384910293849',
                        time: 'Hace 18 días',
                      },
                    ].map((tx, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3 text-[11px]"
                      >
                        <div>
                          <div className="font-mono font-bold text-primary">{tx.method}</div>
                          <div className="text-outline font-mono text-[10px]">{tx.from}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-on-surface">{tx.amount}</div>
                          <div className="text-outline text-[10px]">{tx.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-outline font-mono text-[11px] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
            Transacciones y certificados inmutables en la red Base Sepolia
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
};
