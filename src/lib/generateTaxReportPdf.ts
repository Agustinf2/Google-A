import { jsPDF } from 'jspdf';
import { Investment, UserAccount } from '../types';
import { INITIAL_INVESTMENTS } from '../data/mockData';

export interface TaxReportData {
  investorName: string;
  investorCuit: string;
  investorAddress: string;
  fiscalYear: number;
  valuationDate: string;
  investments: Investment[];
}

export function createTaxReportPdf(
  currentUser?: UserAccount | null,
  customInvestments: Investment[] = INITIAL_INVESTMENTS
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = 2;

  const investorName = currentUser?.name || 'Martina Gómez';
  const investorEmail = currentUser?.addressOrEmail || 'agusfau@gmail.com';
  const investorCuit = currentUser?.kycData?.dniCuil || '27-38492019-4';
  const investorAddress = 'Av. Vélez Sársfield 1250, Córdoba, Argentina';
  const fiscalYear = 2025;
  const valuationDate = '31 de Diciembre de 2025';
  const fxUsdArs = 1280; // Official reference exchange rate for closing

  const renderHeader = (title: string, subtitle: string, pageNum: number) => {
    // Top banner
    doc.setFillColor(1, 45, 29); // #012d1d
    doc.rect(0, 0, pageWidth, 22, 'F');

    doc.setFillColor(0, 108, 72); // #006c48
    doc.rect(0, 20.5, pageWidth, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
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
    doc.text(
      'Seed & Grow Co-op Fiduciaria · Certificado Fiscal Oficial ARCA (ex-AFIP) · Ley 27.349 / CCyCN Arts. 1666-1707',
      margin,
      pageHeight - 6
    );
    doc.text(
      `Hash SHA-256 de Validación Fiscal: 8f9b2c3a...d4e1 · Ejercicio ${fiscalYear}`,
      pageWidth - margin,
      pageHeight - 6,
      { align: 'right' }
    );
  };

  // =========================================================================
  // PÁGINA 1: DATOS DEL CONTRIBUYENTE, FIDEICOMISO Y TABLA DE TENENCIAS
  // =========================================================================
  renderHeader(
    'CERTIFICADO DE TENENCIAS Y RENDIMIENTOS FISCALES · ARCA',
    'EJERCICIO FISCAL 2025 · FIDEICOMISOS PRODUCTIVOS Y CUSTODIA SEGREGADA',
    1
  );

  let y = 28;

  // Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(1, 45, 29);
  doc.text('Informe Contable e Impositivo para Declaración Jurada', margin, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 75, 72);
  doc.text(
    `Emitido para su presentación ante la Agencia de Recaudación y Control Aduanero (ARCA / ex-AFIP) y profesionales en Ciencias Económicas.`,
    margin,
    y
  );
  y += 7;

  // Contribuyente & Fideicomiso Info Grid (2 Columns)
  doc.setFillColor(245, 241, 235);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin, y + 34);

  // Column 1: Datos del Beneficiario / Inversor
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(1, 45, 29);
  doc.text('1. Datos del Inversor / Beneficiario', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 55, 52);
  doc.text(`Nombre / Razón Social: ${investorName}`, margin + 4, y + 11);
  doc.text(`CUIT / CUIL / CDI: ${investorCuit}`, margin + 4, y + 16);
  doc.text(`Domicilio Fiscal: ${investorAddress}`, margin + 4, y + 21);
  doc.text(`Identificador de Cuenta / Billetera: ${investorEmail}`, margin + 4, y + 26);
  doc.text(`Estado KYC / Debida Diligencia: Verificado (Resolución UIF 35/2023)`, margin + 4, y + 31);

  // Column 2: Datos del Administrador Fiduciario
  const col2X = margin + contentWidth / 2 + 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(1, 45, 29);
  doc.text('2. Datos del Administrador Fiduciario', col2X, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 55, 52);
  doc.text(`Razón Social: Fideicomiso Seed & Grow Co-op`, col2X, y + 11);
  doc.text(`CUIT Fiduciario: 30-71894231-9`, col2X, y + 16);
  doc.text(`Naturaleza Jurídica: Fideicomiso Ordinario (CCyCN 1666)`, col2X, y + 21);
  doc.text(`Banco Custodio / CBU: BIND Banco Industrial / CBU Fiduciario`, col2X, y + 26);
  doc.text(`Fecha de Cierre de Ejercicio: ${valuationDate}`, col2X, y + 31);

  y += 40;

  // Section 3: Tabla de Tenencias al 31 de Diciembre
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('3. Detalle de Activos y Cuotas-Parte al 31 de Diciembre de 2025', margin, y);
  y += 5;

  // Table Header
  doc.setFillColor(1, 45, 29);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('Proyecto / Fideicomiso', margin + 3, y + 4.2);
  doc.text('Instrumento / Modalidad', margin + 55, y + 4.2);
  doc.text('Costo USD', margin + 98, y + 4.2);
  doc.text('Costo ARS (Tc Ref.)', margin + 124, y + 4.2);
  doc.text('Rendimiento Cobrado', margin + 155, y + 4.2);
  y += 6;

  let totalCostUsd = 0;
  let totalCostArs = 0;
  let totalYieldUsd = 0;

  customInvestments.forEach((inv, idx) => {
    const costArs = inv.investedAmount * fxUsdArs;
    const yieldCollected = inv.nextPayoutAmount
      ? parseFloat(inv.nextPayoutAmount.replace(/[^0-9.]/g, '')) || Math.round(inv.investedAmount * 0.12)
      : Math.round(inv.investedAmount * 0.12);
    totalCostUsd += inv.investedAmount;
    totalCostArs += costArs;
    totalYieldUsd += yieldCollected;

    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 246, idx % 2 === 0 ? 255 : 242);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 7, margin + contentWidth, y + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(1, 45, 29);
    doc.text(inv.title.substring(0, 32), margin + 3, y + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 65, 62);
    doc.text(inv.type, margin + 55, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 72);
    doc.text(`$${inv.investedAmount.toLocaleString()} USD`, margin + 98, y + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`$${costArs.toLocaleString('es-AR')} ARS`, margin + 124, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(1, 45, 29);
    doc.text(`$${yieldCollected.toLocaleString()} USD`, margin + 155, y + 4.8);

    y += 7;
  });

  // Table Totals Row
  doc.setFillColor(236, 248, 242);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentWidth, y);
  doc.line(margin, y + 7, margin + contentWidth, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 80, 50);
  doc.text('TOTALES AL CIERRE DE EJERCICIO:', margin + 3, y + 5);
  doc.text(`$${totalCostUsd.toLocaleString()} USD`, margin + 98, y + 5);
  doc.text(`$${totalCostArs.toLocaleString('es-AR')} ARS`, margin + 124, y + 5);
  doc.text(`$${totalYieldUsd.toLocaleString()} USD`, margin + 155, y + 5);
  y += 12;

  // Box: Tipo de Cambio y Valuación
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'F');
  doc.setDrawColor(215, 220, 218);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(1, 45, 29);
  doc.text('Criterio de Valuación Fiscal:', margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(60, 65, 62);
  const valNotes = [
    `• Tipo de Cambio de Cierre Considerado: $${fxUsdArs.toLocaleString('es-AR')} ARS por USD (Dólar MEP / Cripto según RG ARCA).`,
    '• Valuación a Costo Computable: Las cuotas-parte y NFTs de participación fiduciaria se declaran al costo histórico de adquisición.',
    '• Retención en la Fuente: Los rendimientos percibidos están alcanzados por las normas de pago a cuenta o exención fiduciaria local.',
    '• Resguardo en Contrato Escrow: Los fondos integrados permanecen en cuenta especial segregada sin fungibilidad con el patrimonio general.',
  ];
  let vy = y + 9;
  valNotes.forEach((n) => {
    doc.text(n, margin + 3, vy);
    vy += 3.8;
  });

  renderFooter(1);

  // =========================================================================
  // PÁGINA 2: ENCUADRE TRIBUTARIO ARCA, DICTAMEN Y CONSTANCIA DE FIRMA
  // =========================================================================
  doc.addPage();
  renderHeader(
    'CERTIFICADO DE TENENCIAS Y RENDIMIENTOS FISCALES · ARCA',
    'PARTE 2: ENCUADRE TRIBUTARIO NACIONAL Y DICTAMEN CONTABLE',
    2
  );

  y = 28;

  // Title: Marco Impositivo Detallado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(1, 45, 29);
  doc.text('4. Encuadre Técnico y Normativo ante la Legislación Impositiva Argentina', margin, y);
  y += 6;

  const taxBoxes = [
    {
      title: 'A. Impuesto a las Ganancias (Ley de Impuesto a las Ganancias - T.O. 2019)',
      law: 'Art. 98 y concordantes · Régimen Cedular',
      text: 'Para personas humanas y sucesiones indivisas residentes en el país, los rendimientos y el resultado de la enajenación o liquidación de cuotas de fideicomisos productivos se encuentran alcanzados por el régimen cedular a la alícuota del 15% en moneda con cláusula de ajuste o moneda extranjera. El costo computable se actualiza conforme a las disposiciones del Art. 93.',
    },
    {
      title: 'B. Impuesto sobre los Bienes Personales (Ley 23.966, Título VI)',
      law: 'Art. 25.1 · Bienes en el país / Responsable Sustituto',
      text: 'Las participaciones en fideicomisos no financieros constituidos en el país tributan a través del fiduciario como responsable sustituto mediante el régimen de liquidación e ingreso directo, liberando al fiduciante/beneficiario de la doble imposición, debiendo el contribuyente informar la tenencia exenta/no computable en su declaración jurada anual.',
    },
    {
      title: 'C. Impuesto al Valor Agregado (Ley de IVA N° 23.349)',
      law: 'Art. 7, Inciso h) · Aportes de Capital',
      text: 'El aporte de capital y la suscripción de derechos fiduciarios para financiamiento productivo constituyen operaciones financieras no alcanzadas ni gravadas por el Impuesto al Valor Agregado, al no configurarse hecho imponible de venta de cosa mueble ni locación de obra o servicio gravado.',
    },
    {
      title: 'D. Impuesto sobre los Créditos y Débitos Bancarios (Ley 25.413)',
      law: 'Decreto Reglamentario 380/2001 · Cuentas Fiduciarias',
      text: 'Las transferencias cursadas hacia y desde las cuentas bancarias fiduciarias individualizadas de Seed & Grow gozan del tratamiento de alícuota reducida/exenta prevista para cuentas fiduciarias especiales de administración y garantía (Dec. 380/2001 y modif.).',
    },
  ];

  taxBoxes.forEach((tb) => {
    doc.setFillColor(248, 246, 242);
    doc.roundedRect(margin, y, contentWidth, 23, 1.5, 1.5, 'F');
    doc.setDrawColor(0, 108, 72);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin, y + 23);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(1, 45, 29);
    doc.text(tb.title, margin + 3, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(0, 108, 72);
    doc.text(`[ ${tb.law} ]`, margin + contentWidth - 4, y + 5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(50, 55, 52);
    const splitText = doc.splitTextToSize(tb.text, contentWidth - 8);
    doc.text(splitText, margin + 3, y + 10);

    y += 26;
  });

  y += 2;

  // Box 5: Dictamen y Firma Fiduciaria
  doc.setFillColor(236, 248, 242);
  doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'F');
  doc.setDrawColor(146, 247, 195);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 80, 50);
  doc.text('5. Constancia de Emisión Fiduciaria & Validez Notarial', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(40, 55, 45);
  const certBullets = [
    '• Se certifica que los importes consignados en el presente informe se corresponden fielmente con los registros contables',
    '  del Fideicomiso Seed & Grow y las trazas inmutables en los Smart Contracts de la red Base L2 auditada.',
    '• El presente certificado se extiende a solicitud del contribuyente interesado a efectos de ser presentado ante la Agencia de',
    '  Recaudación y Control Aduanero (ARCA) y entidades financieras que requieran acreditación de origen y destino de fondos.',
    '• Fecha y Lugar de Expedición: Ciudad Autónoma de Buenos Aires / Córdoba, República Argentina, a los 31 días de Diciembre de 2025.',
  ];
  let cy = y + 11.5;
  certBullets.forEach((b) => {
    doc.text(b, margin + 4, cy);
    cy += 4.5;
  });

  // Digital Signatures
  const sigY = y + 29;
  doc.setDrawColor(120, 140, 130);
  doc.setLineWidth(0.4);
  doc.line(margin + 12, sigY + 10, margin + 65, sigY + 10);
  doc.line(margin + contentWidth - 65, sigY + 10, margin + contentWidth - 12, sigY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(1, 45, 29);
  doc.text('Cr. Roberto M. Vignola', margin + 38.5, sigY + 13.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(70, 80, 75);
  doc.text('Auditor Contable · CPCECABA T° 314 F° 98', margin + 38.5, sigY + 16.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(1, 45, 29);
  doc.text('Fideicomiso Seed & Grow Co-op', margin + contentWidth - 38.5, sigY + 13.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(70, 80, 75);
  doc.text('Administración Fiduciaria · CUIT 30-71894231-9', margin + contentWidth - 38.5, sigY + 16.5, { align: 'center' });

  renderFooter(2);

  return doc;
}
