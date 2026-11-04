import { jsPDF } from 'jspdf';

export function createAuditPdf(): jsPDF {
  // A4 format (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // --- HEADER BANNER ---
  doc.setFillColor(1, 45, 29); // Dark forest green #012d1d
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(0, 108, 72); // Accent green #006c48
  doc.rect(0, 26, pageWidth, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('SEED & GROW · PROTOCOLO DE CUSTODIA ESCROW', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 247, 195); // Light mint #92f7c3
  doc.text('Dictamen Técnico de Auditoría Agronómica & Certificación Notarial On-Chain', margin, 18);

  doc.setFontSize(7.5);
  doc.setTextColor(220, 240, 230);
  doc.text('Expediente: AUD-2025-089-BIO · Red: Base Sepolia L2 (84532) · Firestore DB: serene-rex-tvr20', margin, 23);

  // --- PROJECT & AUDITOR SUMMARY BOX ---
  let y = 35;
  doc.setFillColor(242, 237, 232); // #f2ede8
  doc.roundedRect(margin, y, pageWidth - margin * 2, 26, 3, 3, 'F');
  doc.setDrawColor(193, 200, 194);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 26, 3, 3, 'D');

  doc.setTextColor(29, 27, 25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PROYECTO: Biofábrica Serrana de Insumos Vivos (Hito 2)', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(65, 72, 68);
  doc.text('Auditor Colegiado: Ing. Agr. Valentín Morales (CIAPC Matrícula Nº 4819)', margin + 4, y + 11);
  doc.text('Ubicación Verificada: San Javier, Traslasierra, Córdoba (-31.9842, -65.0418)', margin + 4, y + 16);
  doc.text('Smart Contract Safe Escrow: 0x8f3c19a084bc67d2e8b01239845761c89012b49e', margin + 4, y + 21);

  // Score Badge inside summary box
  doc.setFillColor(0, 108, 72);
  doc.roundedRect(pageWidth - margin - 38, y + 4, 34, 18, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('98 / 100', pageWidth - margin - 21, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('CALIFICACIÓN', pageWidth - margin - 21, y + 16, { align: 'center' });
  doc.text('DESEMBOLSO APTO', pageWidth - margin - 21, y + 19, { align: 'center' });

  // --- SECCIÓN 1: GRÁFICO DE ASIGNACIÓN PRESUPUESTARIA ESCROW ---
  y = 66;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('1. Gráfico de Asignación Presupuestaria por Rubro (Total: $25,000 USDC)', margin, y);

  y += 3;
  const budgetData = [
    { label: 'Biorreactores termófilos 5.000L', amount: 10000, pct: 40, color: [0, 108, 72] },
    { label: 'Galpón bioclimático & piso sanitario', amount: 6250, pct: 25, color: [42, 157, 143] },
    { label: 'Inoculantes y cepas nativas', amount: 5000, pct: 20, color: [231, 111, 81] },
    { label: 'Auditoría en terreno y peritaje', amount: 2500, pct: 10, color: [244, 162, 97] },
    { label: 'Fondo de contingencia técnica', amount: 1250, pct: 5, color: [38, 70, 83] },
  ];

  const chartX = margin + 55;
  const maxBarWidth = pageWidth - margin - chartX - 35;
  let barY = y + 4;

  budgetData.forEach((item) => {
    // Label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);
    doc.text(item.label, margin, barY + 4);

    // Background track
    doc.setFillColor(235, 235, 235);
    doc.roundedRect(chartX, barY, maxBarWidth, 5, 1, 1, 'F');

    // Colored bar
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    const fillW = Math.max(3, (item.pct / 40) * maxBarWidth);
    doc.roundedRect(chartX, barY, fillW, 5, 1, 1, 'F');

    // Value text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(item.color[0], item.color[1], item.color[2]);
    doc.text(`$${item.amount.toLocaleString()} (${item.pct}%)`, chartX + maxBarWidth + 3, barY + 4);

    barY += 7.5;
  });

  // --- SECCIÓN 2: GRÁFICO DE LÍNEAS / TELEMETRÍA IOT (TEMPERATURA Y HUMEDAD) ---
  y = barY + 6;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('2. Gráfico de Telemetría IoT en Terreno · Monitoreo de 7 Días de Ensayo', margin, y);

  y += 4;
  const plotX = margin + 12;
  const plotY = y + 5;
  const plotW = pageWidth - margin * 2 - 20;
  const plotH = 34;

  // Background grid box
  doc.setFillColor(252, 252, 250);
  doc.setDrawColor(215, 220, 215);
  doc.setLineWidth(0.3);
  doc.rect(plotX, plotY, plotW, plotH, 'FD');

  // Horizontal Grid Lines & Y-axis labels
  const yLabels = ['80%', '60%', '40%', '20%', '0%'];
  for (let i = 0; i < 5; i++) {
    const gridY = plotY + (plotH / 4) * i;
    doc.setDrawColor(230, 235, 230);
    doc.setLineWidth(0.2);
    doc.line(plotX, gridY, plotX + plotW, gridY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(120, 125, 120);
    doc.text(yLabels[i], plotX - 2, gridY + 1.5, { align: 'right' });
  }

  // Days (X-Axis labels)
  const days = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'];
  const xStep = plotW / (days.length - 1);
  days.forEach((day, idx) => {
    const gx = plotX + idx * xStep;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 105, 100);
    doc.text(day, gx, plotY + plotH + 4, { align: 'center' });
  });

  // Series 1: Humedad del Suelo %
  const moistureValues = [70, 72, 69, 74, 73, 71, 72];
  doc.setDrawColor(0, 108, 72); // Green line
  doc.setLineWidth(0.8);
  for (let i = 0; i < moistureValues.length - 1; i++) {
    const x1 = plotX + i * xStep;
    const y1 = plotY + plotH - (moistureValues[i] / 80) * plotH;
    const x2 = plotX + (i + 1) * xStep;
    const y2 = plotY + plotH - (moistureValues[i + 1] / 80) * plotH;
    doc.line(x1, y1, x2, y2);
  }
  // Draw points
  moistureValues.forEach((val, i) => {
    const px = plotX + i * xStep;
    const py = plotY + plotH - (val / 80) * plotH;
    doc.setFillColor(0, 108, 72);
    doc.circle(px, py, 1.1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(0, 108, 72);
    doc.text(`${val}%`, px, py - 2, { align: 'center' });
  });

  // Series 2: Temperatura °C
  const tempValues = [21.0, 21.5, 21.0, 20.8, 21.2, 21.0, 21.4];
  doc.setDrawColor(231, 111, 81); // Coral line
  doc.setLineWidth(0.7);
  for (let i = 0; i < tempValues.length - 1; i++) {
    const x1 = plotX + i * xStep;
    const y1 = plotY + plotH - (tempValues[i] / 40) * plotH;
    const x2 = plotX + (i + 1) * xStep;
    const y2 = plotY + plotH - (tempValues[i + 1] / 40) * plotH;
    doc.line(x1, y1, x2, y2);
  }
  tempValues.forEach((val, i) => {
    const px = plotX + i * xStep;
    const py = plotY + plotH - (val / 40) * plotH;
    doc.setFillColor(231, 111, 81);
    doc.circle(px, py, 1, 'F');
  });

  // Chart Legend
  const legendY = plotY + plotH + 8;
  doc.setFillColor(0, 108, 72);
  doc.rect(margin + 20, legendY, 5, 2.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 108, 72);
  doc.text('Humedad de Sustrato (%) · Promedio 71.5% [Óptimo]', margin + 27, legendY + 2);

  doc.setFillColor(231, 111, 81);
  doc.rect(margin + 105, legendY, 5, 2.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(231, 111, 81);
  doc.text('Temperatura Estabilizada (°C) · 21.1°C [Estable]', margin + 112, legendY + 2);

  // --- SECCIÓN 3: TABLA DE VERIFICACIÓN NOTARIAL & DOCUMENTAL ---
  y = legendY + 9;
  doc.setTextColor(1, 45, 29);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('3. Cuadro de Inspección Técnica & Documentos Auditados en Terreno', margin, y);

  y += 3;
  const tableHeaders = ['Código Doc.', 'Documento / Ensayo Pericial', 'Emisor', 'Estado', 'Resultado'];
  const colWidths = [26, 68, 48, 20, 20];
  const tableData = [
    ['DOC-LAB-2025-01', 'Análisis Físico-Químico Suelo & Metales', 'Lab. BioSur Cuyo SENASA', 'CONFORME', 'Pb <0.005 ppm'],
    ['DOC-HYD-2025-02', 'Certificado No Inundabilidad Cuenca TR=100', 'Recursos Hídricos Córdoba', 'CONFORME', 'Aptitud 100%'],
    ['DOC-NOT-2025-03', 'Escritura Pública Dominio Libre Gravamen', 'Escribanía Reg. 248 V. Dolores', 'CONFORME', 'Folio 14-08-20419'],
    ['DOC-AFIP-2025-04', 'Facturación AFIP y Rendición Contable', 'Coop. Trabajo San Javier', 'CONFORME', '$5,120 USD valid.'],
    ['DOC-OBRA-2025-05', 'Manometría Cisterna 30.000L (72h sin pérdida)', 'Comisión Técnica CIAPC', 'CONFORME', 'Pérdida 0.00 bar'],
  ];

  // Table Header
  doc.setFillColor(1, 45, 29);
  doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);

  let curX = margin + 2;
  tableHeaders.forEach((th, idx) => {
    doc.text(th, curX, y + 4.2);
    curX += colWidths[idx];
  });

  // Table Rows
  y += 6;
  tableData.forEach((row, rowIdx) => {
    const rowBg = rowIdx % 2 === 0 ? 255 : 246;
    doc.setFillColor(rowBg, rowBg, rowBg);
    doc.rect(margin, y, pageWidth - margin * 2, 5.5, 'F');
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 5.5, pageWidth - margin, y + 5.5);

    curX = margin + 2;
    doc.setFontSize(6.5);

    // Code
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(row[0], curX, y + 3.8);
    curX += colWidths[0];

    // Title
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);
    doc.text(row[1], curX, y + 3.8);
    curX += colWidths[1];

    // Issuer
    doc.text(row[2], curX, y + 3.8);
    curX += colWidths[2];

    // Status
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(row[3], curX, y + 3.8);
    curX += colWidths[3];

    // Result
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(row[4], curX, y + 3.8);

    y += 5.5;
  });

  // --- SECCIÓN 4: SELLO CRIPTOGRÁFICO & FIRMA FIRESTORE ---
  y += 5;
  doc.setFillColor(245, 250, 248);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 33, 3, 3, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 33, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 108, 72);
  doc.text('CERTIFICADO CRIPTOGRÁFICO Y DICTAMEN FINAL DE LIBERACIÓN DE FONDOS', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(40, 40, 40);
  doc.text(
    'Se certifica la plena ejecución del Hito 2. Habiendo auditado facturas, estanqueidad de la cisterna de 30.000L y el galpón bioclimático,',
    margin + 4,
    y + 11
  );
  doc.text(
    'este auditor emite DICTAMEN FAVORABLE e instruye a la bóveda Multi-Sig Safe a desembolsar $5,000 USDC al beneficiario.',
    margin + 4,
    y + 15
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(1, 45, 29);
  doc.text('Firma Digital Hash (Keccak-256): 0x7e8b91c045bfa3224b17cf90234e891c89012cd4e0192a87b1c3e809f42a19d2', margin + 4, y + 21);
  doc.text('Clave Pública Notarial: 0x93FA804b7852c0211d044E2713f0c112Da014819 · IPFS CID: bafybeigdyrzt5sfp7udm7hu', margin + 4, y + 25);
  doc.text('Colección Firestore: /audit_validations · Base Sepolia Bloque: #19842103 · Sello Timestamp: Inmutable', margin + 4, y + 29);

  // Bottom Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'Generado automáticamente por Seed & Grow Protocol · Documento con validez legal verificable en BaseScan y Firestore DB',
    pageWidth / 2,
    pageHeight - 6,
    { align: 'center' }
  );

  return doc;
}
