import { generateRoadmapIcs } from '../src/lib/generateCalendarIcs.ts';
import fs from 'fs';
import path from 'path';

const icsContent = generateRoadmapIcs();
const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'cronograma_6_semanas_facultad_a_produccion.ics');
fs.writeFileSync(outputPath, icsContent, 'utf-8');
console.log(`Cronograma 6 Semanas .ICS generado con exito en: ${outputPath} (${icsContent.length} bytes)`);
