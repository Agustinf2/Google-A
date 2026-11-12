import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, type AuthRequest } from './src/middleware/auth.ts';
import {
  getAllLots,
  getLotBySlug,
  getOfficialDocuments,
  getGovernanceProposals,
  voteOnProposal,
  getIotTelemetry,
  getOrCreateUser,
  recordInvestment,
} from './src/db/queries.ts';
import { getPitchDeckHtml } from './src/pitch_deck_html.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes backed by PostgreSQL
  app.get('/api/lots', async (_req, res) => {
    try {
      const lots = await getAllLots();
      res.json({ success: true, data: lots });
    } catch (error: any) {
      console.error('Error fetching lots:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch agricultural lots' });
    }
  });

  app.get('/api/lots/:slug', async (req, res) => {
    try {
      const lot = await getLotBySlug(req.params.slug);
      if (!lot) {
        return res.status(404).json({ success: false, error: 'Lot not found' });
      }
      res.json({ success: true, data: lot });
    } catch (error: any) {
      console.error('Error fetching lot details:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch lot' });
    }
  });

  app.get('/api/documents', async (req, res) => {
    try {
      const lotId = req.query.lotId ? Number(req.query.lotId) : undefined;
      const documents = await getOfficialDocuments(lotId);
      res.json({ success: true, data: documents });
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch certificates' });
    }
  });

  app.get('/api/proposals', async (_req, res) => {
    try {
      const proposals = await getGovernanceProposals();
      res.json({ success: true, data: proposals });
    } catch (error: any) {
      console.error('Error fetching governance proposals:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch proposals' });
    }
  });

  app.post('/api/proposals/:id/vote', async (req, res) => {
    try {
      const proposalId = Number(req.params.id);
      const { support } = req.body;
      const updated = await voteOnProposal(proposalId, Boolean(support));
      res.json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error casting vote:', error);
      res.status(500).json({ success: false, error: 'Failed to register vote' });
    }
  });

  app.get('/api/telemetry', async (req, res) => {
    try {
      const lotId = req.query.lotId ? Number(req.query.lotId) : undefined;
      const telemetry = await getIotTelemetry(lotId);
      res.json({ success: true, data: telemetry });
    } catch (error: any) {
      console.error('Error fetching telemetry:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch telemetry' });
    }
  });

  // Sync user profile upon sign-in (Google / Firebase Auth)
  app.post('/api/auth/sync', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid || req.body.uid;
      const email = req.user?.email || req.body.email;
      const displayName = req.body.displayName;
      const walletAddress = req.body.walletAddress;

      if (!uid || !email) {
        return res.status(400).json({ success: false, error: 'UID and email are required' });
      }

      const user = await getOrCreateUser(uid, email, displayName, walletAddress);
      res.json({ success: true, data: user });
    } catch (error: any) {
      console.error('Error syncing user:', error);
      res.status(500).json({ success: false, error: 'Failed to synchronize user profile' });
    }
  });

  // Record investment
  app.post('/api/investments', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid || req.body.uid;
      const { lotId, tokensPurchased, amountUsd, txHash } = req.body;

      if (!uid || !lotId || !tokensPurchased || !amountUsd) {
        return res.status(400).json({ success: false, error: 'Missing investment parameters' });
      }

      const investment = await recordInvestment(uid, Number(lotId), Number(tokensPurchased), Number(amountUsd), txHash);
      res.json({ success: true, data: investment });
    } catch (error: any) {
      console.error('Error recording investment:', error);
      res.status(500).json({ success: false, error: 'Failed to process investment' });
    }
  });

  // Initialize Google GenAI client if GEMINI_API_KEY is available
  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // AI Assistant Chatbot Endpoint for Seed & Grow
  app.post('/api/chat/assistant', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, error: 'Mensaje requerido' });
      }

      // If GEMINI_API_KEY is present, call Gemini 3.8 Flash model
      if (ai) {
        try {
          const systemInstruction = `Eres "SeedBot", el asistente virtual oficial de Seed & Grow (plataforma de financiamiento colectivo fiduciario con contratos inteligentes de custodia escrow en Base Layer 2, desarrollada por Agustín Faucetta para su Trabajo Final de Grado en la Universidad Abierta Interamericana - UAI, cátedra de los profesores Matías Pablo Banega y Alejandro Roberto Sartorio).

Conocimientos clave:
1. Enfoque Multisectorial Productivo: La plataforma abarca proyectos de la economía real: plantas industriales y biofábricas, obras de infraestructura civil, pymes de software y robótica, energías limpias y renovables, y bioinsumos agroproductivos. Seed & Grow NO financia cine ni producciones audiovisuales, ni sigue esquemas informales como el de Hernán Casciari. Si te preguntan por Casciari u Orsai, aclara que en la tesis se analiza únicamente como un contraejemplo o antipatrón de financiamiento informal sin auditoría independiente que sufrió controversias públicas, a diferencia de Seed & Grow que usa contratos inteligentes auditados y fideicomiso inembargable.
2. Doble Candado: Fideicomiso Ordinario inembargable (Arts. 1666 a 1700 del Código Civil y Comercial de la Nación) + Smart Contracts Escrow multi-firma 3/5 en Base L2. Los fondos jamás se entregan completos por adelantado.
3. Panel Pericial Colegiado: Peritos matriculados según disciplina técnica (Ingenieros Industriales y Químicos, Ingenieros Civiles, Ingenieros en Sistemas, Ingenieros Agrónomos/Ambientales y Contadores Públicos) que auditan cada hito fáctico con hash SHA-256 antes del desembolso.
4. Rampa Dual: Aportes en ARS (CBU / Mercado Pago) o USDC en Base L2, con Certificado Fiscal oficial para ARCA (Art. 98 Ley de Ganancias).
5. Métricas de Tesis: Inversión USD 35.000, VAN USD 184.250, TIR 48.7%, Payback 14 meses, Punto de Equilibrio mes 9.

Responde siempre en español rioplatense neutro, claro, empático, sin inventar hechos y ofreciendo siempre respuestas directas y fundamentadas.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nPregunta del usuario: ${message}` }],
              },
            ],
          });

          const replyText = response.text || '';
          return res.json({
            success: true,
            reply: replyText,
            actions: getContextualActions(message),
          });
        } catch (genError) {
          console.warn('Gemini generateContent call threw, fallback to domain engine:', genError);
        }
      }

      // Fallback Engine with complete domain accuracy
      const fallback = generateDomainBotReply(message);
      return res.json({
        success: true,
        reply: fallback.text,
        actions: fallback.actions,
      });
    } catch (error: any) {
      console.error('Error in assistant chat endpoint:', error);
      res.status(500).json({
        success: false,
        reply: 'Ocurrió un error temporal en el asistente. Por favor, reintenta en instantes.',
      });
    }
  });

  // Dedicated download endpoint with Content-Disposition attachment for Word (.docx)
  app.get(['/api/download/uai-thesis', '/api/download/uai-thesis-docx', '/api/download/uai-word'], (_req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx"');
    res.download(filePath, 'Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx', (err) => {
      if (err) {
        console.error('Error downloading docx file:', err);
        if (!res.headersSent) {
          res.status(500).send('Error downloading file');
        }
      }
    });
  });

  // Dedicated download endpoint with Content-Disposition attachment for Financial Model Excel (.xlsx)
  app.get(['/api/download/uai-excel', '/api/download/uai-financial-excel', '/api/download/uai-financial-model'], (_req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx"');
    res.download(filePath, 'Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx', (err) => {
      if (err) {
        console.error('Error downloading excel file:', err);
        if (!res.headersSent) {
          res.status(500).send('Error downloading excel file');
        }
      }
    });
  });

  // Dedicated direct download page for Excel (.xlsx)
  app.get('/descargar-excel', (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descargar Plan Financiero Excel (.xlsx) - Agustín Faucetta</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #fbf9f5;
      color: #1d1b19;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2ddd7;
      border-radius: 20px;
      padding: 40px;
      max-width: 580px;
      width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #e6f4ea;
      color: #006c48;
      font-weight: 700;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #012d1d;
      margin: 0 0 12px;
      line-height: 1.3;
    }
    p {
      color: #555;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #006c48;
      color: #ffffff;
      font-weight: 700;
      font-size: 15px;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      transition: background 0.2s, transform 0.1s;
      cursor: pointer;
      border: none;
      width: 100%;
      box-sizing: border-box;
    }
    .btn:hover {
      background: #012d1d;
      transform: translateY(-1px);
    }
    .info {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0eae1;
      font-size: 12px;
      color: #888;
      text-align: left;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .info-row strong {
      color: #333;
    }
    .links-extra {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .links-extra a {
      font-size: 13px;
      color: #006c48;
      font-weight: 700;
      text-decoration: none;
    }
    .links-extra a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">UAI · Seminario de Aplicación Profesional</div>
    <h1>Modelo Económico y Financiero<br>Seed &amp; Grow</h1>
    <p>Planilla oficial en formato <strong>Microsoft Excel (.xlsx)</strong> con 7 hojas dinámicas, fórmulas financieras de VAN ($184.250), TIR (48.7%), Payback (14 meses) y Cash Flow mensualizado para el Capítulo 8 de la tesis UAI.</p>
    
    <a id="downloadBtn" href="/api/download/uai-excel" class="btn" download="Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Descargar Plan Financiero Excel (.xlsx)
    </a>

    <div class="info">
      <div class="info-row"><span>Archivo:</span> <strong>Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx</strong></div>
      <div class="info-row"><span>Hojas:</span> <strong>7 Hojas (Carátula, CAPEX, Costos, Ingresos, P&L, Cash Flow, VAN/TIR)</strong></div>
      <div class="info-row"><span>Autor:</span> <strong>Agustín Faucetta (Ing. en Sistemas)</strong></div>
      <div class="info-row"><span>Cátedra:</span> <strong>Prof. Banega, Matías · Prof. Sartorio, Alejandro</strong></div>
    </div>

    <div class="links-extra">
      <a href="/descargar-tesis">Descargar Tesis Word (.docx)</a>
      <span>·</span>
      <a href="/pitch-deck">Ver Pitch Deck</a>
      <span>·</span>
      <a href="/descargas-academicas">Centro de Entregas</a>
    </div>
  </div>

  <script>
    setTimeout(function() {
      document.getElementById('downloadBtn').click();
    }, 800);
  </script>
</body>
</html>`);
  });

  // Dedicated direct download page for Word (.docx)
  app.get(['/descargar-tesis', '/descargar-word'], (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descargar Tesis SAP UAI - Agustín Faucetta</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #fbf9f5;
      color: #1d1b19;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2ddd7;
      border-radius: 20px;
      padding: 40px;
      max-width: 580px;
      width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #e6f4ea;
      color: #006c48;
      font-weight: 700;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #012d1d;
      margin: 0 0 12px;
      line-height: 1.3;
    }
    p {
      color: #555;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #012d1d;
      color: #ffffff;
      font-weight: 700;
      font-size: 15px;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      transition: background 0.2s, transform 0.1s;
      cursor: pointer;
      border: none;
      width: 100%;
      box-sizing: border-box;
    }
    .btn:hover {
      background: #006c48;
      transform: translateY(-1px);
    }
    .info {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0eae1;
      font-size: 12px;
      color: #888;
      text-align: left;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .info-row strong {
      color: #333;
    }
    .links-extra {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .links-extra a {
      font-size: 13px;
      color: #006c48;
      font-weight: 700;
      text-decoration: none;
    }
    .links-extra a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">UAI · Seminario de Aplicación Profesional</div>
    <h1>Trabajo Final de Grado<br>Seed &amp; Grow</h1>
    <p>Documento completo en formato <strong>Microsoft Word (.docx)</strong> con carátula formal, ficha de seguimiento, resumen ejecutivo, 10 capítulos y 3 anexos conforme a la guía de la Facultad de Tecnología Informática.</p>
    
    <a id="downloadBtn" href="/api/download/uai-thesis" class="btn" download="Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
      Descargar Documento Word (.docx)
    </a>

    <div class="info">
      <div class="info-row"><span>Archivo:</span> <strong>Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx</strong></div>
      <div class="info-row"><span>Autor:</span> <strong>Agustín Faucetta (Ing. en Sistemas)</strong></div>
      <div class="info-row"><span>Cátedra:</span> <strong>Prof. Banega, Matías · Prof. Sartorio, Alejandro</strong></div>
      <div class="info-row"><span>Estructura:</span> <strong>Bloque 1, Bloque 2 y Bloque 3 (Capítulos 1 al 10 + Anexos)</strong></div>
    </div>

    <div class="links-extra">
      <a href="/descargar-excel">Descargar Plan Financiero (.xlsx)</a>
      <span>·</span>
      <a href="/pitch-deck">Ver Pitch Deck</a>
      <span>·</span>
      <a href="/descargas-academicas">Centro de Entregas</a>
    </div>
  </div>

  <script>
    setTimeout(function() {
      document.getElementById('downloadBtn').click();
    }, 800);
  </script>
</body>
</html>`);
  });

  // Centralized Academic Delivery Center (both Word and Excel with clear 1-click downloads)
  app.get(['/descargas-academicas', '/entregas-uai', '/descargas'], (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centro de Descargas Académicas UAI - Agustín Faucetta</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #fbf9f5;
      color: #1d1b19;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      max-width: 900px;
      width: 100%;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .badge {
      display: inline-block;
      background: #e6f4ea;
      color: #006c48;
      font-weight: 700;
      font-size: 12px;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      color: #012d1d;
      margin: 0 0 10px;
      line-height: 1.2;
    }
    .subtitle {
      color: #666;
      font-size: 15px;
      margin: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 24px;
      margin-bottom: 30px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2ddd7;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .card-tag {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
    }
    .tag-word { background: #e8f0fe; color: #1a73e8; }
    .tag-excel { background: #e6f4ea; color: #137333; }
    .card h2 {
      font-size: 20px;
      font-weight: 800;
      color: #012d1d;
      margin: 0 0 10px;
    }
    .card p {
      font-size: 13px;
      color: #555;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .file-meta {
      background: #fbf9f5;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .file-meta-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      color: #666;
    }
    .file-meta-row strong {
      color: #1d1b19;
    }
    .btn-download {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 24px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-word {
      background: #012d1d;
      color: #ffffff;
    }
    .btn-word:hover {
      background: #006c48;
      transform: translateY(-2px);
    }
    .btn-excel {
      background: #006c48;
      color: #ffffff;
    }
    .btn-excel:hover {
      background: #012d1d;
      transform: translateY(-2px);
    }
    .extra-bar {
      background: #ffffff;
      border: 1px solid #e2ddd7;
      border-radius: 16px;
      padding: 20px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: gap;
      gap: 16px;
    }
    .extra-bar span {
      font-size: 14px;
      color: #444;
      font-weight: 600;
    }
    .btn-pitch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #800000;
      color: #fff;
      font-weight: 700;
      font-size: 13px;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
    }
    .btn-pitch:hover {
      background: #a00000;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Universidad Abierta Interamericana · Facultad de Tecnología Informática</div>
      <h1>Entregables de Tesis SAP</h1>
      <p class="subtitle">Alumno: <strong>Agustín Faucetta</strong> · Cátedra: <strong>Prof. Banega, Matías Pablo / Prof. Sartorio, Alejandro Roberto</strong></p>
    </div>

    <div class="grid">
      <!-- CARD 1: WORD -->
      <div class="card">
        <span class="card-tag tag-word">Word (.docx)</span>
        <div>
          <h2>Tesis Completa SAP (Capítulos 1 al 10)</h2>
          <p>Documento formal de tesis con carátula UAI, ficha de seguimiento, resumen ejecutivo, plan de negocios, plan de marketing, análisis legal fiduciario, arquitectura de software y 3 anexos normativos.</p>
          <div class="file-meta">
            <div class="file-meta-row"><span>Nombre:</span> <strong>Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx</strong></div>
            <div class="file-meta-row"><span>Tamaño:</span> <strong>~50 KB (Documento editable)</strong></div>
            <div class="file-meta-row"><span>Versión:</span> <strong>v2.0 (Multidisciplinario Productivo e Industrial)</strong></div>
          </div>
        </div>
        <a href="/api/download/uai-thesis" class="btn-download btn-word" download="Faucetta_Agustin_SAP_SeedAndGrow_UAI.docx">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Descargar Tesis Word (.docx)
        </a>
      </div>

      <!-- CARD 2: EXCEL -->
      <div class="card">
        <span class="card-tag tag-excel">Excel (.xlsx)</span>
        <div>
          <h2>Plan Económico y Financiero (Capítulo 8)</h2>
          <p>Planilla financiera con 7 hojas dinámicas: CAPEX/OPEX inicial (USD 35k), costos fijos y variables, proyección de ingresos a 3 años, estado de resultados, cash flow mensual y evaluación (VAN $184.250, TIR 48.7%, Payback 14m).</p>
          <div class="file-meta">
            <div class="file-meta-row"><span>Nombre:</span> <strong>Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx</strong></div>
            <div class="file-meta-row"><span>Tamaño:</span> <strong>~20 KB (Fórmulas activas de Excel)</strong></div>
            <div class="file-meta-row"><span>Contenido:</span> <strong>7 Hojas completas con formato institucional</strong></div>
          </div>
        </div>
        <a href="/api/download/uai-excel" class="btn-download btn-excel" download="Faucetta_Agustin_SAP_Plan_Financiero_SeedAndGrow.xlsx">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Descargar Plan Financiero (.xlsx)
        </a>
      </div>
    </div>

    <div class="extra-bar">
      <span>Presentación de Defensa Oral con 12 Diapositivas y Guión de Orador ('N'):</span>
      <a href="/pitch-deck" class="btn-pitch">
        <span>Abrir Pitch Deck Interactivo</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>
  </div>
</body>
</html>`);
  });

  // Dedicated interactive Pitch Deck presentation for oral defense
  app.get(['/pitch-deck', '/defensa'], (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(getPitchDeckHtml());
  });

  // Serve static assets from public folder (PDF manuals, .ics calendars, assets)
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Frontend integration: Vite middleware in development, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SeedGrow Server running with PostgreSQL on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

function getContextualActions(query: string) {
  const lower = query.toLowerCase();
  const actions: Array<{ label: string; screen?: string; url?: string }> = [];

  if (lower.includes('proyecto') || lower.includes('invertir') || lower.includes('lote') || lower.includes('explorar')) {
    actions.push({ label: 'Explorar Proyectos', screen: 'explorar' });
  }
  if (lower.includes('tesis') || lower.includes('word') || lower.includes('doc')) {
    actions.push({ label: 'Descargar Tesis (.docx)', url: '/descargar-word' });
  }
  if (lower.includes('excel') || lower.includes('van') || lower.includes('tir') || lower.includes('financier')) {
    actions.push({ label: 'Descargar Plan Excel (.xlsx)', url: '/descargar-excel' });
  }
  if (lower.includes('pitch') || lower.includes('defensa') || lower.includes('diapositiva') || lower.includes('oral')) {
    actions.push({ label: 'Ver Pitch Deck', url: '/pitch-deck' });
  }
  if (lower.includes('fideicomiso') || lower.includes('ley') || lower.includes('legal') || lower.includes('seguridad')) {
    actions.push({ label: 'Marco Legal y Fideicomiso', screen: 'seguimiento' });
  }

  if (actions.length === 0) {
    actions.push({ label: 'Explorar Proyectos', screen: 'explorar' });
    actions.push({ label: 'Defensa Pitch Deck', url: '/pitch-deck' });
  }

  return actions;
}

function generateDomainBotReply(message: string): { text: string; actions: Array<{ label: string; screen?: string; url?: string }> } {
  const lower = message.toLowerCase();

  if (lower.includes('dinero') || lower.includes('escrow') || lower.includes('smart contract') || lower.includes('candado') || lower.includes('proteg')) {
    return {
      text: 'En **Seed & Grow**, tu dinero cuenta con el mecanismo del **Doble Candado**:\n\n1. **Candado Jurídico (CCyCN 1666):** Cada proyecto constituye un Fideicomiso Ordinario creando un patrimonio de afectación separado e inembargable. No responde por deudas ni de la plataforma ni del promotor.\n2. **Candado Tecnológico (Smart Contract Escrow en Base L2):** Los fondos no se transfieren completos al promotor. Quedan bloqueados en contratos multi-firma 3/5 y solo se liberan tramo a tramo cuando un perito colegiado emite dictamen favorable y la asamblea de inversores vota la conformidad.',
      actions: [
        { label: 'Ver Proyectos', screen: 'explorar' },
        { label: 'Pitch Deck (Slide 3)', url: '/pitch-deck' },
      ],
    };
  }

  if (lower.includes('auditor') || lower.includes('quién audita') || lower.includes('perito') || lower.includes('colegiad') || lower.includes('inspecc')) {
    return {
      text: 'La plataforma implementa un **Panel Pericial Colegiado Multidisciplinario**, asignando al perito matriculado según la especialidad del proyecto:\n\n• **Biotecnología y Plantas Industriales:** Ingenieros Industriales o Químicos.\n• **Infraestructura y Obras Civiles:** Ingenieros Civiles o Arquitectos.\n• **Software, Robótica y Soluciones IT:** Ingenieros en Sistemas Informáticos.\n• **Bioinsumos y Recursos Naturales:** Ingenieros Agrónomos o Ambientales.\n• **Auditoría Contable y Financiera:** Contadores Públicos matriculados.\n\nCada perito responde civil y penalmente con su matrícula habilitada y firma el acta con hash criptográfico SHA-256 anclado on-chain.',
      actions: [
        { label: 'Ver Panel Auditor', screen: 'auditor' },
        { label: 'Pitch Deck (Slide 4)', url: '/pitch-deck' },
      ],
    };
  }

  if (lower.includes('tipo de proyecto') || lower.includes('rubro') || lower.includes('financiar') || lower.includes('abarca') || lower.includes('sectores')) {
    return {
      text: 'Seed & Grow abarca proyectos productivos, industriales, tecnológicos y sustentables de la economía real:\n\n1. **Biotecnología & Biofábricas** (producción de insumos biológicos y plantas de fermentación)\n2. **Infraestructura & Obras Civiles** (galpones industriales, instalaciones de acopio y energía)\n3. **Software, Robótica & Tecnología** (desarrollo IT, automatización e IoT)\n4. **Energías Limpias & Renovables** (parques solares, biogás y eficiencia)\n5. **Producción, Manufactura & Bioinsumos** (escalado productivo PyME)\n\nCada proyecto cuenta con Fideicomiso inembargable (CCyCN 1666) y Smart Contracts Escrow en Base L2.',
      actions: [
        { label: 'Explorar Proyectos', screen: 'explorar' },
        { label: 'Ver Pitch Deck', url: '/pitch-deck' },
      ],
    };
  }

  if (lower.includes('casciari') || lower.includes('orsai') || lower.includes('uruguaya') || lower.includes('pelicula') || lower.includes('cine')) {
    return {
      text: 'Seed & Grow **no financia proyectos cinematográficos ni audiovisuales, ni adopta el esquema informal de Hernán Casciari**.\n\nEn la fundamentación teórica de la tesis de grado para la UAI, ese caso se analiza únicamente a título académico como un **antipatrón de financiamiento informal**: una muestra fáctica de lo que ocurre cuando se recauda dinero de miles de personas sin contratos inteligentes autoejecutables, sin segregación fiduciaria legal (CCyCN 1666) y sin auditorías periciales colegiadas e independientes, lo cual derivó en demoras, reclamos y controversias públicas.\n\nSeed & Grow se enfoca 100% en la economía productiva real: biofábricas, industria, infraestructura, robótica y software con peritaje vinculante de ingenieros matriculados.',
      actions: [
        { label: 'Ver Solución Escrow', screen: 'explorar' },
        { label: 'Descargar Tesis (.docx)', url: '/descargar-word' },
      ],
    };
  }

  if (lower.includes('pesos') || lower.includes('cbu') || lower.includes('transferencia') || lower.includes('mercado pago') || lower.includes('ars')) {
    return {
      text: '¡Exacto! Seed & Grow cuenta con una **Rampa Dual Fiat-Crypto**:\n\n• Puedes invertir en **Pesos Argentinos (ARS)** mediante transferencia bancaria (CBU) o billetera virtual (CVU / Mercado Pago).\n• O bien conectar tu billetera Web3 y aportar en **USDC** sobre la red Base Layer 2 con costos de gas inferiores a USD 0,01.\n\nAmbas vías reciben su cuota-parte fiduciaria tokenizada y el Certificado Fiscal oficial para ARCA bajo el Art. 98 de Impuesto a las Ganancias.',
      actions: [
        { label: 'Explorar Opciones de Aporte', screen: 'explorar' },
        { label: 'Ver Cartera', screen: 'cartera' },
      ],
    };
  }

  if (lower.includes('van') || lower.includes('tir') || lower.includes('payback') || lower.includes('financier') || lower.includes('rentab') || lower.includes('costo')) {
    return {
      text: 'Las métricas económico-financieras de la tesis UAI (Capítulo 8) son:\n\n• **Inversión Inicial:** USD 35.000 (MVP, auditoría smart contracts y legal).\n• **VAN (Valor Actual Neto al 15% de corte):** + USD 184.250 (crea valor neto positivo).\n• **TIR (Tasa Interna de Retorno):** 48.7% anual (supera ampliamente el WACC del 15%).\n• **Payback (Recupero de la inversión):** 14 meses.\n• **Punto de Equilibrio (Break-Even):** Mes 9 con USD 53.750/mes intermediados.',
      actions: [
        { label: 'Descargar Excel (.xlsx)', url: '/descargar-excel' },
        { label: 'Pitch Deck (Slide 7)', url: '/pitch-deck' },
      ],
    };
  }

  if (lower.includes('word') || lower.includes('excel') || lower.includes('descargar') || lower.includes('tesis') || lower.includes('entrega')) {
    return {
      text: 'Puedes descargar de forma directa y oficial todos los entregables académicos para la cátedra de los profesores Banega y Sartorio:\n\n• **Tesis Completa Word (.docx):** 10 Capítulos + 3 Anexos normativos.\n• **Plan Financiero Excel (.xlsx):** 7 Hojas de cálculo con fórmulas dinámicas de VAN, TIR y Cash Flow.\n• **Pitch Deck Interactivo:** Presentación de 12 diapositivas con guión del orador.',
      actions: [
        { label: 'Descargar Word (.docx)', url: '/descargar-word' },
        { label: 'Descargar Excel (.xlsx)', url: '/descargar-excel' },
        { label: 'Centro de Entregas', url: '/descargas-academicas' },
      ],
    };
  }

  return {
    text: 'Hola, soy **SeedBot**. Puedo asesorarte sobre cómo invertir en proyectos productivos y creativos, cómo funciona el fideicomiso inembargable (CCyCN 1666), el protocolo escrow en Base L2, el panel de peritos colegiados o las métricas de la tesis para la UAI. ¿En qué te gustaría profundizar?',
    actions: [
      { label: 'Explorar Proyectos', screen: 'explorar' },
      { label: 'Ver Pitch Deck', url: '/pitch-deck' },
      { label: 'Descargar Tesis', url: '/descargas-academicas' },
    ],
  };
}
