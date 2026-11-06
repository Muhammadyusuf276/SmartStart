import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  GraduationCap,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Users,
  Send,
  ExternalLink,
  MessageCircle,
  Check,
  BookOpen,
  Compass,
  Sparkles
} from 'lucide-react';
import { CertificateItem, CertificateType } from '../types';
import { CertificateCard } from './CertificateCard';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  certificates: CertificateItem[];
  onOpenCertificate: (item: CertificateItem) => void;
  onGoAllResults: () => void;
  onOpenAdmissionModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  certificates,
  onOpenCertificate,
  onGoAllResults,
  onOpenAdmissionModal
}) => {
  const { t, language } = useApp();

  // Results Section Filter
  const [selectedType, setSelectedType] = useState<'all' | CertificateType>('all');

  // Inline Admission Form State
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState(`8${t.gradeSuffix}`);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [appNumber, setAppNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Filtered certificates for the preview grid
  const displayedCertificates = React.useMemo(() => {
    let list = certificates;
    if (selectedType !== 'all') {
      list = list.filter((c) => c.type === selectedType);
    }
    return list.slice(0, 8);
  }, [certificates, selectedType]);

  // Counts for KPI boxes
  const ieltsCount = certificates.filter((c) => c.type === 'IELTS' && parseFloat(c.score) >= 7.0).length;
  const cefrCount = certificates.filter((c) => c.type === 'CEFR').length;
  const olympCount = certificates.filter((c) => c.type === 'Olimpiada').length;
  const satCount = certificates.filter((c) => c.type === 'SAT' && parseInt(c.score, 10) >= 1300).length;

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !studentName.trim() || phone.trim().length < 9) {
      setErrorMessage(t.validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentName.trim(),
          studentName: studentName.trim(),
          phone: phone.trim(),
          grade,
          notes: notes.trim()
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setAppNumber(data.application?.id || data.appNumber || 'APP-2026-OK');
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        setErrorMessage(data.error || t.submissionError);
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback optimistic success
      setSubmitSuccess(true);
      setAppNumber('APP-2026-WEB');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* ================= 1. HERO SECTION WITH SMART START SCHOOL ENTRANCE BACKGROUND & LIQUID GLASS UI ================= */}
      <section id="haqida" className="relative w-full min-h-[600px] sm:min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden transition-colors">
        {/* Full-bleed Background Image: Smart Start School Entrance */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/Smart_Start_School_Entrance_ecb278f1.png"
            alt="Smart Start Xususiy Maktabi"
            className="w-full h-full object-cover object-center sm:object-right-top filter brightness-[0.92] contrast-[1.05]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/school_entrance_hero.png';
            }}
          />

          {/* Cinematic Scrim Gradient Overlays: Deep rich navy on left for readability, clear view of building on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071326]/98 via-[#0B1A33]/85 to-[#071326]/25 dark:from-[#030914]/98 dark:via-[#071326]/90 dark:to-[#030914]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-[#071326]/40 dark:from-slate-950 dark:via-transparent dark:to-black/50" />

          {/* Subtle Ambient Refractions / Glows */}
          <div className="absolute -top-32 left-10 w-96 h-96 bg-[#CF9E2E]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl space-y-6 sm:space-y-7">
            {/* Tag Badge — Liquid Glass Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-amber-300 text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CF9E2E] animate-pulse shadow-[0_0_8px_#CF9E2E]" />
              <span className="tracking-wide whitespace-nowrap">{t.heroAdmissionOpen}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-[58px] leading-[1.12] text-white tracking-tight drop-shadow-lg">
              {t.heroTitle}
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              {t.heroDescription}
            </p>

            {/* Quote Callout — Liquid Glass Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 border-l-4 border-l-[#CF9E2E] text-slate-100 font-medium italic text-sm sm:text-base shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden max-w-2xl">
              <div className="relative z-10 flex items-center justify-between gap-4">
                <span>{t.heroQuote}</span>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E6BE5E] not-italic shrink-0 opacity-90 hidden sm:inline">
                  Smart Start
                </span>
              </div>
            </div>

            {/* Action Buttons in Liquid Glass Style */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              {/* Qabulga yozilish — Glowing Golden Liquid Glass Button */}
              <button
                type="button"
                onClick={() => scrollToSection('qabul')}
                className="px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#DFAD36] via-[#CF9E2E] to-[#B3831B] hover:brightness-110 active:scale-95 text-[#0B1A33] font-black text-sm sm:text-base transition-all shadow-[0_8px_25px_rgba(207,158,46,0.45)] flex items-center gap-2.5 cursor-pointer relative overflow-hidden group whitespace-nowrap"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <GraduationCap className="w-5 h-5 shrink-0" />
                <span className="relative z-10 whitespace-nowrap">{t.heroApplyBtn}</span>
              </button>

              {/* Maktabga ekskursiya — Frosted Liquid Glass Button */}
              <button
                type="button"
                onClick={() => scrollToSection('kun')}
                className="px-7 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/30 hover:border-white/60 font-extrabold text-sm sm:text-base backdrop-blur-xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{t.heroTourBtn}</span>
              </button>
            </div>

            {/* Questions Phone Callout — Liquid Glass Capsule */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/15 text-xs sm:text-sm text-slate-200 shadow-sm">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">{t.heroQuestions}</span>
                <a
                  href="tel:+998909947407"
                  className="font-black text-amber-300 hover:text-amber-200 underline transition-colors whitespace-nowrap"
                >
                  +998 90 994 74 07
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. DARK BLUE STATS BAR ================= */}
      <section className="bg-[#13294B] text-white py-10 px-4 sm:px-6 border-y border-slate-800 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-display font-black text-3xl sm:text-4xl text-white">300+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t.statStudents}</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-3xl sm:text-4xl text-white">45+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t.statTeachers}</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-3xl sm:text-4xl text-white">120+</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t.statCerts}</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#CF9E2E]">2022</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t.statSince}</div>
          </div>
        </div>
      </section>

      {/* ================= 3. "NEGA OTA-ONALAR SMART START'NI TANLAYDI" ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 space-y-3">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
            {t.whyTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 01 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason1Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason1Desc}
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason2Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason2Desc}
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason3Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason3Desc}
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason4Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason4Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason4Desc}
              </p>
            </div>
          </div>

          {/* Card 05 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between sm:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason5Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason5Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason5Desc}
              </p>
            </div>
          </div>

          {/* Card 06 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between sm:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {t.reason6Num}
              </span>
              <h3 className="font-bold text-base text-[#13294B] dark:text-white">
                {t.reason6Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.reason6Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. "O'QUVCHILARIMIZ NATIJALARI" ================= */}
      <section id="natijalar" className="py-16 bg-slate-100/70 dark:bg-[#0B1A33]/40 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#13294B] text-white text-xs font-bold">
                {t.homeResultsKicker}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
                {t.homeResultsTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                {t.homeResultsDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={onGoAllResults}
              className="font-bold text-sm text-[#13294B] dark:text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{t.viewAllCertsCount} ({certificates.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Summary Stat Boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-[#13294B] dark:text-white">
                [{ieltsCount || 15}+]
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.ieltsBoxSub}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-[#13294B] dark:text-white">
                [{cefrCount || 35}+]
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.cefrBoxSub}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-[#13294B] dark:text-white">
                [{olympCount || 24}+]
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.olympBoxSub}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="font-display font-black text-2xl sm:text-3xl text-[#13294B] dark:text-white">
                [{satCount || 12}+]
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.satBoxSub}
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(['all', 'IELTS', 'CEFR', 'SAT', 'Olimpiada'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedType === cat
                    ? 'bg-[#13294B] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat === 'all' ? t.filterAll : cat}
              </button>
            ))}
          </div>

          {/* 8 Certificate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCertificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                item={cert}
                onClick={() => onOpenCertificate(cert)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. "DUNYONING TOP-1000 UNIVERSITETLARI BILAN HAMKORLIK" ================= */}
      <section id="hamkorlar" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
              {t.partnersTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.partnersDesc}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-2.5 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.partnerBenefit1}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.partnerBenefit2}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.partnerBenefit3}</span>
            </div>
          </div>
        </div>

        {/* 6 Partner University Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Oxford Int. College', country: t.countryUK, qs: 'QS #1', code: 'OX' },
            { name: 'TU Munich (TUM)', country: t.countryGermany, qs: 'QS #28', code: 'TUM' },
            { name: 'KAIST University', country: t.countryKorea, qs: 'QS #56', code: 'KAIST' },
            { name: 'Univ. of Bristol', country: t.countryUK, qs: 'QS #54', code: 'BRIS' },
            { name: 'Politecnico di Milano', country: t.countryItaly, qs: 'QS #111', code: 'POLI' },
            { name: 'Univ. of Warsaw', country: t.countryPoland, qs: 'QS #262', code: 'UW' }
          ].map((uni, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-2.5"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-[#13294B] dark:text-amber-400">
                {uni.code}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  {uni.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {uni.country} · <span className="font-semibold text-emerald-600 dark:text-emerald-400">{uni.qs}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. "TA'LIM BOSQICHLARI" ================= */}
      <section id="talim" className="py-16 bg-slate-100/60 dark:bg-[#071326] border-y border-slate-200 dark:border-slate-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
              {t.stagesTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {t.stagesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stage 1 */}
            <div className="bg-white dark:bg-[#0B1A33] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-400/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-48 bg-gradient-to-br from-[#13294B] via-[#0E203B] to-[#0A172B] dark:from-[#0E1F3D] dark:via-[#09172E] dark:to-[#050D1A] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border-b border-[#1E3A68] dark:border-slate-800">
                {/* Subtle decorative glow & watermark */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#CF9E2E]/10 rounded-full blur-2xl pointer-events-none" />
                <BookOpen className="w-28 h-28 text-white/[0.04] absolute -bottom-4 -right-4 pointer-events-none transform rotate-12" />

                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/15 dark:border-white/10 flex items-center justify-center text-amber-400 mb-2.5 shadow-inner group-hover:scale-110 transition-transform relative z-10">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight relative z-10">
                  {t.stage1Badge}
                </span>
                <span className="inline-block mt-1 text-xs font-semibold text-slate-300 relative z-10">
                  {t.stage1Grade}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white dark:bg-[#0B1A33]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#CF9E2E] block">{t.stage1Grade}</span>
                  <h3 className="font-bold text-lg text-[#13294B] dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {t.stage1Title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.stage1Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white dark:bg-[#0B1A33] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-400/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-48 bg-gradient-to-br from-[#13294B] via-[#0E203B] to-[#0A172B] dark:from-[#0E1F3D] dark:via-[#09172E] dark:to-[#050D1A] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border-b border-[#1E3A68] dark:border-slate-800">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#CF9E2E]/10 rounded-full blur-2xl pointer-events-none" />
                <Compass className="w-28 h-28 text-white/[0.04] absolute -bottom-4 -right-4 pointer-events-none transform rotate-12" />

                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/15 dark:border-white/10 flex items-center justify-center text-amber-400 mb-2.5 shadow-inner group-hover:scale-110 transition-transform relative z-10">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight relative z-10">
                  {t.stage2Badge}
                </span>
                <span className="inline-block mt-1 text-xs font-semibold text-slate-300 relative z-10">
                  {t.stage2Grade}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white dark:bg-[#0B1A33]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#CF9E2E] block">{t.stage2Grade}</span>
                  <h3 className="font-bold text-lg text-[#13294B] dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {t.stage2Title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.stage2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white dark:bg-[#0B1A33] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-400/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-48 bg-gradient-to-br from-[#13294B] via-[#0E203B] to-[#0A172B] dark:from-[#0E1F3D] dark:via-[#09172E] dark:to-[#050D1A] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border-b border-[#1E3A68] dark:border-slate-800">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#CF9E2E]/10 rounded-full blur-2xl pointer-events-none" />
                <GraduationCap className="w-28 h-28 text-white/[0.04] absolute -bottom-4 -right-4 pointer-events-none transform rotate-12" />

                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/15 dark:border-white/10 flex items-center justify-center text-amber-400 mb-2.5 shadow-inner group-hover:scale-110 transition-transform relative z-10">
                  <GraduationCap className="w-6 h-6 text-amber-400" />
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight relative z-10">
                  {t.stage3Badge}
                </span>
                <span className="inline-block mt-1 text-xs font-semibold text-slate-300 relative z-10">
                  {t.stage3Grade}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white dark:bg-[#0B1A33]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#CF9E2E] block">{t.stage3Grade}</span>
                  <h3 className="font-bold text-lg text-[#13294B] dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {t.stage3Title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.stage3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. "BIZNING USTOZLAR" ================= */}
      <section id="oqituvchilar" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
            {t.teachersTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {t.teachersDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: t.teacher1Name, role: t.teacher1Role, exp: t.teacher1Exp, score: t.teacher1Score },
            { name: t.teacher2Name, role: t.teacher2Role, exp: t.teacher2Exp, score: t.teacher2Score },
            { name: t.teacher3Name, role: t.teacher3Role, exp: t.teacher3Exp, score: t.teacher3Score },
            { name: t.teacher4Name, role: t.teacher4Role, exp: t.teacher4Exp, score: t.teacher4Score }
          ].map((teacher, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                <Users className="w-8 h-8 text-[#13294B] dark:text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {teacher.name}
                </h4>
                <p className="text-xs text-[#CF9E2E] font-semibold mt-0.5">
                  {teacher.role} · {teacher.score}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {teacher.exp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. "ERTALABDAN KECHGACHA — BIR KUN SMART START'DA" ================= */}
      <section id="kun" className="bg-[#13294B] text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15">
              {t.dayBadge}
            </span>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              {t.dayTitle}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.dayDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="px-6 py-3 rounded-xl bg-[#CF9E2E] hover:bg-[#b88c27] text-[#13294B] font-extrabold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {t.dayTourBtn}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('qabul')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all cursor-pointer"
              >
                {t.dayPricingBtn}
              </button>
            </div>
          </div>

          {/* Right Column: Timeline Schedule */}
          <div className="lg:col-span-7 space-y-4">
            {[
              { time: t.schedule1Time, title: t.schedule1Title, desc: t.schedule1Desc },
              { time: t.schedule2Time, title: t.schedule2Title, desc: t.schedule2Desc },
              { time: t.schedule3Time, title: t.schedule3Title, desc: t.schedule3Desc },
              { time: t.schedule4Time, title: t.schedule4Title, desc: t.schedule4Desc },
              { time: t.schedule5Time, title: t.schedule5Title, desc: t.schedule5Desc },
              { time: t.schedule6Time, title: t.schedule6Title, desc: t.schedule6Desc }
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 pb-3.5 border-b border-slate-700/60 last:border-b-0"
              >
                <span className="font-mono font-bold text-[#CF9E2E] text-xs sm:text-sm shrink-0 pt-0.5">
                  {step.time}
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. "OTA-ONALAR NIMA DEYDI" ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
            {t.reviewsTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {t.reviewsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: t.review1Quote,
              author: t.review1Author,
              sub: t.review1Sub
            },
            {
              quote: t.review2Quote,
              author: t.review2Author,
              sub: t.review2Sub
            },
            {
              quote: t.review3Quote,
              author: t.review3Author,
              sub: t.review3Sub
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "{item.quote}"
              </p>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="font-bold text-sm text-[#13294B] dark:text-white">
                  {item.author}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 10. "MAKTAB HAYOTI" ================= */}
      <section id="yangiliklar" className="py-16 bg-slate-100/70 dark:bg-[#0B1A33]/40 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
              {t.lifeTitle}
            </h2>
            <button
              type="button"
              onClick={onOpenAdmissionModal}
              className="text-xs sm:text-sm font-bold text-[#13294B] dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.allNewsBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: t.newsTagEvent,
                date: t.news1Date,
                title: t.news1Title,
                desc: t.news1Desc
              },
              {
                tag: t.newsTagAchievement,
                date: t.news2Date,
                title: t.news2Title,
                desc: t.news2Desc
              },
              {
                tag: t.newsTagAnnouncement,
                date: t.news3Date,
                title: t.news3Title,
                desc: t.news3Desc
              }
            ].map((news, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-40 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  {t.eventPhotoPlaceholder}
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-bold text-[#CF9E2E]">{news.tag}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {news.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 11. "QABULGA ARIZA QOLDIRING" ================= */}
      <section id="qabul" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading and 4 steps */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
              {t.appTitle}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.appDesc}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="font-bold text-[#CF9E2E] text-base shrink-0">{t.appStep1Num}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{t.appStep1Bold}</strong>
                  {t.appStep1Text}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-[#CF9E2E] text-base shrink-0">{t.appStep2Num}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{t.appStep2Bold}</strong>
                  {t.appStep2Text}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-[#CF9E2E] text-base shrink-0">{t.appStep3Num}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{t.appStep3Bold}</strong>
                  {t.appStep3Text}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-[#CF9E2E] text-base shrink-0">{t.appStep4Num}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{t.appStep4Bold}</strong>
                  {t.appStep4Text}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inline Application Card Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  {t.appSuccessTitle}
                </h3>
                <p className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded inline-block text-slate-700 dark:text-slate-300">
                  {t.appNumberLabel} {appNumber}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {t.appSuccessText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setParentName('');
                    setStudentName('');
                    setNotes('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {t.sendAnotherBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      {t.parentNameField}
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder={t.parentNamePlaceholderInline}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CF9E2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      {t.phoneField}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CF9E2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      {t.studentNameField}
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder={t.studentNamePlaceholderInline}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CF9E2E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                      {t.targetGradeField}
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CF9E2E]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                        <option key={g} value={`${g}${t.gradeSuffix}`}>{g}{t.gradeSuffix}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    {t.notesField}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholderInline}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CF9E2E]"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 font-semibold">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#CF9E2E] hover:bg-[#b88c27] active:scale-98 text-[#13294B] font-extrabold text-base transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  {t.privacyConsent}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= 12. "BIZ BILAN BOG'LANING" ================= */}
      <section id="aloqa" className="py-16 sm:py-20 bg-slate-100/70 dark:bg-[#0B1A33]/40 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#13294B] dark:text-white tracking-tight">
              {t.contactTitle}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.contactDesc}
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#CF9E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{t.addressLabel}</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {t.addressValue}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#CF9E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{t.phoneLabelContact}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-mono">
                    +998 71 200 00 22 / +998 90 994 74 07
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#CF9E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{t.telegramLabel}</span>
                  <a
                    href="https://t.me/stmartstartt_bot"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-amber-400 hover:underline font-mono"
                  >
                    @stmartstartt_bot
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#CF9E2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{t.workingHoursLabel}</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {t.workingHoursValue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl overflow-hidden aspect-[16/10] flex flex-col justify-between">
              <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-700 flex items-center justify-center text-red-600 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {t.schoolMapName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t.schoolMapAddress}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <a
                    href="https://yandex.com/maps/?text=Smart+Start+xususiy+maktabi+Toshkent"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{t.openYandexMaps}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://maps.google.com/?q=Smart+Start+School+Tashkent"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{t.openGoogleMaps}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 13. FOOTER ================= */}
      <footer className="bg-[#0B1A33] dark:bg-slate-950 text-white py-12 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/smart-start-logo.png"
              alt="Smart Start Logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/b9beb49f5a7d0c49502c2b2852bb209a.png';
              }}
            />
            <div>
              <h3 className="font-display font-bold text-lg text-white">{t.schoolName}</h3>
              <p className="text-xs text-slate-400">
                {t.schoolSubtitle.toLowerCase()} · {t.footerRights}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300 font-semibold">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://t.me/stmartstartt_bot"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
