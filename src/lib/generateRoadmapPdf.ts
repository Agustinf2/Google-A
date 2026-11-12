import { jsPDF } from 'jspdf';
import { ROADMAP_WEEKS } from '../data/roadmapData';

export function createRoadmapPdf(): jsPDF {
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
    // Top banner
    doc.setFillColor(1, 45, 29); // #012d1d
    doc.rect(0, 0, pageWidth, 22, 'F');

    // Accent line
    doc.setFillColor(0, 108, 72); // #006c48
    doc.rect(0, 20.5, pageWidth, 1.5, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(title, margin, 9);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 247, 195); // #92f7c3
    doc.text(subtitle, margin, 15);

    // Page indicator
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
    doc.text('Plan de Aceleración Dev · De la Facultad de Ingeniería en Sistemas a la Producción', margin, pageHeight - 6);
    doc.text('Seed & Grow Academy · Roadmap de 6 Semanas · Base L2, Cloud & Full-Stack', pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // =========================================================================
  // PÁGINA 1: INTRODUCCIÓN, EL DILEMA Y EL PUENTE METODOLÓGICO
  // =========================================================================
  renderHeader(
    'PLAN DE ACELERACIÓN DEV · INGENIERÍA EN SISTEMAS',
    'PARTE 1: EL PUENTE ENTRE LA TEORÍA UNIVERSITARIA Y EL SOFTWARE EN PRODUCCIÓN',
    1
  );

  let y = 28;

  // Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(1, 45, 29);
  doc.text('Cronograma de 6 Semanas: De la Facultad a Producción', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 70, 65);
  doc.text(
    'Cómo capitalizar tu formación en Ingeniería en Sistemas para construir, auditar y desplegar aplicaciones completas de alto impacto.',
    margin,
    y
  );
  y += 8;

  // Section: El Dilema del Estudiante
  doc.setFillColor(245, 241, 235);
  doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin, y + 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(1, 45, 29);
  doc.text('1. El Diagnóstico: ¿Por qué la facultad no te enseña a programar así?', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 55, 52);
  const diagText = [
    'En carreras como Ingeniería en Sistemas o Ciencias de la Computación, el plan de estudios está diseñado para enseñarte',
    'conceptos fundamentales perdurables: Álgebra, Algoritmos, Estructuras de Datos, Paradigmas de Programación, Redes y',
    'Sistemas Operativos. Estos cimientos son invaluables, pero la universidad rara vez enseña el flujo de trabajo moderno:',
    'cómo conectar un frontend tipado con React y Tailwind, cómo modelar bases NoSQL atómicas en la nube, cómo escribir un',
    'Smart Contract con custodia escrow y cómo desplegar un contenedor Docker en Google Cloud con CI/CD.',
    'La buena noticia: no empiezas de cero. Con tus bases analíticas, avanzarás diez veces más rápido que un autodidacta.',
  ];
  let dy = y + 11;
  diagText.forEach((l) => {
    doc.text(l, margin + 4, dy);
    dy += 4;
  });
  y += 42;

  // Section: El Puente Conceptual
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(1, 45, 29);
  doc.text('2. El Puente Conceptual: Tu Matriz de Equivalencias', margin, y);
  y += 5;

  const bridgeRows = [
    { subject: 'POO & Tipado (Java / C++)', modern: 'TypeScript Estricto', benefit: 'Interfaces, genéricos y contratos tipados que evitan errores en runtime.' },
    { subject: 'Estructuras de Datos & Lógica', modern: 'React Funcional & Hooks', benefit: 'Inmutabilidad, componentes desacoplados y estados reactivos puros.' },
    { subject: 'Bases de Datos & ACID', modern: 'Firestore NoSQL & Drizzle', benefit: 'Modelado ágil, operaciones atómicas en lotes y reglas RBAC declarativas.' },
    { subject: 'Redes & Criptografía Asimétrica', modern: 'Web3 & Base Sepolia L2', benefit: 'Firmas digitales, consenso determinista y custodia inteligente mediante Escrow.' },
    { subject: 'Sistemas Operativos & Redes', modern: 'Docker & Google Cloud Run', benefit: 'Contenedores livianos, aislamiento, escalabilidad automática y serverless.' },
  ];

  doc.setFillColor(1, 45, 29);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Materia de la Facultad', margin + 3, y + 4.2);
  doc.text('Equivalente Tecnológico Moderno', margin + 55, y + 4.2);
  doc.text('Aplicación en la Práctica Real', margin + 115, y + 4.2);
  y += 6;

  bridgeRows.forEach((r, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 246, idx % 2 === 0 ? 255 : 242);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 7, margin + contentWidth, y + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(1, 45, 29);
    doc.text(r.subject, margin + 3, y + 4.8);

    doc.setTextColor(0, 108, 72);
    doc.text(r.modern, margin + 55, y + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 65, 62);
    doc.text(r.benefit, margin + 115, y + 4.8);
    y += 7;
  });
  y += 5;

  // Section: La Rutina Diaria del Estudiante
  doc.setFillColor(236, 248, 242);
  doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'F');
  doc.setDrawColor(146, 247, 195);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(0, 80, 50);
  doc.text('3. Rutina Diaria Sugerida: El Método de los 150 Minutos (Deep Work)', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 55, 45);
  const routineBullets = [
    '• 20 Minutos - Comprensión Teórica: Leer la documentación oficial o concepto arquitectónico del día.',
    '• 80 Minutos - Código Práctico (Manos en el Teclado): Construir el componente, endpoint o función específica.',
    '• 30 Minutos - Depuración, Refactor & Tipado: Correr linter, resolver advertencias de TypeScript y eliminar "any".',
    '• 20 Minutos - Git Commit & Documentación: Escribir un commit descriptivo y anotar dudas en tu bitácora personal.',
    '• Regla de Oro: Si estás cursando materias de la facultad, mantén un bloque fijo diario de 18:00 a 20:30 hs.',
    '  La constancia de 2.5 hs diarias vence por goleada a maratones de 12 horas el fin de semana.',
  ];
  let ry = y + 11;
  routineBullets.forEach((b) => {
    doc.text(b, margin + 4, ry);
    ry += 4.5;
  });

  renderFooter(1);

  // =========================================================================
  // PÁGINA 2: SEMANA 1 Y SEMANA 2 EN DETALLE
  // =========================================================================
  doc.addPage();
  renderHeader(
    'PLAN DE ACELERACIÓN DEV · SEMANAS 1 Y 2',
    'FRONTEND MODERNO, REACT TIPADO, ARQUITECTURA DE ESTADO Y VISUALIZACIÓN',
    2
  );

  y = 28;

  const renderWeekBox = (week: typeof ROADMAP_WEEKS[0], startY: number): number => {
    let curY = startY;

    // Header badge & title
    doc.setFillColor(1, 45, 29);
    doc.roundedRect(margin, curY, contentWidth, 8, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(146, 247, 195);
    doc.text(week.badge.toUpperCase(), margin + 3, curY + 5.5);

    doc.setTextColor(255, 255, 255);
    doc.text(`· ${week.title}`, margin + 50, curY + 5.5);
    curY += 10;

    // Tagline & Faculty Bridge
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(60, 70, 65);
    doc.text(`"${week.tagline}"`, margin, curY);
    curY += 4.5;

    doc.setFillColor(245, 245, 242);
    doc.roundedRect(margin, curY, contentWidth, 8, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(0, 108, 72);
    doc.text('Conexión con la Facultad: ', margin + 2, curY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const splitBridge = doc.splitTextToSize(week.facultyBridge, contentWidth - 36);
    doc.text(splitBridge, margin + 35, curY + 5);
    curY += 10;

    // Daily plan table
    doc.setFillColor(235, 240, 238);
    doc.rect(margin, curY, contentWidth, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(1, 45, 29);
    doc.text('Día', margin + 3, curY + 3.5);
    doc.text('Concepto & Tecnología', margin + 38, curY + 3.5);
    doc.text('Práctica & Entregable Diario', margin + 98, curY + 3.5);
    curY += 5;

    week.dailySchedule.forEach((d, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 247);
      doc.rect(margin, curY, contentWidth, 8, 'F');
      doc.setDrawColor(225, 225, 225);
      doc.setLineWidth(0.2);
      doc.line(margin, curY + 8, margin + contentWidth, curY + 8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(1, 45, 29);
      doc.text(d.day, margin + 3, curY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 45, 42);
      const splitTopic = doc.splitTextToSize(d.topic, 58);
      doc.text(splitTopic, margin + 38, curY + 4);

      doc.setTextColor(0, 90, 60);
      const splitPractice = doc.splitTextToSize(d.practice, contentWidth - 102);
      doc.text(splitPractice, margin + 98, curY + 4);

      curY += 8;
    });

    curY += 2;

    // Milestone & tools footer
    doc.setFillColor(236, 248, 242);
    doc.roundedRect(margin, curY, contentWidth, 12, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 80, 50);
    doc.text('🎯 ' + week.milestoneProject, margin + 3, curY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(70, 85, 75);
    doc.text(`Herramientas clave: ${week.keyTools.join(' · ')} | Dedicación: ~${week.recommendedHoursPerDay} hs/día`, margin + 3, curY + 9.5);

    curY += 16;
    return curY;
  };

  y = renderWeekBox(ROADMAP_WEEKS[0], y);
  y = renderWeekBox(ROADMAP_WEEKS[1], y);

  renderFooter(2);

  // =========================================================================
  // PÁGINA 3: SEMANA 3 Y SEMANA 4 EN DETALLE
  // =========================================================================
  doc.addPage();
  renderHeader(
    'PLAN DE ACELERACIÓN DEV · SEMANAS 3 Y 4',
    'BACKEND PERSISTENTE, FIRESTORE NOSQL, WEB3 Y CUSTODIA ESCROW EN BASE L2',
    3
  );

  y = 28;
  y = renderWeekBox(ROADMAP_WEEKS[2], y);
  y = renderWeekBox(ROADMAP_WEEKS[3], y);

  renderFooter(3);

  // =========================================================================
  // PÁGINA 4: SEMANAS 5 Y 6, INTEGRACIÓN CON CALENDAR Y LANZAMIENTO
  // =========================================================================
  doc.addPage();
  renderHeader(
    'PLAN DE ACELERACIÓN DEV · SEMANAS 5 Y 6',
    'COMPLIANCE, REPORTES PDF, PRODUCCIÓN CLOUD RUN Y PORTFOLIO PROFESIONAL',
    4
  );

  y = 28;
  y = renderWeekBox(ROADMAP_WEEKS[4], y);
  y = renderWeekBox(ROADMAP_WEEKS[5], y);

  // Bottom Box: Sincronización con Google Calendar
  doc.setFillColor(245, 241, 235);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(0, 108, 72);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(1, 45, 29);
  doc.text('📅 Cómo Sincronizar este Cronograma con tu Google Calendar', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(50, 55, 52);
  const calSteps = [
    '1. Descarga del archivo estándar .ICS: Desde el botón en la plataforma web, haz clic en "Descargar Calendario (.ics)".',
    '2. Importación a Google Calendar: Ve a calendar.google.com -> Configuración -> "Importar y exportar" -> Selecciona el archivo.',
    '3. Creación de Eventos Directos: Cada una de las 6 semanas tiene un enlace directo de 1 clic para agregar los recordatorios.',
    '4. Recordatorios automáticos: Los bloques vienen prefijados a las 18:00 hs con alertas de 30 minutos previas para no perder el hábito.',
    '5. Tu Primer Proyecto en GitHub: Publica cada hito semanal con commits claros. Es lo que miran los líderes técnicos al contratar.',
    '6. ¡Éxitos, futuro colega Ingeniero! La distancia entre la facultad y la producción es solo un commit de distancia.',
  ];
  let cy = y + 11;
  calSteps.forEach((s) => {
    doc.text(s, margin + 4, cy);
    cy += 4.2;
  });

  renderFooter(4);

  return doc;
}
