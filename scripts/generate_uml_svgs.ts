import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public', 'assets', 'diagramas_uml');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ============================================================================
// 1. DIAGRAMA GENERAL DE CASOS DE USO (UML Use Case Diagram)
// ============================================================================
const useCaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 800" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#006C48"/>
    </marker>
    <marker id="dashed-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#666666"/>
    </marker>
  </defs>

  <rect width="1100" height="800" fill="#FBF9F5" rx="12"/>

  <!-- Título -->
  <text x="550" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#012D1D">
    SEED &amp; GROW — DIAGRAMA GENERAL DE CASOS DE USO (UML)
  </text>
  <text x="550" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">
    UAI · Seminario de Aplicación Profesional — Alumno: Agustín Faucetta
  </text>

  <!-- Límite del Sistema (System Boundary) -->
  <rect x="230" y="90" width="640" height="680" fill="#FFFFFF" stroke="#006C48" stroke-width="2" rx="14" filter="url(#shadow)"/>
  <rect x="230" y="90" width="640" height="34" fill="#012D1D" rx="14 14 0 0"/>
  <text x="550" y="113" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">
    Sistema Web Seed &amp; Grow (Límite del Sistema)
  </text>

  <!-- ACTOR 1: Inversor -->
  <g transform="translate(110, 200)">
    <circle cx="0" cy="-25" r="14" fill="#FFFFFF" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="-11" x2="0" y2="25" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="-20" y1="2" x2="20" y2="2" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="-18" y2="55" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="18" y2="55" stroke="#012D1D" stroke-width="2.5"/>
    <text x="0" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#012D1D">Inversor</text>
    <text x="0" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666666">(Aportante)</text>
  </g>

  <!-- ACTOR 2: Productor -->
  <g transform="translate(110, 470)">
    <circle cx="0" cy="-25" r="14" fill="#FFFFFF" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="-11" x2="0" y2="25" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="-20" y1="2" x2="20" y2="2" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="-18" y2="55" stroke="#012D1D" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="18" y2="55" stroke="#012D1D" stroke-width="2.5"/>
    <text x="0" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#012D1D">Productor</text>
    <text x="0" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666666">(Emprendedor)</text>
  </g>

  <!-- ACTOR 3: Auditor Colegiado -->
  <g transform="translate(980, 240)">
    <circle cx="0" cy="-25" r="14" fill="#FFFFFF" stroke="#006C48" stroke-width="2.5"/>
    <line x1="0" y1="-11" x2="0" y2="25" stroke="#006C48" stroke-width="2.5"/>
    <line x1="-20" y1="2" x2="20" y2="2" stroke="#006C48" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="-18" y2="55" stroke="#006C48" stroke-width="2.5"/>
    <line x1="0" y1="25" x2="18" y2="55" stroke="#006C48" stroke-width="2.5"/>
    <text x="0" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#006C48">Auditor</text>
    <text x="0" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666666">(Ing. Matriculado)</text>
  </g>

  <!-- ACTOR 4: Smart Contract / Base L2 -->
  <g transform="translate(980, 520)">
    <rect x="-35" y="-30" width="70" height="60" rx="8" fill="#E6F4EA" stroke="#012D1D" stroke-width="2"/>
    <text x="0" y="-8" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#006C48">&lt;&lt;System&gt;&gt;</text>
    <text x="0" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">Smart Contract</text>
    <text x="0" y="24" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">Base L2</text>
  </g>

  <!-- CASOS DE USO (Óvalos) -->

  <!-- CU-001 KYC -->
  <ellipse cx="370" cy="160" rx="100" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="370" y="164" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-001: Validar KYC/UIF</text>

  <!-- CU-002 Publicar -->
  <ellipse cx="370" cy="420" rx="105" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="370" y="424" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-002: Publicar Proyecto</text>

  <!-- CU-003 Aportar Escrow -->
  <ellipse cx="400" cy="250" rx="115" ry="26" fill="#E6F4EA" stroke="#012D1D" stroke-width="2"/>
  <text x="400" y="254" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#012D1D">CU-003: Aportar en Escrow</text>

  <!-- CU-004 Rendir Hito -->
  <ellipse cx="380" cy="510" rx="105" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="380" y="514" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-004: Rendir Evidencia Hito</text>

  <!-- CU-005 Dictamen Pericial -->
  <ellipse cx="700" cy="240" rx="115" ry="26" fill="#E6F4EA" stroke="#006C48" stroke-width="2"/>
  <text x="700" y="244" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#012D1D">CU-005: Dictamen y Firma Pericial</text>

  <!-- CU-006 Liberar Escrow -->
  <ellipse cx="680" cy="430" rx="110" ry="26" fill="#E6F4EA" stroke="#012D1D" stroke-width="2"/>
  <text x="680" y="434" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#012D1D">CU-006: Liberar Fondos Escrow</text>

  <!-- CU-007 Votar Asamblea -->
  <ellipse cx="400" cy="335" rx="105" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="400" y="339" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-007: Votar en Asamblea</text>

  <!-- CU-008 Certificado ARCA -->
  <ellipse cx="380" cy="620" rx="110" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="380" y="624" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-008: Descargar Cert. ARCA</text>

  <!-- CU-009 Telemetría IoT -->
  <ellipse cx="680" cy="620" rx="105" ry="24" fill="#F4FBF7" stroke="#006C48" stroke-width="1.8"/>
  <text x="680" y="624" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">CU-009: Monitorear Sensores IoT</text>

  <!-- CONEXIONES (Líneas de Asociación) -->
  <!-- Inversor a CU-003 -->
  <line x1="140" y1="210" x2="288" y2="245" stroke="#012D1D" stroke-width="1.6"/>
  <!-- Inversor a CU-007 -->
  <line x1="140" y1="225" x2="300" y2="325" stroke="#012D1D" stroke-width="1.6"/>
  <!-- Inversor a CU-008 -->
  <line x1="135" y1="240" x2="290" y2="605" stroke="#012D1D" stroke-width="1.4" stroke-dasharray="3,3"/>

  <!-- Productor a CU-002 -->
  <line x1="140" y1="465" x2="270" y2="430" stroke="#012D1D" stroke-width="1.6"/>
  <!-- Productor a CU-004 -->
  <line x1="140" y1="480" x2="280" y2="505" stroke="#012D1D" stroke-width="1.6"/>

  <!-- Auditor a CU-005 -->
  <line x1="945" y1="240" x2="815" y2="240" stroke="#006C48" stroke-width="1.8"/>

  <!-- Smart Contract a CU-003 -->
  <line x1="945" y1="495" x2="500" y2="265" stroke="#012D1D" stroke-width="1.5"/>
  <!-- Smart Contract a CU-006 -->
  <line x1="945" y1="520" x2="790" y2="440" stroke="#012D1D" stroke-width="1.8"/>

  <!-- RELACIONES INCLUDE / EXTEND -->
  <!-- CU-003 include CU-001 (KYC) -->
  <line x1="385" y1="224" x2="375" y2="184" stroke="#666666" stroke-width="1.4" stroke-dasharray="5,4" marker-end="url(#dashed-arrow)"/>
  <text x="395" y="202" font-family="Arial, sans-serif" font-size="10" fill="#666666" font-style="italic">&lt;&lt;include&gt;&gt;</text>

  <!-- CU-005 trigger CU-006 -->
  <line x1="695" y1="266" x2="685" y2="404" stroke="#006C48" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#arrow)"/>
  <text x="702" y="340" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#006C48">&lt;&lt;enables&gt;&gt;</text>

  <!-- CU-004 request CU-005 -->
  <line x1="480" y1="495" x2="650" y2="262" stroke="#888888" stroke-width="1.2" stroke-dasharray="4,4" marker-end="url(#dashed-arrow)"/>
  <text x="560" y="370" font-family="Arial, sans-serif" font-size="10" fill="#888888" font-style="italic">&lt;&lt;triggers audit&gt;&gt;</text>
</svg>`;

// ============================================================================
// 2. DIAGRAMA DE CLASES DEL DOMINIO (UML Class Diagram)
// ============================================================================
const classSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150 820" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="2.5" flood-opacity="0.12"/>
    </filter>
    <marker id="diamond" viewBox="0 0 16 16" refX="15" refY="8" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
      <polygon points="0,8 8,0 16,8 8,16" fill="#012D1D"/>
    </marker>
    <marker id="triangle" viewBox="0 0 14 14" refX="13" refY="7" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
      <polygon points="0,0 14,7 0,14" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5"/>
    </marker>
  </defs>

  <rect width="1150" height="820" fill="#FBF9F5" rx="12"/>

  <!-- Título -->
  <text x="575" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#012D1D">
    SEED &amp; GROW — DIAGRAMA DE CLASES DEL DOMINIO (UML)
  </text>
  <text x="575" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">
    Modelo Estructural Orientado a Objetos y Contratos Inteligentes
  </text>

  <!-- CLASE 1: Usuario (Base) -->
  <g transform="translate(40, 90)" filter="url(#shadow)">
    <rect width="210" height="150" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="210" height="30" fill="#012D1D" rx="6 6 0 0"/>
    <text x="105" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Usuario</text>
    <line x1="0" y1="30" x2="210" y2="30" stroke="#012D1D" stroke-width="1"/>
    <text x="10" y="48" font-family="monospace" font-size="10" fill="#1D1B19">- id: UUID</text>
    <text x="10" y="62" font-family="monospace" font-size="10" fill="#1D1B19">- walletAddress: Address</text>
    <text x="10" y="76" font-family="monospace" font-size="10" fill="#1D1B19">- dniCuil: String</text>
    <text x="10" y="90" font-family="monospace" font-size="10" fill="#1D1B19">- kycVerified: Boolean</text>
    <line x1="0" y1="100" x2="210" y2="100" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="118" font-family="monospace" font-size="10" fill="#006C48">+ conectarWallet(): Bool</text>
    <text x="10" y="132" font-family="monospace" font-size="10" fill="#006C48">+ verificarKYC(): Status</text>
  </g>

  <!-- CLASE 1A: Auditor (Herencia) -->
  <g transform="translate(40, 290)" filter="url(#shadow)">
    <rect width="210" height="130" fill="#FFFFFF" stroke="#006C48" stroke-width="1.5" rx="6"/>
    <rect width="210" height="28" fill="#006C48" rx="6 6 0 0"/>
    <text x="105" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">AuditorColegiado</text>
    <text x="10" y="46" font-family="monospace" font-size="10" fill="#1D1B19">- matriculaCIAPC: String</text>
    <text x="10" y="60" font-family="monospace" font-size="10" fill="#1D1B19">- colegioProvincial: String</text>
    <text x="10" y="74" font-family="monospace" font-size="10" fill="#1D1B19">- firmaDigitalCert: Blob</text>
    <line x1="0" y1="84" x2="210" y2="84" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="102" font-family="monospace" font-size="10" fill="#006C48">+ inspeccionarLote()</text>
    <text x="10" y="116" font-family="monospace" font-size="10" fill="#006C48">+ firmarDictamen(): Hash</text>
  </g>
  <!-- Flecha herencia Auditor -> Usuario -->
  <line x1="145" y1="290" x2="145" y2="240" stroke="#012D1D" stroke-width="1.5" marker-end="url(#triangle)"/>

  <!-- CLASE 2: ProyectoProductivo -->
  <g transform="translate(320, 90)" filter="url(#shadow)">
    <rect width="250" height="190" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="250" height="30" fill="#012D1D" rx="6 6 0 0"/>
    <text x="125" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">ProyectoProductivo</text>
    <text x="10" y="48" font-family="monospace" font-size="10" fill="#1D1B19">- id: BigInt</text>
    <text x="10" y="62" font-family="monospace" font-size="10" fill="#1D1B19">- titulo: String</text>
    <text x="10" y="76" font-family="monospace" font-size="10" fill="#1D1B19">- capitalObjetivoUSD: Decimal</text>
    <text x="10" y="90" font-family="monospace" font-size="10" fill="#1D1B19">- capitalRecaudadoUSD: Decimal</text>
    <text x="10" y="104" font-family="monospace" font-size="10" fill="#1D1B19">- estado: EstadoProyecto</text>
    <text x="10" y="118" font-family="monospace" font-size="10" fill="#1D1B19">- fideicomisoNumero: String</text>
    <line x1="0" y1="128" x2="250" y2="128" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="146" font-family="monospace" font-size="10" fill="#006C48">+ publicarConvocatoria()</text>
    <text x="10" y="160" font-family="monospace" font-size="10" fill="#006C48">+ recibirAporte(monto)</text>
    <text x="10" y="174" font-family="monospace" font-size="10" fill="#006C48">+ liquidarRendimiento()</text>
  </g>

  <!-- CLASE 3: HitoProductivo -->
  <g transform="translate(320, 360)" filter="url(#shadow)">
    <rect width="250" height="180" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="250" height="28" fill="#1B4332" rx="6 6 0 0"/>
    <text x="125" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">HitoProductivo</text>
    <text x="10" y="46" font-family="monospace" font-size="10" fill="#1D1B19">- orden: Integer</text>
    <text x="10" y="60" font-family="monospace" font-size="10" fill="#1D1B19">- descripcion: String</text>
    <text x="10" y="74" font-family="monospace" font-size="10" fill="#1D1B19">- montoAsignadoUSD: Decimal</text>
    <text x="10" y="88" font-family="monospace" font-size="10" fill="#1D1B19">- estado: EstadoHito</text>
    <text x="10" y="102" font-family="monospace" font-size="10" fill="#1D1B19">- evidenciasIPFS: String[]</text>
    <line x1="0" y1="112" x2="250" y2="112" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="130" font-family="monospace" font-size="10" fill="#006C48">+ rendirCuentas(docs)</text>
    <text x="10" y="144" font-family="monospace" font-size="10" fill="#006C48">+ solicitarAuditoria()</text>
    <text x="10" y="158" font-family="monospace" font-size="10" fill="#006C48">+ desbloquearFondos()</text>
  </g>
  <!-- Composición Proyecto -> Hitos (1 a N) -->
  <line x1="445" y1="280" x2="445" y2="360" stroke="#012D1D" stroke-width="1.8" marker-start="url(#diamond)"/>
  <text x="455" y="300" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">1</text>
  <text x="455" y="348" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">1..*</text>

  <!-- CLASE 4: DictamenAuditoria -->
  <g transform="translate(40, 500)" filter="url(#shadow)">
    <rect width="210" height="150" fill="#FFFFFF" stroke="#006C48" stroke-width="1.5" rx="6"/>
    <rect width="210" height="28" fill="#006C48" rx="6 6 0 0"/>
    <text x="105" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">DictamenAuditoria</text>
    <text x="10" y="46" font-family="monospace" font-size="10" fill="#1D1B19">- fechaInspeccion: Date</text>
    <text x="10" y="60" font-family="monospace" font-size="10" fill="#1D1B19">- coordenadasGPS: String</text>
    <text x="10" y="74" font-family="monospace" font-size="10" fill="#1D1B19">- veredicto: VeredictoEnum</text>
    <text x="10" y="88" font-family="monospace" font-size="10" fill="#1D1B19">- hashSHA256: HexString</text>
    <line x1="0" y1="98" x2="210" y2="98" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="116" font-family="monospace" font-size="10" fill="#006C48">+ validarEnBlockchain()</text>
    <text x="10" y="130" font-family="monospace" font-size="10" fill="#006C48">+ emitirCertificado()</text>
  </g>
  <!-- Auditor emite Dictamen -->
  <line x1="145" y1="420" x2="145" y2="500" stroke="#006C48" stroke-width="1.5"/>
  <!-- Dictamen asocia Hito -->
  <line x1="250" y1="530" x2="320" y2="480" stroke="#006C48" stroke-width="1.5"/>

  <!-- CLASE 5: SmartContractEscrow (Base L2) -->
  <g transform="translate(640, 90)" filter="url(#shadow)">
    <rect width="260" height="190" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.8" rx="6"/>
    <rect width="260" height="30" fill="#012D1D" rx="6 6 0 0"/>
    <text x="130" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;SmartContract&gt;&gt; SeedGrowEscrow</text>
    <text x="10" y="48" font-family="monospace" font-size="10" fill="#1D1B19">- contractAddress: Address</text>
    <text x="10" y="62" font-family="monospace" font-size="10" fill="#1D1B19">- lockedBalanceUSDC: uint256</text>
    <text x="10" y="76" font-family="monospace" font-size="10" fill="#1D1B19">- auditorSignatures: Mapping</text>
    <text x="10" y="90" font-family="monospace" font-size="10" fill="#1D1B19">- multiSigThreshold: 3/5</text>
    <line x1="0" y1="100" x2="260" y2="100" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="118" font-family="monospace" font-size="10" fill="#006C48">+ deposit(projectId, amount)</text>
    <text x="10" y="132" font-family="monospace" font-size="10" fill="#006C48">+ signAudit(milestoneId, sig)</text>
    <text x="10" y="146" font-family="monospace" font-size="10" fill="#006C48">+ releaseMilestone(mId)</text>
    <text x="10" y="160" font-family="monospace" font-size="10" fill="#006C48">+ emergencyRefund()</text>
  </g>
  <!-- Proyecto vinculado a SmartContractEscrow -->
  <line x1="570" y1="170" x2="640" y2="170" stroke="#012D1D" stroke-width="1.8"/>
  <text x="590" y="162" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">1 : 1</text>

  <!-- CLASE 6: CuotaParteNFT (ERC-721/1155) -->
  <g transform="translate(640, 360)" filter="url(#shadow)">
    <rect width="260" height="150" fill="#FFFFFF" stroke="#006C48" stroke-width="1.5" rx="6"/>
    <rect width="260" height="28" fill="#006C48" rx="6 6 0 0"/>
    <text x="130" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;ERC-721&gt;&gt; CuotaParteFiduciaria</text>
    <text x="10" y="46" font-family="monospace" font-size="10" fill="#1D1B19">- tokenId: uint256</text>
    <text x="10" y="60" font-family="monospace" font-size="10" fill="#1D1B19">- valorNominalUSD: Decimal</text>
    <text x="10" y="74" font-family="monospace" font-size="10" fill="#1D1B19">- porcentajeParticipacion: Dec</text>
    <line x1="0" y1="84" x2="260" y2="84" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="102" font-family="monospace" font-size="10" fill="#006C48">+ mint(investorWallet, amount)</text>
    <text x="10" y="116" font-family="monospace" font-size="10" fill="#006C48">+ claimYield()</text>
  </g>
  <!-- SmartContract emite CuotaParte -->
  <line x1="770" y1="280" x2="770" y2="360" stroke="#006C48" stroke-width="1.5"/>

  <!-- CLASE 7: CertificadoFiscalARCA -->
  <g transform="translate(640, 570)" filter="url(#shadow)">
    <rect width="260" height="140" fill="#FFFFFF" stroke="#1B4332" stroke-width="1.5" rx="6"/>
    <rect width="260" height="28" fill="#1B4332" rx="6 6 0 0"/>
    <text x="130" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">CertificadoFiscalARCA</text>
    <text x="10" y="46" font-family="monospace" font-size="10" fill="#1D1B19">- cuitFideicomiso: String</text>
    <text x="10" y="60" font-family="monospace" font-size="10" fill="#1D1B19">- montoInvertidoARS: Decimal</text>
    <text x="10" y="74" font-family="monospace" font-size="10" fill="#1D1B19">- retencionesPracticadas: Dec</text>
    <line x1="0" y1="84" x2="260" y2="84" stroke="#CCCCCC" stroke-width="1"/>
    <text x="10" y="102" font-family="monospace" font-size="10" fill="#006C48">+ generarLiquidacionPDF()</text>
    <text x="10" y="116" font-family="monospace" font-size="10" fill="#006C48">+ reportarRegimenARCA()</text>
  </g>
  <line x1="770" y1="510" x2="770" y2="570" stroke="#1B4332" stroke-width="1.5"/>
</svg>`;

// ============================================================================
// 3. DIAGRAMA DE SECUENCIA (UML Sequence Diagram)
// ============================================================================
const sequenceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150 780" width="100%" height="100%">
  <defs>
    <marker id="arrow-seq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#012D1D"/>
    </marker>
    <marker id="dash-seq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#006C48"/>
    </marker>
  </defs>

  <rect width="1150" height="780" fill="#FBF9F5" rx="12"/>

  <!-- Título -->
  <text x="575" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#012D1D">
    SEED &amp; GROW — DIAGRAMA DE SECUENCIA: RENDICIÓN, PERITAJE Y DESEMBOLSO ESCROW
  </text>
  <text x="575" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">
    Flujo de liberación condicionada de fondos fiduciarios bajo Base Layer 2
  </text>

  <!-- PARTICIPANTES (Cabeceras) -->
  <!-- 1: Productor -->
  <g transform="translate(100, 90)">
    <rect x="-65" y="0" width="130" height="40" rx="6" fill="#012D1D"/>
    <text x="0" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">:Productor</text>
    <line x1="0" y1="40" x2="0" y2="650" stroke="#999999" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>

  <!-- 2: Frontend SPA -->
  <g transform="translate(310, 90)">
    <rect x="-65" y="0" width="130" height="40" rx="6" fill="#006C48"/>
    <text x="0" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">:Frontend Web</text>
    <line x1="0" y1="40" x2="0" y2="650" stroke="#999999" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>

  <!-- 3: API Backend -->
  <g transform="translate(520, 90)">
    <rect x="-65" y="0" width="130" height="40" rx="6" fill="#012D1D"/>
    <text x="0" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">:API Express/Node</text>
    <line x1="0" y1="40" x2="0" y2="650" stroke="#999999" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>

  <!-- 4: Auditor Colegiado -->
  <g transform="translate(730, 90)">
    <rect x="-65" y="0" width="130" height="40" rx="6" fill="#006C48"/>
    <text x="0" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">:Auditor Matriculado</text>
    <line x1="0" y1="40" x2="0" y2="650" stroke="#999999" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>

  <!-- 5: Smart Contract Escrow -->
  <g transform="translate(970, 90)">
    <rect x="-85" y="0" width="170" height="40" rx="6" fill="#012D1D"/>
    <text x="0" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">:SeedGrowEscrow (Base L2)</text>
    <line x1="0" y1="40" x2="0" y2="650" stroke="#999999" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>

  <!-- SECUENCIA DE MENSAJES -->

  <!-- Mensaje 1 -->
  <line x1="100" y1="160" x2="310" y2="160" stroke="#012D1D" stroke-width="1.6" marker-end="url(#arrow-seq)"/>
  <text x="205" y="152" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">1. rendirHito(facturas, fotos)</text>

  <!-- Mensaje 2 -->
  <line x1="310" y1="195" x2="520" y2="195" stroke="#012D1D" stroke-width="1.6" marker-end="url(#arrow-seq)"/>
  <text x="415" y="187" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">2. POST /api/escrow/milestones/submit</text>

  <!-- Mensaje 3 -->
  <line x1="520" y1="230" x2="730" y2="230" stroke="#006C48" stroke-width="1.6" marker-end="url(#arrow-seq)"/>
  <text x="625" y="222" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#006C48">3. notificarInspeccionPendiente()</text>

  <!-- Caja de Acción Auditor -->
  <rect x="670" y="260" width="120" height="45" rx="4" fill="#E6F4EA" stroke="#006C48" stroke-width="1"/>
  <text x="730" y="278" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#012D1D">Visita in situ</text>
  <text x="730" y="293" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#555555">Verificación física</text>

  <!-- Mensaje 4 -->
  <line x1="730" y1="335" x2="310" y2="335" stroke="#006C48" stroke-width="1.6" marker-end="url(#arrow-seq)"/>
  <text x="520" y="327" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#006C48">4. cargarDictamen(veredicto="APROBADO", coords, fotos)</text>

  <!-- Mensaje 5 -->
  <line x1="310" y1="375" x2="520" y2="375" stroke="#012D1D" stroke-width="1.6" marker-end="url(#arrow-seq)"/>
  <text x="415" y="367" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">5. POST /api/audit/sign (Firma ECDSA SHA-256)</text>

  <!-- Mensaje 6: Firma al Smart Contract -->
  <line x1="520" y1="420" x2="970" y2="420" stroke="#012D1D" stroke-width="2" marker-end="url(#arrow-seq)"/>
  <text x="745" y="412" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">6. signMilestoneAudit(mId, auditHash, signatureECDSA)</text>

  <!-- Fragmento Condicional (ALT) -->
  <rect x="50" y="460" width="1030" height="150" fill="none" stroke="#006C48" stroke-width="1.5" stroke-dasharray="6,4" rx="6"/>
  <rect x="50" y="460" width="80" height="24" fill="#006C48" rx="6 0 6 0"/>
  <text x="90" y="476" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">[Quórum 3/5]</text>

  <!-- Mensaje 7: Liberación del Escrow -->
  <line x1="970" y1="505" x2="100" y2="505" stroke="#006C48" stroke-width="2" marker-end="url(#arrow-seq)"/>
  <text x="535" y="497" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#006C48">7. transfer(producerWallet, montoHitoUSDC)</text>

  <!-- Mensaje 8: Notificación Éxito -->
  <line x1="970" y1="545" x2="520" y2="545" stroke="#012D1D" stroke-width="1.4" stroke-dasharray="4,4" marker-end="url(#dash-seq)"/>
  <text x="745" y="537" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">8. Event MilestoneReleased(projectId, mId, amount)</text>

  <!-- Mensaje 9: Actualización Cartera -->
  <line x1="520" y1="585" x2="310" y2="585" stroke="#012D1D" stroke-width="1.4" stroke-dasharray="4,4" marker-end="url(#dash-seq)"/>
  <text x="415" y="577" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">9. WebSocket: updateLotStatus(AUDITADO_Y_LIBERADO)</text>

  <!-- Fin de secuencia -->
  <text x="575" y="685" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-style="italic" fill="#006C48">
    ✓ Desembolso completado determinísticamente en 2 segundos con gas &lt; $0.01 USD en Base L2
  </text>
</svg>`;

// ============================================================================
// 4. DIAGRAMA ENTIDAD-RELACIÓN (DER - Base de Datos)
// ============================================================================
const derSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150 780" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="2.5" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="1150" height="780" fill="#FBF9F5" rx="12"/>

  <!-- Título -->
  <text x="575" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#012D1D">
    SEED &amp; GROW — DIAGRAMA ENTIDAD-RELACIÓN (DER)
  </text>
  <text x="575" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">
    Modelo Relacional Normalizado en 3FN (PostgreSQL / Drizzle ORM)
  </text>

  <!-- TABLA 1: users -->
  <g transform="translate(50, 90)" filter="url(#shadow)">
    <rect width="240" height="230" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="240" height="28" fill="#012D1D" rx="6 6 0 0"/>
    <text x="120" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">users</text>
    <text x="10" y="46" font-family="monospace" font-size="11" font-weight="bold" fill="#006C48">PK  id : UUID</text>
    <text x="10" y="64" font-family="monospace" font-size="11" fill="#1D1B19">    wallet_address : VARCHAR(42)</text>
    <text x="10" y="82" font-family="monospace" font-size="11" fill="#1D1B19">    email : VARCHAR(255)</text>
    <text x="10" y="100" font-family="monospace" font-size="11" fill="#1D1B19">    dni_cuil : VARCHAR(13)</text>
    <text x="10" y="118" font-family="monospace" font-size="11" fill="#1D1B19">    full_name : VARCHAR(150)</text>
    <text x="10" y="136" font-family="monospace" font-size="11" fill="#1D1B19">    role : user_role_enum</text>
    <text x="10" y="154" font-family="monospace" font-size="11" fill="#1D1B19">    matricula_nro : VARCHAR(50)</text>
    <text x="10" y="172" font-family="monospace" font-size="11" fill="#1D1B19">    kyc_status : kyc_status_enum</text>
    <text x="10" y="190" font-family="monospace" font-size="11" fill="#1D1B19">    created_at : TIMESTAMP</text>
  </g>

  <!-- TABLA 2: agricultural_lots (proyectos) -->
  <g transform="translate(420, 90)" filter="url(#shadow)">
    <rect width="280" height="260" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="280" height="28" fill="#012D1D" rx="6 6 0 0"/>
    <text x="140" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">agricultural_lots (proyectos)</text>
    <text x="10" y="46" font-family="monospace" font-size="11" font-weight="bold" fill="#006C48">PK  id : SERIAL</text>
    <text x="10" y="64" font-family="monospace" font-size="11" fill="#006C48">FK  producer_id : UUID (users.id)</text>
    <text x="10" y="82" font-family="monospace" font-size="11" fill="#1D1B19">    title : VARCHAR(200)</text>
    <text x="10" y="100" font-family="monospace" font-size="11" fill="#1D1B19">    slug : VARCHAR(100) UNIQUE</text>
    <text x="10" y="118" font-family="monospace" font-size="11" fill="#1D1B19">    target_usd : NUMERIC(14,2)</text>
    <text x="10" y="136" font-family="monospace" font-size="11" fill="#1D1B19">    raised_usd : NUMERIC(14,2)</text>
    <text x="10" y="154" font-family="monospace" font-size="11" fill="#1D1B19">    status : lot_status_enum</text>
    <text x="10" y="172" font-family="monospace" font-size="11" fill="#1D1B19">    fideicomiso_cuit : VARCHAR(13)</text>
    <text x="10" y="190" font-family="monospace" font-size="11" fill="#1D1B19">    escrow_address : VARCHAR(42)</text>
    <text x="10" y="208" font-family="monospace" font-size="11" fill="#1D1B19">    nft_contract_address : VARCHAR</text>
  </g>
  <!-- Relación users -> lots (1 a N) -->
  <line x1="290" y1="180" x2="420" y2="180" stroke="#012D1D" stroke-width="1.8"/>
  <text x="300" y="170" font-family="Arial" font-size="11" fill="#012D1D">1</text>
  <text x="400" y="170" font-family="Arial" font-size="11" fill="#012D1D">N</text>

  <!-- TABLA 3: investments -->
  <g transform="translate(50, 420)" filter="url(#shadow)">
    <rect width="250" height="230" fill="#FFFFFF" stroke="#006C48" stroke-width="1.5" rx="6"/>
    <rect width="250" height="28" fill="#006C48" rx="6 6 0 0"/>
    <text x="125" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">investments (aportes)</text>
    <text x="10" y="46" font-family="monospace" font-size="11" font-weight="bold" fill="#006C48">PK  id : SERIAL</text>
    <text x="10" y="64" font-family="monospace" font-size="11" fill="#006C48">FK  user_id : UUID (users.id)</text>
    <text x="10" y="82" font-family="monospace" font-size="11" fill="#006C48">FK  lot_id : INT (lots.id)</text>
    <text x="10" y="100" font-family="monospace" font-size="11" fill="#1D1B19">    amount_usd : NUMERIC(12,2)</text>
    <text x="10" y="118" font-family="monospace" font-size="11" fill="#1D1B19">    tokens_count : NUMERIC(10,2)</text>
    <text x="10" y="136" font-family="monospace" font-size="11" fill="#1D1B19">    tx_hash : VARCHAR(66)</text>
    <text x="10" y="154" font-family="monospace" font-size="11" fill="#1D1B19">    payment_method : VARCHAR(20)</text>
    <text x="10" y="172" font-family="monospace" font-size="11" fill="#1D1B19">    created_at : TIMESTAMP</text>
  </g>
  <!-- users -> investments -->
  <line x1="170" y1="320" x2="170" y2="420" stroke="#006C48" stroke-width="1.8"/>
  <text x="175" y="340" font-family="Arial" font-size="11" fill="#006C48">1</text>
  <text x="175" y="410" font-family="Arial" font-size="11" fill="#006C48">N</text>
  <!-- lots -> investments -->
  <line x1="450" y1="350" x2="300" y2="450" stroke="#012D1D" stroke-width="1.6"/>

  <!-- TABLA 4: project_milestones -->
  <g transform="translate(420, 420)" filter="url(#shadow)">
    <rect width="280" height="240" fill="#FFFFFF" stroke="#012D1D" stroke-width="1.5" rx="6"/>
    <rect width="280" height="28" fill="#1B4332" rx="6 6 0 0"/>
    <text x="140" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">project_milestones</text>
    <text x="10" y="46" font-family="monospace" font-size="11" font-weight="bold" fill="#006C48">PK  id : SERIAL</text>
    <text x="10" y="64" font-family="monospace" font-size="11" fill="#006C48">FK  lot_id : INT (lots.id)</text>
    <text x="10" y="82" font-family="monospace" font-size="11" fill="#1D1B19">    step_index : INT</text>
    <text x="10" y="100" font-family="monospace" font-size="11" fill="#1D1B19">    title : VARCHAR(150)</text>
    <text x="10" y="118" font-family="monospace" font-size="11" fill="#1D1B19">    amount_usd : NUMERIC(12,2)</text>
    <text x="10" y="136" font-family="monospace" font-size="11" fill="#1D1B19">    status : milestone_status_enum</text>
    <text x="10" y="154" font-family="monospace" font-size="11" fill="#1D1B19">    evidence_urls : TEXT[]</text>
    <text x="10" y="172" font-family="monospace" font-size="11" fill="#1D1B19">    unlocked_at : TIMESTAMP</text>
  </g>
  <!-- lots -> milestones -->
  <line x1="560" y1="350" x2="560" y2="420" stroke="#012D1D" stroke-width="1.8"/>
  <text x="568" y="370" font-family="Arial" font-size="11" fill="#012D1D">1</text>
  <text x="568" y="410" font-family="Arial" font-size="11" fill="#012D1D">N</text>

  <!-- TABLA 5: audit_reports -->
  <g transform="translate(800, 420)" filter="url(#shadow)">
    <rect width="290" height="230" fill="#FFFFFF" stroke="#006C48" stroke-width="1.5" rx="6"/>
    <rect width="290" height="28" fill="#006C48" rx="6 6 0 0"/>
    <text x="145" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">audit_reports (peritajes)</text>
    <text x="10" y="46" font-family="monospace" font-size="11" font-weight="bold" fill="#006C48">PK  id : SERIAL</text>
    <text x="10" y="64" font-family="monospace" font-size="11" fill="#006C48">FK  milestone_id : INT</text>
    <text x="10" y="82" font-family="monospace" font-size="11" fill="#006C48">FK  auditor_id : UUID (users.id)</text>
    <text x="10" y="100" font-family="monospace" font-size="11" fill="#1D1B19">    verdict : VARCHAR(20)</text>
    <text x="10" y="118" font-family="monospace" font-size="11" fill="#1D1B19">    sha256_hash : VARCHAR(64)</text>
    <text x="10" y="136" font-family="monospace" font-size="11" fill="#1D1B19">    digital_sig_hex : TEXT</text>
    <text x="10" y="154" font-family="monospace" font-size="11" fill="#1D1B19">    onchain_tx_hash : VARCHAR(66)</text>
  </g>
  <!-- milestones -> audit_reports -->
  <line x1="700" y1="520" x2="800" y2="520" stroke="#006C48" stroke-width="1.8"/>
  <text x="710" y="510" font-family="Arial" font-size="11" fill="#006C48">1</text>
  <text x="785" y="510" font-family="Arial" font-size="11" fill="#006C48">1</text>
</svg>`;

// ============================================================================
// 5. DIAGRAMA DE DESPLIEGUE FÍSICO (UML Deployment Diagram)
// ============================================================================
const deploymentSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150 780" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="1150" height="780" fill="#FBF9F5" rx="12"/>

  <!-- Título -->
  <text x="575" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#012D1D">
    SEED &amp; GROW — DIAGRAMA DE DESPLIEGUE FÍSICO (UML)
  </text>
  <text x="575" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">
    Topología Híbrida Cloud Serverless + Red Base Layer 2 (EVM) + IPFS
  </text>

  <!-- NODO 1: Dispositivo Cliente -->
  <g transform="translate(60, 110)" filter="url(#shadow)">
    <rect width="250" height="260" fill="#FFFFFF" stroke="#012D1D" stroke-width="2" rx="10"/>
    <rect width="250" height="34" fill="#012D1D" rx="10 10 0 0"/>
    <text x="125" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;Device&gt;&gt; Dispositivo Usuario</text>
    
    <!-- Componentes internos -->
    <rect x="20" y="55" width="210" height="70" fill="#F4FBF7" stroke="#006C48" stroke-width="1.2" rx="6"/>
    <text x="125" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">&lt;&lt;Execution Environment&gt;&gt;</text>
    <text x="125" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#012D1D">Navegador Web Moderno</text>
    <text x="125" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">[React 19 SPA + Tailwind]</text>

    <rect x="20" y="145" width="210" height="85" fill="#E6F4EA" stroke="#012D1D" stroke-width="1.2" rx="6"/>
    <text x="125" y="168" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">&lt;&lt;Component&gt;&gt; Web3 Provider</text>
    <text x="125" y="185" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#333333">MetaMask / Coinbase Wallet</text>
    <text x="125" y="202" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">[Firmas ECDSA secp256k1]</text>
  </g>

  <!-- NODO 2: Google Cloud Platform (Backend) -->
  <g transform="translate(430, 110)" filter="url(#shadow)">
    <rect width="320" height="580" fill="#FFFFFF" stroke="#006C48" stroke-width="2" rx="10"/>
    <rect width="320" height="34" fill="#006C48" rx="10 10 0 0"/>
    <text x="160" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;Cloud Platform&gt;&gt; Google Cloud Run</text>

    <!-- Componente Server Express -->
    <rect x="25" y="60" width="270" height="150" fill="#F4FBF7" stroke="#012D1D" stroke-width="1.2" rx="6"/>
    <text x="160" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">&lt;&lt;Server&gt;&gt; Node.js / Express API</text>
    <text x="35" y="105" font-family="monospace" font-size="10" fill="#1D1B19">• Port: 3000 (HTTPS TLS 1.3)</text>
    <text x="35" y="123" font-family="monospace" font-size="10" fill="#1D1B19">• Vite Server Middleware</text>
    <text x="35" y="141" font-family="monospace" font-size="10" fill="#1D1B19">• Auth JWT / Firebase Guard</text>
    <text x="35" y="159" font-family="monospace" font-size="10" fill="#1D1B19">• PDF Generator Engine</text>
    <text x="35" y="177" font-family="monospace" font-size="10" fill="#1D1B19">• Drizzle ORM Connection Pool</text>

    <!-- Componente Cloud SQL PostgreSQL -->
    <rect x="25" y="240" width="270" height="130" fill="#E6F4EA" stroke="#012D1D" stroke-width="1.2" rx="6"/>
    <text x="160" y="262" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">&lt;&lt;Database&gt;&gt; Cloud SQL (PostgreSQL)</text>
    <text x="35" y="285" font-family="monospace" font-size="10" fill="#1D1B19">• Engine: PostgreSQL 16</text>
    <text x="35" y="303" font-family="monospace" font-size="10" fill="#1D1B19">• Encryption: AES-256 en reposo</text>
    <text x="35" y="321" font-family="monospace" font-size="10" fill="#1D1B19">• Tablas: users, lots, milestones</text>
    <text x="35" y="339" font-family="monospace" font-size="10" fill="#1D1B19">• Transacciones ACID estrictas</text>

    <!-- Componente Firestore DB -->
    <rect x="25" y="400" width="270" height="120" fill="#FFFFFF" stroke="#006C48" stroke-width="1.2" rx="6"/>
    <text x="160" y="422" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#006C48">&lt;&lt;NoSQL DB&gt;&gt; Firestore Document DB</text>
    <text x="35" y="445" font-family="monospace" font-size="10" fill="#1D1B19">• Firmas periciales en tiempo real</text>
    <text x="35" y="463" font-family="monospace" font-size="10" fill="#1D1B19">• Telemetría de sensores IoT</text>
    <text x="35" y="481" font-family="monospace" font-size="10" fill="#1D1B19">• Notificaciones WebSockets</text>
  </g>

  <!-- NODO 3: Red Blockchain Base L2 -->
  <g transform="translate(850, 110)" filter="url(#shadow)">
    <rect width="250" height="290" fill="#FFFFFF" stroke="#012D1D" stroke-width="2" rx="10"/>
    <rect width="250" height="34" fill="#012D1D" rx="10 10 0 0"/>
    <text x="125" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;Blockchain&gt;&gt; Base (Ethereum L2)</text>

    <rect x="20" y="55" width="210" height="70" fill="#F4FBF7" stroke="#006C48" stroke-width="1.2" rx="6"/>
    <text x="125" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">SeedGrowEscrow.sol</text>
    <text x="125" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">Bóveda de custodia multi-sig 3/5</text>
    <text x="125" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#006C48">[Finalidad de bloque: 2 seg]</text>

    <rect x="20" y="140" width="210" height="60" fill="#E6F4EA" stroke="#012D1D" stroke-width="1.2" rx="6"/>
    <text x="125" y="163" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#012D1D">SeedGrowNFT.sol</text>
    <text x="125" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">Tokenización de Cuotas-Parte</text>

    <rect x="20" y="215" width="210" height="60" fill="#FFFFFF" stroke="#006C48" stroke-width="1.2" rx="6"/>
    <text x="125" y="238" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#006C48">SeedGrowGovernance.sol</text>
    <text x="125" y="255" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#555555">Votación descentralizada quórum</text>
  </g>

  <!-- NODO 4: Almacenamiento IPFS / Arweave -->
  <g transform="translate(850, 440)" filter="url(#shadow)">
    <rect width="250" height="170" fill="#FFFFFF" stroke="#006C48" stroke-width="2" rx="10"/>
    <rect width="250" height="34" fill="#1B4332" rx="10 10 0 0"/>
    <text x="125" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">&lt;&lt;Storage&gt;&gt; Red IPFS / Filecoin</text>
    <text x="25" y="65" font-family="monospace" font-size="10" fill="#1D1B19">• Hash CID inmutable de fotos</text>
    <text x="25" y="85" font-family="monospace" font-size="10" fill="#1D1B19">• Facturas y remitos de obras</text>
    <text x="25" y="105" font-family="monospace" font-size="10" fill="#1D1B19">• Informes periciales PDF</text>
    <text x="25" y="125" font-family="monospace" font-size="10" fill="#1D1B19">• Persistencia permanente descentralizada</text>
  </g>

  <!-- CONEXIONES DE RED -->
  <!-- Cliente -> Cloud Run (HTTPS REST / JSON) -->
  <line x1="310" y1="210" x2="430" y2="210" stroke="#012D1D" stroke-width="2"/>
  <text x="370" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#012D1D">HTTPS/TLS</text>

  <!-- Cliente -> Base L2 (RPC Web3 JSON-RPC) -->
  <path d="M 280 250 Q 550 60 850 180" fill="none" stroke="#006C48" stroke-width="1.8" stroke-dasharray="4,4"/>
  <text x="560" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#006C48">Web3 JSON-RPC (Base L2)</text>

  <!-- Cloud Run -> Base L2 (Oracle / Signer) -->
  <line x1="750" y1="220" x2="850" y2="220" stroke="#012D1D" stroke-width="2"/>
  <text x="800" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#012D1D">RPC Node</text>

  <!-- Cloud Run -> IPFS -->
  <line x1="750" y1="510" x2="850" y2="510" stroke="#006C48" stroke-width="2"/>
  <text x="800" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#006C48">IPFS Gateway</text>
</svg>`;

// Escribir los 5 archivos SVG
fs.writeFileSync(path.join(outDir, '01_casos_de_uso.svg'), useCaseSvg);
fs.writeFileSync(path.join(outDir, '02_diagrama_clases.svg'), classSvg);
fs.writeFileSync(path.join(outDir, '03_diagrama_secuencia.svg'), sequenceSvg);
fs.writeFileSync(path.join(outDir, '04_diagrama_der.svg'), derSvg);
fs.writeFileSync(path.join(outDir, '05_diagrama_despliegue.svg'), deploymentSvg);

console.log('5 Diagramas UML generados con éxito en public/assets/diagramas_uml/');
