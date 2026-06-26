'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Car as CarIcon, X, ChevronLeft, ChevronRight, MapPin, Flag } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string; // '' = pas encore choisie
  endDate: string;   // '' = pas encore choisie
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  locale: string;
  labelStart: string;
  labelEnd: string;
  labelSelectDepart: string;
  labelSelectReturn: string;
}

// ── Helpers ──────────────────────────────────────
function addMonths(date: Date, n: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth() + n, 1);
  return d;
}
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayMon(y: number, m: number) { return (new Date(y, m, 1).getDay() + 6) % 7; }

// Formatte une Date locale en 'YYYY-MM-DD' sans passer par UTC
export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fromISO(s: string) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const WEEKDAYS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function DateRangePicker({
  startDate, endDate,
  onStartChange, onEndChange,
  locale, labelStart, labelEnd,
  labelSelectDepart, labelSelectReturn,
}: DateRangePickerProps) {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const start = startDate ? fromISO(startDate) : null;
  const end = endDate ? fromISO(endDate) : null;

  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [baseMonth, setBaseMonth] = useState(() => {
    const d = start ?? today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [isOpen]);

  const diffDays = start && end
    ? Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000))
    : 0;

  // Ouvre le calendrier sur le champ ciblé. Si aucun départ n'est encore
  // choisi, on commence TOUJOURS par le départ, quel que soit le champ cliqué.
  const openFor = (mode: 'start' | 'end') => {
    if (isOpen && selecting === mode) { setIsOpen(false); return; }
    setSelecting(!start ? 'start' : mode);
    setIsOpen(true);
  };

  const handleDay = useCallback((day: Date) => {
    if (day < today) return;
    if (selecting === 'start') {
      onStartChange(toISO(day));
      if (end && day >= end) {
        const newEnd = new Date(day); newEnd.setDate(newEnd.getDate() + 1);
        onEndChange(toISO(newEnd));
      }
      setSelecting('end');
    } else {
      if (start && day <= start) return; // désactivé visuellement, voir renderMonth
      onEndChange(toISO(day));
      setIsOpen(false);
    }
  }, [selecting, start, end, today, onStartChange, onEndChange]);

  const renderMonth = (monthOffset: number) => {
    const base = addMonths(baseMonth, monthOffset);
    const year = base.getFullYear();
    const month = base.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDay = getFirstDayMon(year, month);
    const cells: (Date | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1)),
    ];

    return (
      <div className="flex-1">
        <div className="text-center text-xs font-black uppercase tracking-widest text-[#0A142F] mb-4 pb-3 border-b border-slate-100">
          {MONTHS_FR[month]} <span className="text-slate-400">{year}</span>
        </div>
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(w => (
            <div key={w} className="text-center text-[9px] font-black uppercase tracking-wider text-slate-300 py-1">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            if (!day) return <div key={`e${idx}`} className="h-9" />;
            const past = day < today;
            const blockedForEnd = selecting === 'end' && !!start && day <= start;
            const disabled = past || blockedForEnd;

            const isStart = !!start && sameDay(day, start);
            const previewEnd = selecting === 'end' && !end && hovered && hovered > (start ?? today) ? hovered : null;
            const effectiveEnd = end ?? previewEnd;
            const isEnd = !!effectiveEnd && sameDay(day, effectiveEnd);
            const inRange = !!start && !!effectiveEnd && day > start && day < effectiveEnd;
            const isToday = sameDay(day, today);

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDay(day)}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
                disabled={disabled}
                className={[
                  'relative h-9 flex items-center justify-center text-[13px] font-semibold transition-all duration-100 select-none',
                  disabled ? 'text-slate-200 cursor-not-allowed' : 'cursor-pointer',
                  isStart ? 'bg-[#C8922A] text-white shadow-md shadow-[#C8922A]/40 rounded-l-full z-10' : '',
                  isEnd ? 'bg-[#0A142F] text-white shadow-md rounded-r-full z-10' : '',
                  inRange ? 'bg-[#C8922A]/12 text-[#C8922A] rounded-none' : '',
                  isToday && !isStart && !isEnd ? 'font-black text-[#C8922A] ring-1 ring-[#C8922A]/40 rounded-full' : '',
                  !disabled && !isStart && !isEnd && !inRange ? 'hover:bg-slate-100 rounded-full text-[#0A142F]' : '',
                ].join(' ')}
              >
                {day.getDate()}
                {isStart && <span className="absolute -top-0.5 -right-0.5 text-[8px] leading-none">🚗</span>}
                {isEnd && !!end && <span className="absolute -top-0.5 -right-0.5 text-[8px] leading-none">🏁</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' }) : 'Choisir';

  const trackPct = diffDays > 0 ? Math.min(100, (diffDays / 30) * 100) : 0;

  return (
    <div className="relative" ref={ref}>

      {/* ── Trigger ── */}
      <div id="date-picker-trigger" className="relative flex items-stretch gap-0 rounded-2xl border border-slate-200 overflow-hidden hover:border-[#C8922A]/50 hover:shadow-lg hover:shadow-[#C8922A]/5 transition-all duration-300 bg-white">

        <button
          type="button"
          onClick={() => openFor('start')}
          aria-label={labelSelectDepart}
          className="flex-1 flex items-center gap-3 px-4 py-4 min-w-0 text-left hover:bg-[#C8922A]/5 transition-colors"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8922A]/10 flex items-center justify-center">
            <MapPin size={14} className="text-[#C8922A]" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-black uppercase tracking-widest text-[#C8922A] mb-0.5 truncate">{labelStart}</div>
            <div className={`text-sm font-black truncate ${start ? 'text-[#0A142F]' : 'text-slate-300 italic font-bold'}`}>
              {fmtDate(start)}
            </div>
          </div>
        </button>

        <div className="flex flex-col items-center justify-center px-3 py-3 bg-slate-50 border-x border-slate-100">
          <div className="relative w-16 flex items-center">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-[#C8922A] to-[#0A142F] opacity-20" />
            </div>
            <div className="relative z-10 transition-all duration-300" style={{ marginLeft: `${Math.min(60, trackPct * 0.6)}px` }}>
              <div className="bg-[#C8922A] p-1.5 rounded-full shadow-md shadow-[#C8922A]/30">
                <CarIcon size={13} className="text-white" />
              </div>
            </div>
          </div>
          {diffDays > 0 && (
            <div className="text-[9px] font-black text-[#0A142F]/40 mt-1 uppercase tracking-widest whitespace-nowrap">
              {diffDays}j
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => openFor('end')}
          aria-label={labelSelectReturn}
          className="flex-1 flex items-center gap-3 px-4 py-4 min-w-0 text-left hover:bg-[#0A142F]/5 transition-colors"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0A142F]/5 flex items-center justify-center">
            <Flag size={14} className="text-[#0A142F]/50" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-black uppercase tracking-widest text-[#0A142F]/40 mb-0.5 truncate">{labelEnd}</div>
            <div className={`text-sm font-black truncate ${end ? 'text-[#0A142F]' : 'text-slate-300 italic font-bold'}`}>
              {fmtDate(end)}
            </div>
          </div>
        </button>
      </div>

      {/* ── Calendar Popup ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calendrier de sélection des dates"
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[100] w-[340px] bg-white rounded-3xl shadow-2xl shadow-black/15 border border-slate-100 p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selecting === 'start' ? 'bg-[#C8922A]' : 'bg-[#0A142F]'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0A142F]">
                  {selecting === 'start' ? labelSelectDepart : labelSelectReturn}
                </span>
              </div>
              {diffDays > 0 && (
                <div className="text-[10px] text-slate-400 mt-0.5">
                  🚗 {fmtDate(start)} → 🏁 {fmtDate(end)} · <span className="font-bold text-[#C8922A]">{diffDays} jour{diffDays > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0A142F] transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setBaseMonth(m => addMonths(m, -1))} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-[#0A142F]" aria-label="Mois précédent">
              <ChevronLeft size={16} />
            </button>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {MONTHS_FR[baseMonth.getMonth()]} {baseMonth.getFullYear()}
            </div>
            <button onClick={() => setBaseMonth(m => addMonths(m, 1))} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-[#0A142F]" aria-label="Mois suivant">
              <ChevronRight size={16} />
            </button>
          </div>

          {renderMonth(0)}

          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-50">
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-[#C8922A]" /> Départ
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-[#0A142F]" /> Retour
            </div>
          </div>
        </div>
      )}
    </div>
  );
}