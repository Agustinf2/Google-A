import { createRegulatoryPdf } from '../src/lib/generateRegulatoryPdf.ts';
import fs from 'fs';
import path from 'path';

const doc = createRegulatoryPdf();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'manual_cumplimiento_regulatorio_argentina_seedgrow.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log(`Manual Regulatorio PDF generado con exito en: ${outputPath} (${pdfBuffer.length} bytes, 4 paginas)`);
