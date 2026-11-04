import { jsPDF } from 'jspdf';

export function createBlockchainGuidePdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Helper function for page headers
  const renderHeader = (title: string, subtitle: string, pageNum: number, totalPages: number) => {
    doc.setFillColor(1, 45, 29); // #012d1d
    doc.rect(0, 0, pageWidth, 22, 'F');

    doc.setFillColor(0, 108, 72); // #006c48
    doc.rect(0, 20.5, pageWidth, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title, margin, 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 247, 195); // #92f7c3
    doc.text(subtitle, margin, 16);

    // Page indicator
    doc.setTextColor(220, 240, 230);
    doc.setFontSize(7.5);
    doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - margin, 16, { align: 'right' });
  };

  // Helper function for page footers
  const renderFooter = (pageNum: number) => {
    doc.setDrawColor(210, 215, 210);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(130, 135, 130);
    doc.text(
      'Manual de Arquitectura Blockchain & Smart Contracts · Seed & Grow Academy · Base L2 Protocol',
      margin,
      pageHeight - 5
    );
    doc.text(`Página ${pageNum}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  };

  // =========================================================================
  // PÁGINA 1: FUNDAMENTOS & ARQUITECTURA DE BLOQUES
  // =========================================================================
  renderHeader(
    'MANUAL TÉCNICO: CÓMO FUNCIONA LA BLOCKCHAIN',
    'Módulo 1: Arquitectura Distribuida, Criptografía Asimétrica y Estructura de Bloques',
    1,
    4
  );

  let y = 29;

  // Introducción
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. ¿Qué es una Blockchain en Realidad? (El Modelo Mental Correcto)', margin, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(45, 50, 45);
  doc.text(
    'A diferencia de una base de datos tradicional (PostgreSQL/Firebase) donde un administrador con acceso ROOT puede editar o',
    margin,
    y
  );
  y += 3.8;
  doc.text(
    'eliminar datos, una blockchain es una máquina de estados global, distribuida y determinística gobernada por consenso matemático.',
    margin,
    y
  );

  // DIAGRAMA 1: COMPARATIVA VISUAL (Centralizado vs Distribuido)
  y += 5.5;
  const diag1W = pageWidth - margin * 2;
  const diag1H = 34;
  doc.setFillColor(245, 248, 246);
  doc.roundedRect(margin, y, diag1W, diag1H, 2.5, 2.5, 'F');
  doc.setDrawColor(200, 215, 205);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, diag1W, diag1H, 2.5, 2.5, 'D');

  // Lado Izquierdo: Centralizado
  const leftX = margin + 12;
  doc.setFillColor(235, 230, 230);
  doc.roundedRect(leftX, y + 4, 38, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(150, 40, 40);
  doc.text('SERVIDOR CENTRAL', leftX + 19, y + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.text('(Punto único de fallo / Alterable)', leftX + 19, y + 15, { align: 'center' });

  // Clientes apuntando al servidor
  doc.setDrawColor(180, 70, 70);
  doc.setLineWidth(0.3);
  const clients = [
    { x: leftX - 6, y: y + 25, label: 'Usuario A' },
    { x: leftX + 19, y: y + 27, label: 'Usuario B' },
    { x: leftX + 44, y: y + 25, label: 'Usuario C' },
  ];
  clients.forEach((c) => {
    doc.setFillColor(255, 255, 255);
    doc.circle(c.x, c.y, 2.5, 'FD');
    doc.line(c.x, c.y - 2.5, leftX + 19, y + 18);
    doc.setFontSize(5);
    doc.setTextColor(100, 100, 100);
    doc.text(c.label, c.x, c.y + 4.5, { align: 'center' });
  });

  // Flecha divisoria
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 108, 72);
  doc.text('VS.', margin + diag1W / 2, y + 18, { align: 'center' });

  // Lado Derecho: Red Distribuida P2P
  const rightCenterX = margin + diag1W - 48;
  const nodes = [
    { x: rightCenterX, y: y + 8, label: 'Nodo 1 (EVM)' },
    { x: rightCenterX - 22, y: y + 22, label: 'Nodo 2 (EVM)' },
    { x: rightCenterX + 22, y: y + 22, label: 'Nodo 3 (EVM)' },
    { x: rightCenterX, y: y + 28, label: 'Nodo 4 (EVM)' },
  ];
  // Mesh connections
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.4);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      doc.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
    }
  }
  nodes.forEach((n) => {
    doc.setFillColor(0, 108, 72);
    doc.circle(n.x, n.y, 3, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(n.x, n.y, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(0, 80, 50);
    doc.text(n.label, n.x, n.y - 4, { align: 'center' });
  });

  // Sección 2: Los 4 Pilares
  y += diag1H + 6;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. Los 4 Pilares Criptográficos Fundamentales', margin, y);

  y += 4.5;
  const pillars = [
    {
      title: 'A. Hash Keccak-256 (SHA-3):',
      desc: 'Huella digital determinista de 32 bytes (64 caracteres hex). Entrada idéntica produce siempre el mismo hash. Efecto avalancha: modificar 1 bit altera el hash íntegro.',
    },
    {
      title: 'B. Criptografía Asimétrica (ECDSA):',
      desc: 'Clave Privada (secreta, 256 bits) genera la Clave Pública mediante curvas elípticas (secp256k1). La dirección 0x... son los últimos 20 bytes del hash de la clave pública.',
    },
    {
      title: 'C. Inmutabilidad por Enlace de Bloques:',
      desc: 'Cada bloque guarda el hash criptográfico del bloque predecesor (Previous Hash). Si se altera una tx histórica, todos los hashes futuros colapsan y la red rechaza el intento.',
    },
    {
      title: 'D. Consenso Distribuido (Proof of Stake):',
      desc: 'Los validadores inmovilizan colateral (Staking). Si validan bloques con transacciones inválidas o fraudulentas, el protocolo ejecuta "Slashing" destruyendo sus depósitos.',
    },
  ];

  pillars.forEach((p) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 108, 72);
    doc.text(p.title, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - margin * 2 - 4);
    doc.text(splitDesc, margin + 4, y + 3.5);
    y += 4 + splitDesc.length * 3.2;
  });

  // DIAGRAMA 2: ESTRUCTURA DE BLOQUES ENLAZADOS POR HASH
  y += 2;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Diagrama de Bloques Enlazados Criptográficamente (Blockchain Sequence):', margin, y);

  y += 4;
  const blockW = 54;
  const blockH = 36;
  const gap = 10;
  const blockData = [
    { num: 'Bloque #102', prev: '0x9fa1...b4e2', root: '0x38ab...10cd', hash: '0x7e8b...19d2' },
    { num: 'Bloque #103', prev: '0x7e8b...19d2', root: '0x44ce...991a', hash: '0xa12c...881f' },
    { num: 'Bloque #104 (Nuevo)', prev: '0xa12c...881f', root: '0x66fe...712b', hash: '0xd419...bb40' },
  ];

  blockData.forEach((b, idx) => {
    const bx = margin + idx * (blockW + gap);

    // Box
    doc.setFillColor(242, 246, 243);
    doc.roundedRect(bx, y, blockW, blockH, 2, 2, 'F');
    doc.setDrawColor(0, 108, 72);
    doc.setLineWidth(idx === 2 ? 0.6 : 0.3);
    doc.roundedRect(bx, y, blockW, blockH, 2, 2, 'D');

    // Block Header
    doc.setFillColor(0, 108, 72);
    doc.rect(bx, y, blockW, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(b.num, bx + blockW / 2, y + 4.2, { align: 'center' });

    // Block Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(70, 75, 70);
    doc.text('Prev Hash:', bx + 3, y + 10);
    doc.setFont('courier', 'bold');
    doc.setTextColor(1, 45, 29);
    doc.text(b.prev, bx + 3, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 75, 70);
    doc.text('Merkle Root (Txs):', bx + 3, y + 18);
    doc.setFont('courier', 'bold');
    doc.setTextColor(42, 157, 143);
    doc.text(b.root, bx + 3, y + 21);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 75, 70);
    doc.text('Hash de Este Bloque:', bx + 3, y + 26);
    doc.setFont('courier', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(b.hash, bx + 3, y + 29);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.2);
    doc.setTextColor(140, 140, 140);
    doc.text('Tx Count: 142 txs · Base L2', bx + 3, y + 33);

    // Link arrow between blocks
    if (idx < 2) {
      const arrowX = bx + blockW + 1;
      const arrowY = y + 18;
      doc.setDrawColor(0, 108, 72);
      doc.setLineWidth(0.8);
      doc.line(arrowX, arrowY, arrowX + gap - 2, arrowY);
      doc.line(arrowX + gap - 4, arrowY - 2, arrowX + gap - 2, arrowY);
      doc.line(arrowX + gap - 4, arrowY + 2, arrowX + gap - 2, arrowY);
    }
  });

  renderFooter(1);

  // =========================================================================
  // PÁGINA 2: EVM, GAS & CICLO DE VIDA DE LA TRANSACCIÓN
  // =========================================================================
  doc.addPage();
  renderHeader(
    'LA EVM Y EL CICLO DE VIDA DE UNA TRANSACCIÓN',
    'Módulo 2: Máquina Virtual de Ethereum, Mecánica del Gas y Memoria de Ejecución',
    2,
    4
  );

  y = 29;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('3. ¿Cómo Funciona la EVM (Ethereum Virtual Machine) y el Gas?', margin, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(45, 50, 45);
  doc.text(
    'La EVM es un procesador virtual que lee Bytecode compilado (Opcodes como PUSH, ADD, SLOAD, SSTORE). Para prevenir bucles',
    margin,
    y
  );
  y += 3.8;
  doc.text(
    'infinitos accidentales o ataques de denegación de servicio (DoS), cada instrucción atómica consume una unidad de energía llamada Gas.',
    margin,
    y
  );

  // GRÁFICO 3: CONSUMO DE GAS POR OPERACIÓN (BARRAS HORIZONTALES)
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('Gráfico Comparativo de Consumo de Gas en Opcodes EVM:', margin, y);

  y += 3.5;
  const gasOperations = [
    { op: 'SSTORE (Grabar nuevo dato en Storage)', gas: 20000, maxPct: 100, color: [186, 26, 26], note: 'Muy caro (disco permanente)' },
    { op: 'SLOAD (Leer un slot frío de Storage)', gas: 2100, maxPct: 35, color: [231, 111, 81], note: 'Lectura de estado en disco' },
    { op: 'CREATE / MINTEAR (Crear nuevo contrato/NFT)', gas: 32000, maxPct: 100, color: [142, 40, 0], note: 'Inicialización de cuenta' },
    { op: 'LOG / EMIT (Emitir Evento para Frontend)', gas: 375, maxPct: 18, color: [42, 157, 143], note: 'Barato (no accesible x contrato)' },
    { op: 'MEMORY OP (Cálculo en memoria RAM)', gas: 3, maxPct: 5, color: [0, 108, 72], note: 'Ultra rápido y económico' },
    { op: 'ADD / MUL (Operaciones aritméticas)', gas: 5, maxPct: 6, color: [0, 108, 72], note: 'Computación básica en CPU' },
  ];

  const gasChartX = margin + 65;
  const gasMaxBarW = pageWidth - margin - gasChartX - 35;
  let gY = y + 3;

  gasOperations.forEach((item) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 30, 30);
    doc.text(item.op, margin, gY + 3.5);

    // Track
    doc.setFillColor(235, 235, 235);
    doc.roundedRect(gasChartX, gY, gasMaxBarW, 4.5, 1, 1, 'F');

    // Colored bar
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    const w = Math.max(2.5, (item.maxPct / 100) * gasMaxBarW);
    doc.roundedRect(gasChartX, gY, w, 4.5, 1, 1, 'F');

    // Gas value label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(item.color[0], item.color[1], item.color[2]);
    doc.text(`${item.gas.toLocaleString()} gas`, gasChartX + gasMaxBarW + 2, gY + 3.5);

    gY += 6.5;
  });

  // DIAGRAMA 4: CICLO DE VIDA DE UNA TRANSACCIÓN (FLUJOGRAMA)
  y = gY + 5;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Diagrama del Ciclo de Vida de una Transacción Blockchain:', margin, y);

  y += 4;
  const stepW = 32;
  const stepH = 28;
  const stepGap = 5;
  const steps = [
    { step: '1. Firma ECDSA', desc: 'El usuario firma la tx en MetaMask con su Clave Privada (sin exponerla).' },
    { step: '2. Mempool P2P', desc: 'La tx se propaga a la sala de espera (Mempool) de los nodos de la red.' },
    { step: '3. Bloque Minado', desc: 'El validador empaqueta la tx y resuelve el orden determinista.' },
    { step: '4. EVM Execution', desc: 'Los nodos ejecutan el bytecode, actualizan variables y cobran gas.' },
    { step: '5. Logs & Recibo', desc: 'Se emite el evento y la app React recibe la confirmación final.' },
  ];

  steps.forEach((st, idx) => {
    const sx = margin + idx * (stepW + stepGap);

    doc.setFillColor(242, 246, 243);
    doc.roundedRect(sx, y, stepW, stepH, 2, 2, 'F');
    doc.setDrawColor(0, 108, 72);
    doc.setLineWidth(0.3);
    doc.roundedRect(sx, y, stepW, stepH, 2, 2, 'D');

    doc.setFillColor(0, 108, 72);
    doc.rect(sx, y, stepW, 5.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.text(st.step, sx + stepW / 2, y + 3.8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(40, 45, 40);
    const splitText = doc.splitTextToSize(st.desc, stepW - 4);
    doc.text(splitText, sx + 2, y + 9.5);

    if (idx < 4) {
      const ax = sx + stepW + 1;
      const ay = y + 14;
      doc.setDrawColor(0, 108, 72);
      doc.setLineWidth(0.6);
      doc.line(ax, ay, ax + stepGap - 2, ay);
      doc.line(ax + stepGap - 3, ay - 1.5, ax + stepGap - 2, ay);
      doc.line(ax + stepGap - 3, ay + 1.5, ax + stepGap - 2, ay);
    }
  });

  // Sección 4: Áreas de Memoria en Solidity
  y += stepH + 8;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('4. Las 3 Áreas de Datos en Solidity (Regla de Oro de Rendimiento)', margin, y);

  y += 4;
  const memoryBoxes = [
    {
      name: 'STORAGE (Disco Duro)',
      color: [186, 26, 26],
      desc: 'Inmutable y permanente en la blockchain. Sobrevive a la llamada. Muy costoso en gas. Se usa solo para balances, propietarios y estados críticos.',
    },
    {
      name: 'MEMORY (Memoria RAM)',
      color: [42, 157, 143],
      desc: 'Temporal y mutable. Se borra automáticamente al finalizar la llamada de la función. Ideal para cálculos intermedios, mutar strings o arrays.',
    },
    {
      name: 'CALLDATA (Buffer de Entrada)',
      color: [0, 108, 72],
      desc: 'Espacio de solo lectura que aloja los argumentos enviados por la transacción. No se puede modificar y es el más económico de todos.',
    },
  ];

  const mBoxW = (pageWidth - margin * 2 - 8) / 3;
  memoryBoxes.forEach((mb, idx) => {
    const mx = margin + idx * (mBoxW + 4);
    doc.setFillColor(248, 250, 249);
    doc.roundedRect(mx, y, mBoxW, 28, 2, 2, 'F');
    doc.setDrawColor(mb.color[0], mb.color[1], mb.color[2]);
    doc.setLineWidth(0.4);
    doc.roundedRect(mx, y, mBoxW, 28, 2, 2, 'D');

    doc.setFillColor(mb.color[0], mb.color[1], mb.color[2]);
    doc.rect(mx, y, mBoxW, 5.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.text(mb.name, mx + mBoxW / 2, y + 3.8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(40, 45, 40);
    const descText = doc.splitTextToSize(mb.desc, mBoxW - 4);
    doc.text(descText, mx + 2, y + 9.5);
  });

  renderFooter(2);

  // =========================================================================
  // PÁGINA 3: PROGRAMACIÓN DE SMART CONTRACTS EN SOLIDITY
  // =========================================================================
  doc.addPage();
  renderHeader(
    'CÓDIGO SOLIDITY: PROGRAMACIÓN Y SEGURIDAD',
    'Módulo 3: Anatomía de un Contrato de Custodia Escrow y Prevención de Vulnerabilidades',
    3,
    4
  );

  y = 29;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('5. Contrato Inteligente Explicado Línea por Línea (Solidio ^0.8.24)', margin, y);

  y += 4.5;
  // Code box with dark theme syntax
  const codeH = 112;
  doc.setFillColor(1, 45, 29); // Dark background
  doc.roundedRect(margin, y, pageWidth - margin * 2, codeH, 2.5, 2.5, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(146, 247, 195); // Mint text

  const codeLines = [
    '// SPDX-License-Identifier: MIT',
    'pragma solidity ^0.8.24; // Compilador seguro con proteccion aritmetica nativa',
    '',
    'contract SeedGrowEscrowVault {',
    '    // --- 1. VARIABLES DE ESTADO (Viven en Storage) ---',
    '    address public immutable beneficiario; // Productor o promotor de la obra',
    '    address public immutable certifiedAuditor; // Auditor matriculado CIAPC',
    '    uint256 public totalDisbursed;',
    '    bool public isMilestoneApproved;',
    '    mapping(address => uint256) public investorBalance; // Diccionario (wallet => balance)',
    '',
    '    // --- 2. EVENTOS (Logs indexados que el Frontend React escucha en tiempo real) ---',
    '    event DepositMade(address indexed investor, uint256 amount);',
    '    event MilestoneAudited(address indexed auditor, bytes32 reportKeccakHash);',
    '    event FundsReleased(address indexed to, uint256 amount);',
    '',
    '    // --- 3. CONSTRUCTOR (Se ejecuta 1 sola vez en el despliegue del contrato) ---',
    '    constructor(address _beneficiario, address _auditor) {',
    '        require(_beneficiario != address(0), "Direccion de beneficiario invalida");',
    '        require(_auditor != address(0), "Direccion de auditor invalida");',
    '        beneficiario = _beneficiario;',
    '        certifiedAuditor = _auditor;',
    '    }',
    '',
    '    // --- 4. DEPOSITAR FONDOS (payable = acepta transferencias nativas de valor) ---',
    '    function deposit() external payable {',
    '        require(msg.value > 0, "Monto debe ser mayor a cero");',
    '        investorBalance[msg.sender] += msg.value;',
    '        emit DepositMade(msg.sender, msg.value);',
    '    }',
    '',
    '    // --- 5. PERITAJE DE AUDITORIA (Solo el auditor registrado tiene permiso) ---',
    '    function certifyMilestone(bytes32 reportHash) external {',
    '        require(msg.sender == certifiedAuditor, "Solo el auditor matriculado puede certificar");',
    '        isMilestoneApproved = true;',
    '        emit MilestoneAudited(msg.sender, reportHash);',
    '    }',
    '',
    '    // --- 6. LIBERACION SEGURA DE FONDOS (Patron Checks-Effects-Interactions) ---',
    '    function releaseMilestone() external {',
    '        // 1. CHECKS (Condiciones obligatorias)',
    '        require(isMilestoneApproved, "Hito aun no aprobado por el perito colegiado");',
    '        uint256 amount = address(this).balance;',
    '        require(amount > 0, "No hay fondos en custodia");',
    '',
    '        // 2. EFFECTS (Actualizar estado ANTES de enviar dinero para evitar Reentrancia)',
    '        isMilestoneApproved = false;',
    '        totalDisbursed += amount;',
    '',
    '        // 3. INTERACTIONS (Transferencia externa final)',
    '        (bool success, ) = payable(beneficiario).call{value: amount}("");',
    '        require(success, "Fallo en la transferencia on-chain");',
    '        emit FundsReleased(beneficiario, amount);',
    '    }',
    '}',
  ];

  let codeY = y + 4.5;
  codeLines.forEach((line) => {
    if (line.startsWith('//')) {
      doc.setTextColor(160, 200, 180); // Grayish-green for comments
    } else if (line.includes('require(') || line.includes('function ') || line.includes('contract ')) {
      doc.setTextColor(255, 230, 150); // Gold for keywords
    } else {
      doc.setTextColor(240, 255, 245);
    }
    doc.text(line, margin + 3, codeY);
    codeY += 2.4;
  });

  // Sección 6: Las 3 Vulnerabilidades
  y += codeH + 6;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('6. Las 3 Vulnerabilidades Críticas que Debes Evitar Siempre', margin, y);

  y += 4.5;
  const vulns = [
    {
      name: '1. Ataque de Reentrancia (Reentrancy):',
      desc: 'Ocurre cuando transfieres fondos a un contrato externo ANTES de actualizar tu variable de saldo. El contrato atacante vuelve a llamar a la función en bucle hasta vaciar la bóveda. Solución: Patrón Checks-Effects-Interactions o ReentrancyGuard de OpenZeppelin.',
    },
    {
      name: '2. Uso Inseguro de tx.origin:',
      desc: 'tx.origin devuelve la billetera original de la cadena, no quien llama al contrato. Un atacante puede hacer phishing guiando al usuario a firmar en una web maliciosa. Solución: Verifica siempre msg.sender.',
    },
    {
      name: '3. Bucles Ilimitados de Gas (Gas Limit DoS):',
      desc: 'Iterar sobre arrays de tamaño ilimitado (ej: recorrer todos los inversores) superará el límite de gas del bloque y bloqueará el contrato para siempre. Solución: Usa mappings y lógica pull-over-push.',
    },
  ];

  vulns.forEach((v) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(186, 26, 26);
    doc.text(v.name, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const splitV = doc.splitTextToSize(v.desc, pageWidth - margin * 2 - 4);
    doc.text(splitV, margin + 4, y + 3.5);
    y += 4 + splitV.length * 3.2;
  });

  renderFooter(3);

  // =========================================================================
  // PÁGINA 4: ROADMAP PRÁCTICO & HERRAMIENTAS DE DESARROLLO
  // =========================================================================
  doc.addPage();
  renderHeader(
    'STACK TECNOLÓGICO Y ROADMAP DE APRENDIZAJE',
    'Módulo 4: De Principiante a Desarrollador Full-Stack Web3 Profesional',
    4,
    4
  );

  y = 29;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('7. Las Herramientas del Desarrollador Web3 Profesional', margin, y);

  y += 4.5;
  const tools = [
    { name: 'Remix IDE (remix.ethereum.org)', type: 'IDE Web', desc: 'Editor en el navegador sin instalación. Ideal para compilar y probar contratos en 30 segundos.' },
    { name: 'Foundry (forge / cast / anvil)', type: 'Framework Local', desc: 'El estándar de la industria. Tests unitarios en Solidity puro, fuzzing ultrarrápido y scripts en Rust.' },
    { name: 'OpenZeppelin Contracts', type: 'Librería Auditada', desc: 'Contratos estándar para tokens ERC-20, colecciones NFT ERC-721 y control de acceso Ownable/AccessControl.' },
    { name: 'Viem / Ethers.js / Wagmi', type: 'SDK Frontend', desc: 'Librerías TypeScript para conectar React a MetaMask, leer variables de contratos y enviar transacciones.' },
    { name: 'Base Sepolia Testnet', type: 'Red de Pruebas L2', desc: 'Capa 2 ultra económica y rápida. Monedas de prueba gratis vía grifos (Faucets) para validar apps reales.' },
  ];

  const tColW = [50, 32, 100];
  doc.setFillColor(1, 45, 29);
  doc.rect(margin, y, pageWidth - margin * 2, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Herramienta / Biblioteca', margin + 3, y + 3.8);
  doc.text('Categoría', margin + 3 + tColW[0], y + 3.8);
  doc.text('Propósito en Producción', margin + 3 + tColW[0] + tColW[1], y + 3.8);

  y += 5.5;
  tools.forEach((t, i) => {
    const bg = i % 2 === 0 ? 255 : 246;
    doc.setFillColor(bg, bg, bg);
    doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
    doc.setDrawColor(220, 225, 220);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 6, pageWidth - margin, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(0, 108, 72);
    doc.text(t.name, margin + 3, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 85, 80);
    doc.text(t.type, margin + 3 + tColW[0], y + 4);

    doc.setTextColor(40, 40, 40);
    doc.text(t.desc, margin + 3 + tColW[0] + tColW[1], y + 4);

    y += 6;
  });

  // DIAGRAMA 5: ROADMAP DE 4 SEMANAS (PASO A PASO)
  y += 7;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('8. Roadmap de Aprendizaje Paso a Paso (4 Semanas de Cero a Producción)', margin, y);

  y += 4.5;
  const roadmapSteps = [
    {
      phase: 'Semana 1: Fundamentos y Remix',
      color: [0, 108, 72],
      tasks: ['Criptografía y pares de claves en MetaMask', 'Sintaxis básica de Solidity (variables, mappings)', 'Despliegues en Remix VM virtual'],
    },
    {
      phase: 'Semana 2: Estándares de la Industria',
      color: [42, 157, 143],
      tasks: ['Implementación de ERC-20 (Tokens de pago)', 'Implementación de ERC-721 (Certificados NFT)', 'OpenZeppelin Ownable y AccessControl'],
    },
    {
      phase: 'Semana 3: Seguridad y Testing',
      color: [231, 111, 81],
      tasks: ['Escribir tests automatizados con Foundry/Hardhat', 'Auditoría de Reentrancy y desbordamientos', 'Manejo defensivo de gas y revert errors'],
    },
    {
      phase: 'Semana 4: Conexión Full-Stack',
      color: [38, 70, 83],
      tasks: ['Conectar billeteras con window.ethereum / Viem', 'Escuchar eventos en tiempo real con React hooks', 'Despliegue final verificado en Base Sepolia L2'],
    },
  ];

  const phaseW = (pageWidth - margin * 2 - 9) / 2;
  const phaseH = 34;

  roadmapSteps.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = margin + col * (phaseW + 9);
    const py = y + row * (phaseH + 5);

    doc.setFillColor(248, 250, 249);
    doc.roundedRect(px, py, phaseW, phaseH, 2, 2, 'F');
    doc.setDrawColor(st.color[0], st.color[1], st.color[2]);
    doc.setLineWidth(0.4);
    doc.roundedRect(px, py, phaseW, phaseH, 2, 2, 'D');

    doc.setFillColor(st.color[0], st.color[1], st.color[2]);
    doc.rect(px, py, phaseW, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.text(st.phase, px + phaseW / 2, py + 4.2, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(40, 45, 40);
    let taskY = py + 10;
    st.tasks.forEach((tsk) => {
      doc.setFillColor(st.color[0], st.color[1], st.color[2]);
      doc.circle(px + 4, taskY - 1, 0.8, 'F');
      doc.text(tsk, px + 7, taskY);
      taskY += 6;
    });
  });

  // Callout Box al final de la guía
  y += phaseH * 2 + 10;
  doc.setFillColor(242, 237, 232);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 2.5, 2.5, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 2.5, 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 108, 72);
  doc.text('¡Consejo Clave del Ingeniero Blockchain!', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(40, 45, 40);
  doc.text(
    'En desarrollo Web3 nunca programes desde cero lo que ya fue auditado por expertos: utiliza siempre OpenZeppelin para la base,',
    margin + 4,
    y + 11
  );
  doc.text(
    'escribe tests exhaustivos antes de enviar una sola transacción y prueba todo en testnets públicas como Base Sepolia antes de mainnet.',
    margin + 4,
    y + 15
  );

  renderFooter(4);

  return doc;
}
