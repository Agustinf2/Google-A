import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
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
