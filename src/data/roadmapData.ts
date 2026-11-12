export interface RoadmapDay {
  day: string; // e.g., 'Día 1-2'
  topic: string;
  practice: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  tagline: string;
  badge: string;
  color: string; // Tailwind color token
  facultyBridge: string; // How university subjects (Paradigmas, BD, Redes) map to this
  dailySchedule: RoadmapDay[];
  milestoneProject: string;
  recommendedHoursPerDay: number;
  keyTools: string[];
  calendarEvent: {
    summary: string;
    description: string;
    startDateOffsetDays: number; // Offset from start date
    durationHours: number;
  };
}

export const ROADMAP_WEEKS: RoadmapWeek[] = [
  {
    weekNumber: 1,
    title: 'Fundamentos Modernos: TypeScript, React Funcional y Tailwind',
    tagline: 'De la teoría de Algoritmos y POO a interfaces web reactivas y tipadas.',
    badge: 'Semana 1 · Frontend Core',
    color: 'emerald',
    facultyBridge: 'Aprovecha lo que viste en Paradigmas de Programación y POO: las interfaces de TypeScript son contratos de tipos que evitan el 90% de los bugs en runtime.',
    dailySchedule: [
      {
        day: 'Día 1 - TypeScript Práctico',
        topic: 'Tipos primitivos, Interfaces, Generics básicos y Union Types.',
        practice: 'Tipar modelos de datos del mundo real (Usuario, Proyecto, Transacción) sin usar "any".',
      },
      {
        day: 'Día 2 - React Moderno & Hooks',
        topic: 'Componentes funcionales, useState, useEffect, useRef y ciclo de vida moderno.',
        practice: 'Crear una mini-app interactiva con estados condicionales y efectos limpios.',
      },
      {
        day: 'Día 3 - Tailwind CSS & Diseño Limpio',
        topic: 'Utility-first styling, flexbox/grid responsivo, tipografía y paleta de colores.',
        practice: 'Replicar una card de producto o dashboard sin escribir una sola línea de CSS tradicional.',
      },
      {
        day: 'Día 4 - Componentes Compuestos & Props',
        topic: 'Descomposición modular: Atomic Design pragmático, Children props y callbacks.',
        practice: 'Construir un modal genérico reutilizable con backdrop y accesibilidad básica.',
      },
      {
        day: 'Día 5 - Integración & Vite Build',
        topic: 'Ecosistema Vite, TypeScript estricto, variables de entorno y linters.',
        practice: 'Armar la estructura base de tu portfolio o proyecto personal y compilarlo con Vite.',
      },
    ],
    milestoneProject: 'Entregable Semana 1: Landing interactiva de un proyecto propio con componentes tipados y diseño profesional.',
    recommendedHoursPerDay: 2.5,
    keyTools: ['Vite', 'React 19 / 18', 'TypeScript', 'Tailwind CSS', 'VS Code (Tailwind + ESLint extensions)'],
    calendarEvent: {
      summary: 'Semana 1: TypeScript, React Funcional & Tailwind CSS',
      description: 'Bloque de estudio y práctica: Domina React funcional moderno, interfaces en TypeScript y maquetado veloz con Tailwind CSS. Proyecto: Landing tipada.',
      startDateOffsetDays: 0,
      durationHours: 2,
    },
  },
  {
    weekNumber: 2,
    title: 'Arquitectura de Estado y Visualización de Datos',
    tagline: 'Manejo de estado global, navegación SPA y dashboards analíticos con Recharts.',
    badge: 'Semana 2 · State & Charts',
    color: 'teal',
    facultyBridge: 'Aplica conceptos de Ingeniería de Software (Separación de incumbencias y Patrón MVC/Flux): el estado de la UI nunca debe acoplarse con la lógica de render.',
    dailySchedule: [
      {
        day: 'Día 1 - Gestión de Estado Global',
        topic: 'Context API vs Zustand/Redux. Cuándo usar estado local vs global.',
        practice: 'Crear un store para gestionar el usuario activo, roles y notificaciones toast.',
      },
      {
        day: 'Día 2 - Formularios Robustos & Validación',
        topic: 'Formularios controlados, validación con Zod o regex, manejo de errores de input.',
        practice: 'Formulario de registro con validación en vivo de CUIT/CUIL y DNI argentino.',
      },
      {
        day: 'Día 3 - Visualización con Recharts',
        topic: 'Gráficos de pastel (PieChart), barras y líneas responsivas con tooltips a medida.',
        practice: 'Implementar el gráfico de distribución de fondos de una cartera de inversiones.',
      },
      {
        day: 'Día 4 - Navegación y Vistas Modulares',
        topic: 'Patrones de routing en SPA, vistas condicionales por rol y persistencia en localStorage.',
        practice: 'Switcher de roles (Inversor / Creador / Auditor) con navegación protegida.',
      },
      {
        day: 'Día 5 - Pulido de UX & Microinteracciones',
        topic: 'Feedback visual inmediato, spinners, esqueletos (skeletons) y toasts accesibles.',
        practice: 'Integrar toasts animados para feedback de transacciones y operaciones exitosas.',
      },
    ],
    milestoneProject: 'Entregable Semana 2: Dashboard financiero completo con gráficos interactivos y formularios validados.',
    recommendedHoursPerDay: 2.5,
    keyTools: ['Recharts', 'Zustand / React Context', 'Zod', 'Heroicons / Material Symbols'],
    calendarEvent: {
      summary: 'Semana 2: Arquitectura de Estado & Gráficos con Recharts',
      description: 'Aprende gestión de estado global, formularios seguros y visualización de métricas en dashboards interactivos.',
      startDateOffsetDays: 7,
      durationHours: 2,
    },
  },
  {
    weekNumber: 3,
    title: 'Backend, Persistencia NoSQL y Seguridad (Firestore & Auth)',
    tagline: 'Bases de datos en tiempo real, autenticación de usuarios y reglas de acceso seguras.',
    badge: 'Semana 3 · Backend & DB',
    color: 'blue',
    facultyBridge: 'Conecta con tus materias de Bases de Datos y Seguridad en Redes: modelado de documentos vs tablas relacionales, ACID, transacciones y control de acceso RBAC.',
    dailySchedule: [
      {
        day: 'Día 1 - Modelado NoSQL en Firestore',
        topic: 'Colecciones, subcolecciones, desnormalización estratégica y optimización de lecturas.',
        practice: 'Escribir el blueprint JSON de una app con entidades: users, projects, milestones.',
      },
      {
        day: 'Día 2 - Consultas y Operaciones Atómicas',
        topic: 'Where queries, ordenamiento compuesto, batches de escritura y transacciones.',
        practice: 'Escribir una transacción que deduzca fondos de un inversor y sume al proyecto de forma atómica.',
      },
      {
        day: 'Día 3 - Autenticación con Google y Email',
        topic: 'Firebase Auth, tokens JWT, persistencia de sesión y claims de usuario.',
        practice: 'Implementar login con Google Workspace / Email y redirección automática.',
      },
      {
        day: 'Día 4 - Hardening con Firestore Rules',
        topic: 'Reglas de seguridad declarativas, validación de schemas de datos y RBAC estricto.',
        practice: 'Reglas que impidan que un usuario modifique el saldo de otro o firme sin rol de auditor.',
      },
      {
        day: 'Día 5 - Backend Proxy con Node & Express',
        topic: 'Servidor Express con Node/TS, variables de entorno secretas y endpoints seguros.',
        practice: 'Crear una ruta en Express que valide una petición autenticada con Bearer token.',
      },
    ],
    milestoneProject: 'Entregable Semana 3: API Express + Firestore persistente con login real y reglas auditadas.',
    recommendedHoursPerDay: 3,
    keyTools: ['Firebase Firestore', 'Firebase Auth', 'Express.js', 'TypeScript', 'Node.js'],
    calendarEvent: {
      summary: 'Semana 3: Backend, Persistencia Firestore & Auth',
      description: 'Construye backend con Node.js, modelado NoSQL en Firestore, autenticación real y reglas de seguridad.',
      startDateOffsetDays: 14,
      durationHours: 2.5,
    },
  },
  {
    weekNumber: 4,
    title: 'Web3 & Smart Contracts: Lógica Escrow en Base L2',
    tagline: 'Entendiendo la Blockchain desde la ingeniería: contratos, gas y determinismo.',
    badge: 'Semana 4 · Web3 & Escrow',
    color: 'amber',
    facultyBridge: 'Aprovecha tus conocimientos de Sistemas Operativos, Criptografía y Redes Distribuidas: un smart contract es una máquina de estados determinista replicada por consenso.',
    dailySchedule: [
      {
        day: 'Día 1 - Arquitectura de Ethereum & EVM',
        topic: 'Nodos, gas, mempool, transacciones firmadas con claves asimétricas secp256k1.',
        practice: 'Configurar billetera MetaMask / Rabby en la red Base Sepolia y fondearla con faucet.',
      },
      {
        day: 'Día 2 - Solidity Práctico en Remix IDE',
        topic: 'Estructuras, mappings, modificadores de acceso (`onlyOwner`, `whenNotPaused`) y eventos.',
        practice: 'Escribir un contrato de Escrow básico que retenga fondos hasta una condición.',
      },
      {
        day: 'Día 3 - Multi-sig y Liberación por Hitos',
        topic: 'Patrones de custodia, votación por quorum y auditoría con firma colegiada.',
        practice: 'Implementar la función `releaseMilestone(uint256 id)` que exige 3/5 firmas.',
      },
      {
        day: 'Día 4 - Conexión Web3 desde React (Viem/Ethers)',
        topic: 'Conectar wallet, leer saldos de ERC-20 (USDC) y enviar transacciones con estimación de gas.',
        practice: 'Crear el botón "Aportar Fondos Escrow" que firma y ejecuta la llamada on-chain.',
      },
      {
        day: 'Día 5 - Escucha de Eventos On-Chain',
        topic: 'Eventos Solidity (`MilestoneCompleted`, `FundsDeposited`) y sincronización con Firestore.',
        practice: 'Escuchar el evento on-chain y disparar una actualización visual en la UI en vivo.',
      },
    ],
    milestoneProject: 'Entregable Semana 4: Smart Contract de custodia desplegado en Base Sepolia conectado al frontend React.',
    recommendedHoursPerDay: 3,
    keyTools: ['Remix IDE', 'Solidity', 'Base Sepolia L2 Testnet', 'Viem / Ethers.js', 'MetaMask'],
    calendarEvent: {
      summary: 'Semana 4: Web3 & Smart Contracts Escrow en Base L2',
      description: 'Escribe y despliega contratos inteligentes en Solidity, entiende la EVM y conéctalos con React.',
      startDateOffsetDays: 21,
      durationHours: 3,
    },
  },
  {
    weekNumber: 5,
    title: 'Compliance, Generación de Documentos (PDF) & KYC',
    tagline: 'Llevando la app al mundo real: regulaciones, firma digital y reportes ejecutivos.',
    badge: 'Semana 5 · Real World & KYC',
    color: 'indigo',
    facultyBridge: 'Aplica Legislación y Ética Profesional: el software no existe en el vacío; debe cumplir con leyes de protección de datos (25.326), UIF y marcos impositivos.',
    dailySchedule: [
      {
        day: 'Día 1 - Flujo de Validación KYC / AML',
        topic: 'Validación de identidad con DNI/CUIT, cotejo con listas de riesgo y declaraciones juradas.',
        practice: 'Diseñar el modal de onboarding KYC con validación de campos oficiales argentinos.',
      },
      {
        day: 'Día 2 - Generación Dinámica de PDFs con jsPDF',
        topic: 'Dibujar documentos vectoriales en cliente y servidor: tablas, encabezados y firmas.',
        practice: 'Escribir un script generador de certificados de inversión o manuales técnicos en PDF.',
      },
      {
        day: 'Día 3 - Firma Digital y Trazabilidad',
        topic: 'Hash criptográfico SHA-256 de documentos, almacenamiento en IPFS y registro notarial.',
        practice: 'Generar el hash de un dictamen de auditoría y guardarlo en la base de datos.',
      },
      {
        day: 'Día 4 - Exportación a Calendarios (.ics)',
        topic: 'Estándar RFC 5545 iCalendar, generación de archivos .ics y enlaces directos de Google Calendar.',
        practice: 'Construir el exportador de cronogramas y fechas límite a Google Calendar.',
      },
      {
        day: 'Día 5 - Auditoría de Seguridad & Performance',
        topic: 'Prevención de inyecciones, saneamiento de entradas, bundle analysis y lazy loading.',
        practice: 'Reducir el tamaño del bundle con dynamic imports y validar seguridad con linters.',
      },
    ],
    milestoneProject: 'Entregable Semana 5: Módulo de onboarding KYC con generación de comprobantes PDF y sincronización a calendarios.',
    recommendedHoursPerDay: 2.5,
    keyTools: ['jsPDF', 'iCalendar RFC 5545', 'Crypto API (SHA-256)', 'Zod'],
    calendarEvent: {
      summary: 'Semana 5: Compliance KYC, Generación de PDFs & Calendario',
      description: 'Integra módulos de verificación de identidad, generación de PDFs profesionales e interoperabilidad.',
      startDateOffsetDays: 28,
      durationHours: 2.5,
    },
  },
  {
    weekNumber: 6,
    title: 'Producción, CI/CD, Despliegue en la Nube y Portfolio',
    tagline: 'De localhost al mundo: Cloud Run, Docker, Git flows y presentación profesional.',
    badge: 'Semana 6 · Production & Career',
    color: 'emerald',
    facultyBridge: 'Culmina con Gestión de Proyectos y Sistemas Distribuidos: entregar software que funciona en la nube, escalable, monitoreado y documentado con orgullo.',
    dailySchedule: [
      {
        day: 'Día 1 - Containerización y Entornos de Nube',
        topic: 'Dockerfiles optimizados multi-stage, node_modules production, variables en Cloud Secret Manager.',
        practice: 'Empaquetar la aplicación full-stack en una imagen liviana lista para desplegar.',
      },
      {
        day: 'Día 2 - Despliegue en Google Cloud Run / Vercel',
        topic: 'Deploy automatizado, configuración de dominio propio con HTTPS y headers de seguridad.',
        practice: 'Llevar tu proyecto a una URL pública en vivo compartible con reclutadores y clientes.',
      },
      {
        day: 'Día 3 - Git Profesional & README de Alto Impacto',
        topic: 'Convención de commits (Conventional Commits), diagramas Mermaid de arquitectura en el README.',
        practice: 'Armar el README.md de tu repo con capturas, badges, diagrama de flujo y cómo correrlo.',
      },
      {
        day: 'Día 4 - Preparación de Demo y Pitch Técnico',
        topic: 'Cómo contar tu proyecto en una entrevista técnica o ante inversores: decisiones y trade-offs.',
        practice: 'Grabar un video Loom o escribir una guía explicativa demostrando el valor de tu desarrollo.',
      },
      {
        day: 'Día 5 - Plan de Carrera y Siguientes Pasos',
        topic: 'Estrategia para terminar materias faltantes mientras trabajas como dev o lideras tu startup.',
        practice: 'Definir el backlog de tu próximo producto y armar tu CV/LinkedIn con proyectos reales en producción.',
      },
    ],
    milestoneProject: 'Entregable Semana 6: Aplicación Full-Stack Web3 desplegada en la nube con código público en GitHub y documentación técnica completa.',
    recommendedHoursPerDay: 2.5,
    keyTools: ['Google Cloud Run / Vercel', 'Git & GitHub', 'Docker', 'Loom', 'Mermaid.js'],
    calendarEvent: {
      summary: 'Semana 6: Despliegue en Producción & Publicación de Portfolio',
      description: 'Lleva tu proyecto a la nube con Docker/Cloud Run, documenta tu arquitectura en GitHub y prepárate para entrevistas.',
      startDateOffsetDays: 35,
      durationHours: 3,
    },
  },
];

/**
 * Utility to generate a direct Google Calendar event creation URL
 */
export function buildGoogleCalendarUrl(
  title: string,
  description: string,
  location: string = 'Online / Mi Escritorio de Desarrollo',
  startDate?: Date,
  durationHours: number = 2
): string {
  const start = startDate ? new Date(startDate) : new Date();
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const formatGCalDate = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const datesParam = `${formatGCalDate(start)}/${formatGCalDate(end)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location,
    dates: datesParam,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
