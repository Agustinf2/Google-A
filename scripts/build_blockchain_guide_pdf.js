import { createBlockchainGuidePdf } from '../src/lib/generateBlockchainGuidePdf.js';
import fs from 'fs';
import path from 'path';

const doc = createBlockchainGuidePdf();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'manual_blockchain_desde_cero_con_graficos.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log(`Manual PDF generado con exito en: ${outputPath} (${pdfBuffer.length} bytes, 4 paginas)`);
