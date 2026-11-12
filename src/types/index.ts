export type ScreenView = 
  | 'landing'
  | 'explorar' 
  | 'seguimiento' 
  | 'cartera' 
  | 'publicar' 
  | 'hitos-escrow' 
  | 'auditor' 
  | 'gobernanza' 
  | 'login';

export type UserRole = 'investor' | 'creator' | 'auditor';

export interface KycData {
  fullName: string;
  dniCuil: string;
  nationality: string;
  isPep: boolean; // Persona Expuesta Políticamente
  fundsOrigin: string;
  taxStatus: string; // ej. Monotributo, Responsable Inscripto, Empleado
  documentNumber?: string;
  verificationHash: string;
  verifiedAt: string;
  riskScore: 'low' | 'medium' | 'high';
}

export interface UserAccount {
  type: 'wallet' | 'google' | 'email';
  addressOrEmail: string;
  name?: string;
  avatar?: string;
  balanceUSDC?: number;
  network?: string;
  kycStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
  kycData?: KycData;
}

export interface Project {
  id: string;
  title: string;
  category: 'diseno' | 'tecnologia' | 'sustentabilidad' | 'agro' | 'energia' | 'salud' | string;
  categoryLabel: string;
  location: string;
  daysLeft: number;
  description: string;
  fundedAmount: number;
  goalAmount: number;
  percentage: number;
  modality: 'participacion' | 'prestamo' | 'recompensa';
  modalityDetail: string;
  creatorName: string;
  creatorInitials: string;
  image: string;
  isBookmarked?: boolean;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  percentageTotal: number;
  status: 'disbursed' | 'audit_active' | 'pending' | 'planned';
  statusLabel: string;
  estimatedDate: string;
  criteria: string[];
  evidence?: {
    type: string;
    label: string;
    meta: string;
    icon?: string;
    thumb?: string;
  }[];
  voting?: {
    quorum: number;
    requiredQuorum: number;
    favorablePercentage: number;
    hoursLeft: number;
    totalVotes: number;
  };
}

export interface Investment {
  id: string;
  projectId: string;
  title: string;
  category: string;
  location: string;
  investedAmount: number;
  type: string;
  typeBadge: string;
  status: string;
  statusColor: string;
  description: string;
  progressPercent: number;
  progressLabel: string;
  nextPayoutDate: string;
  nextPayoutAmount?: string;
  image: string;
  installments?: {
    paid: number;
    total: number;
  };
}
