import fs from 'fs';
import path from 'path';
import { getBloque2Elements } from './thesis_bloque2.js';
import { getBloque3Elements } from './thesis_bloque3.js';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  PageBreak,
  UnderlineType,
} from 'docx';

function createPageBreak(): Paragraph {
  return new Paragraph({
    children: [new PageBreak()],
  });
}

function createCell(
  text: string,
  widthPct: number,
  isHeader = false,
  bold = false,
  align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { fill: isHeader ? '012D1D' : 'FFFFFF' },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text,
            bold: isHeader || bold,
            color: isHeader ? 'FFFFFF' : '1D1B19',
            font: 'Arial',
            size: isHeader ? 19 : 18, // 9.5pt or 9pt
          }),
        ],
      }),
    ],
  });
}

function createParagraph(
  text: string,
  options: {
    bold?: boolean;
    italic?: boolean;
    color?: string;
    size?: number;
    spaceAfter?: number;
    spaceBefore?: number;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  } = {}
): Paragraph {
  const {
    bold = false,
    italic = false,
    color = '1D1B19',
    size = 22, // 11pt default
    spaceAfter = 140,
    spaceBefore = 0,
    align = AlignmentType.JUSTIFIED,
  } = options;

  return new Paragraph({
    alignment: align,
    spacing: { after: spaceAfter, before: spaceBefore, line: 276 }, // 1.15 line spacing
    children: [
      new TextRun({
        text,
        bold,
        italics: italic,
        color,
        font: 'Arial',
        size,
      }),
    ],
  });
}

function createHeading1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 28, // 14pt
        color: '012D1D',
      }),
    ],
  });
}

function createHeading2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 26, // 13pt
        color: '006C48',
      }),
    ],
  });
}

function createHeading3(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 22, // 11pt
        color: '012D1D',
      }),
    ],
  });
}

function createBullet(title: string, text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 100 },
    bullet: { level: 0 },
    children: [
      new TextRun({ text: `${title}: `, bold: true, font: 'Arial', size: 21, color: '012D1D' }),
      new TextRun({ text, font: 'Arial', size: 21, color: '333333' }),
    ],
  });
}

export async function generateUaiThesisDocx(): Promise<Buffer> {
  const doc = new Document({
    creator: 'Faucetta, Agustín',
    title: 'Seed & Grow - Plan de Negocios y Solución Tecnológica (SAP UAI)',
    description: 'Trabajo Final de Grado - Seminario de Aplicación Profesional - Ingeniería en Sistemas Informáticos',
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch margins (25.4mm)
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'UAI · Seminario de Aplicación Profesional | Seed & Grow · Agustín Faucetta',
                    font: 'Arial',
                    size: 16,
                    color: '777777',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Página ', font: 'Arial', size: 16, color: '777777' }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: '777777' }),
                  new TextRun({ text: ' de ', font: 'Arial', size: 16, color: '777777' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 16, color: '777777' }),
                ],
              }),
            ],
          }),
        },
        children: [
          // =========================================================================
          // CARÁTULA FORMAL UAI
          // =========================================================================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: 'UNIVERSIDAD ABIERTA INTERAMERICANA',
                bold: true,
                font: 'Arial',
                size: 28,
                color: '990000', // UAI Red/Burgundy
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'FACULTAD DE TECNOLOGÍA INFORMÁTICA',
                bold: true,
                font: 'Arial',
                size: 24,
                color: '333333',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'INGENIERÍA EN SISTEMAS INFORMÁTICOS',
                font: 'Arial',
                size: 22,
                color: '555555',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'SAP – SEMINARIO DE APLICACIÓN PROFESIONAL',
                bold: true,
                font: 'Arial',
                size: 24,
                color: '012D1D',
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 150 },
            children: [
              new TextRun({
                text: 'PROYECTO: SEED & GROW',
                bold: true,
                font: 'Arial',
                size: 32, // 16pt
                color: '006C48',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: 'Plataforma Descentralizada de Financiamiento Colectivo y Custodia Escrow Inteligente en Base L2 para Proyectos Productivos, Industriales y Tecnológicos con Fideicomisos Inembargables (CCyCN 1666) y Panel Pericial Colegiado Multidisciplinario',
                font: 'Arial',
                size: 22,
                italics: true,
                color: '444444',
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 400, after: 60 },
            children: [
              new TextRun({ text: 'Profesores de Cátedra:', bold: true, font: 'Arial', size: 22, color: '012D1D' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 40 },
            children: [
              new TextRun({ text: '• Banega, Matías Pablo', font: 'Arial', size: 21, color: '333333' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '• Sartorio, Alejandro Roberto', font: 'Arial', size: 21, color: '333333' }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Alumno:', bold: true, font: 'Arial', size: 22, color: '012D1D' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: '• Faucetta, Agustín', font: 'Arial', size: 21, color: '333333' }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 300 },
            children: [
              new TextRun({ text: 'República Argentina — 2025 / 2026', font: 'Arial', size: 20, color: '777777' }),
            ],
          }),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // FICHA DE SEGUIMIENTO Y REVISIÓN (SEGÚN PLANTILLA UAI)
          // =========================================================================
          createHeading1('Ficha de Seguimiento y Revisión del Proyecto'),
          createParagraph(
            'Para documentar el control de los avances y las entregas, la carpeta técnica incorpora la presente ficha formal de seguimiento y revisión conforme a los estándares de la Facultad de Tecnología Informática.',
            { italic: true, size: 20 }
          ),

          createHeading2('Control de Cambios del Autor'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Fecha', 18, true, true, AlignmentType.CENTER),
                  createCell('Autor', 22, true, true),
                  createCell('Versión', 15, true, true, AlignmentType.CENTER),
                  createCell('Referencia de los Cambios Realizados', 45, true, true),
                ],
              }),
              new TableRow({
                children: [
                  createCell('04/2024', 18, false, false, AlignmentType.CENTER),
                  createCell('Faucetta, Agustín', 22),
                  createCell('v1.0 (E3)', 15, false, false, AlignmentType.CENTER),
                  createCell('Primera entrega conceptual de plataforma de donaciones y financiamiento en blockchain Ethereum.', 45),
                ],
              }),
              new TableRow({
                children: [
                  createCell('11/2026', 18, false, false, AlignmentType.CENTER),
                  createCell('Faucetta, Agustín', 22),
                  createCell('v2.0 (SAP)', 15, false, false, AlignmentType.CENTER),
                  createCell('Reestructuración integral a Seed & Grow: Enfoque productivo multidisciplinario (biotecnología, plantas industriales, infraestructura civil, energías renovables y software), adopción de Base L2, custodia escrow multi-sig 3/5, panel pericial colegiado según incumbencia legal, rampa CBU y compliance UIF/ARCA.', 45),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 180 }, children: [] }),
          createHeading2('Revisiones de Cátedra'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Auditor / Docente', 32, true, true),
                  createCell('Versión Aprobada', 18, true, true, AlignmentType.CENTER),
                  createCell('Responsabilidad / Rol', 32, true, true),
                  createCell('Fecha', 18, true, true, AlignmentType.CENTER),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Banega, Matías Pablo', 32),
                  createCell('Pendiente', 18, false, false, AlignmentType.CENTER),
                  createCell('Titular de Cátedra / Evaluación Metodológica', 32),
                  createCell('Noviembre 2026', 18, false, false, AlignmentType.CENTER),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Sartorio, Alejandro Roberto', 32),
                  createCell('Pendiente', 18, false, false, AlignmentType.CENTER),
                  createCell('Profesor Adjunto / Evaluación de Arquitectura', 32),
                  createCell('Noviembre 2026', 18, false, false, AlignmentType.CENTER),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 180 }, children: [] }),
          createHeading2('Descripción del Documento'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [createCell('Ítem', 30, true, true), createCell('Detalle', 70, true, true)],
              }),
              new TableRow({
                children: [
                  createCell('Título del Documento', 30, false, true),
                  createCell('Plan de Negocios y Solución Tecnológica: Plataforma Seed & Grow', 70),
                ],
              }),
              new TableRow({
                children: [createCell('Autor Principal', 30, false, true), createCell('Faucetta, Agustín (Ingeniería en Sistemas Informáticos)', 70)],
              }),
              new TableRow({
                children: [createCell('Fecha de Creación', 30, false, true), createCell('Noviembre de 2026', 70)],
              }),
              new TableRow({
                children: [createCell('Última Actualización', 30, false, true), createCell('Noviembre de 2026 (Versión 2.0)', 70)],
              }),
            ],
          }),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // SECCIÓN A: RESUMEN EJECUTIVO (MÁXIMO 3 PÁGINAS)
          // =========================================================================
          createHeading1('A. Resumen Ejecutivo'),
          createParagraph(
            'Seed & Grow es una plataforma digital de financiamiento colectivo (crowdfunding) y gestión fiduciaria basada en tecnología de registros distribuidos (blockchain), diseñada para conectar a emprendedores productivos, biofábricas, proyectos industriales, empresas de software e iniciativas de infraestructura sustentable de la República Argentina con inversores minoristas e institucionales. La plataforma resuelve la principal falla estructural del financiamiento tradicional y del crowdfunding convencional: la asimetría de información, la falta de auditoría externa y el riesgo moral en el uso de los fondos captados.'
          ),
          createParagraph(
            'A diferencia de los modelos tradicionales de financiamiento donde el capital se entrega íntegramente al promotor por adelantado, Seed & Grow implementa un protocolo determinista de Custodia Escrow Inteligente en la red Base (Layer 2 de Ethereum). El capital aportado por los inversores queda jurídicamente aislado en un Fideicomiso Ordinario de Administración y Garantía (Arts. 1666 a 1707 del Código Civil y Comercial de la Nación) y técnicamente custodiado en contratos inteligentes inmutables.'
          ),
          createParagraph(
            'Los desembolsos se realizan exclusivamente por tramos sucesivos condicionados a una doble validación vinculante (mecanismo Multi-sig 3/5):'
          ),
          createBullet(
            '1. Panel Pericial Colegiado Multidisciplinario',
            'Inspección y peritaje técnico específico según la naturaleza del proyecto, realizado por un perito matriculado habilitado con responsabilidad profesional (Ingenieros Agrónomos CIAPC/CPIA para bioproductos y agro; Ingenieros Industriales o Químicos para plantas fabriles; Ingenieros Civiles para infraestructura; Contadores Públicos para balances; e Ingenieros en Sistemas para hitos de software), quien emite un dictamen digital pericial firmado criptográficamente en la plataforma.'
          ),
          createBullet(
            '2. Gobernanza Descentralizada por Quórum',
            'Aprobación por mayoría calificada (más del 60% de los votos ponderados por capital aportado) en la asamblea virtual de inversores poseedores de las cuotas-parte (representadas mediante tokens y NFTs de participación).'
          ),
          createParagraph(
            'El proyecto se implanta en el contexto socioeconómico argentino, caracterizado por una alta adopción de criptoactivos como refugio de valor (más de 5 millones de cuentas activas), una tasa de inflación estructural y una tasa de interés bancaria prohibitiva para los sectores productivos y emprendedores. Para salvar la brecha tecnológica y regulatoria, Seed & Grow incorpora una Rampa de Pagos Híbrida: los inversores pueden suscribir proyectos en stablecoin USDC (on-chain) o en Pesos Argentinos (ARS) mediante transferencia bancaria tradicional (CBU) o billeteras virtuales (CVU / Mercado Pago), con conciliación fiduciaria instantánea.'
          ),
          createParagraph(
            'Asimismo, la plataforma está diseñada en estricto cumplimiento con el marco regulatorio argentino: la Ley 27.349 de Financiamiento Colectivo regulada por la Comisión Nacional de Valores (CNV), el régimen de Prevención de Lavado de Activos de la Unidad de Información Financiera (UIF, Leyes 25.246 y 27.739 para Proveedores de Servicios de Activos Virtuales - PSAV, Res. 35/2023) con validación biométrica/DNI vía RENAPER, y el régimen impositivo de la Agencia de Recaudación y Control Aduanero (ARCA, ex-AFIP) con emisión automatizada del Certificado Fiscal bajo el Art. 98 de la Ley de Impuesto a las Ganancias.'
          ),
          createParagraph(
            'El modelo de monetización se basa en una comisión por éxito (Success Fee) del 3% al 5% deducida únicamente de los fondos efectivamente liberados al productor contra hitos verificados, garantizando la alineación total de incentivos entre la plataforma, el inversor y el promotor del proyecto. Con una inversión inicial requerida de USD 120.000 destinada a desarrollo tecnológico, auditoría de seguridad de contratos inteligentes y encuadre legal, las proyecciones financieras a 3 años estiman alcanzar el punto de equilibrio en el mes 14, con un Valor Actual Neto (VAN) de USD 314.500 y una Tasa Interna de Retorno (TIR) del 48,6%, demostrando una alta viabilidad económica, técnica y social.'
          ),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // SECCIÓN B: PLAN DE NEGOCIOS
          // CAPÍTULO 1: DESCRIPCIÓN GENERAL
          // =========================================================================
          createHeading1('1. Descripción General'),
          createHeading2('1.1 Descripción básica del negocio'),
          createParagraph(
            'Seed & Grow es un ecosistema digital B2B y B2C que opera bajo el paradigma de E-Business de Servicios Financieros y Tecnologías Distribuidas (Fintech / AgTech / Web3). En cuanto a su modalidad de E-Commerce, se encuadra como un E-Commerce Transaccional y Fiduciario, donde los usuarios interactúan a través de interfaces web reactivas seguras para comprometer capital, emitir votos de gobernanza y verificar evidencia técnica de proyectos reales.'
          ),
          createParagraph(
            'La justificación del negocio radica en la existencia de un mercado desatendido: en Argentina, los emprendimientos productivos, biofábricas, proyectos industriales, de software y de infraestructura sustentable demandan capital intensivo a mediano plazo (12 a 36 meses). Los bancos tradicionales rechazan a estos proyectos por carecer de garantías hipotecarias tradicionales o por no encuadrar en esquemas corporativos estándar. Por otro lado, los inversores con excedentes de liquidez en dólares o pesos buscan rendimientos reales en la economía productiva pero desconfían de esquemas informales o personalistas carentes de auditoría externa. Seed & Grow actúa como el puente de confianza computable.'
          ),

          createHeading2('1.2 Situación actual del negocio'),
          createParagraph(
            'El proyecto se encuentra en estado de Prototipo Funcional de Alta Fidelidad (MVP Operativo):'
          ),
          createBullet('Contratos Inteligentes Escrow', 'Desarrollados en Solidity y testeados en la red Base Sepolia (Layer 2 de Ethereum).'),
          createBullet('Frontend Reactivo SPA', 'Desarrollado en React 19, TypeScript y Tailwind CSS con arquitectura de componentes desacoplada.'),
          createBullet('Backend & Persistencia Híbrida', 'Node.js / Express con PostgreSQL (Drizzle ORM) y Firestore DB para firmas digitales de peritaje.'),
          createBullet('Compliance Operativo', 'Módulo de validación KYC/UIF y generador de documentos contables oficiales en PDF funcionales.'),

          createHeading2('1.3 ¿Qué hace único al negocio?'),
          createBullet('Custodia Escrow Inmutable', 'El dinero no va a la cuenta bancaria personal del promotor. Queda bloqueado en el contrato inteligente y solo se libera por tramos contra metas técnicas verificadas.'),
          createBullet('Panel Pericial Colegiado Vinculante', 'La liberación no depende de promesas de marketing, sino del dictamen vinculante de un perito matriculado según la disciplina técnica del proyecto (ingeniería industrial, civil, en sistemas, ambiental/agronómica o contable) que sube pruebas geolocalizadas, remitos y dictámenes con hash SHA-256 a la plataforma.'),
          createBullet('Multi-firma y Gobernanza Democrática', 'Los inversores votan en asambleas virtuales donde 1 token = 1 voto. Se requiere quórum del 60% para desbloquear cada hito.'),
          createBullet('Tokenización de Activos del Mundo Real (RWA)', 'Cada aporte otorga un NFT/token representativo de la cuota-parte fiduciaria, otorgando trazabilidad total y posibilitando futura liquidez en mercados secundarios.'),
          createBullet('Rampa Dual Fiat-Crypto', 'Resuelve la barrera de entrada al permitir transferencias en pesos argentinos (CBU/CVU) con liquidación fiduciaria regulada.'),

          createHeading2('1.4 Factores principales que harán exitoso el proyecto'),
          createBullet('Originalidad Tecnológica y Legal', 'Integración pionera en Argentina entre el Fideicomiso Civil (CCyCN 1666) y el Smart Contract EVM como ejecutor técnico.'),
          createBullet('Costos de Transacción Mínimos', 'Al operar en Base (L2 de Ethereum), el costo de gas por transacción es menor a USD 0,01, haciendo viables microinversiones desde USD 50 o su equivalente en ARS.'),
          createBullet('Alineación Total de Incentivos', 'La plataforma solo cobra su comisión cuando el proyecto cumple sus hitos y los fondos se liberan satisfactoriamente.'),
          createBullet('Mitigación Radical del Riesgo de Fraude', 'Si un proyecto se interrumpe o el auditor rechaza el hito, los fondos remanentes en el contrato escrow retornan automáticamente a las billeteras de los inversores.'),

          createHeading2('1.5 Misión, Visión y Propósito Estratégico'),
          createParagraph(
            'Misión: Democratizar el financiamiento de proyectos productivos, industriales, tecnológicos y sustentables en América Latina, brindando a inversores y emprendedores una infraestructura tecnológica inmutable, transparente y legalmente sólida que garantice la rendición de cuentas por hitos auditados por profesionales colegiados.',
            { bold: true }
          ),
          createParagraph(
            'Visión: Convertirse en la plataforma líder del Cono Sur en tokenización de activos reales (RWA) y financiamiento colectivo fiduciario, canalizando más de USD 50 millones hacia la economía real para el año 2030.',
            { bold: true }
          ),
          createParagraph(
            'Propósito Estratégico: Demostrar que la tecnología blockchain, lejos de la especulación financiera volátil, es la herramienta de ingeniería de software más potente para construir confianza, auditar el impacto ambiental y garantizar la seguridad del capital en países con inestabilidad institucional.'
          ),

          createHeading2('1.6 Identificación de la oportunidad de negocio'),
          createParagraph(
            'El sector productivo, industrial y biotecnológico en Argentina sufre una histórica exclusión crediticia bancaria, a la vez que el 17% de los adultos opera activamente con activos digitales y stablecoins (USDT/USDC). Seed & Grow captura la intersección de estas dos tendencias: canalizar el ahorro digital y bancario hacia la producción real con garantías inembargables y trazabilidad algorítmica.'
          ),
          createParagraph(
            'A nivel nacional, diversas experiencias de financiamiento colectivo informal han evidenciado que la ciudadanía argentina tiene una marcada disposición a participar en proyectos compartidos cuando percibe transparencia. No obstante, tales iniciativas adolecieron de severas limitaciones al carecer de un marco fiduciario regulado, sin trazabilidad estricta del dinero y sin auditorías independientes, derivando en conflictos entre partes. Seed & Grow canaliza esta propensión participativa hacia la economía real productiva (plantas industriales, biofábricas, software, obras civiles e infraestructura sustentable) resolviendo de raíz el problema del riesgo moral mediante contratos inteligentes de custodia escrow en Base L2 y fideicomisos inembargables (CCyCN 1666).'
          ),

          createHeading2('1.7 Capacidades centrales'),
          createBullet('Ingeniería de Software & Arquitectura Distribuida', 'Dominio en el diseño de arquitecturas Web3 full-stack, contratos inteligentes en Solidity, APIs REST/RPC seguras y modelos de datos normalizados.'),
          createBullet('Conocimiento Agronómico y Red de Peritaje', 'Vínculos institucionales con colegios de ingenieros agrónomos para la homologación de protocolos de auditoría.'),
          createBullet('Expertise Legal & Compliance Local', 'Conocimiento profundo de las regulaciones de la CNV (Ley 27.349), normativas UIF para PSAV y derecho fiduciario argentino.'),

          createHeading2('1.8 Propuesta de valor para el cliente'),
          createBullet('Para el Inversor (Martina)', 'Seguridad Escrow: Fondos bloqueados en smart contract, voto en asambleas, auditoría colegiada en vivo y reportes fiscales automáticos para ARCA.'),
          createBullet('Para el Productor / Creador (Mariano)', 'Financiamiento Ágil: Convocatoria a miles de inversores, desembolsos programados por avance de obra y validación comunitaria.'),
          createBullet('Para el Auditor Matriculado (Ing. Morales)', 'Mesa de Peritaje Digital: Retribución fijada en el contrato inteligente y emisión de firma digital vinculante con validez notarial.'),

          createHeading2('1.9 Valores nucleares de la organización'),
          createBullet('Determinismo y Transparencia Radical', 'El código y los contratos auditan los acuerdos; no hay decisiones discrecionales.'),
          createBullet('Rigor Técnico-Científico', 'Ningún hito se aprueba sin evidencia fáctica, agronómica y comprobantes contables válidos.'),
          createBullet('Responsabilidad Ambiental', 'Exclusión taxativa de proyectos con impacto ecológico negativo o uso de agroquímicos de banda roja.'),
          createBullet('Soberanía y Seguridad del Usuario', 'Cifrado de punta a punta, custodia no permisionada y protección de datos según la Ley 25.326.'),

          createHeading2('1.10 Enfoque e iniciativas estratégicas'),
          createBullet('1. Desarrollo Tecnológico Continuo', 'Iteración del protocolo Escrow, integración de oráculos y pruebas de avance físico/digital con firmas criptográficas.'),
          createBullet('2. Convenios Colegiados Multidisciplinarios', 'Alianzas estratégicas con colegios profesionales de ingenieros (industriales, civiles, de sistemas, agrónomos) y consejos profesionales de ciencias económicas.'),
          createBullet('3. Cumplimiento Regulatorio Proactivo', 'Registro voluntario como Plataforma de Financiamiento Colectivo ante CNV y registro de PSAV ante UIF.'),
          createBullet('4. Educación y Confianza', 'Difusión de manuales técnicos y transparencia algorítmica para derribar el prejuicio de que blockchain es mera especulación.'),

          createHeading2('1.11 Áreas claves de resultados (ACR)'),
          createBullet('Volumen Total Financiado (TVL)', 'Medición del capital total bajo custodia escrow.'),
          createBullet('Tasa de Cumplimiento de Hitos', 'Porcentaje de hitos aprobados en tiempo y forma por la auditoría técnica.'),
          createBullet('Tasa de Cero Fraude (Zero-Default Escrow)', 'Eficacia del multi-sig para evitar desvíos de fondos hacia fines no presupuestados.'),
          createBullet('Tiempo de Liquidación Fiat', 'Tasa de conciliación de transferencias bancarias ARS en menos de 15 minutos.'),

          createHeading2('1.12 Ingreso al sector: Estrategias de inserción'),
          createParagraph(
            'Estrategia Genérica de Michael Porter: Enfoque en Diferenciación. La empresa no compite por volumen masivo indiferenciado (como Mercado Pago o Kickstarter), sino en proyectos de alto valor agregado productivo con garantía fiduciaria, custodia algorítmica y peritaje colegiado.'
          ),
          createParagraph(
            'Estrategia Competitiva de Kotler: Especialista de Nicho. Consolidarse primero en verticales productivas de alta tangibilidad (bioinsumos, plantas industriales y proyectos de software e infraestructura) antes de abrirse a la totalidad de la economía de emprendedores.'
          ),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // CAPÍTULO 2: ANÁLISIS ESTRATÉGICO
          // =========================================================================
          createHeading1('2. Análisis Estratégico'),
          createHeading2('2.1 Análisis de Contexto'),
          createHeading3('2.1.1 Descripción del escenario local'),
          createParagraph(
            'Argentina representa uno de los mercados agropecuarios más competitivos del mundo (responsable de más del 50% de las exportaciones del país). Sin embargo, el sector de pequeños y medianos productores, cooperativas agrícolas y biofábricas sufre una exclusión crediticia crónica. Paralelamente, la población argentina es líder en América Latina en educación y tenencia de activos criptográficos estables para preservar el poder adquisitivo.'
          ),

          createHeading3('2.1.2 Factores económicos'),
          createParagraph(
            'Restricción crediticia severa con tasas activas bancarias que históricamente han superado el 80%-100% anual, imposibilitando el financiamiento de proyectos a mediano plazo. Por otra parte, existe una fuerte demanda de instrumentos atados al dólar (USDC); los inversores rehúyen de instrumentos tradicionales en pesos no indexados. La posibilidad de aportar en pesos convertidos a valor dólar oficial/cripto representa un gran atractivo financiero.'
          ),

          createHeading3('2.1.3 Factores políticos y legales'),
          createParagraph(
            'Ley 27.349 de Financiamiento Colectivo (marco habilitante para plataformas autorizadas por CNV), Ley 27.739 de reforma del régimen de prevención de lavado de activos ante UIF (Proveedores de Servicios de Activos Virtuales - PSAV), y el Código Civil y Comercial de la Nación (CCyCN Arts. 1666 a 1707 para fideicomisos inembargables y Arts. 286/288 para firma electrónica).'
          ),

          createHeading3('2.1.4 Factores tecnológicos'),
          createParagraph(
            'Redes Layer 2 (Base) que permiten ejecutar contratos inteligentes con la seguridad de Ethereum pero con costos de transacción inferiores a un centavo de dólar y tiempos de bloque de 2 segundos. Conectividad digital y satelital (Starlink / 4G / Fibra) que permite a los peritos colegiados sincronizar imágenes georreferenciadas, actas y dictámenes técnicos en tiempo real desde cualquier punto de la República Argentina.'
          ),

          createHeading3('2.1.5 Descripción del escenario: escenario–meta'),
          createParagraph(
            'Consolidar en los primeros 18 meses una comunidad de 10.000 inversores registrados, financiar 15 proyectos productivos, industriales, tecnológicos y de infraestructura sustentable por un valor conjunto de USD 1.500.000, y contar con un panel activo de 30 peritos colegiados multidisciplinarios matriculados.'
          ),

          createHeading3('2.1.6 Análisis sectorial: Definición de Oportunidades y Amenazas'),
          createBullet('Oportunidades', 'Auge global de la tokenización de activos del mundo real (RWA), desintermediación financiera demandada por nuevas generaciones, y creciente predisposición del público a canalizar ahorros hacia proyectos de la economía productiva real.'),
          createBullet('Amenazas', 'Incertidumbre tributaria por parte de ARCA sobre activos virtuales, riesgo de volatilidad cambiaria extrema, reticencia cultural inicial de sectores analógicos hacia herramientas descentralizadas.'),

          createHeading2('2.2 Análisis de la Competencia y Benchmarking Nacional'),
          createHeading3('2.2.1 Principales competidores y antecedentes directos'),
          createBullet('Crowdium', 'Plataforma argentina de crowdfunding inmobiliario estructurada con fideicomisos tradicionales. Comisiones elevadas (10%+), procesos manuales en papel, no usa blockchain ni atiende impacto ecológico.'),
          createBullet('Agrotoken', 'Tokeniza soja, maíz y trigo respaldados en silobolsas (SOYA, CORA). Es un instrumento de colateral y transaccionalidad de granos para grandes productores; Seed & Grow es una plataforma de financiamiento colectivo y custodia escrow para proyectos regenerativos.'),
          createBullet('Giveth / Gitcoin', 'Plataformas globales de donaciones Web3. No cumplen normativa argentina (CNV, UIF, ARCA), solo operan en criptomonedas puras sin rampa CBU, no tienen peritaje técnico en campo ni ofrecen retorno financiero.'),
          createBullet(
            'Caso Benchmark Nacional: Orsai Producciones Audiovisuales (Hernán Casciari)',
            'Pionero indiscutido del financiamiento colectivo y democratización de dividendos en Argentina. Casciari recaudó más de USD 600.000 mediante la venta de 6.000 bonos de USD 100 a miles de "socios productores" para producir la película "La Uruguaya" (vendida a Disney/Star+) y series posteriores, prescindiendo del INCAA y de la banca tradicional. Los socios participaron en decisiones artísticas, asambleas y cobraron dividendos proporcionales a su aporte.'
          ),
          createHeading3('2.2.1.1 Estudio Crítico del Caso Orsai: Controversias Operativas y Falla del Modelo Centralizado'),
          createParagraph(
            'Si bien el proyecto Orsai constituyó un hito cultural al validar que el público argentino tiene la voluntad de aportar capital de riesgo colectivo, con el correr del tiempo surgieron públicas controversias, tensiones y disputas que exponen con claridad los límites del crowdfunding informal basado en el personalismo y la gestión manual (Casciari, 2021; Mairal, 2023; crónicas de prensa especializada en La Nación y Rolling Stone, 2022-2024):'
          ),
          createBullet(
            '1. Asimetría de Información y Ausencia de Auditoría Contable Externa',
            'Los socios productores no contaron con un acceso auditable en tiempo real a los contratos suscritos con las distribuidoras internacionales (Disney/Star+), ni a los libros contables detallados de los gastos de rodaje. La rendición de cuentas dependió exclusivamente de transmisiones en streaming y reportes elaborados por la propia administración de la productora, configurando una relación fiduciaria de "caja negra" sin peritaje independiente.'
          ),
          createBullet(
            '2. Demoras en la Liquidación de Dividendos y Fricción Cambiaria',
            'El proceso de liquidación de retornos financieros a más de 6.000 personas mediante transferencias bancarias manuales generó severas demoras, reclamos públicos y fricciones por la pérdida de poder adquisitivo frente a la inflación y a las retenciones impositivas bancarias en pesos argentinos, desvirtuando el valor real del rendimiento percibido por los aportantes minoristas.'
          ),
          createBullet(
            '3. Conflictos por Derechos de Autor y Propiedad Intelectual',
            'La adaptación de la novela "La Uruguaya" desató públicas rispideces contractuales con el autor original Pedro Mairal respecto a los alcances de la cesión de derechos, la participación en utilidades y los créditos correspondientes, demostrando la fragilidad de los acuerdos asociativos informales frente a contratos mercantiles tradicionales.'
          ),
          createBullet(
            '4. Personalismo y "Democracia Consultiva" sin Veto Real',
            'La gobernanza funcionó mediante votaciones consultivas (elección de actores o detalles de guión), pero la administración fiduciaria del dinero permaneció concentrada unipersonalmente en la figura de Casciari. Los socios productores carecían de un mecanismo técnico determinista para frenar desembolsos ante desacuerdos o incumplimientos presupuestarios.'
          ),
          createParagraph(
            'La Respuesta de Ingeniería en Seed & Grow: La tesis extrae de la experiencia de Orsai una conclusión fundamental para la ingeniería de software: el problema del financiamiento colectivo no radica en la falta de inversores, sino en la falta de una arquitectura tecnológica e institucional que reemplace la "confianza ciega" por "reglas computables". Seed & Grow resuelve taxativamente cada una de las fallas del modelo Casciari: 1) El dinero no va a cuentas bancarias personales, sino que se bloquea en Smart Contracts Escrow (Base L2) con trazabilidad pública on-chain; 2) Ningún hito se desembolsa sin el dictamen favorable y la firma digital de un Perito Auditor Colegiado e independiente con responsabilidad civil y penal; 3) La liquidación de dividendos es algorítmica e instantánea hacia los tokens ERC-721/1155 de cada inversor, sin intermediación manual; y 4) Cada proyecto se estructura en un Fideicomiso Ordinario inembargable (CCyCN Art. 1666) con rendición fiscal oficial homologada ante ARCA.'
          ),

          createHeading3('2.2.2 Análisis de Cadena de Valor'),
          createBullet('Actividades Primarias', 'Onboarding & Due Diligence con validación KYC/UIF; Operaciones de Smart Contracts Escrow en Base L2; Desembolso y Liquidación automatizada; Marketing en comunidades productivas, de emprendedores y creadores independientes; Auditoría pericial continua post-fondeo.'),
          createBullet('Actividades de Soporte', 'Infraestructura en Google Cloud Run y nodos RPC; I+D en Solidity y React/Tailwind; Gestión legal fiduciaria y convenios con colegios profesionales de peritaje multidisciplinario.'),

          createHeading3('2.2.3 Definición de Factores Críticos de Éxito (FCE)'),
          createBullet('FCE 1', 'Seguridad absoluta del código: Cero vulnerabilidades en los contratos inteligentes de custodia.'),
          createBullet('FCE 2', 'Independencia, solvencia y reputación del panel pericial colegiado según cada especialidad técnica.'),
          createBullet('FCE 3', 'Fluidez de UX: Invertir en pesos por CBU o cripto con la misma facilidad que Mercado Pago.'),
          createBullet('FCE 4', 'Blindaje normativo y seguridad fiduciaria inexpugnable.'),

          createHeading3('2.2.4 Fortalezas y Debilidades del Negocio'),
          createBullet('Fortalezas', 'Protocolo tecnológico ya desarrollado y funcional; arquitectura de costos fijos mínimos; triple validación de seguridad (fideicomiso civil + peritaje + smart contract).'),
          createBullet('Debilidades', 'Marca naciente; curva de aprendizaje de productores para estructurar hitos; necesidad de masa crítica inicial de inversores.'),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // CAPÍTULO 3: ANÁLISIS FODA
          // =========================================================================
          createHeading1('3. Análisis FODA'),
          createHeading2('3.1 Cuadro FODA'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('FORTALEZAS (F)', 50, true, true, AlignmentType.CENTER),
                  createCell('OPORTUNIDADES (O)', 50, true, true, AlignmentType.CENTER),
                ],
              }),
              new TableRow({
                children: [
                  createCell(
                    '• Protocolo Escrow multi-sig 3/5 totalmente operativo en Base L2.\n• Integración de panel de peritaje técnico colegiado multidisciplinario.\n• Rampa dual transparente: CBU bancario en ARS y USDC.\n• Módulo KYC/UIF y reportes impositivos para ARCA ya desarrollados.\n• Costos transaccionales despreciables (< $0,01 USD por operación).',
                    50
                  ),
                  createCell(
                    '• Creciente demanda de financiamiento para bioinsumos, pymes productivas y plantas fabriles.\n• Alta penetración de criptomonedas y billeteras digitales en Argentina.\n• Marco legal habilitante: Ley 27.349 de Financiamiento Colectivo y Ley 27.739.\n• Exclusión de las pymes y proyectos innovadores por parte de la banca tradicional.\n• Demanda creciente de instrumentos con rendimiento real y custodia inviolable.',
                    50
                  ),
                ],
              }),
              new TableRow({
                children: [
                  createCell('DEBILIDADES (D)', 50, true, true, AlignmentType.CENTER),
                  createCell('AMENAZAS (A)', 50, true, true, AlignmentType.CENTER),
                ],
              }),
              new TableRow({
                children: [
                  createCell(
                    '• Empresa en etapa inicial con necesidad de validar tracción de mercado.\n• Necesidad de coordinar con diversos colegios profesionales según la rama técnica.\n• Recursos limitados para grandes campañas masivas de publicidad tradicional.',
                    50
                  ),
                  createCell(
                    '• Volatilidad cambiaria abrupta y eventuales restricciones a cuentas fiduciarias.\n• Reticencia cultural de sectores tradicionales a adoptar contratos digitales.\n• Posibles cambios regulatorios impositivos regresivos por parte del fisco.\n• Competidores tradicionales de fintech que intenten replicar módulos similares.',
                    50
                  ),
                ],
              }),
            ],
          }),

          createHeading2('3.2 Análisis de las Fortalezas, Oportunidades, Debilidades y Amenazas'),
          createBullet('Estrategias FO (Maxi-Maxi)', 'Utilizar la infraestructura de Base L2 y la rampa CBU para capturar el ahorro digital de inversores argentinos y canalizarlo hacia proyectos productivos, industriales y tecnológicos con rendimientos auditados.'),
          createBullet('Estrategias DO (Mini-Maxi)', 'Superar la falta de trayectoria histórica aliándose formalmente con colegios profesionales (agrónomos, ingenieros industriales, civiles, de sistemas y contadores) para que aporten su solvencia pericial y cartera de proyectos.'),
          createBullet('Estrategias FA (Maxi-Mini)', 'Contrarrestar la reticencia del público no técnico ofreciendo una experiencia idéntica a la banca electrónica tradicional (pago con CBU/Mercado Pago y emisión de comprobantes oficiales con validez notarial), abstrayendo al usuario de la jerga cripto.'),
          createBullet('Estrategias DA (Mini-Mini)', 'Mantener una estructura de costos fijos ultraliviana (serverless en Cloud Run y smart contracts descentralizados) para resistir períodos de volatilidad macroeconómica sin comprometer el capital de trabajo.'),

          createHeading2('3.3 Conclusión: Atractivo de la Industria, Fortalezas del Negocio'),
          createParagraph(
            'La industria de financiamiento productivo en Argentina presenta un atractivo estructural extraordinario: el sistema financiero tradicional no presta dinero, las pymes productivas e industriales tienen iniciativas altamente rentables, y los inversores tienen liquidez retenida buscando rendimientos reales. La posición competitiva de Seed & Grow es única al ser la primera plataforma del país que no pide un cheque en blanco, sino que implementa una garantía fiduciaria y algorítmica inviolable con peritaje colegiado independiente.'
          ),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // CAPÍTULO 4: SEGMENTACIÓN
          // =========================================================================
          createHeading1('4. Segmentación'),
          createHeading2('4.1 Segmentación de Consumidores y/o Negocios'),
          createParagraph(
            'La plataforma segmenta a sus usuarios en tres actores principales: Inversores Aportantes, Emprendedores/Productores Promotores y Peritos Auditores Matriculados.'
          ),

          createHeading2('4.2 Identificación de Grupos Diferenciados de Consumidores'),
          createHeading3('Factores Socioculturales y Demográficos'),
          createBullet('Inversores', 'Edad: 25 a 55 años. Residencia: Centros urbanos (CABA, Córdoba, Santa Fe, Rosario). Nivel socioeconómico: Medio y Alto. Nivel educacional: Universitario y Postgrado. Interés en fintech, diversificación de ahorros, sustentabilidad y economía productiva real.'),
          createBullet('Emprendedores y Productores', 'Empresas agroproductivas, biotecnológicas, plantas fabriles, pymes de software, robótica e infraestructura con proyectos de inversión estructurados por tramos.'),
          createBullet('Auditores Matriculados', 'Peritos colegiados habilitados en sus respectivos consejos: Ingenieros Industriales/Químicos, Ingenieros Civiles, Ingenieros en Sistemas, Contadores Públicos e Ingenieros Agrónomos/Ambientales. Interesados en peritaje independiente y honorarios garantizados por smart contract.'),

          createHeading2('4.3 ¿Quiénes son los Potenciales Usuarios/Compradores del Negocio?'),
          createBullet('Martina Gómez (Inversor Tipo)', 'Ahorrista profesional que busca rentabilidad superior al plazo fijo en dólares, apoyando proyectos reales y descargando certificados fiscales para ARCA.'),
          createBullet('Mariano Peralta (Productor / Emprendedor Tipo)', 'Fundador de una biofábrica o empresa productiva PyME que necesita USD 25.000 a USD 60.000 para ejecutar su proyecto y prefiere rendir cuentas por hitos antes que someterse a la usura bancaria.'),
          createBullet('Perito Colegiado Lucas Morales (Auditor Tipo)', 'Perito técnico independiente que realiza la inspección pericial según su incumbencia legal, firma digitalmente en la plataforma y autoriza la regla multi-sig 3/5.'),

          createHeading2('4.4 Pautas de Comportamiento Esperado de Cada Segmento'),
          createBullet('Comportamiento del Inversor', 'Ingreso semanal a la plataforma para monitorear el avance de la cartera; alta participación en votaciones de asambleas de gobernanza; descarga del informe anual de ARCA para su contador.'),
          createBullet('Comportamiento del Productor', 'Carga periódica de facturas, remitos y evidencias fotográficas a IPFS cada 60 días al completar un tramo presupuestario.'),
          createBullet('Comportamiento del Auditor', 'Respuesta en menos de 7 días hábiles tras la solicitud de inspección; carga de informe pericial con matrícula y coordenadas GPS del lote.'),

          // Page break
          new Paragraph({ pageBreakBefore: true, children: [] }),

          // =========================================================================
          // CAPÍTULO 5: PLAN DE ACCIÓN
          // =========================================================================
          createHeading1('5. Plan de Acción'),
          createHeading2('5.1 Programas Generales de Acción: Estrategia de Desarrollo y Lanzamiento'),
          createBullet('Fase 1 (Meses 1-3) - Investigación, Prototipado y Auditoría Legal', 'Despliegue de contratos en testnet Base Sepolia, estructuración del fideicomiso tipo con escribanía y convenios con colegios de agrónomos.'),
          createBullet('Fase 2 (Meses 4-5) - Beta Cerrada con Proyectos Piloto', 'Financiamiento de los primeros 2 proyectos reales (Biofábrica Serrana y Raíz Circular) por un total de USD 35.000 con grupo cerrado de inversores.'),
          createBullet('Fase 3 (Meses 6-9) - Lanzamiento Público y Expansión', 'Apertura del catálogo general con verificación KYC/UIF automática y rampa CBU/CVU para todo el territorio argentino.'),
          createBullet('Fase 4 (Meses 10-18) - Integración IoT y Mercado Secundario', 'Conexión de sensores de suelo y reactores en tiempo real; habilitación del marketplace P2P para cuotas-parte.'),

          createHeading2('5.2 Programas Específicos de Acción y Cronograma Operativo'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Mes', 15, true, true, AlignmentType.CENTER),
                  createCell('Actividad Específica del Plan de Acción', 55, true, true),
                  createCell('Responsable', 30, true, true),
                ],
              }),
              new TableRow({
                children: [
                  createCell('1', 15, false, false, AlignmentType.CENTER),
                  createCell('Despliegue y verificación de contratos Escrow y ERC-721 en Base Sepolia / Mainnet.', 55),
                  createCell('Agustín Faucetta (Dev Lead)', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('2', 15, false, false, AlignmentType.CENTER),
                  createCell('Hardening de seguridad en backend Express, PostgreSQL y Firestore DB (firmas SHA-256).', 55),
                  createCell('Agustín Faucetta (Dev Lead)', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('3', 15, false, false, AlignmentType.CENTER),
                  createCell('Homologación legal del Fideicomiso Ordinario (CCyCN 1666) y encuadre CNV / UIF.', 55),
                  createCell('Asesoría Legal / Faucetta', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('4', 15, false, false, AlignmentType.CENTER),
                  createCell('Integración de rampa CBU/CVU bancaria con BIND y módulo KYC de identidad RENAPER.', 55),
                  createCell('Agustín Faucetta (Dev Lead)', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('5', 15, false, false, AlignmentType.CENTER),
                  createCell('Ejecución del piloto cerrado: Financiamiento de Biofábrica Serrana e inspección del Hito 1.', 55),
                  createCell('Equipo Seed & Grow / Ing. Morales', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('6', 15, false, false, AlignmentType.CENTER),
                  createCell('Lanzamiento público de la plataforma web y campaña en colegios profesionales.', 55),
                  createCell('Equipo Comercial / Marketing', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('7-8', 15, false, false, AlignmentType.CENTER),
                  createCell('Automatización de certificados fiscales para ARCA y optimización de flujos de asamblea.', 55),
                  createCell('Agustín Faucetta (Dev Lead)', 30),
                ],
              }),
              new TableRow({
                children: [
                  createCell('9-12', 15, false, false, AlignmentType.CENTER),
                  createCell('Integración de telemetría IoT en vivo y desarrollo del mercado secundario P2P.', 55),
                  createCell('Equipo de Ingeniería', 30),
                ],
              }),
            ],
          }),

          createHeading2('Conclusión del Bloque 1'),
          createParagraph(
            'El presente Plan de Negocios y Plan de Acción demuestra que Seed & Grow cuenta con una fundamentación estratégica sólida, un modelo de negocio viable y una respuesta tecnológica contundente a las necesidades reales del mercado agroproductivo y financiero argentino. La combinación de contratos inteligentes en Base L2, fideicomisos inembargables y auditoría colegiada sitúa al proyecto en la vanguardia de la ingeniería de software aplicada a la economía real.'
          ),
          ...getBloque2Elements(),
          ...getBloque3Elements(),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

// Main execution when called via script
async function main() {
  const buffer = await generateUaiThesisDocx();
  const outputDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Documento Word (.docx) generado con éxito en: ${outputPath} (${buffer.length} bytes)`);
}

main().catch((err) => {
  console.error('Error al generar documento Word:', err);
});
