import { createRoadmapPdf } from '../src/lib/generateRoadmapPdf.ts';
import fs from 'fs';
import path from 'path';

const doc = createRoadmapPdf();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'cronograma_6_semanas_de_la_facultad_a_la_produccion.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log(`Cronograma 6 Semanas PDF generado con exito en: ${outputPath} (${pdfBuffer.length} bytes, 4 paginas)`);
