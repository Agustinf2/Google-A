import { createAuditPdf } from '../src/lib/generateAuditPdf.js';
import fs from 'fs';
import path from 'path';

const doc = createAuditPdf();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'informe_auditoria_biofabrica_con_graficos.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log(`PDF generado con exito en: ${outputPath} (${pdfBuffer.length} bytes)`);
