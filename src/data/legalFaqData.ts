export interface LegalFaqItem {
  id: string;
  category: 'cnv' | 'escrow' | 'uif' | 'tax' | 'privacy';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  legalReference: string;
  badge: string;
}

export const LEGAL_FAQ_CATEGORIES = [
  { id: 'all', label: 'Todas las Preguntas' },
  { id: 'cnv', label: 'CNV & Crowdfunding' },
  { id: 'escrow', label: 'Custodia Escrow & Blockchain' },
  { id: 'uif', label: 'UIF & Cumplimiento KYC' },
  { id: 'tax', label: 'Impuestos ARCA (ex-AFIP)' },
  { id: 'privacy', label: 'Datos & Agro (SENASA)' },
];

export const LEGAL_FAQS: LegalFaqItem[] = [
  {
    id: 'faq-1',
    category: 'cnv',
    categoryLabel: 'CNV & Crowdfunding',
    badge: 'Ley 27.349 · CNV',
    question: '¿Qué respaldo legal tienen los inversores que aportan fondos en Seed & Grow en Argentina?',
    shortAnswer: 'Los fondos no van a la cuenta corriente del promotor. Se estructuran bajo un Fideicomiso de Administración y Garantía (Código Civil y Comercial) con custodia segregada e inembargable.',
    detailedAnswer: 'En Argentina, la captación de fondos está regulada por la Ley 26.831 de Mercado de Capitales y la Ley 27.349 de Financiamiento Colectivo (PFC). Seed & Grow opera bajo un esquema de Fideicomiso Ordinario de Administración y Garantía (arts. 1666 a 1707 del CCyCN). Los aportes de los inversores ingresan a un patrimonio separado e inafectado de las deudas personales del creador del proyecto o de la plataforma. Si el proyecto fracasa o el creador quiebra, los fondos restantes en el escrow quedan jurídicamente protegidos y no pueden ser embargados por acreedores ajenos.',
    legalReference: 'Código Civil y Comercial de la Nación (Arts. 1666 a 1707) y Ley 27.349 (Título II).',
  },
  {
    id: 'faq-2',
    category: 'escrow',
    categoryLabel: 'Custodia Escrow & Blockchain',
    badge: 'Base Sepolia · Multi-sig',
    question: '¿Cómo funciona el Smart Contract Escrow y qué validez tiene ante la justicia argentina?',
    shortAnswer: 'El contrato inteligente actúa como ejecutor técnico automatizado del contrato civil de fideicomiso. En juicio es plenamente oponible como principio de prueba por escrito y firma electrónica.',
    detailedAnswer: 'El Smart Contract desplegado en Base L2 programa de forma inmutable la regla multi-firma 3/5: los fondos no pueden liberarse a discreción de nadie sin la conjunción de dos condiciones: 1) El dictamen pericial favorable del Ingeniero Agrónomo colegiado registrado en Firestore, y 2) El quórum mayoritario de la asamblea de inversores. Conforme a la Ley 25.506 y los arts. 286 y 288 del CCyCN, la interacción con billeteras Web3 reviste carácter de Firma Electrónica con plena validez contractual vinculante entre las partes que adhirieron a los Términos y Condiciones.',
    legalReference: 'Ley 25.506 de Firma Digital, Dec. Reglamentario 182/2019 y Arts. 286/288 del CCyCN.',
  },
  {
    id: 'faq-3',
    category: 'uif',
    categoryLabel: 'UIF & Cumplimiento KYC',
    badge: 'Ley 25.246 · UIF',
    question: '¿Por qué es obligatorio completar la validación KYC / UIF antes de invertir en un proyecto?',
    shortAnswer: 'Es un requisito legal estricto de la Ley 25.246 de Prevención de Lavado de Activos y Financiamiento del Terrorismo para Sujetos Obligados ante la UIF.',
    detailedAnswer: 'Tanto las Plataformas de Financiamiento Colectivo (PFC) como los Proveedores de Servicios de Activos Virtuales (PSAV - Ley 27.739 sancionada en 2024) revisten el carácter de Sujetos Obligados ante la Unidad de Información Financiera (UIF). La plataforma debe aplicar políticas de Debida Diligencia (CDD), verificar identidad con DNI/RENAPER, requerir Declaración Jurada de Origen y Licitud de Fondos y cotejar contra el registro RePET (terrorismo) y la condición de Persona Expuesta Políticamente (Resolución UIF 35/2023).',
    legalReference: 'Ley 25.246 (modificada por Ley 27.739 de marzo 2024) y Resoluciones UIF N° 35/2023.',
  },
  {
    id: 'faq-4',
    category: 'tax',
    categoryLabel: 'Impuestos ARCA (ex-AFIP)',
    badge: 'ARCA · Ganancias & IVA',
    question: '¿Cómo tributan ante ARCA (ex-AFIP) las ganancias y retornos que percibe un inversor?',
    shortAnswer: 'Las rentas por enajenación de tokens o retornos financieros tributan el Impuesto a las Ganancias bajo el régimen cedular (15%). La tenencia al 31/12 se declara en Bienes Personales.',
    detailedAnswer: 'El tratamiento tributario en Argentina contempla: 1) Impuesto a las Ganancias: el artículo 98 inciso b de la Ley de Impuesto a las Ganancias grava los resultados de monedas digitales y tokens a la alícuota del 15% en moneda extranjera. 2) Bienes Personales: las participaciones y stablecoins en wallet al 31 de diciembre deben computarse como activo financiero exterior o local. 3) IVA: la transferencia de capital no genera IVA; únicamente la comisión por servicio tecnológico que factura Seed & Grow está gravada al 21%. 4) Régimen Informativo: Seed & Grow cumple con la RG AFIP 4614/2019 de reporte mensual de movimientos.',
    legalReference: 'Ley de Impuesto a las Ganancias (Art. 98 inc. b), Ley 23.966 de Bienes Personales y RG 4614/2019.',
  },
  {
    id: 'faq-5',
    category: 'escrow',
    categoryLabel: 'Custodia Escrow & Blockchain',
    badge: 'Protección al Aportante',
    question: '¿Qué ocurre si un creador/promotor no cumple con el hito o gasta los fondos en otra cosa?',
    shortAnswer: 'El promotor no recibe el dinero por adelantado; solo se desembolsa tramo por tramo tras la auditoría técnica. Si no cumple, los fondos del tramo quedan retenidos y se devuelven.',
    detailedAnswer: 'La ventaja fundamental del modelo escrow frente al crowdfunding tradicional es que el promotor no recibe la totalidad del dinero al inicio. Si en el Hito 2 (ej. montaje del galpón de bio-fermentación) el creador no sube los remitos a IPFS o el Ingeniero Agrónomo no emite el dictamen de conformidad, el Smart Contract bloquea automáticamente el desembolso. La asamblea de inversores vota la impugnación y, conforme al contrato fiduciario, el saldo no ejecutado permanece custodiado y puede reintegrarse a prorrata a las billeteras de los aportantes.',
    legalReference: 'Cláusula de Resolución por Incumplimiento del Fideicomiso Escrow y Art. 1083 del CCyCN.',
  },
  {
    id: 'faq-6',
    category: 'privacy',
    categoryLabel: 'Datos & Agro (SENASA)',
    badge: 'Ley 25.326 · AAIP',
    question: '¿Mis datos personales (DNI, nombre, saldos) quedan expuestos en la Blockchain pública?',
    shortAnswer: 'NO. Por cumplimiento estricto de la Ley 25.326 de Protección de Datos Personales, en la red Base L2 solo se escriben hashes SHA-256 anónimos y CIDs cifrados.',
    detailedAnswer: 'En Argentina rige el derecho de supresión y actualización de datos (Habeas Data). Dado que una blockchain pública es inmutable y no permite borrar registros, está legalmente vedado subir Información Personal Identificable (PII) on-chain. Seed & Grow almacena los datos de identidad bajo cifrado AES-256 en servidores privados registrados ante la Agencia de Acceso a la Información Pública (AAIP). En la blockchain pública únicamente se inscriben identificadores criptográficos opacos que garantizan la integridad matemática sin violar tu privacidad.',
    legalReference: 'Ley 25.326 de Protección de Datos Personales (Arts. 14, 16 y concordantes) y AAIP.',
  },
  {
    id: 'faq-7',
    category: 'cnv',
    categoryLabel: 'CNV & Crowdfunding',
    badge: 'BCRA · DNU 70/2023',
    question: '¿Puedo invertir en Pesos Argentinos (ARS) o únicamente en stablecoins (USDC)?',
    shortAnswer: 'Puedes aportar en stablecoins USDC directo desde tu billetera Web3, o ingresar en Pesos mediante pasarelas de pago autorizadas que convierten a USDC en escrow.',
    detailedAnswer: 'A partir de la reforma del DNU 70/2023 a los artículos 765 y 766 del Código Civil y Comercial, en Argentina es jurídicamente válido pactar contratos y contraprestaciones en moneda extranjera o bienes específicos (como USDC). Para quienes no poseen criptomonedas, la plataforma permite el onboarding en moneda de curso legal (ARS) a través de cuentas recaudadoras con CVU/CBU vinculadas a Proveedores de Servicios de Pago (PSP) registrados ante el Banco Central (BCRA).',
    legalReference: 'Código Civil y Comercial de la Nación (Arts. 765 y 766 modif. por DNU 70/2023) y Com. "A" BCRA.',
  },
  {
    id: 'faq-8',
    category: 'privacy',
    categoryLabel: 'Datos & Agro (SENASA)',
    badge: 'SENASA · Matrícula CIAPC',
    question: '¿Quién responde por las auditorías agronómicas y qué validez técnica tienen?',
    shortAnswer: 'Las auditorías son realizadas por Ingenieros Agrónomos colegiados con matrícula provincial habilitada (ej. CIAPC en Córdoba, CPIA a nivel federal), con responsabilidad civil profesional.',
    detailedAnswer: 'Los dictámenes no son anónimos ni automáticos. Cada peritaje en terreno está firmado por un profesional con matrícula oficial habilitada ante su colegio respectivo, asumiendo responsabilidad civil y deontológica conforme a la ley de ejercicio profesional de la agronomía. Para proyectos que elaboran biofertilizantes o bioinsumos (como Biofábrica Serrana), se verifica el cumplimiento de las normativas de SENASA (Resolución 263/2018 y conexas) garantizando inocuidad y habilitación de planta.',
    legalReference: 'Leyes Provinciales de Colegiación Profesional (Ley 8863 Córdoba - CIAPC / Ley 20.321 CPIA) y Res. SENASA 263/2018.',
  },
];
