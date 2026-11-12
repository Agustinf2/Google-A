import { createTaxReportPdf } from '../src/lib/generateTaxReportPdf.ts';
import fs from 'fs';
import path from 'path';

const doc = createTaxReportPdf();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'certificado_fiscal_arca_fideicomiso_seedgrow.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log(`Certificado Fiscal ARCA PDF generado con exito en: ${outputPath} (${pdfBuffer.length} bytes, 2 paginas)`);
