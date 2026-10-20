import React, { useState, useEffect } from 'react';
import { ScreenView, UserAccount } from '../types';
import { LOGO_URL } from '../data/mockData';

interface LoginScreenProps {
  onNavigate: (screen: ScreenView) => void;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  currentUser,
  onLogout,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [hasInjectedWallet, setHasInjectedWallet] = useState(false);
  const [walletProviderName, setWalletProviderName] = useState('Billetera Web3');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      setHasInjectedWallet(true);
      const eth = (window as any).ethereum;
      if (eth.isMetaMask) setWalletProviderName('MetaMask');
      else if (eth.isCoinbaseWallet) setWalletProviderName('Coinbase Wallet');
      else if (eth.isBraveWallet) setWalletProviderName('Brave Wallet');
      else if (eth.isRabby) setWalletProviderName('Rabby');
      else setWalletProviderName('Web3 Wallet');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      type: 'email',
      addressOrEmail: email || 'usuario@seedandgrow.org',
      name: email.split('@')[0],
      network: 'Base L2',
      balanceUSDC: 2500,
    });
    onNavigate('explorar');
  };

  const handleConnectWallet = async () => {
    setIsWalletConnecting(true);

    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          const realAddress = accounts[0];
          setIsWalletConnecting(false);
          onLoginSuccess({
            type: 'wallet',
            addressOrEmail: realAddress,
            name: `${realAddress.substring(0, 6)}...${realAddress.substring(realAddress.length - 4)}`,
            network: 'Base Sepolia',
            balanceUSDC: 14500,
          });
          onNavigate('explorar');
          return;
        }
      } catch (err: any) {
        console.warn('Conexión rechazada por el usuario o no disponible:', err);
      }
    }

    // Fallback amigable si no tiene extensión instalada o está en sandbox
    setTimeout(() => {
      setIsWalletConnecting(false);
      onLoginSuccess({
        type: 'wallet',
        addressOrEmail: '0x7f3e82a93c72190db981465243109a876123b49e',
        name: '0x7f3e...b49e (Base Sepolia)',
        network: 'Base Sepolia',
        balanceUSDC: 8450,
      });
      onNavigate('explorar');
    }, 900);
  };

  const handleGoogleLogin = (chosenEmail?: string) => {
    const finalEmail = chosenEmail || 'agusfau@gmail.com';
    onLoginSuccess({
      type: 'google',
      addressOrEmail: finalEmail,
      name: finalEmail.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      network: 'Custodia Escrow Base',
      balanceUSDC: 3450,
    });
    onNavigate('explorar');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 shadow-xl grid grid-cols-1 lg:grid-cols-12">
        {/* Left Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Seed & Grow" className="h-10 w-auto object-contain" />
            <span className="font-extrabold text-xl tracking-tight text-primary">Seed & Grow</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-on-surface">Iniciar Sesión / Conectar</h1>
            <p className="text-xs text-outline">
              Accede a la plataforma de custodia escrow y supervisión comunitaria con Wallet o Google
            </p>
          </div>

          {/* Active Session Card if user is already logged in */}
          {currentUser && (
            <div className="p-4 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#065f46]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  Sesión activa
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#047857] font-semibold border border-[#a7f3d0]">
                  {currentUser.type === 'wallet' ? 'Billetera Web3' : currentUser.type === 'google' ? 'Google Account' : 'Email'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">
                  <div className="font-mono text-xs font-bold text-[#064e3b] truncate">
                    {currentUser.addressOrEmail}
                  </div>
                  <div className="text-[11px] text-[#047857]">
                    Red: {currentUser.network || 'Base Sepolia'} · Saldo disponible: ${currentUser.balanceUSDC?.toLocaleString() || '3,450'} USDC
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onNavigate('explorar')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#006c48] text-white text-xs font-bold hover:bg-[#005236] transition"
                >
                  Continuar navegando
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="py-2 px-3 rounded-xl bg-white border border-[#a7f3d0] text-[#ba1a1a] text-xs font-semibold hover:bg-red-50 transition"
                  >
                    Desconectar
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {/* Wallet Connect Option */}
            <div className="border border-outline-variant/40 rounded-2xl p-3.5 bg-surface-container-low/50 hover:border-primary/50 transition">
              <button
                onClick={handleConnectWallet}
                disabled={isWalletConnecting}
                className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2.5 transition shadow-sm hover:bg-primary-container"
              >
                {isWalletConnecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Conectando con {hasInjectedWallet ? walletProviderName : 'Base Sepolia'}...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                    Conectar con Wallet ({hasInjectedWallet ? walletProviderName : 'MetaMask / Base'})
                  </>
                )}
              </button>
              <div className="mt-2 flex items-center justify-between text-[11px] text-outline px-1">
                <span>
                  {hasInjectedWallet ? (
                    <span className="text-[#006c48] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006c48]"></span>
                      {walletProviderName} detectado
                    </span>
                  ) : (
                    <span>Soporta MetaMask, Coinbase Wallet, Rabby y modo sandbox</span>
                  )}
                </span>
                <span className="font-mono text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface">Base L2</span>
              </div>
            </div>

            {/* Google Sign-in Option */}
            <div className="border border-outline-variant/40 rounded-2xl p-3.5 bg-surface-container-low/50 hover:border-primary/50 transition space-y-2">
              <button
                onClick={() => handleGoogleLogin(showCustomGoogleInput && customGoogleEmail ? customGoogleEmail : undefined)}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-50 text-[#1d1b19] font-bold text-xs border border-outline-variant/40 flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continuar con Google {showCustomGoogleInput && customGoogleEmail ? `(${customGoogleEmail})` : '(agusfau@gmail.com)'}
              </button>

              <div className="flex items-center justify-between text-[11px] text-outline px-1">
                <span>Custodia delegada Account Abstraction</span>
                <button
                  type="button"
                  onClick={() => setShowCustomGoogleInput(!showCustomGoogleInput)}
                  className="text-primary hover:underline font-semibold"
                >
                  {showCustomGoogleInput ? 'Usar cuenta predeterminada' : '¿Otro correo de Google?'}
                </button>
              </div>

              {showCustomGoogleInput && (
                <div className="flex gap-2 pt-1 animate-fadeIn">
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="ejemplo@gmail.com"
                    className="flex-1 p-2 rounded-lg bg-surface border border-outline-variant/50 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleGoogleLogin(customGoogleEmail)}
                    disabled={!customGoogleEmail}
                    className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold disabled:opacity-50"
                  >
                    Usar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-outline-variant/30 flex-1" />
            <span className="text-[11px] text-outline uppercase font-semibold">o con email</span>
            <div className="h-px bg-outline-variant/30 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-on-surface">Contraseña</label>
                <a href="#" className="text-primary hover:underline font-semibold text-[11px]">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full p-3 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition shadow-md"
            >
              Ingresar a Seed & Grow
            </button>
          </form>

          <p className="text-center text-xs text-outline">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => {
                onLoginSuccess({
                  type: 'email',
                  addressOrEmail: 'nuevo_usuario@seedandgrow.org',
                });
                onNavigate('explorar');
              }}
              className="text-primary font-bold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-5 bg-linear-to-br from-primary-container via-primary to-primary-container p-8 sm:p-10 text-on-primary flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
              Arquitectura de Confianza
            </span>
            <h2 className="text-2xl font-bold leading-tight text-white">
              Gobernanza transparente para el capital semilla y escalamiento.
            </h2>
            <p className="text-xs text-white/80 leading-relaxed font-normal">
              Superamos la incertidumbre del crowdfunding tradicional asegurando que cada dólar permanezca en custodia hasta que el auditor técnico verifique el cumplimiento real del hito.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-fixed text-lg mt-0.5">lock</span>
              <div className="text-xs">
                <div className="font-bold text-white">100% Custodia Escrow Safe</div>
                <div className="text-white/70 text-[11px]">Liberaciones progresivas multi-sig en Base</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-fixed text-lg mt-0.5">verified</span>
              <div className="text-xs">
                <div className="font-bold text-white">Auditoría Técnica Imparcial</div>
                <div className="text-white/70 text-[11px]">Especialistas verifican entregables por sector</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-fixed text-lg mt-0.5">how_to_vote</span>
              <div className="text-xs">
                <div className="font-bold text-white">Voz y Voto del Aportante</div>
                <div className="text-white/70 text-[11px]">Quórum descentralizado para cada desembolso</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-white/60">
            Seed & Grow · Protocolo Registrado en Red Base
          </div>
        </div>
      </div>
    </div>
  );
};
