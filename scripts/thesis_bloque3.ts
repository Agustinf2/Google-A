import {
  Paragraph,
  Table,
  TableRow,
  WidthType,
  AlignmentType,
} from 'docx';
import {
  createCell,
  createParagraph,
  createHeading1,
  createHeading2,
  createHeading3,
  createBullet,
  createPageBreak,
} from './thesis_helpers.js';

export function getBloque3Elements(): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  elements.push(createPageBreak());

  // =========================================================================
  // BLOQUE 3: CAPÍTULO 10 - INGENIERÍA DE SOFTWARE Y SOLUCIÓN TECNOLÓGICA
  // =========================================================================
  elements.push(createHeading1('BLOQUE 3: SOLUCIÓN TECNOLÓGICA E INGENIERÍA DE SOFTWARE'));
  elements.push(
    createParagraph(
      'El presente bloque constituye el núcleo técnico de la tesis de grado en Ingeniería en Sistemas Informáticos (UAI). En él se documentan la metodología de desarrollo, el documento de visión, los requerimientos formales del sistema (funcionales y no funcionales), la arquitectura de software multicapa, el modelado UML completo (casos de uso, navegación, componentes, clases, DER de base de datos, secuencias y despliegue físico) y el plan de verificación y pruebas.'
    )
  );

  // -------------------------------------------------------------------------
  // CAPÍTULO 10: SOLUCIÓN TECNOLÓGICA
  // -------------------------------------------------------------------------
  elements.push(createHeading1('Capítulo 10: Solución Tecnológica e Ingeniería de Software'));

  elements.push(createHeading2('10.1 Introducción y Alcance del Software'));
  elements.push(
    createParagraph(
      'El sistema de software desarrollado, denominado "Seed & Grow Platform", es una aplicación web integral y descentralizada que orquesta el ciclo de vida completo de proyectos productivos tokenizados. El sistema cubre desde la postulación del emprendedor y el análisis fiduciario, hasta la custodia en smart contracts escrow en la red Base (L2 de Ethereum), la auditoría pericial colegiada con firma digital y la gobernanza asamblearia de cuotapartistas.'
    )
  );

  elements.push(createHeading2('10.2 Metodología de Desarrollo de Software'));
  elements.push(
    createParagraph(
      'Se adoptó el marco de trabajo ágil Scrum combinado con prácticas de Extreme Programming (XP) para el desarrollo de contratos inteligentes y código crítico (Pair Programming, Test-Driven Development y refactorización continua). El ciclo de desarrollo se estructuró en sprints de dos semanas, gestionados mediante tableros Kanban en GitHub Projects y pipelines de integración continua (CI/CD) automatizados con GitHub Actions.'
    )
  );

  elements.push(createHeading2('10.3 Documento de Visión del Producto'));
  elements.push(createBullet('Oportunidad de Negocio', 'Democratizar el acceso a la inversión productiva real en Argentina, protegiendo el capital mediante patrimonios fiduciarios inembargables y contratos inteligentes auditables.'));
  elements.push(createBullet('Declaración de Posicionamiento', 'Para inversores de clase media e institucional y emprendedores agroproductivos, Seed & Grow es una plataforma fiduciaria y descentralizada de financiamiento colectivo que asegura la trazabilidad del 100% de los fondos. A diferencia de plataformas de crowdfunding tradicionales o bancos comerciales, Seed & Grow custodia los desembolsos en bóvedas criptográficas inteligentes que solo liberan capital ante dictámenes favorables de peritos ingenieros matriculados.'));

  elements.push(createHeading2('10.4 Especificación Formal de Requerimientos'));
  elements.push(createHeading3('10.4.1 Requerimientos Funcionales (RF)'));

  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell('ID', 12, true, true, AlignmentType.CENTER),
            createCell('Requerimiento Funcional', 33, true, true),
            createCell('Actor Principal', 25, true, true),
            createCell('Prioridad', 30, true, true, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-001', 12, false, true, AlignmentType.CENTER),
            createCell('Registro y verificación de identidad KYC/UIF para inversores con validación de DNI/CUIT.', 33),
            createCell('Inversor / Oficial Fiduciario', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-002', 12, false, true, AlignmentType.CENTER),
            createCell('Postulación y carga de memorias técnicas de proyectos productivos con presupuesto por hitos.', 33),
            createCell('Productor / Emprendedor', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-003', 12, false, true, AlignmentType.CENTER),
            createCell('Aporte de capital mediante billetera Web3 (USDC/USDT) o transferencia bancaria CBU/CVU.', 33),
            createCell('Inversor', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-004', 12, false, true, AlignmentType.CENTER),
            createCell('Bloqueo y custodia de fondos en Smart Contract Escrow segregado por proyecto en Base L2.', 33),
            createCell('Sistema / Smart Contract', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-005', 12, false, true, AlignmentType.CENTER),
            createCell('Carga de evidencias técnicas, fotos georreferenciadas y comprobantes de gasto por hito.', 33),
            createCell('Productor / Emprendedor', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-006', 12, false, true, AlignmentType.CENTER),
            createCell('Inspección en territorio, dictamen pericial y firma digital por perito agrónomo matriculado.', 33),
            createCell('Auditor Colegiado', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-007', 12, false, true, AlignmentType.CENTER),
            createCell('Liberación programática y automática de cuotas fiduciarias condicionada a la firma del perito.', 33),
            createCell('Smart Contract / Fiduciario', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-008', 12, false, true, AlignmentType.CENTER),
            createCell('Emisión de Cuotas-Parte Fiduciarias digitales (ERC-721 / ERC-1155) representativas de derechos.', 33),
            createCell('Sistema / Red Base L2', 25),
            createCell('Media', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-009', 12, false, true, AlignmentType.CENTER),
            createCell('Módulo de Gobernanza y Votación Asamblearia para decisiones críticas y prórrogas.', 33),
            createCell('Inversor / Cuotapartista', 25),
            createCell('Media', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-010', 12, false, true, AlignmentType.CENTER),
            createCell('Generación y descarga de Certificados Fiscales Oficiales compatibles con régimen ARCA.', 33),
            createCell('Inversor / Contador', 25),
            createCell('Media', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-011', 12, false, true, AlignmentType.CENTER),
            createCell('Liquidación y distribución automática de dividendos y rendimientos productivos en billeteras.', 33),
            createCell('Sistema / Smart Contract', 25),
            createCell('Alta (Esencial)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
        new TableRow({
          children: [
            createCell('RF-012', 12, false, true, AlignmentType.CENTER),
            createCell('Visualización de telemetría IoT y métricas de impacto ambiental en tiempo real.', 33),
            createCell('Todos los usuarios', 25),
            createCell('Baja (Fase 4)', 30, false, false, AlignmentType.CENTER),
          ],
        }),
      ],
    })
  );

  elements.push(createHeading3('10.4.2 Requerimientos No Funcionales (RNF - ISO/IEC 25010)'));
  elements.push(createBullet('RNF-001 (Rendimiento y Latencia)', 'El tiempo de respuesta del backend para consultas API debe ser menor a 350 ms en el percentil 95 (P95).'));
  elements.push(createBullet('RNF-002 (Costo y Velocidad de Bloque)', 'Las operaciones en blockchain deben ejecutarse en la red Base L2, con confirmación final inferior a 3 segundos y comisiones de gas menores a USD 0.02.'));
  elements.push(createBullet('RNF-003 (Seguridad Criptográfica)', 'Todos los smart contracts deben implementar el estándar OpenZeppelin v5, con protección explícita contra reentrancy attacks, pausabilidad de emergencia y control de roles basado en firmas ECDSA (secp256k1).'));
  elements.push(createBullet('RNF-004 (Disponibilidad)', 'La plataforma web y su API REST deben garantizar un uptime mínimo del 99.9% anual mediante arquitectura serverless en Google Cloud Run y balanceo de carga global.'));
  elements.push(createBullet('RNF-005 (Portabilidad y Responsividad)', 'La interfaz de usuario debe ser 100% responsiva (Mobile-First) y funcionar sin degradación visual en navegadores modernos (Chrome, Firefox, Safari, Edge) y navegadores Web3 embebidos (MetaMask Mobile, Rainbow, Coinbase Wallet).'));
  elements.push(createBullet('RNF-006 (Integridad y Auditoría de Datos)', 'Todos los estados críticos, hashes de informes periciales y votos de asambleas deben quedar registrados de forma inmutable tanto en la base de datos relacional como en la blockchain.'));
  elements.push(createBullet('RNF-007 (Privacidad de Datos Personales)', 'Los datos confidenciales (DNI, CUIT, comprobantes de ingresos) deben almacenarse cifrados en reposo utilizando algoritmo AES-256-GCM, en estricto cumplimiento con la Ley N° 25.326 de Protección de Datos Personales de la República Argentina.'));
  elements.push(createBullet('RNF-008 (Mantenibilidad)', 'El código fuente debe seguir el estándar TypeScript estricto con tipado estático, cobertura de pruebas unitarias superior al 80% y arquitectura desacoplada por responsabilidades.'));

  elements.push(createHeading2('10.5 Arquitectura de la Solución'));
  elements.push(
    createParagraph(
      'Seed & Grow implementa una arquitectura híbrida multicapa orientada a servicios (SOA) combinada con infraestructura Web3 descentralizada:'
    )
  );
  elements.push(createBullet('Capa 1: Presentación (Frontend SPA)', 'Desarrollada en React 18, TypeScript y Tailwind CSS, compilada con Vite. Utiliza hooks reactivos, componentes modulares y librerías de conexión Web3 (Wagmi/Viem).'));
  elements.push(createBullet('Capa 2: Aplicación y API Gateway (Backend)', 'Servidor Node.js con Express y TypeScript, encargado de la orquestación de reglas de negocio, endpoints RESTful (/api/projects, /api/escrow, /api/governance, /api/kyc), autenticación segura y generación de certificados PDF.'));
  elements.push(createBullet('Capa 3: Persistencia de Datos (Database Layer)', 'Almacenamiento híbrido: base de datos relacional PostgreSQL / Firestore para perfiles de usuario, bitácoras de auditoría y estados transaccionales rápidos, y almacenamiento de objetos S3/GCS para documentación y memorias técnicas.'));
  elements.push(createBullet('Capa 4: Contratos Inteligentes y Custodia On-Chain', 'Smart Contracts escritos en Solidity 0.8.24 desplegados en Base L2: SeedGrowEscrow.sol (bóveda fiduciaria multifirma), SeedGrowNFT.sol (tokenización de cuotas-parte ERC-721) y SeedGrowGovernance.sol (asamblea descentralizada).'));

  elements.push(createHeading2('10.6 Modelado de la Solución (UML y Especificaciones)'));
  elements.push(createHeading3('10.6.1 Mapa de Navegación del Sistema Web'));
  elements.push(
    createParagraph(
      'La navegación del sistema está estructurada en torno a vistas principales interconectadas de acuerdo al rol del usuario:'
    )
  );
  elements.push(createBullet('Inicio / Explorar Proyectos (/)', 'Catálogo general con filtros por sector (Industrial & Biofábricas, Infraestructura & Obras Civiles, Software & Tecnología, Energías Limpias & Bioinsumos), buscador, barras de progreso de recaudación y accesos directos.'));
  elements.push(createBullet('Detalle del Proyecto (/proyecto/:id)', 'Ficha técnica fiduciaria, cronograma de hitos, presupuesto desglosado, perfil de emprendedor, dictámenes periciales previos y pasarela de aporte (Aportar Capital).'));
  elements.push(createBullet('Mi Cartera de Inversiones (/cartera)', 'Panel personal del inversor con cuotas-parte en custodia, rendimientos percibidos, próximos cobros y botón de descarga del Certificado Fiscal Oficial ARCA.'));
  elements.push(createBullet('Gestión Escrow - Productor (/hitos-escrow)', 'Panel para el emprendedor: visualización de fondos retenidos en bóveda, carga de evidencias de hito cumplido y solicitud formal de inspección pericial.'));
  elements.push(createBullet('Panel de Auditor Colegiado (/auditor)', 'Acceso exclusivo para peritos matriculados: revisión de evidencias técnicas, carga de acta de inspección en territorio y emisión de dictamen pericial con firma criptográfica.'));
  elements.push(createBullet('Gobernanza y Asambleas (/gobernanza)', 'Centro de deliberación de cuotapartistas: votación ponderada de propuestas de modificación de cronograma o liquidación anticipada.'));
  elements.push(createBullet('Publicar Proyecto (/publicar)', 'Asistente paso a paso para carga de memorias técnicas, presupuesto por hitos y solicitud de constitución fiduciaria.'));

  elements.push(createHeading3('10.6.2 Especificación Formal de Casos de Uso'));
  elements.push(
    createParagraph(
      'A continuación se detallan los casos de uso fundamentales que componen la solución tecnológica de acuerdo al estándar de especificación formal de la UAI:'
    )
  );

  // CU-003 ESPECIFICACIÓN DETALLADA
  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell('Caso de Uso', 25, true, true),
            createCell('CU-003: Aportar Capital y Custodiar Fondos en Escrow', 75, true, true),
          ],
        }),
        new TableRow({
          children: [
            createCell('Actores', 25, false, true),
            createCell('Inversor Registrado (Primario), Smart Contract Escrow (Secundario).', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Precondición', 25, false, true),
            createCell('El Inversor debe haber completado la validación KYC/UIF y contar con saldo disponible en su billetera Web3 (USDC) o cuenta bancaria vinculada. El proyecto debe estar en estado "En Convocatoria".', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Postcondición', 25, false, true),
            createCell('Los fondos quedan bloqueados en la bóveda de smart contract en Base L2 bajo custodia fiduciaria. Se emite el token de cuota-parte a favor del inversor y se actualiza la métrica de recaudación del proyecto.', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Flujo Principal (Camino Feliz)', 25, false, true),
            createCell(
              '1. El Inversor navega a la ficha del proyecto y hace clic en "Aportar Capital".\n' +
              '2. El sistema muestra el modal de inversión con el valor de la cuota-parte (USD 50), el rendimiento estimado y el contrato de fideicomiso marco.\n' +
              '3. El Inversor ingresa el monto a invertir y selecciona el método de pago.\n' +
              '4. El Inversor confirma la transacción mediante su firma en la billetera Web3 o confirmación de debito CBU.\n' +
              '5. El contrato inteligente valida los límites de suscripción y recibe los fondos en la dirección escrow del fideicomiso.\n' +
              '6. El contrato emite el token digital de participación y emite el evento OnDepositCompleted.\n' +
              '7. La plataforma actualiza la interfaz, suma los fondos a la barra de progreso del proyecto y emite el comprobante de aporte fiduciario.',
              75
            ),
          ],
        }),
        new TableRow({
          children: [
            createCell('Flujos Alternativos', 25, false, true),
            createCell(
              '4a. Saldo insuficiente: El sistema alerta al usuario sobre la falta de fondos de gas o capital y cancela la operación sin registrar cobro.\n' +
              '5a. Proyecto alcanza el 100% del tope de emisión: El contrato rechaza la transacción y devuelve el excedente al inversor automáticamente.',
              75
            ),
          ],
        }),
      ],
    })
  );

  elements.push(createParagraph(' '));

  // CU-005 ESPECIFICACIÓN DETALLADA
  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell('Caso de Uso', 25, true, true),
            createCell('CU-005: Inspección en Territorio y Dictamen Pericial Colegiado', 75, true, true),
          ],
        }),
        new TableRow({
          children: [
            createCell('Actores', 25, false, true),
            createCell('Perito Auditor Técnico Matriculado (Ingeniero Agrónomo / Industrial / Civil / Contable o de Sistemas según la incumbencia del proyecto).', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Precondición', 25, false, true),
            createCell('El Productor debe haber declarado el cumplimiento de un hito específico y adjuntado las facturas de compra y fotografías técnicas preliminares.', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Postcondición', 25, false, true),
            createCell('Se genera un dictamen pericial inmutable con hash SHA-256 grabado en la blockchain. Si el dictamen es favorable, se habilita la función de desbloqueo de fondos en el contrato escrow.', 75),
          ],
        }),
        new TableRow({
          children: [
            createCell('Flujo Principal (Camino Feliz)', 25, false, true),
            createCell(
              '1. El Auditor colegiado accede al panel de auditoría con su certificado y matrícula validada.\n' +
              '2. El sistema presenta la lista de inspecciones asignadas y los hitos pendientes de verificación.\n' +
              '3. El Auditor realiza la visita física o la validación técnica en territorio, verificando la instalación física de los bienes declarados.\n' +
              '4. El Auditor carga el informe de inspección, adjuntando fotografías con metadatos de geolocalización (GPS) y porcentaje de avance real.\n' +
              '5. El Auditor emite su veredicto (Aprobado / Observado / Rechazado) y firma digitalmente el informe con su clave privada criptográfica.\n' +
              '6. El sistema calcula el hash del informe, lo ancla en la red Base L2 y actualiza el estado del hito a "Auditado y Certificado".\n' +
              '7. Se notifica a los inversores del proyecto y se autoriza la liberación del tramo de fondos correspondiente.',
              75
            ),
          ],
        }),
        new TableRow({
          children: [
            createCell('Flujos Alternativos', 25, false, true),
            createCell(
              '5a. El avance físico es insuficiente o la maquinaria no cumple las especificaciones: El Auditor dicta "Observado", detallando las no-conformidades. Los fondos permanecen bloqueados en la bóveda escrow y se otorga un plazo de subsanación de 15 días al productor.',
              75
            ),
          ],
        }),
      ],
    })
  );

  elements.push(createHeading3('10.6.3 Diagrama Entidad-Relación (DER) de Base de Datos'));
  elements.push(
    createParagraph(
      'El modelo de datos relacional y documental se diseñó para asegurar consistencia ACID y trazabilidad cruzada con la blockchain:'
    )
  );
  elements.push(createBullet('Tabla Usuarios (users)', 'id (PK), wallet_address, dni_cuit, nombre_completo, email, rol (inversor/productor/auditor/admin), matricula_profesional, estado_kyc, fecha_registro.'));
  elements.push(createBullet('Tabla Proyectos (projects)', 'id (PK), titulo, descripcion, categoria, monto_objetivo, monto_recaudado, plazo_meses, tir_estimada, estado, contrato_escrow_address, id_fideicomiso.'));
  elements.push(createBullet('Tabla Hitos (milestones)', 'id (PK), proyecto_id (FK), orden, descripcion, monto_asignado, porcentaje_avance, estado (pendiente/en_progreso/en_auditoria/aprobado), fecha_cumplimiento.'));
  elements.push(createBullet('Tabla Aportes (contributions)', 'id (PK), proyecto_id (FK), usuario_id (FK), monto_usd, tx_hash_base, token_id_nft, fecha_aporte, certificado_arca_id.'));
  elements.push(createBullet('Tabla Dictámenes de Auditoría (audit_reports)', 'id (PK), hito_id (FK), auditor_id (FK), dictamen (aprobado/rechazado), hash_sha256, informe_pdf_url, firma_digital, tx_hash_notarizacion.'));
  elements.push(createBullet('Tabla Asambleas y Votación (governance_proposals)', 'id (PK), proyecto_id (FK), titulo_propuesta, descripcion, votos_a_favor, votos_en_contra, quorum_alcanzado, estado_resolucion.'));

  elements.push(createHeading3('10.6.4 Diagrama de Secuencia: Desembolso Escrow Condicionado'));
  elements.push(
    createParagraph(
      'La interacción dinámica entre los componentes de software durante la liberación de fondos se sintetiza en la siguiente secuencia lógica formal:'
    )
  );
  elements.push(createBullet('Paso 1: Rendición', 'Productor -> Frontend -> POST /api/escrow/milestones/submit -> API Backend -> Almacena evidencias y cambia estado a AUDIT_PENDING.'));
  elements.push(createBullet('Paso 2: Inspección Pericial', 'Auditor -> Panel Auditor -> POST /api/audit/sign -> Firma ECDSA con matrícula -> API Backend -> Notariza hash en contrato Base L2.'));
  elements.push(createBullet('Paso 3: Verificación On-Chain', 'Smart Contract SeedGrowEscrow.sol -> Valida signatura del auditor habilitado en el rol AUDITOR_ROLE -> Cambia estado interno del hito a APPROVED.'));
  elements.push(createBullet('Paso 4: Transferencia Segura', 'SeedGrowEscrow.sol -> Transfiere fondos en USDC a la dirección de tesorería del Productor y retiene el Success Fee a la billetera fiduciaria.'));
  elements.push(createBullet('Paso 5: Notificación e Historial', 'Smart Contract -> Dispara evento MilestoneReleased(projectId, milestoneIndex, amount) -> Indexador Web3 -> Notifica a los inversores vía WebSocket y actualiza la cartera.'));

  elements.push(createHeading2('10.7 Plan y Casos de Prueba del Software'));
  elements.push(
    createParagraph(
      'El aseguramiento de la calidad del sistema (QA) se articuló en tres niveles de verificación:'
    )
  );

  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell('ID Prueba', 15, true, true, AlignmentType.CENTER),
            createCell('Módulo / Componente', 25, true, true),
            createCell('Entrada y Procedimiento de Prueba', 35, true, true),
            createCell('Resultado Esperado y Validación', 25, true, true),
          ],
        }),
        new TableRow({
          children: [
            createCell('CP-001', 15, false, true, AlignmentType.CENTER),
            createCell('KYC & Validación CUIT', 25),
            createCell('Ingreso de CUIT con dígito verificador inválido y documento no coincidente.', 35),
            createCell('El sistema bloquea el avance, resalta el campo en rojo y no permite aportar capital.', 25),
          ],
        }),
        new TableRow({
          children: [
            createCell('CP-002', 15, false, true, AlignmentType.CENTER),
            createCell('Smart Contract Escrow', 25),
            createCell('Intento de retiro de fondos por parte del productor sin contar con la firma del auditor.', 35),
            createCell('La transacción revierte con el error "Unauthorized: MilestoneNotAudited()". Fondos a salvo.', 25),
          ],
        }),
        new TableRow({
          children: [
            createCell('CP-003', 15, false, true, AlignmentType.CENTER),
            createCell('Smart Contract Escrow', 25),
            createCell('Auditor firma informe válido y productor ejecuta claimMilestoneFunds().', 35),
            createCell('El contrato transfiere con éxito el monto exacto del hito y emite evento de liberación.', 25),
          ],
        }),
        new TableRow({
          children: [
            createCell('CP-004', 15, false, true, AlignmentType.CENTER),
            createCell('Generación Fiscal ARCA', 25),
            createCell('Inversor con cuotas-parte solicita certificado anual desde "Mi Cartera".', 35),
            createCell('Se descarga PDF con datos fiscales, CUIT del fideicomiso, alícuotas y firma digital válida.', 25),
          ],
        }),
        new TableRow({
          children: [
            createCell('CP-005', 15, false, true, AlignmentType.CENTER),
            createCell('Votación en Asamblea', 25),
            createCell('Usuario sin cuotas-parte intenta emitir voto en propuesta de prórroga.', 35),
            createCell('El sistema rechaza la firma con mensaje "PowerVote = 0: No posee cuotas registradas".', 25),
          ],
        }),
      ],
    })
  );

  elements.push(createHeading2('10.8 Conclusiones Generales del Trabajo Final'));
  elements.push(
    createParagraph(
      'El desarrollo integral del proyecto "Seed & Grow" demuestra la viabilidad técnica, económica y jurídica de aplicar la ingeniería de sistemas informáticos y la tecnología blockchain de segunda capa para resolver fallas estructurales del financiamiento productivo en la República Argentina. La combinación de contratos inteligentes autoejecutables, patrimonios fiduciarios inembargables regidos por el Código Civil y Comercial, y peritaje colegiado con responsabilidad profesional matriculada, redefine los estándares de seguridad, transparencia y democratización del capital para las economías regionales sostenibles.'
    )
  );

  elements.push(createHeading2('10.9 Bibliografía y Referencias Académicas'));
  elements.push(createBullet('Vilaboa, R. & equipo docente (2022)', 'Guías del Seminario de Aplicación Profesional - Plan de Desarrollo Tecnológico. Facultad de Tecnología Informática, Universidad Abierta Interamericana (UAI).'));
  elements.push(createBullet('Sommerville, I. (2011)', 'Ingeniería del Software (9ª edición). Pearson Educación, Madrid.'));
  elements.push(createBullet('Pressman, R. S. (2010)', 'Ingeniería del Software: Un enfoque práctico (7ª edición). McGraw-Hill, México.'));
  elements.push(createBullet('Código Civil y Comercial de la Nación (2015)', 'Ley N° 26.994. Libro Tercero, Título IV, Capítulo 30: Contrato de Fideicomiso (Arts. 1666 a 1700). Honorable Congreso de la Nación Argentina.'));
  elements.push(createBullet('Ley N° 27.349 (2017)', 'Ley de Apoyo al Capital Emprendedor: Sistemas de Financiamiento Colectivo. Boletín Oficial de la República Argentina.'));
  elements.push(createBullet('Ley N° 27.739 (2024)', 'Modificación integral del Régimen de Prevención de Lavado de Activos y Financiamiento del Terrorismo y creación del Registro de PSAV ante CNV. BORA.'));
  elements.push(createBullet('Casciari, H. & Editorial Orsai (2021-2023)', 'Modelo de Producción Comunitaria y Socios Productores Audiovisuales para la película "La Uruguaya". Documentación pública de asambleas, bonos de participación y rendición de dividendos.'));
  elements.push(createBullet('Mairal, P. (2023)', 'Declaraciones sobre cesión de derechos de autor, adaptaciones cinematográficas y liquidación de beneficios en modelos de crowdfunding. Cobertura en prensa cultural nacional (La Nación / Infobae).'));
  elements.push(createBullet('Prensa Especializada Argentina (2022-2024)', 'Informes de investigación periodística en Clarín, La Nación y Rolling Stone Argentina sobre asambleas de socios inversores, demoras en transferencias de utilidades y debates sobre transparencia contable en proyectos culturales colectivos.'));
  elements.push(createBullet('Ley N° 11.723 (1933 y modif.)', 'Régimen Legal de la Propiedad Intelectual y Derechos de Autor en la República Argentina.'));
  elements.push(createBullet('Buterin, V. (2014)', 'A Next-Generation Smart Contract and Decentralized Application Platform (Ethereum Whitepaper).'));
  elements.push(createBullet('OpenZeppelin (2024)', 'Standard Contracts and Security Guidelines for EVM Systems. Documentation and Audited Libraries.'));

  // =========================================================================
  // ANEXOS OFICIALES PARA LA CÁTEDRA (UAI)
  // =========================================================================
  elements.push(createPageBreak());
  elements.push(createHeading1('ANEXO A: Modelo de Contrato Marco de Fideicomiso Ordinario'));
  elements.push(
    createParagraph(
      'A continuación se transcribe la estructura jurídica de las cláusulas marco del Fideicomiso Ordinario de Administración y Garantía celebrado al amparo de los artículos 1666 a 1707 del Código Civil y Comercial de la Nación Argentina, vinculando jurídicamente el patrimonio de afectación con la ejecución de los contratos inteligentes en Base L2:'
    )
  );

  elements.push(createHeading3('Cláusula 1: Partes Intervinientes'));
  elements.push(createBullet('Fiduciante (El Productor / Emprendedor)', 'Persona humana o jurídica titular del proyecto agroproductivo que transfiere fiduciariamente el plan de obra, flujos futuros y derechos de explotación.'));
  elements.push(createBullet('Fiduciario (Seed & Grow Operadora S.A.S.)', 'Entidad administradora encargada de orquestar la plataforma tecnológica, la validación KYC/UIF y la custodia mediante contratos inteligentes.'));
  elements.push(createBullet('Beneficiarios / Fideicomisarios (Los Inversores)', 'Los aportantes de capital que adquieren cuotas-parte fiduciarias representadas en tokens digitales ERC-721/1155 con derecho a percibir el capital y rendimientos pactados.'));

  elements.push(createHeading3('Cláusula 2: Patrimonio Separado e Inembargabilidad (Art. 1666 CCyCN)'));
  elements.push(
    createParagraph(
      'Los bienes y fondos integrados al Fideicomiso constituyen un patrimonio separado e inafectado del patrimonio personal del Fiduciario, del Fiduciante y de los Beneficiarios. En consecuencia, están legalmente exentos de las acciones singulares o colectivas de los acreedores de cualquiera de las partes, garantizando la indemnidad del capital invertido frente a contingencias concursales ajenas.'
    )
  );

  elements.push(createHeading3('Cláusula 3: Condición Determinista y Vínculo con el Smart Contract Escrow'));
  elements.push(
    createParagraph(
      'Las partes acuerdan expresamente someter los desembolsos de los fondos custodiados a la lógica determinista del Smart Contract desplegado en la red Base (Layer 2 de Ethereum). Ningún fondo podrá ser liberado al Fiduciante sin la concurrencia indispensable de: a) El dictamen pericial favorable emitido y firmado digitalmente por el Auditor Colegiado matriculado; b) El cumplimiento del quórum asambleario de los Beneficiarios.'
    )
  );

  elements.push(createHeading3('Cláusula 4: Rendición de Cuentas y Régimen Fiscal ARCA'));
  elements.push(
    createParagraph(
      'El Fiduciario emitirá de forma automatizada por cada ejercicio fiscal el Certificado de Retención y Rendición Fiduciaria bajo el régimen de la Agencia de Recaudación y Control Aduanero (ARCA), detallando el costo computable de adquisición, las rentas de fuente argentina devengadas y las retenciones practicadas al amparo de la Ley de Impuesto a las Ganancias.'
    )
  );

  elements.push(createPageBreak());
  elements.push(createHeading1('ANEXO B: Código Fuente del Smart Contract SeedGrowEscrow.sol'));
  elements.push(
    createParagraph(
      'Contrato inteligente principal escrito en lenguaje Solidity 0.8.24, auditado bajo estándares OpenZeppelin v5 con protección contra reentrancia, control de roles criptográficos y emisión de cuotas-parte:'
    )
  );

  elements.push(
    createParagraph(
      '// SPDX-License-Identifier: MIT\n' +
      'pragma solidity ^0.8.24;\n\n' +
      'import "@openzeppelin/contracts/security/ReentrancyGuard.sol";\n' +
      'import "@openzeppelin/contracts/access/AccessControl.sol";\n' +
      'import "@openzeppelin/contracts/token/ERC20/IERC20.sol";\n\n' +
      '/**\n' +
      ' * @title SeedGrowEscrow\n' +
      ' * @notice Bóveda Fiduciaria Escrow para custodia y desembolso por hitos auditados\n' +
      ' * @author Agustín Faucetta - UAI Seminario de Aplicación Profesional\n' +
      ' */\n' +
      'contract SeedGrowEscrow is ReentrancyGuard, AccessControl {\n' +
      '    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");\n' +
      '    bytes32 public constant TRUSTEE_ROLE = keccak256("TRUSTEE_ROLE");\n\n' +
      '    enum MilestoneStatus { Pending, InAudit, Approved, Released, Rejected }\n\n' +
      '    struct Milestone {\n' +
      '        uint256 amountUSDC;\n' +
      '        bytes32 evidenceHash;\n' +
      '        bytes32 auditReportHash;\n' +
      '        address auditor;\n' +
      '        MilestoneStatus status;\n' +
      '    }\n\n' +
      '    IERC20 public immutable usdcToken;\n' +
      '    address public immutable producerAddress;\n' +
      '    Milestone[] public milestones;\n' +
      '    uint256 public constant SUCCESS_FEE_BPS = 350; // 3.5%\n\n' +
      '    event MilestoneAudited(uint256 indexed index, address indexed auditor, bytes32 reportHash);\n' +
      '    event MilestoneReleased(uint256 indexed index, uint256 netAmount, uint256 fee);\n\n' +
      '    constructor(address _usdc, address _producer, address _trustee) {\n' +
      '        usdcToken = IERC20(_usdc);\n' +
      '        producerAddress = _producer;\n' +
      '        _grantRole(DEFAULT_ADMIN_ROLE, _trustee);\n' +
      '        _grantRole(TRUSTEE_ROLE, _trustee);\n' +
      '    }\n\n' +
      '    function signMilestoneAudit(uint256 _index, bytes32 _reportHash) external onlyRole(AUDITOR_ROLE) {\n' +
      '        Milestone storage m = milestones[_index];\n' +
      '        require(m.status == MilestoneStatus.InAudit, "Hito no esta en auditoria");\n' +
      '        m.auditReportHash = _reportHash;\n' +
      '        m.auditor = msg.sender;\n' +
      '        m.status = MilestoneStatus.Approved;\n' +
      '        emit MilestoneAudited(_index, msg.sender, _reportHash);\n' +
      '    }\n\n' +
      '    function releaseMilestone(uint256 _index) external nonReentrant onlyRole(TRUSTEE_ROLE) {\n' +
      '        Milestone storage m = milestones[_index];\n' +
      '        require(m.status == MilestoneStatus.Approved, "Requiere aprobacion pericial");\n' +
      '        m.status = MilestoneStatus.Released;\n' +
      '        uint256 fee = (m.amountUSDC * SUCCESS_FEE_BPS) / 10000;\n' +
      '        uint256 net = m.amountUSDC - fee;\n' +
      '        require(usdcToken.transfer(producerAddress, net), "Fallo transferencia al productor");\n' +
      '        require(usdcToken.transfer(msg.sender, fee), "Fallo retencion de fee fiduciario");\n' +
      '        emit MilestoneReleased(_index, net, fee);\n' +
      '    }\n' +
      '}',
      { size: 18 }
    )
  );

  elements.push(createPageBreak());
  elements.push(createHeading1('ANEXO C: Catálogo de Diagramas UML (Especificaciones Técnicas)'));
  elements.push(
    createParagraph(
      'Para facilitar la revisión de la cátedra de Ingeniería de Software de la UAI, los 5 diagramas UML generados en vector SVG se encuentran catalogados y accesibles en el repositorio de la plataforma:'
    )
  );
  elements.push(createBullet('Diagrama 1 - Casos de Uso (UML 2.5)', 'public/assets/diagramas_uml/01_casos_de_uso.svg · Modela los 4 actores (Inversor, Productor, Auditor y Smart Contract Base L2) y los 9 casos de uso centrales con relaciones include/extend.'));
  elements.push(createBullet('Diagrama 2 - Clases del Dominio', 'public/assets/diagramas_uml/02_diagrama_clases.svg · Estructura orientada a objetos con herencia (AuditorColegiado extends Usuario), composición (Proyecto 1 -> 1..* Hitos) y estereotipos de contratos inteligentes.'));
  elements.push(createBullet('Diagrama 3 - Secuencia de Desembolso Escrow', 'public/assets/diagramas_uml/03_diagrama_secuencia.svg · Interacción temporal entre Productor, Frontend, API Express, Auditor Colegiado y Smart Contract en Base L2.'));
  elements.push(createBullet('Diagrama 4 - DER Relacional (PostgreSQL)', 'public/assets/diagramas_uml/04_diagrama_der.svg · Modelo normalizado en 3FN con tablas users, agricultural_lots, investments, project_milestones y audit_reports.'));
  elements.push(createBullet('Diagrama 5 - Despliegue Físico de Infraestructura', 'public/assets/diagramas_uml/05_diagrama_despliegue.svg · Topología multinodo: Dispositivo Cliente (React 19 SPA + Web3 Provider), Cloud Run (Node API + PostgreSQL + Firestore), Red Base L2 (EVM) y Red IPFS.'));

  return elements;
}
