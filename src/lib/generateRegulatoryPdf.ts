import { jsPDF } from 'jspdf';

export function createRegulatoryPdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = 4;

  const renderHeader = (title: string, subtitle: string, pageNum: number) => {
    doc.setFillColor(1, 45, 29); // #012d1d (Deep Forest Green)
    doc.rect(0, 0, pageWidth, 22, 'F');

    doc.setFillColor(0, 108, 72); // #006c48 (Emerald border)
    doc.rect(0, 20.5, pageWidth, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title, margin, 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 247, 195); // #92f7c3
    doc.text(subtitle, margin, 15);

    doc.setTextColor(220, 240, 230);
    doc.setFontSize(7.5);
    doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - margin, 15, { align: 'right' });
  };

  const renderFooter = (pageNum: number) => {
    doc.setDrawColor(210, 215, 210);
    doc.setLineWidth(0.4);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 110, 105);
    doc.text('Seed & Grow · Dictamen Jurídico y Regulatorio República Argentina · Base L2 & Smart Contracts Escrow', margin, pageHeight - 6);
    doc.text('Documento Confidencial · Marco Legal CNV, UIF, BCRA, ARCA y Ley 25.326', pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // =========================================================================
  // PÁGINA 1: MERCADO DE CAPITALES Y CROWDFUNDING (CNV)
  // =========================================================================
  renderHeader(
    'SEED & GROW · MARCO REGULATORIO Y LEGAL EN ARGENTINA',
    'PARTE 1: MERCADO DE CAPITALES (CNV) Y FINANCIAMIENTO COLECTIVO',
    1
  );

  let y = 28;

  // Title box
  doc.setFillColor(242, 248, 244);
  doc.setDrawColor(180, 220, 195);
  doc.roundedRect(margin, y, contentWidth, 20, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(1, 45, 29);
  doc.text('Hoja de Ruta de Cumplimiento Normativo en la República Argentina', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 70, 60);
  const introTxt = 'Análisis legal exhaustivo para operar conforme a derecho en Argentina una plataforma de financiamiento colaborativo, custodia de fondos escrow con stablecoins (USDC) en Base Sepolia, gobernanza descentralizada y auditoría agronómica colegiada.';
  doc.text(doc.splitTextToSize(introTxt, contentWidth - 8), margin + 4, y + 11);

  y += 24;

  // Section 1: CNV y Crowdfunding
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('1. Régimen de Financiamiento Colectivo (CNV - Ley 27.349)', margin + 6, y + 5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(40, 50, 45);
  const cnvDesc = 'En Argentina, la captación de fondos del público masivo está vedada salvo expresa autorización regulatoria (art. 310 del Código Penal). Para operar crowdfunding de inversión o préstamos, existen dos vías jurídicas:';
  doc.text(doc.splitTextToSize(cnvDesc, contentWidth), margin, y);
  y += 9;

  // Two columns for PFC vs Oferta Privada
  const colWidth = (contentWidth - 6) / 2;

  // Column A: PFC
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 225, 210);
  doc.roundedRect(margin, y, colWidth, 48, 2, 2, 'FD');

  doc.setFillColor(1, 45, 29);
  doc.roundedRect(margin, y, colWidth, 6, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('VÍA A: Plataforma de Financiamiento Colectivo (PFC)', margin + 3, y + 4.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(40, 50, 45);
  const pfcPoints = [
    '• Base Legal: Ley 27.349 (Título II) y Res. Gral. CNV N° 717/2017.',
    '• Estructura: Sociedad Anónima (S.A.) con objeto exclusivo.',
    '• Patrimonio Neto Mínimo exigido y auditado por la CNV.',
    '• Comité de Evaluación: Dictamen independiente de proyectos.',
    '• Límites Inversores: Máx. 20% de ingresos para no calificados.',
    '• Modalidades habilitadas: Acciones (Equity), Préstamos y Participaciones.',
    '• Publicidad: Permite difusión pública abierta y masiva en web.',
  ];
  let pfcY = y + 10;
  pfcPoints.forEach((pt) => {
    doc.text(pt, margin + 3, pfcY);
    pfcY += 5.2;
  });

  // Column B: Oferta Privada
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(230, 220, 200);
  doc.roundedRect(margin + colWidth + 6, y, colWidth, 48, 2, 2, 'FD');

  doc.setFillColor(180, 83, 9);
  doc.roundedRect(margin + colWidth + 6, y, colWidth, 6, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('VÍA B: Régimen de Oferta Privada / Club Inversor', margin + colWidth + 9, y + 4.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(40, 50, 45);
  const privPoints = [
    '• Base Legal: Ley 26.831 (art. 82) y Criterios Interpretativos CNV.',
    '• Destinatarios: Grupo predeterminado e individualizado.',
    '• Prohibición: Cero publicidad masiva o botones públicos de fondeo.',
    '• Inversores: Calificados o miembros de sindicatos de ángeles.',
    '• Agilidad: No requiere autorización previa de CNV para operar.',
    '• Fideicomiso Privado: Contrato cerrado entre fiduciante y fiduciario.',
    '• Ideal para fase MVP / Piloto de Seed & Grow antes de la licencia PFC.',
  ];
  let privY = y + 10;
  privPoints.forEach((pt) => {
    doc.text(pt, margin + colWidth + 9, privY);
    privY += 5.2;
  });

  y += 53;

  // Diagram: Flujo Legal de Fondos Escrow
  doc.setFillColor(248, 246, 242);
  doc.setDrawColor(215, 210, 200);
  doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(1, 45, 29);
  doc.text('DIAGRAMA DE CUSTODIA ESCROW: VINCULACIÓN SMART CONTRACT ↔ CONTRATO CIVIL', margin + 4, y + 5);

  // Boxes in flowchart
  const boxW = 34;
  const boxH = 18;
  const boxY = y + 9;

  // Step 1
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(0, 108, 72);
  doc.roundedRect(margin + 4, boxY, boxW, boxH, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(0, 108, 72);
  doc.text('1. Inversor Acredita', margin + 6, boxY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(50, 60, 55);
  doc.text('Firma Contrato Adhesión\nAporte en USDC o ARS\nFondos a Escrow Base L2', margin + 6, boxY + 9);

  // Arrow 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 108, 72);
  doc.text('->', margin + 40, boxY + 10);

  // Step 2
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(0, 108, 72);
  doc.roundedRect(margin + 46, boxY, boxW, boxH, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(0, 108, 72);
  doc.text('2. Smart Contract Escrow', margin + 48, boxY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(50, 60, 55);
  doc.text('Retiene fondos inmutables\nMulti-sig 3/5 programado\nEmite NFT Certificado', margin + 48, boxY + 9);

  // Arrow 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 108, 72);
  doc.text('->', margin + 82, boxY + 10);

  // Step 3
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(2, 132, 199);
  doc.roundedRect(margin + 88, boxY, boxW, boxH, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(2, 132, 199);
  doc.text('3. Auditor Agrónomo', margin + 90, boxY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(50, 60, 55);
  doc.text('Inspección presencial lote\nDictamen con Matrícula\nFirma Digital en Firestore', margin + 90, boxY + 9);

  // Arrow 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 108, 72);
  doc.text('->', margin + 124, boxY + 10);

  // Step 4
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(margin + 130, boxY, boxW + 14, boxH, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(217, 119, 6);
  doc.text('4. Desembolso por Hito', margin + 132, boxY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(50, 60, 55);
  doc.text('Quórum asamblea cumplido\nLiberación parcial a Creador\nFacturas auditadas en IPFS', margin + 132, boxY + 9);

  y += 42;

  // Key Warning Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(248, 113, 113);
  doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(153, 27, 27);
  doc.text('PRINCIPIO FUNDAMENTAL:', margin + 3, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(185, 28, 28);
  doc.text('En la publicidad y plataforma NUNCA debe prometerse una rentabilidad fija o garantizada ("retorno seguro"). Debe indicarse expresamente: "Inversión en proyectos productivos reales con riesgo de pérdida parcial o total de capital sujeto a variables climáticas y de mercado".', margin + 3, y + 9);

  renderFooter(1);

  // =========================================================================
  // PÁGINA 2: REGISTRO PSAV (CNV) Y PREVENCIÓN DE LAVADO (UIF)
  // =========================================================================
  doc.addPage();
  renderHeader(
    'SEED & GROW · MARCO REGULATORIO Y LEGAL EN ARGENTINA',
    'PARTE 2: REGISTRO PSAV (LEY 27.739) Y COMPLIANCE ANTILAVADO (UIF)',
    2
  );

  y = 28;

  // Section 2: PSAV
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('2. Proveedores de Servicios de Activos Virtuales (PSAV - Ley 27.739 y RG 994/2024)', margin + 6, y + 5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(40, 50, 45);
  const psavIntro = 'El 14 de marzo de 2024 se sancionó la Ley 27.739 de reforma integral antilavado conforme estándares del GAFI. La CNV dictó la RG 994/2024 creando el Registro Oficial de PSAV para personas humanas o jurídicas que operen con criptoactivos en Argentina.';
  doc.text(doc.splitTextToSize(psavIntro, contentWidth), margin, y);
  y += 10;

  // PSAV Activities table
  const tableData = [
    { act: 'Custodia o Administración', desc: 'Control de wallets, gestión de fondos en escrow o llaves privadas de clientes.', aplica: 'APLICA (si es custodial)' },
    { act: 'Intercambio Fiat ↔ Cripto', desc: 'Pasarela para convertir Pesos (ARS) a USDC/USDT para invertir en los lotes.', aplica: 'APLICA (con PSP/Exchange)' },
    { act: 'Transferencia de Activos', desc: 'Envío de stablecoins o tokens de gobernanza entre billeteras de inversores.', aplica: 'APLICA' },
    { act: 'Emisión de Instrumentos', desc: 'Creación y asignación de NFTs de participación o cupones de deuda de proyectos.', aplica: 'APLICA' },
  ];

  doc.setFillColor(235, 245, 240);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(1, 45, 29);
  doc.text('Actividad Comprendida por CNV', margin + 3, y + 4.2);
  doc.text('Alcance en el Modelo de Seed & Grow', margin + 60, y + 4.2);
  doc.text('Impacto Regulatorio', margin + 145, y + 4.2);
  y += 6;

  tableData.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, 250, 249);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(30, 40, 35);
    doc.text(row.act, margin + 3, y + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(row.desc, margin + 60, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(row.aplica, margin + 145, y + 4.5);
    y += 7;
  });

  y += 6;

  // Section 3: UIF y PLA/FT
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('3. Prevención de Lavado de Activos y Financiamiento del Terrorismo (UIF)', margin + 6, y + 5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(40, 50, 45);
  const uifIntro = 'Al calificar como PSAV o Plataforma de Financiamiento Colectivo, la entidad asume el rol de SUJETO OBLIGADO ante la Unidad de Información Financiera (UIF) según el art. 20 de la Ley 25.246:';
  doc.text(doc.splitTextToSize(uifIntro, contentWidth), margin, y);
  y += 8;

  // 4 Cards for UIF obligations
  const cardW = (contentWidth - 6) / 2;
  const cardH = 22;

  // Card 1: KYC
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin, y, cardW, cardH, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(1, 45, 29);
  doc.text('A. Conozca a su Cliente (KYC / CDD)', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  doc.text('Identificación fehaciente con DNI/Cédula, prueba de vida biométrica (Renaper o similar) y CUIT/CUIL antes de emitir aportes en el modal de inversión.', margin + 3, y + 9, { maxWidth: cardW - 6 });

  // Card 2: Origen de Fondos
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin + cardW + 6, y, cardW, cardH, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(1, 45, 29);
  doc.text('B. Declaración de Origen de Fondos', margin + cardW + 9, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  doc.text('Declaración jurada obligatoria de licitud. En montos que superen los umbrales de la UIF, requerir recibo de sueldo, factura de venta o balance contable certificado.', margin + cardW + 9, y + 9, { maxWidth: cardW - 6 });

  y += cardH + 4;

  // Card 3: Cotejo de Listas
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin, y, cardW, cardH, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(1, 45, 29);
  doc.text('C. Cotejo de Listas y Personas PEP', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  doc.text('Filtrado contra el Registro RePET (terrorismo), listas ONU/OFAC y declaración de Persona Expuesta Políticamente (Resolución UIF 35/2023).', margin + 3, y + 9, { maxWidth: cardW - 6 });

  // Card 4: Reportes y Compliance
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin + cardW + 6, y, cardW, cardH, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(1, 45, 29);
  doc.text('D. Oficial de Cumplimiento y Reportes', margin + cardW + 9, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  doc.text('Designación de Oficial de Cumplimiento inscripto ante la UIF. Emisión de Reportes Sistemáticos Mensuales (RSM) y Reportes de Operaciones Sospechosas (ROS).', margin + cardW + 9, y + 9, { maxWidth: cardW - 6 });

  y += cardH + 7;

  // Practical implementation note
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(3, 105, 161);
  doc.text('IMPLEMENTACIÓN TÉCNICA SUGERIDA PARA SEED & GROW:', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(12, 74, 110);
  const techImp = 'Integrar un proveedor de KYC automatizado tipo Didit, Jumio o Veritran que valide el DNI del usuario al pulsar "Invertir" o "Conectar Cuenta". El resultado se guarda como flag verificado en Firestore DB (ej. kycVerified: true, uifRiskLevel: "low"), habilitando la firma en Base Sepolia.';
  doc.text(doc.splitTextToSize(techImp, contentWidth - 6), margin + 3, y + 9);

  renderFooter(2);

  // =========================================================================
  // PÁGINA 3: VEHÍCULO JURÍDICO (FIDEICOMISO), FIRMA DIGITAL Y FISCALIDAD
  // =========================================================================
  doc.addPage();
  renderHeader(
    'SEED & GROW · MARCO REGULATORIO Y LEGAL EN ARGENTINA',
    'PARTE 3: ESTRUCTURA JURÍDICA SUBYACENTE Y RÉGIMEN FISCAL (ARCA)',
    3
  );

  y = 28;

  // Section 4: Fideicomiso & Smart Contracts
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('4. Estructuración Jurídica del Vínculo "Mundo Real ↔ Smart Contract"', margin + 6, y + 5);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(40, 50, 45);
  const fidTxt = 'Un smart contract en Solidity es un código determinista en la red Base, pero para tener plena oponibilidad ante tribunales argentinos debe sustentarse en un contrato legal nominado del Código Civil y Comercial de la Nación (CCyCN):';
  doc.text(doc.splitTextToSize(fidTxt, contentWidth), margin, y);
  y += 8;

  // 3 Structure pillars
  const col3W = (contentWidth - 6) / 3;
  const col3H = 34;

  // Structure 1
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin, y, col3W, col3H, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(1, 45, 29);
  doc.text('Fideicomiso Escrow', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(50, 60, 55);
  const f1 = '• Arts. 1666 a 1707 CCyCN.\n• Crea un patrimonio separado e inembargable.\n• Protege a los inversores si el creador quiebra.\n• Los fondos están afectados exclusivamente a los hitos del lote.';
  doc.text(f1, margin + 3, y + 9);

  // Structure 2
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin + col3W + 3, y, col3W, col3H, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(1, 45, 29);
  doc.text('SPV / Sociedad Vehículo', margin + col3W + 6, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(50, 60, 55);
  const f2 = '• Constitución de una S.A.S. (Ley 27.349) o S.A. para cada proyecto.\n• Titular de las hectáreas, maquinarias y registros SENASA.\n• Emite las participaciones o cupones de deuda representados en NFTs.';
  doc.text(f2, margin + col3W + 6, y + 9);

  // Structure 3
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin + (col3W * 2) + 6, y, col3W, col3H, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(1, 45, 29);
  doc.text('Firma Digital (Ley 25.506)', margin + (col3W * 2) + 9, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(50, 60, 55);
  const f3 = '• Firma Electrónica: Válida pero con carga probatoria invertida.\n• Firma Digital Licenciada: Pleno valor probatorio equiparado a escribano.\n• El dictamen del auditor debe ligarse al peritaje agronómico oficial.';
  doc.text(f3, margin + (col3W * 2) + 9, y + 9);

  y += col3H + 8;

  // Section 5: ARCA / ex-AFIP Tax treatment
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('5. Régimen Impositivo y Tributario (ARCA - ex AFIP)', margin + 6, y + 5);
  y += 9;

  const taxRows = [
    {
      impuesto: 'Ganancias (Ley 20.628)',
      alicuota: '15% (Régimen Cedular)',
      detalle: 'Grava la renta obtenida por enajenación de monedas digitales / tokens (Art. 98 inc. b) o distribución de dividendos del fideicomiso.',
    },
    {
      impuesto: 'Bienes Personales (Ley 23.966)',
      alicuota: '0.50% a 1.25%',
      detalle: 'Las tenencias de tokens, criptoactivos y participaciones al 31 de diciembre deben valuarse e incluirse en la declaración jurada patrimonial.',
    },
    {
      impuesto: 'IVA (Impuesto al Valor Agregado)',
      alicuota: '21% (Servicios)',
      detalle: 'La compraventa o custodia de tokens no devenga IVA; pero la COMISIÓN o FEE que Seed & Grow cobre por intermediación sí está alcanzada por el 21%.',
    },
    {
      impuesto: 'Régimen Informativo RG 4614',
      alicuota: 'Informativo Mensual',
      detalle: 'Obligación para plataformas y billeteras virtuales de informar mensualmente nómina de clientes, saldos al cierre y volumen transaccionado.',
    },
  ];

  doc.setFillColor(235, 245, 240);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(1, 45, 29);
  doc.text('Tributo / Obligación', margin + 3, y + 4.2);
  doc.text('Alícuota / Frecuencia', margin + 55, y + 4.2);
  doc.text('Tratamiento Legal Aplicable en Seed & Grow', margin + 95, y + 4.2);
  y += 6;

  taxRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, 250, 249);
    doc.rect(margin, y, contentWidth, 9.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.3);
    doc.setTextColor(30, 40, 35);
    doc.text(row.impuesto, margin + 3, y + 5.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(row.alicuota, margin + 55, y + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 70, 65);
    doc.text(doc.splitTextToSize(row.detalle, contentWidth - 98), margin + 95, y + 3.8);
    y += 9.5;
  });

  renderFooter(3);

  // =========================================================================
  // PÁGINA 4: PROTECCIÓN DE DATOS (AAIP), SECTORIAL AGRO Y MATRIZ DE ACCIÓN
  // =========================================================================
  doc.addPage();
  renderHeader(
    'SEED & GROW · MARCO REGULATORIO Y LEGAL EN ARGENTINA',
    'PARTE 4: PRIVACIDAD (AAIP), AGRO/SENASA Y MATRIZ DE IMPLEMENTACIÓN',
    4
  );

  y = 28;

  // Section 6: Datos Personales
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('6. Protección de Datos Personales (Ley 25.326 y Regla de Oro Blockchain)', margin + 6, y + 5);
  y += 9;

  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(254, 240, 138);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(133, 77, 14);
  doc.text('CONFLICTO NORMATIVO: DERECHO AL OLVIDO VS. INMUTABILIDAD DE LA BLOCKCHAIN', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(113, 63, 18);
  const dpText = 'La Ley 25.326 exige el derecho de supresión de datos a pedido del titular. La blockchain es inmutable por naturaleza y no permite borrado. Por ende, está TERMINANTEMENTE PROHIBIDO almacenar PII (nombres, DNI, emails, CUIT o datos bancarios) on-chain en Base L2.\nSolución arquitectónica: En la blockchain solo existen hashes criptográficos SHA-256 anónimos y CIDs de IPFS cifrados. La base de datos centralizada (Firestore/Postgres) almacena los datos personales identificables y debe registrarse ante la AAIP.';
  doc.text(doc.splitTextToSize(dpText, contentWidth - 6), margin + 3, y + 9);

  y += 26;

  // Section 7: Sectorial Agro y SENASA
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('7. Regulaciones Sectoriales: SENASA, Bosques Nativos y Colegios Profesionales', margin + 6, y + 5);
  y += 9;

  const agroColW = (contentWidth - 4) / 2;

  // SENASA
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(210, 225, 215);
  doc.roundedRect(margin, y, agroColW, 25, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 108, 72);
  doc.text('SENASA (Bioinsumos y Fertilizantes)', margin + 3, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  const senTxt = '• Habilitación de planta de biopreparados y biofertilizantes (Res. SENASA 263/2018).\n• Registro Nacional de Productos Biológicos.\n• Constatación de inocuidad microbiológica para poder comercializar la producción.';
  doc.text(senTxt, margin + 3, y + 8.5);

  // Bosques y Colegios
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(210, 225, 215);
  doc.roundedRect(margin + agroColW + 4, y, agroColW, 25, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(2, 132, 199);
  doc.text('Ley de Bosques y Colegios (CIAPC)', margin + agroColW + 7, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(50, 60, 55);
  const bosTxt = '• Ley 26.331 de Bosques Nativos: Planes de manejo silvopastoril aprobados por provincia.\n• Matrícula obligatoria habilitada del auditor (CIAPC/CPIA) para validez pericial civil.\n• Certificados satelitales (NDVI) como evidencia documental.';
  doc.text(bosTxt, margin + agroColW + 7, y + 8.5);

  y += 29;

  // Section 8: Matriz de Acción Inmediata
  doc.setFillColor(0, 108, 72);
  doc.rect(margin, y, 3, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('8. Matriz de Cumplimiento: Próximos Pasos Priorizados', margin + 6, y + 5);
  y += 9;

  const checklist = [
    { fase: 'Fase 1 (Inmediata)', accion: 'Redacción de Términos y Condiciones, Política de Privacidad y Modelo de Adhesión a Fideicomiso Privado.', status: 'Crítico' },
    { fase: 'Fase 2 (Técnica)', accion: 'Integración del modal de validación KYC/CDD y declaración de origen de fondos antes del fondeo USDC.', status: 'Crítico' },
    { fase: 'Fase 3 (Corporativa)', accion: 'Constitución de la S.A. operadora en Argentina e inscripción preventiva en el Registro de PSAV de la CNV.', status: 'Regulatorio' },
    { fase: 'Fase 4 (Fiscal)', accion: 'Habilitación de facturación electrónica de comisiones con IVA (21%) e inscripción como Sujeto Obligado UIF.', status: 'Operativo' },
  ];

  doc.setFillColor(235, 245, 240);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(1, 45, 29);
  doc.text('Fase de Implementación', margin + 3, y + 3.8);
  doc.text('Acción Concreta Requerida', margin + 45, y + 3.8);
  doc.text('Prioridad Legal', margin + 145, y + 3.8);
  y += 5.5;

  checklist.forEach((item, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, 250, 249);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(30, 40, 35);
    doc.text(item.fase, margin + 3, y + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(item.accion, margin + 45, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(item.status === 'Crítico' ? 185 : 0, item.status === 'Crítico' ? 28 : 108, item.status === 'Crítico' ? 28 : 72);
    doc.text(item.status, margin + 145, y + 4.5);
    y += 7;
  });

  renderFooter(4);

  return doc;
}
