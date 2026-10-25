import { db } from './index.ts';
import { users, agriculturalLots, iotTelemetry, officialDocuments, governanceProposals, investments } from './schema.ts';
import { eq, sql } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string, walletAddress?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
        walletAddress: walletAddress || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
          ...(walletAddress ? { walletAddress } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to get or create user:', error);
    throw new Error('Database operation failed. Unable to synchronize user profile.', { cause: error });
  }
}

export async function getAllLots() {
  try {
    return await db.select().from(agriculturalLots);
  } catch (error) {
    console.error('Failed to fetch agricultural lots:', error);
    throw new Error('Database query failed. Unable to fetch lots.', { cause: error });
  }
}

export async function getLotBySlug(slug: string) {
  try {
    const results = await db.select().from(agriculturalLots).where(eq(agriculturalLots.slug, slug));
    return results[0] || null;
  } catch (error) {
    console.error('Failed to fetch lot by slug:', error);
    throw new Error('Database query failed. Unable to fetch lot.', { cause: error });
  }
}

export async function getOfficialDocuments(lotId?: number) {
  try {
    if (lotId) {
      return await db.select().from(officialDocuments).where(eq(officialDocuments.lotId, lotId));
    }
    return await db.select().from(officialDocuments);
  } catch (error) {
    console.error('Failed to fetch official documents:', error);
    throw new Error('Database query failed. Unable to fetch documents.', { cause: error });
  }
}

export async function getGovernanceProposals() {
  try {
    return await db.select().from(governanceProposals);
  } catch (error) {
    console.error('Failed to fetch governance proposals:', error);
    throw new Error('Database query failed. Unable to fetch proposals.', { cause: error });
  }
}

export async function voteOnProposal(proposalId: number, support: boolean) {
  try {
    const updateColumn = support ? governanceProposals.votesFor : governanceProposals.votesAgainst;
    const updated = await db
      .update(governanceProposals)
      .set({
        votesFor: support ? sql`${governanceProposals.votesFor} + 1` : governanceProposals.votesFor,
        votesAgainst: !support ? sql`${governanceProposals.votesAgainst} + 1` : governanceProposals.votesAgainst,
      })
      .where(eq(governanceProposals.id, proposalId))
      .returning();

    return updated[0];
  } catch (error) {
    console.error('Failed to cast vote on proposal:', error);
    throw new Error('Database update failed. Unable to register vote.', { cause: error });
  }
}

export async function getIotTelemetry(lotId?: number) {
  try {
    if (lotId) {
      return await db.select().from(iotTelemetry).where(eq(iotTelemetry.lotId, lotId));
    }
    return await db.select().from(iotTelemetry);
  } catch (error) {
    console.error('Failed to fetch IoT telemetry:', error);
    throw new Error('Database query failed. Unable to fetch telemetry.', { cause: error });
  }
}

export async function recordInvestment(uid: string, lotId: number, tokensPurchased: number, amountUsd: number, txHash?: string) {
  try {
    const userList = await db.select().from(users).where(eq(users.uid, uid));
    if (!userList.length) {
      throw new Error('User not found');
    }
    const user = userList[0];

    const result = await db.insert(investments).values({
      userId: user.id,
      lotId,
      tokensPurchased,
      amountUsd,
      txHash: txHash || null,
    }).returning();

    // Increment funded amount on the lot
    await db
      .update(agriculturalLots)
      .set({
        fundedAmount: sql`${agriculturalLots.fundedAmount} + ${amountUsd}`,
      })
      .where(eq(agriculturalLots.id, lotId));

    return result[0];
  } catch (error) {
    console.error('Failed to record investment:', error);
    throw new Error('Database update failed. Unable to record investment.', { cause: error });
  }
}
