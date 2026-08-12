import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('admin@nwa.com');
  const [password, setPassword] = useState('studio2024');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your studio email or username.');
      return;
    }

    if (!password) {
      setError('Please enter your access password.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against studio security portal
    setTimeout(() => {
      setIsLoading(false);
      // Valid credentials or quick studio access
      if (
        (email.trim().toLowerCase() === 'admin@nwa.com' || email.trim().toLowerCase() === 'admin' || email.trim().includes('@')) &&
        password.length >= 4
      ) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Use admin@nwa.com / studio2024');
      }
    }, 600);
  };

  const handleQuickFill = () => {
    setEmail('admin@nwa.com');
    setPassword('studio2024');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#ffffff] border border-[#747878]/20 shadow-2xl overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Architectural Accent Line */}
        <div className="h-1 bg-[#a33e00] w-full" />

        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-[#747878]/15 bg-[#f8f9fa] flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#a33e00] text-xl">admin_panel_settings</span>
              <span className="label-caps text-[#a33e00] tracking-widest text-[11px]">
                Internal Access Only
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#000000] tracking-tight">
              Studio Portal Sign In
            </h2>
            <p className="text-xs text-[#444748] mt-1 font-sans">
              Enter your credentials to manage NWA projects & operations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#444748] hover:text-[#000000] p-1 rounded-full transition-colors focus:outline-none"
            aria-label="Close login dialog"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-[#ba1a1a]/10 border-l-2 border-[#ba1a1a] text-[#ba1a1a] text-xs flex items-center gap-2 animate-shake">
              <span className="material-symbols-outlined text-sm shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Hint / Quick Fill */}
          <div className="bg-[#f3f4f5] p-3 border border-[#747878]/15 flex items-center justify-between text-xs text-[#444748]">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-sm text-[#a33e00]">info</span>
              <span className="truncate">Default: <strong className="text-[#000000]">admin@nwa.com</strong> / <strong className="text-[#000000]">studio2024</strong></span>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] label-caps text-[#a33e00] hover:underline shrink-0 ml-2 font-semibold uppercase"
            >
              Fill Demo
            </button>
          </div>

          {/* Email / Username Field */}
          <div className="space-y-2">
            <label className="block label-caps text-[11px] text-[#444748]">
              Studio Email or Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#747878]">
                person
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nwa.com"
                required
                className="w-full bg-[#f8f9fa] border border-[#747878]/25 pl-10 pr-4 py-3 text-sm text-[#191c1d] focus:outline-none focus:border-[#000000] focus:bg-white transition-all font-sans"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block label-caps text-[11px] text-[#444748]">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#747878]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#f8f9fa] border border-[#747878]/25 pl-10 pr-10 py-3 text-sm text-[#191c1d] focus:outline-none focus:border-[#000000] focus:bg-white transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#000000] focus:outline-none"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember me & Security footer */}
          <div className="flex items-center justify-between text-xs text-[#444748]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#a33e00] w-4 h-4 rounded-none cursor-pointer"
              />
              <span>Keep session active</span>
            </label>
            <span className="text-[11px] text-[#747878]">SSL Encrypted</span>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#000000] text-white label-caps py-3.5 px-6 hover:bg-[#a33e00] transition-colors duration-300 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-transparent text-[#444748] hover:text-[#000000] label-caps py-2 text-center text-xs uppercase tracking-wider transition-colors"
            >
              Return to Website
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="px-8 py-3 bg-[#f3f4f5] border-t border-[#747878]/15 text-center text-[10px] text-[#747878] label-caps">
          NWA Architects • Executive Admin Portal v2.4
        </div>
      </div>
    </div>
  );
};
