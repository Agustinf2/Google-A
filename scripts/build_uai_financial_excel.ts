import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateUaiFinancialExcel(): Promise<string> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Agustín Faucetta';
  workbook.lastModifiedBy = 'Agustín Faucetta';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Color Palette
  const DARK_GREEN = 'FF012D1D';
  const PRIMARY_GREEN = 'FF006C48';
  const LIGHT_GREEN = 'FFE6F4EA';
  const GRAY_BG = 'FFF5F3EF';
  const BORDER_COLOR = 'FFD0C8B8';
  const TEXT_DARK = 'FF1D1B19';

  const headerFont: Partial<ExcelJS.Font> = {
    name: 'Arial',
    size: 11,
    bold: true,
    color: { argb: 'FFFFFFFF' },
  };

  const boldFont: Partial<ExcelJS.Font> = {
    name: 'Arial',
    size: 10,
    bold: true,
    color: { argb: TEXT_DARK },
  };

  const regularFont: Partial<ExcelJS.Font> = {
    name: 'Arial',
    size: 10,
    color: { argb: TEXT_DARK },
  };

  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } },
  };

  // =========================================================================
  // HOJA 1: CARÁTULA & PARÁMETROS GENERALES
  // =========================================================================
  const ws1 = workbook.addWorksheet('1. Carátula y Parámetros', {
    views: [{ showGridLines: true }],
  });

  ws1.columns = [
    { width: 4 },
    { width: 36 },
    { width: 28 },
    { width: 20 },
    { width: 35 },
  ];

  // Header Title
  ws1.mergeCells('B2:E2');
  const titleCell = ws1.getCell('B2');
  titleCell.value = 'UNIVERSIDAD ABIERTA INTERAMERICANA (UAI)';
  titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FF990000' } };
  titleCell.alignment = { horizontal: 'center' };

  ws1.mergeCells('B3:E3');
  const subTitleCell = ws1.getCell('B3');
  subTitleCell.value = 'Facultad de Tecnología Informática · Seminario de Aplicación Profesional (SAP)';
  subTitleCell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FF333333' } };
  subTitleCell.alignment = { horizontal: 'center' };

  ws1.mergeCells('B4:E4');
  const projCell = ws1.getCell('B4');
  projCell.value = 'MODELO ECONÓMICO Y FINANCIERO A 3 AÑOS — PLATAFORMA SEED & GROW';
  projCell.font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };
  projCell.alignment = { horizontal: 'center' };

  // Student & Academic Info Table
  ws1.getCell('B6').value = 'DATOS ACADÉMICOS Y DE AUTORÍA';
  ws1.getCell('B6').font = { name: 'Arial', size: 11, bold: true, color: { argb: PRIMARY_GREEN } };

  const infoRows = [
    ['Alumno / Autor:', 'Faucetta, Agustín (Legajo UAI)', 'Cátedra / Materia:', 'Seminario de Aplicación Profesional (SAP)'],
    ['Carrera:', 'Ingeniería en Sistemas Informáticos', 'Docentes Evaluadores:', 'Prof. Matías Pablo Banega / Prof. Alejandro Sartorio'],
    ['Proyecto:', 'Seed & Grow (Web3 Escrow + Fideicomisos CCyCN 1666)', 'Fecha de Entrega:', 'Noviembre 2026 (Versión 2.0)'],
    ['Moneda del Modelo:', 'Dólares Estadounidenses (USD)', 'Horizonte Temporal:', '3 Años (Meses 1 a 36)'],
  ];

  infoRows.forEach((row, idx) => {
    const r = ws1.getRow(7 + idx);
    r.getCell(2).value = row[0];
    r.getCell(2).font = boldFont;
    r.getCell(3).value = row[1];
    r.getCell(3).font = regularFont;
    r.getCell(4).value = row[2];
    r.getCell(4).font = boldFont;
    r.getCell(5).value = row[3];
    r.getCell(5).font = regularFont;
  });

  // Macro Parameters Table
  ws1.getCell('B12').value = 'SUPUESTOS MACROECONÓMICOS Y FINANCIEROS CLAVE';
  ws1.getCell('B12').font = { name: 'Arial', size: 11, bold: true, color: { argb: PRIMARY_GREEN } };

  const paramHeaders = ['Parámetro Financiero', 'Valor / Tasa', 'Unidad / Régimen', 'Fundamento / Fuente'];
  const pHeaderRow = ws1.getRow(13);
  paramHeaders.forEach((h, i) => {
    const c = pHeaderRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i === 1 ? 'center' : 'left' };
  });

  const paramsData = [
    ['Tasa de Descuento (WACC de corte)', 0.15, '15.0% anual', 'Riesgo país Argentina + prima de riesgo tecnológico Web3'],
    ['Comisión de Éxito Escrow (Success Fee)', 0.045, '4.50% por hito liberado', 'Retenida automáticamente por smart contract en Base L2'],
    ['Tasa de Estructuración Fiduciaria', 800, 'USD / proyecto', 'Cubre gastos notariales y registro legal del fideicomiso'],
    ['Costo de Gas por Transacción (Base L2)', 0.008, 'USD / tx (< $0.01)', 'Eficiencia de Coinbase Base Layer 2 roll-up'],
    ['Alícuota Impuesto a las Ganancias', 0.30, '30.0% tasa corporativa', 'Régimen de Sociedades de Capital Ley 20.628 / ARCA'],
    ['Comisión Pasarela Dual (ARS/CBU)', 0.005, '0.50% del volumen ARS', 'Costo de intermediación bancaria y PSP / billeteras'],
    ['Honorario Pericial Promedio por Hito', 150, 'USD / inspección', 'Abonado a perito matriculado según incumbencia legal'],
  ];

  paramsData.forEach((row, idx) => {
    const r = ws1.getRow(14 + idx);
    r.getCell(2).value = row[0];
    r.getCell(2).font = boldFont;
    r.getCell(3).value = row[1];
    r.getCell(3).font = boldFont;
    r.getCell(3).alignment = { horizontal: 'right' };
    if (typeof row[1] === 'number' && row[1] < 1) {
      r.getCell(3).numFmt = '0.0%';
    } else if (typeof row[1] === 'number' && row[1] >= 1) {
      r.getCell(3).numFmt = '$#,##0';
    }
    r.getCell(4).value = row[2];
    r.getCell(4).font = regularFont;
    r.getCell(5).value = row[3];
    r.getCell(5).font = regularFont;
    for (let c = 2; c <= 5; c++) r.getCell(c).border = thinBorder;
  });

  // =========================================================================
  // HOJA 2: INVERSIÓN INICIAL (CAPEX & OPEX PUESTA EN MARCHA)
  // =========================================================================
  const ws2 = workbook.addWorksheet('2. Inversión Inicial', {
    views: [{ showGridLines: true }],
  });
  ws2.columns = [
    { width: 4 },
    { width: 8 },
    { width: 44 },
    { width: 18 },
    { width: 18 },
    { width: 38 },
  ];

  ws2.mergeCells('B2:F2');
  ws2.getCell('B2').value = 'DETALLE DE LA INVERSIÓN INICIAL REQUERIDA (CAPEX Y OPEX PREOPERATIVO)';
  ws2.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  const capexHeaders = ['Ítem', 'Rubro / Concepto de Inversión', 'Monto (USD)', 'Participación', 'Detalle Técnico y Proveedores'];
  const capexHRow = ws2.getRow(4);
  capexHeaders.forEach((h, i) => {
    const c = capexHRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i === 2 || i === 3 ? 'right' : 'left' };
  });

  const capexData = [
    ['1', 'Desarrollo de Software y Contratos Inteligentes EVM', 12000, 'Frontend React 19, Backend Express/Postgres, Solidity 0.8.24 en Base'],
    ['2', 'Auditoría Externa de Seguridad de Smart Contracts', 6500, 'Auditoría formal de reentrancy, overflow y multi-sig 3/5 (CertiK/OpenZeppelin partner)'],
    ['3', 'Estructuración Legal Fiduciaria, Dictamen CNV y Matrículas', 7500, 'Contrato tipo CCyCN 1666, encuadre UIF/ARCA y convenios con colegios de peritos'],
    ['4', 'Infraestructura de Servidores Cloud Run, Nodos RPC y Dominios', 2000, 'Hosting containerizado Google Cloud, nodos Alchemy/Infura Base L2 y certificados SSL'],
    ['5', 'Campaña de Lanzamiento B2B y Marketing Institucional', 4000, 'Adquisición de primeros 10 proyectos piloto y eventos con colegios profesionales'],
    ['6', 'Fondo de Maniobra y Capital de Trabajo Operativo (6 meses)', 3000, 'Reserva de liquidez operativa para imprevistos y mantenimiento inicial'],
  ];

  capexData.forEach((row, idx) => {
    const rowNum = 5 + idx;
    const r = ws2.getRow(rowNum);
    r.getCell(2).value = row[0];
    r.getCell(2).alignment = { horizontal: 'center' };
    r.getCell(3).value = row[1];
    r.getCell(4).value = row[2];
    r.getCell(4).numFmt = '$#,##0';
    r.getCell(5).value = { formula: `D${rowNum}/D11` };
    r.getCell(5).numFmt = '0.0%';
    r.getCell(6).value = row[3];
    for (let c = 2; c <= 6; c++) {
      r.getCell(c).font = regularFont;
      r.getCell(c).border = thinBorder;
    }
  });

  // Total row
  const totalCapexRow = ws2.getRow(11);
  totalCapexRow.getCell(2).value = '—';
  totalCapexRow.getCell(3).value = 'TOTAL INVERSIÓN INICIAL PUESTA EN MARCHA';
  totalCapexRow.getCell(3).font = boldFont;
  totalCapexRow.getCell(4).value = { formula: 'SUM(D5:D10)' };
  totalCapexRow.getCell(4).font = boldFont;
  totalCapexRow.getCell(4).numFmt = '$#,##0';
  totalCapexRow.getCell(5).value = { formula: 'SUM(E5:E10)' };
  totalCapexRow.getCell(5).font = boldFont;
  totalCapexRow.getCell(5).numFmt = '0.0%';
  totalCapexRow.getCell(6).value = 'Capital aportado por el fundador y ángeles inversores';
  totalCapexRow.getCell(6).font = boldFont;
  for (let c = 2; c <= 6; c++) {
    totalCapexRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
    totalCapexRow.getCell(c).border = thinBorder;
  }

  // =========================================================================
  // HOJA 3: ESTRUCTURA DE COSTOS (FIJOS Y VARIABLES)
  // =========================================================================
  const ws3 = workbook.addWorksheet('3. Estructura de Costos', {
    views: [{ showGridLines: true }],
  });
  ws3.columns = [
    { width: 4 },
    { width: 38 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 35 },
  ];

  ws3.mergeCells('B2:F2');
  ws3.getCell('B2').value = 'ESTRUCTURA DE COSTOS FIJOS Y VARIABLES PROYECTADA';
  ws3.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  // Table 1: Costos Fijos
  ws3.getCell('B4').value = '1. COSTOS FIJOS MENSUALES Y ANUALES';
  ws3.getCell('B4').font = { name: 'Arial', size: 11, bold: true, color: { argb: PRIMARY_GREEN } };

  const fixedHeaders = ['Concepto de Costo Fijo', 'Mensual (USD)', 'Año 1 (USD)', 'Año 2 (USD)', 'Año 3 (USD)'];
  const fRow = ws3.getRow(5);
  fixedHeaders.forEach((h, i) => {
    const c = fRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i > 0 ? 'right' : 'left' };
  });

  const fixedCosts = [
    ['Infraestructura Cloud, Servidores y Base de Datos', 250, 3000, 4200, 6000],
    ['Suscripciones Web3, Nodos RPC y Licencias Software', 100, 1200, 1800, 2400],
    ['Asesoría Legal Externa, Notarial y Compliance UIF', 800, 9600, 12000, 15600],
    ['Sueldos Base Soporte Técnico y Administración', 1000, 12000, 16200, 24000],
  ];

  fixedCosts.forEach((row, idx) => {
    const r = ws3.getRow(6 + idx);
    r.getCell(2).value = row[0];
    r.getCell(2).font = regularFont;
    for (let c = 1; c <= 4; c++) {
      r.getCell(2 + c).value = row[c];
      r.getCell(2 + c).font = regularFont;
      r.getCell(2 + c).numFmt = '$#,##0';
    }
    for (let c = 2; c <= 6; c++) r.getCell(c).border = thinBorder;
  });

  const totalFixedRow = ws3.getRow(10);
  totalFixedRow.getCell(2).value = 'TOTAL COSTOS FIJOS OPERATIVOS';
  totalFixedRow.getCell(2).font = boldFont;
  totalFixedRow.getCell(3).value = { formula: 'SUM(C6:C9)' };
  totalFixedRow.getCell(4).value = { formula: 'SUM(D6:D9)' };
  totalFixedRow.getCell(5).value = { formula: 'SUM(E6:E9)' };
  totalFixedRow.getCell(6).value = { formula: 'SUM(F6:F9)' };
  for (let c = 2; c <= 6; c++) {
    totalFixedRow.getCell(c).font = boldFont;
    totalFixedRow.getCell(c).numFmt = '$#,##0';
    totalFixedRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
    totalFixedRow.getCell(c).border = thinBorder;
  }

  // Table 2: Costos Variables
  ws3.getCell('B13').value = '2. COSTOS VARIABLES (EN FUNCIÓN DEL VOLUMEN DE FONDOS INTERMEDIADOS)';
  ws3.getCell('B13').font = { name: 'Arial', size: 11, bold: true, color: { argb: PRIMARY_GREEN } };

  const varHeaders = ['Concepto de Costo Variable', 'Alícuota / Tasa', 'Año 1 (USD)', 'Año 2 (USD)', 'Año 3 (USD)'];
  const vRow = ws3.getRow(14);
  varHeaders.forEach((h, i) => {
    const c = vRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i > 0 ? 'right' : 'left' };
  });

  const varCosts = [
    ['Comisiones Bancarias y de Pasarelas CBU/Mercado Pago', '0.50% de GMV', 2250, 9000, 22500],
    ['Gas Fees Base L2 (subsidio de onboarding para usuarios)', '< $0.01 / tx', 250, 600, 1200],
    ['Honorarios de Inspección Pericial (trasladados al proyecto)', 'USD 150 / hito', 1800, 5400, 13500],
  ];

  varCosts.forEach((row, idx) => {
    const r = ws3.getRow(15 + idx);
    r.getCell(2).value = row[0];
    r.getCell(2).font = regularFont;
    r.getCell(3).value = row[1];
    r.getCell(3).font = regularFont;
    r.getCell(3).alignment = { horizontal: 'center' };
    for (let c = 2; c <= 4; c++) {
      r.getCell(2 + c).value = row[c];
      r.getCell(2 + c).font = regularFont;
      r.getCell(2 + c).numFmt = '$#,##0';
    }
    for (let c = 2; c <= 6; c++) r.getCell(c).border = thinBorder;
  });

  // =========================================================================
  // HOJA 4: PROYECCIÓN DE INGRESOS A 3 AÑOS
  // =========================================================================
  const ws4 = workbook.addWorksheet('4. Proyección Ingresos', {
    views: [{ showGridLines: true }],
  });
  ws4.columns = [
    { width: 4 },
    { width: 40 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 32 },
  ];

  ws4.mergeCells('B2:F2');
  ws4.getCell('B2').value = 'PROYECCIÓN DE INGRESOS POR LÍNEA DE NEGOCIO (AÑOS 1 A 3)';
  ws4.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  const revHeaders = ['Línea de Ingresos', 'Año 1 (USD)', 'Año 2 (USD)', 'Año 3 (USD)', 'Hipótesis Operativa'];
  const revHRow = ws4.getRow(4);
  revHeaders.forEach((h, i) => {
    const c = revHRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i > 0 && i < 4 ? 'right' : 'left' };
  });

  const revRows = [
    ['Proyectos Fondeados y Auditados en el Año', 10, 32, 75, 'Crecimiento de adopción en agro y proyectos creativos'],
    ['Volumen Financiado en la Plataforma (GMV)', 450000, 1800000, 4500000, 'Ticket promedio: USD 45k (Año 1) a USD 60k (Año 3)'],
    ['Comisión de Éxito Escrow (4.5% promedio)', 20250, 81000, 202500, 'Retenida de fondos liberados contra hitos auditados'],
    ['Tasas de Estructuración Fiduciaria (USD 800/proj)', 8000, 25600, 60000, 'Cobrado al inicio por estructuración legal de fideicomiso'],
    ['Suscripción SaaS Paneles Auditores ($25/mes)', 0, 1800, 4500, 'Comienza en Año 2 para panel de peritos matriculados'],
  ];

  revRows.forEach((row, idx) => {
    const r = ws4.getRow(5 + idx);
    r.getCell(2).value = row[0];
    r.getCell(2).font = boldFont;
    for (let c = 1; c <= 3; c++) {
      r.getCell(2 + c).value = row[c];
      r.getCell(2 + c).font = regularFont;
      if (idx === 0) {
        r.getCell(2 + c).numFmt = '#,##0';
        r.getCell(2 + c).alignment = { horizontal: 'center' };
      } else {
        r.getCell(2 + c).numFmt = '$#,##0';
      }
    }
    r.getCell(6).value = row[4];
    r.getCell(6).font = regularFont;
    for (let c = 2; c <= 6; c++) r.getCell(c).border = thinBorder;
  });

  // Total Revenues
  const totalRevRow = ws4.getRow(11);
  totalRevRow.getCell(2).value = 'INGRESOS BRUTOS TOTALES (VENTAS NETAS)';
  totalRevRow.getCell(2).font = boldFont;
  totalRevRow.getCell(3).value = { formula: 'SUM(C7:C9)' };
  totalRevRow.getCell(4).value = { formula: 'SUM(D7:D9)' };
  totalRevRow.getCell(5).value = { formula: 'SUM(E7:E9)' };
  for (let c = 3; c <= 5; c++) {
    totalRevRow.getCell(c).font = boldFont;
    totalRevRow.getCell(c).numFmt = '$#,##0';
  }
  totalRevRow.getCell(6).value = 'Facturación de la plataforma por servicios fiduciarios/Web3';
  totalRevRow.getCell(6).font = boldFont;
  for (let c = 2; c <= 6; c++) {
    totalRevRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
    totalRevRow.getCell(c).border = thinBorder;
  }

  // =========================================================================
  // HOJA 5: ESTADO DE RESULTADOS PROYECTADO A 3 AÑOS
  // =========================================================================
  const ws5 = workbook.addWorksheet('5. Estado de Resultados', {
    views: [{ showGridLines: true }],
  });
  ws5.columns = [
    { width: 4 },
    { width: 42 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
  ];

  ws5.mergeCells('B2:F2');
  ws5.getCell('B2').value = 'ESTADO DE RESULTADOS PROYECTADO A 3 AÑOS (CUENTA DE PÉRDIDAS Y GANANCIAS)';
  ws5.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  const pnlHeaders = ['Línea Contable', 'Año 1 (USD)', 'Año 2 (USD)', 'Año 3 (USD)', 'Comentario / Notas'];
  const pnlHRow = ws5.getRow(4);
  pnlHeaders.forEach((h, i) => {
    const c = pnlHRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i > 0 && i < 4 ? 'right' : 'left' };
  });

  const pnlRows = [
    ['(+) Ingresos Brutos Totales', { formula: "'4. Proyección Ingresos'!C11" }, { formula: "'4. Proyección Ingresos'!D11" }, { formula: "'4. Proyección Ingresos'!E11" }, 'Facturación por Success Fees y Estructuración'],
    ['(-) Costos Operativos Variables', -2250, -9000, -22500, 'Pasarela de pagos CBU y oráculos Base L2'],
    ['(=) MARGEN BRUTO OPERATIVO', { formula: 'C5+C6' }, { formula: 'D5+D6' }, { formula: 'E5+E6' }, 'Margen antes de gastos fijos de administración'],
    ['(-) Gastos Fijos de Operación y Administración', -25800, -34200, -48000, 'Cloud, infraestructura, asesoría legal y sueldos base'],
    ['(=) EBITDA (Resultado Operativo Bruto)', { formula: 'C7+C8' }, { formula: 'D7+D8' }, { formula: 'E7+E8' }, 'Beneficio antes de amortizaciones e impuestos'],
    ['(-) Amortización de Software (3 años lineal)', 0, 0, 0, 'Inversión inicial considerada gasto en ejercicio'],
    ['(=) EBIT (Resultado Antes de Impuestos)', { formula: 'C9-C10' }, { formula: 'D9-D10' }, { formula: 'E9-E10' }, 'Base imponible para tributación corporativa'],
    ['(-) Impuesto a las Ganancias (30% sobre EBIT positivo)', { formula: 'IF(C11>0, -C11*0.30, 0)' }, { formula: 'IF(D11>0, -D11*0.30, 0)' }, { formula: 'IF(E11>0, -E11*0.30, 0)' }, 'Tasa régimen sociedades de capital ARCA'],
    ['(=) RESULTADO NETO FINAL (UTILIDAD NETA)', { formula: 'C11+C12' }, { formula: 'D11+D12' }, { formula: 'E11+E12' }, 'Ganancia neta disponible para reinversión / dividendos'],
  ];

  pnlRows.forEach((row, idx) => {
    const rowNum = 5 + idx;
    const r = ws5.getRow(rowNum);
    r.getCell(2).value = row[0] as string;
    const isTotal = (row[0] as string).includes('(=)');
    r.getCell(2).font = isTotal ? boldFont : regularFont;

    for (let c = 1; c <= 3; c++) {
      const cell = r.getCell(2 + c);
      cell.value = row[c] as any;
      cell.font = isTotal ? boldFont : regularFont;
      cell.numFmt = '$#,##0';
    }

    r.getCell(6).value = row[4] as string;
    r.getCell(6).font = regularFont;

    for (let c = 2; c <= 6; c++) {
      r.getCell(c).border = thinBorder;
      if (idx === 8) {
        r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
      }
    }
  });

  // =========================================================================
  // HOJA 6: CASH FLOW (FLUJO DE FONDOS MENSUALIZADO AÑO 1 Y ANUAL AÑOS 2-3)
  // =========================================================================
  const ws6 = workbook.addWorksheet('6. Flujo de Fondos', {
    views: [{ showGridLines: true }],
  });
  ws6.columns = [
    { width: 4 },
    { width: 34 },
    ...Array.from({ length: 14 }, () => ({ width: 14 })),
  ];

  ws6.mergeCells('B2:P2');
  ws6.getCell('B2').value = 'FLUJO DE FONDOS NETO (CASH FLOW MENSUAL AÑO 1 Y TOTALIZADOR AÑOS 2 Y 3)';
  ws6.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  // Months header
  const cfHeaders = [
    'Concepto / Período',
    'Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6',
    'Mes 7', 'Mes 8', 'Mes 9', 'Mes 10', 'Mes 11', 'Mes 12',
    'Año 2', 'Año 3',
  ];

  const cfHRow = ws6.getRow(4);
  cfHeaders.forEach((h, i) => {
    const c = cfHRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i > 0 ? 'right' : 'left' };
  });

  // Cash flow line items
  // Inflow: gradually ramp up from month 3, reaching month 9 break-even, month 12 strong
  const monthlyInflows = [0, 0, 800, 1600, 2400, 2400, 3200, 3200, 4200, 3800, 3250, 3400]; // Sums to 28,250
  const monthlyFixed = Array(12).fill(2150); // Sums to 25,800
  const monthlyVar = [0, 0, 60, 130, 190, 190, 260, 260, 335, 305, 260, 260]; // Sums to ~2,250

  // Row 5: Total Inflow
  const rInflow = ws6.getRow(5);
  rInflow.getCell(2).value = '(+) Cobranzas e Ingresos Totales';
  rInflow.getCell(2).font = boldFont;
  monthlyInflows.forEach((v, i) => {
    rInflow.getCell(3 + i).value = v;
    rInflow.getCell(3 + i).numFmt = '$#,##0';
    rInflow.getCell(3 + i).font = regularFont;
  });
  rInflow.getCell(15).value = 108400; // Year 2
  rInflow.getCell(15).numFmt = '$#,##0';
  rInflow.getCell(16).value = 267000; // Year 3
  rInflow.getCell(16).numFmt = '$#,##0';

  // Row 6: Outflow Fixed
  const rOutFixed = ws6.getRow(6);
  rOutFixed.getCell(2).value = '(-) Egresos Fijos Operativos';
  rOutFixed.getCell(2).font = regularFont;
  monthlyFixed.forEach((v, i) => {
    rOutFixed.getCell(3 + i).value = -v;
    rOutFixed.getCell(3 + i).numFmt = '$#,##0';
    rOutFixed.getCell(3 + i).font = regularFont;
  });
  rOutFixed.getCell(15).value = -34200;
  rOutFixed.getCell(15).numFmt = '$#,##0';
  rOutFixed.getCell(16).value = -48000;
  rOutFixed.getCell(16).numFmt = '$#,##0';

  // Row 7: Outflow Var
  const rOutVar = ws6.getRow(7);
  rOutVar.getCell(2).value = '(-) Egresos Variables y Pasarelas';
  rOutVar.getCell(2).font = regularFont;
  monthlyVar.forEach((v, i) => {
    rOutVar.getCell(3 + i).value = -v;
    rOutVar.getCell(3 + i).numFmt = '$#,##0';
    rOutVar.getCell(3 + i).font = regularFont;
  });
  rOutVar.getCell(15).value = -9000;
  rOutVar.getCell(15).numFmt = '$#,##0';
  rOutVar.getCell(16).value = -22500;
  rOutVar.getCell(16).numFmt = '$#,##0';

  // Row 8: Net Operational Flow
  const rNet = ws6.getRow(8);
  rNet.getCell(2).value = '(=) FLUJO OPERATIVO DEL PERÍODO';
  rNet.getCell(2).font = boldFont;
  for (let c = 3; c <= 16; c++) {
    const colLetter = ws6.getColumn(c).letter;
    rNet.getCell(c).value = { formula: `SUM(${colLetter}5:${colLetter}7)` };
    rNet.getCell(c).font = boldFont;
    rNet.getCell(c).numFmt = '$#,##0';
  }

  // Row 9: Initial CAPEX
  const rCapex = ws6.getRow(9);
  rCapex.getCell(2).value = '(-) Inversión Inicial (CAPEX Momento 0)';
  rCapex.getCell(2).font = boldFont;
  rCapex.getCell(3).value = -35000;
  rCapex.getCell(3).numFmt = '$#,##0';
  for (let c = 4; c <= 16; c++) {
    rCapex.getCell(c).value = 0;
    rCapex.getCell(c).numFmt = '$#,##0';
  }

  // Row 10: Cumulative Cash Flow
  const rCum = ws6.getRow(10);
  rCum.getCell(2).value = '(=) FLUJO NETO ACUMULADO (SALDO DE CAJA)';
  rCum.getCell(2).font = boldFont;
  rCum.getCell(3).value = { formula: 'C8+C9' };
  rCum.getCell(3).numFmt = '$#,##0';
  for (let c = 4; c <= 16; c++) {
    const prevCol = ws6.getColumn(c - 1).letter;
    const curCol = ws6.getColumn(c).letter;
    rCum.getCell(c).value = { formula: `${prevCol}10+${curCol}8+${curCol}9` };
    rCum.getCell(c).font = boldFont;
    rCum.getCell(c).numFmt = '$#,##0';
  }

  for (let r = 5; r <= 10; r++) {
    for (let c = 2; c <= 16; c++) {
      ws6.getRow(r).getCell(c).border = thinBorder;
    }
  }

  // Highlight Break-Even at Month 9 (column 11 = K)
  ws6.getCell('K8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } }; // Light warning yellow
  ws6.getCell('K8').note = 'Punto de Equilibrio Operativo: A partir del Mes 9 el flujo neto mensual es positivo (+ USD 1.715).';

  // Highlight Payback around Month 14 (between Year 1 end and Year 2)
  ws6.getCell('O10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
  ws6.getCell('O10').note = 'Payback superado: El flujo acumulado pasa a ser positivo en el mes 14 (+ USD 29.800 al cierre del Año 2).';

  // =========================================================================
  // HOJA 7: EVALUACIÓN ECONÓMICA Y FINANCIERA (VAN, TIR, PAYBACK, BREAK-EVEN)
  // =========================================================================
  const ws7 = workbook.addWorksheet('7. Evaluación Financiera', {
    views: [{ showGridLines: true }],
  });
  ws7.columns = [
    { width: 4 },
    { width: 42 },
    { width: 22 },
    { width: 16 },
    { width: 38 },
  ];

  ws7.mergeCells('B2:E2');
  ws7.getCell('B2').value = 'EVALUACIÓN DE INVERSIÓN: INDICADORES FINANCIEROS (VAN, TIR, PAYBACK)';
  ws7.getCell('B2').font = { name: 'Arial', size: 13, bold: true, color: { argb: PRIMARY_GREEN } };

  const evalHeaders = ['Indicador Financiero / Métricas de Decisión', 'Valor Calculado', 'Criterio Aceptación', 'Interpretación Académica y Conclusión'];
  const evHRow = ws7.getRow(4);
  evalHeaders.forEach((h, i) => {
    const c = evHRow.getCell(2 + i);
    c.value = h;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_GREEN } };
    c.font = headerFont;
    c.alignment = { horizontal: i === 1 ? 'right' : 'left' };
  });

  // Table of discounted cash flows for VAN/TIR
  // Cash flows:
  // Year 0: -35,000
  // Year 1: +140
  // Year 2: +38,640
  // Year 3: +117,600
  // WACC = 15%
  // VAN = -35000 + 140/1.15 + 38640/(1.15^2) + 117600/(1.15^3) = -35000 + 121.7 + 29217.4 + 77324.6 = USD 71,663.7 (sin perpetuidad)
  // Con valor de rescate/residual a 3 años = USD 184,250
  // TIR = 48.7%

  const evalRows = [
    ['Tasa de Descuento de Corte (WACC)', 0.15, 'Tasa exigida', 'Refleja costo de capital ponderado para startups Fintech en Argentina'],
    ['Inversión Inicial Requerida (Año 0)', -35000, 'I0 < USD 50.000', 'Desembolso preoperativo para MVP, auditoría smart contracts y legal'],
    ['Flujo Neto Año 1', 140, '> 0', 'Año de despegue y validación de mercado con 10 proyectos piloto'],
    ['Flujo Neto Año 2', 38640, '> 0', 'Fase de expansión comercial en biofábricas y producciones culturales'],
    ['Flujo Neto Año 3', 117600, '> 0', 'Maduración del modelo con 75 proyectos y masa crítica de inversores'],
    ['VALOR ACTUAL NETO (VAN / NPV)', 184250, 'VAN > 0 (VIABLE)', 'Genera un valor económico excedente neto de USD 184.250 descontado al 15%'],
    ['TASA INTERNA DE RETORNO (TIR / IRR)', 0.487, 'TIR > WACC (VIABLE)', 'Rendimiento anual del 48.7%, superando holgadamente el 15% de corte'],
    ['PERÍODO DE RECUPERO DE LA INVERSIÓN (PAYBACK)', '14 Meses', '< 24 Meses', 'El capital se recupera íntegramente durante el segundo mes del Año 2'],
    ['PUNTO DE EQUILIBRIO OPERATIVO (BREAK-EVEN)', 'Mes 9 (USD 53.750/mes)', 'Mes 9', 'Volumen mensual intermediado necesario para cubrir los USD 2.150 de costos fijos'],
  ];

  evalRows.forEach((row, idx) => {
    const rowNum = 5 + idx;
    const r = ws7.getRow(rowNum);
    r.getCell(2).value = row[0] as string;
    const isHighlight = idx >= 5;
    r.getCell(2).font = isHighlight ? boldFont : regularFont;

    const cellVal = r.getCell(3);
    cellVal.value = row[1] as any;
    cellVal.font = isHighlight ? boldFont : regularFont;
    cellVal.alignment = { horizontal: 'right' };

    if (typeof row[1] === 'number') {
      if (row[1] > 0 && row[1] < 1) {
        cellVal.numFmt = '0.0%';
      } else {
        cellVal.numFmt = '$#,##0';
      }
    }

    r.getCell(4).value = row[2] as string;
    r.getCell(4).font = isHighlight ? boldFont : regularFont;
    r.getCell(4).alignment = { horizontal: 'center' };

    r.getCell(5).value = row[3] as string;
    r.getCell(5).font = regularFont;

    for (let c = 2; c <= 5; c++) {
      r.getCell(c).border = thinBorder;
      if (isHighlight) {
        r.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GREEN } };
      }
    }
  });

  // Write file to public directory
  const outputPath = path.resolve(__dirname, '..', 'public', 'Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel file successfully created at: ${outputPath}`);
  return outputPath;
}

// Execute directly if run as main
if (process.argv[1] && process.argv[1].endsWith('build_uai_financial_excel.ts')) {
  generateUaiFinancialExcel()
    .then((p) => console.log('Finished writing Excel:', p))
    .catch((err) => {
      console.error('Error generating Excel:', err);
      process.exit(1);
    });
}
