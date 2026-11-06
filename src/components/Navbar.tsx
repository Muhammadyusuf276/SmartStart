import React, { useState } from 'react';
import { Shield, Sparkles, Menu, X, GraduationCap, Sun, Moon, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  currentScreen: 'home' | 'results' | 'featured' | 'admin';
  onNavigate: (screen: 'home' | 'results' | 'featured' | 'admin') => void;
  onOpenAdmission: () => void;
  featuredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenAdmission,
  featuredCount
}) => {
  const { language, setLanguage, theme, setTheme, toggleTheme, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' }
  ];

  const handleLogoClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    if (currentScreen !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Prototype Switcher & Quick Utility Bar - Liquid Tinted Glass */}
      <div className="bg-[#0B1A33]/90 dark:bg-slate-950/90 backdrop-blur-md text-white border-b border-white/10 text-xs relative z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 flex-nowrap">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-bold tracking-wider text-slate-300 uppercase text-[11px] truncate whitespace-nowrap">
              {t.topNotice}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-nowrap">
            {/* Screen switcher */}
            <div className="flex items-center gap-1 bg-white/5 dark:bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/10 shadow-inner shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentScreen === 'home'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.protoHome}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('results')}
                className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentScreen === 'results'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.protoResults}
              </button>
              {currentScreen === 'admin' && (
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="px-3 py-1 rounded-full font-bold text-xs bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{t.protoAdmin}</span>
                </button>
              )}
            </div>

            {/* Language Switcher Buttons */}
            <div className="flex items-center bg-white/5 dark:bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/10 text-xs">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-0.5 rounded-full font-extrabold uppercase transition-all cursor-pointer ${
                    language === l.code
                      ? 'bg-amber-400 text-slate-950 shadow-2xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button Group: Icon only */}
            <div className="flex items-center bg-white/5 dark:bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setTheme('light')}
                title={t.themeLight}
                aria-label={t.themeLight}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-amber-400 text-slate-950 shadow-2xs font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                title={t.themeDark}
                aria-label={t.themeDark}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-amber-400 text-slate-950 shadow-2xs font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main School Header — Liquid Glass Effect */}
      <header className="sticky top-0 z-30 transition-all duration-300 bg-white/75 dark:bg-[#071326]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/70 dark:border-white/10 shadow-[0_8px_32px_0_rgba(19,41,75,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/90 dark:before:via-white/20 before:to-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Logo & School Name */}
          <button
            type="button"
            onClick={handleLogoClick}
            title="Smart Start"
            className="flex items-center gap-3 sm:gap-3.5 text-left focus:outline-none group cursor-pointer relative shrink-0"
          >
            {/* Liquid glass logo capsule */}
            <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-white/90 via-white/50 to-white/20 dark:from-white/15 dark:via-white/8 dark:to-white/5 border border-white/80 dark:border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_16px_rgba(19,41,75,0.08)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300 shrink-0">
              <img
                src="/smart-start-logo.png"
                alt="Smart Start Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl drop-shadow-xs shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/b9beb49f5a7d0c49502c2b2852bb209a.png';
                }}
              />
            </div>

            <div className="flex flex-col leading-tight whitespace-nowrap shrink-0">
              <span className="font-display font-black text-lg sm:text-xl text-[#13294B] dark:text-white tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
                {t.schoolName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[2px] sm:tracking-[2.5px] text-slate-500 dark:text-slate-400 uppercase whitespace-nowrap">
                {t.schoolSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links — Liquid Glass Nav Pills */}
          <nav className="hidden xl:flex items-center p-1 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 backdrop-blur-sm gap-0.5 2xl:gap-1 text-xs 2xl:text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] shrink-0 flex-nowrap">
            {[
              { id: 'haqida', label: t.navAbout },
              { id: 'natijalar', label: t.navResults },
              { id: 'talim', label: t.navEducation },
              { id: 'hamkorlar', label: t.navPartners },
              { id: 'oqituvchilar', label: t.navTeachers },
              { id: 'qabul', label: t.navAdmission },
              { id: 'yangiliklar', label: t.navNews },
              { id: 'aloqa', label: t.navContact }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-2.5 2xl:px-3.5 py-1.5 rounded-full hover:text-[#13294B] dark:hover:text-amber-300 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0 flex-nowrap">
            {/* Staff / Xodimlar button — Translucent Liquid Glass Pill */}
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-slate-300/80 dark:border-white/15 bg-white/60 dark:bg-white/5 hover:bg-white/95 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-[#13294B] dark:hover:text-amber-400 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] active:scale-95 hover:border-amber-400/40 backdrop-blur-md whitespace-nowrap shrink-0"
            >
              <Users className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="whitespace-nowrap">{t.navStaff}</span>
            </button>

            {/* Qabulga yozilish — Glowing Golden Glass Pill */}
            <button
              type="button"
              onClick={onOpenAdmission}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#DFAD36] via-[#CF9E2E] to-[#B3831B] hover:brightness-105 active:scale-95 text-[#0B1A33] font-black text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(207,158,46,0.35)] flex items-center gap-1.5 sm:gap-2 cursor-pointer relative overflow-hidden group whitespace-nowrap shrink-0"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span className="relative z-10 whitespace-nowrap">{t.applyBtn}</span>
            </button>
          </div>

          {/* Mobile Menu Button with Glass styling */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 backdrop-blur-md transition-colors cursor-pointer shadow-xs shrink-0"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
          </button>
        </div>

        {/* Mobile Dropdown — Liquid Glass with Full-Width Rows (No Text Wrapping) */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/60 dark:border-white/10 bg-white/85 dark:bg-[#071326]/90 backdrop-blur-2xl px-4 sm:px-6 py-4 space-y-3 shadow-2xl transition-all">
            <div className="flex flex-col gap-1">
              {[
                { id: 'haqida', label: t.navAbout },
                { id: 'natijalar', label: t.navResults },
                { id: 'talim', label: t.navEducation },
                { id: 'hamkorlar', label: t.navPartners },
                { id: 'oqituvchilar', label: t.navTeachers },
                { id: 'qabul', label: t.navAdmission },
                { id: 'yangiliklar', label: t.navNews },
                { id: 'aloqa', label: t.navContact }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left font-bold text-sm text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Lang & Theme Toggles */}
            <div className="flex items-center justify-between py-2 border-t border-slate-200/50 dark:border-white/10 flex-nowrap">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {t.langSelect}:
              </span>
              <div className="flex items-center gap-1 bg-white/40 dark:bg-white/5 p-1 rounded-full border border-white/50 dark:border-white/10 shrink-0">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase transition-all cursor-pointer whitespace-nowrap ${
                      language === l.code
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Theme Toggle (icon only) */}
            <div className="flex items-center justify-between py-2 border-t border-slate-200/50 dark:border-white/10 flex-nowrap">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {language === 'ru' ? 'Тема оформления:' : language === 'en' ? 'Appearance:' : 'Rejim:'}
              </span>
              <div className="flex items-center gap-1 bg-white/40 dark:bg-white/5 p-1 rounded-full border border-white/50 dark:border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  aria-label={t.themeLight}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-amber-400 text-slate-950 shadow-2xs font-extrabold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  aria-label={t.themeDark}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-amber-400 text-slate-950 shadow-2xs font-extrabold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 dark:border-white/10">
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-2 text-center rounded-full border border-slate-300/80 dark:border-white/15 bg-white/60 dark:bg-white/5 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="whitespace-nowrap">{t.navStaff}</span>
              </button>

              <button
                onClick={() => {
                  onOpenAdmission();
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-2 text-center rounded-full bg-gradient-to-r from-[#DFAD36] to-[#CF9E2E] text-[#13294B] font-extrabold text-xs shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t.applyBtn}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
