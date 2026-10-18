"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Phone,
  CheckCircle2,
  AlertCircle,
  Pill,
  Calendar,
  Lock,
  Printer,
  X,
  Search,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Mic,
  Sunrise,
  Sun,
  Moon,
} from "lucide-react";
import { getPrescription, type PrescriptionResult } from "@/lib/clinicApi";
import QRCode from "qrcode";
import { useScrollLock } from "@/lib/useScrollLock";

export const dynamic = "force-dynamic";

function MyRxContent() {
  const searchParams = useSearchParams();
  const rxParam =
    searchParams.get("rx") ||
    searchParams.get("rx_id") ||
    searchParams.get("phone") ||
    "";

  const [query, setQuery] = useState(rxParam || "");
  const [loading, setLoading] = useState(false);
  const [rxResult, setRxResult] = useState<PrescriptionResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Native HTML5 Doctor Voice Audio Player
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(13);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioError, setAudioError] = useState(false);

  // Routine Modal
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  // Lock background scroll when either modal is active
  useScrollLock(showSearchModal || showRoutineModal);

  const fetchRx = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await getPrescription(q.trim());
      setRxResult(res);
    } catch {}
    finally {
      setLoading(false);
    }
  }, []);

  // Fetch when rxParam changes or mount
  useEffect(() => {
    if (rxParam) {
      setQuery(rxParam);
      fetchRx(rxParam);
    } else {
      setQuery("");
      setSearched(false);
      setRxResult(null);
    }
  }, [rxParam, fetchRx]);

  // Reset audio state when prescription changes
  useEffect(() => {
    setIsPlaying(false);
    setAudioCurrentTime(0);
    setAudioError(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      try {
        audioRef.current.load();
      } catch {}
    }
    const dur = rxResult?.prescription?.doctorVoiceDurationSeconds;
    if (dur && dur > 0) {
      setAudioDuration(dur);
    } else {
      setAudioDuration(13);
    }
  }, [rxResult]);

  // Generate authentic QR code data URL for prescription slip print
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  useEffect(() => {
    const rx = rxResult?.prescription;
    if (!rx) {
      setQrDataUrl("");
      return;
    }
    let isMounted = true;
    const targetRxId = rx.rxId || query || "RX-OFFICIAL";
    const host = typeof window !== "undefined" ? window.location.host : "localhost:3002";
    const protocol = typeof window !== "undefined" ? window.location.protocol : "http:";
    const fullUrl = `${protocol}//${host}/my-rx?rx=${encodeURIComponent(targetRxId)}`;

    QRCode.toDataURL(fullUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 256,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.warn("QR code generation error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [rxResult, query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchRx(query);
    setShowSearchModal(false);
  };

  // Play / Pause toggle
  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      try {
        audio.playbackRate = playbackSpeed;
        if (audio.ended || (audioDuration > 0 && Math.abs(audio.currentTime - audioDuration) < 0.3)) {
          audio.currentTime = 0;
          setAudioCurrentTime(0);
        }
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Native audio play failed, retrying after reload:", err);
        try {
          audio.load();
          await audio.play();
          setIsPlaying(true);
        } catch (retryErr) {
          console.error("Audio playback blocked or failed:", retryErr);
          setIsPlaying(false);
          setAudioError(true);
        }
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const target = parseFloat(e.target.value);
    setAudioCurrentTime(target);
    if (audio) {
      audio.currentTime = target;
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setAudioCurrentTime(0);
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 0.85];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const formatSeconds = (totalSecs: number) => {
    const s = Math.floor(Math.max(0, totalSecs));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const formatRxDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      const d = new Date(dateStr);
      return isNaN(d.getTime())
        ? dateStr
        : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const p = rxResult?.prescription;

  return (
    <main
      className="min-h-screen text-slate-800 font-source pt-24 sm:pt-28 pb-28 sm:pb-36 print:min-h-0 print:p-0 print:m-0 print:bg-white select-none"
      style={{
        background:
          "linear-gradient(180deg, #E8E2D8 0px, #E2E6D6 68px, #D4EAD1 200px, #C6E7C0 380px, #c0e6b9 520px, #c0e6b9 calc(100% - 420px), #C6E7C0 calc(100% - 260px), #D4EAD1 calc(100% - 130px), #E2E6D6 calc(100% - 44px), #E8E2D8 100%)",
      }}
    >
      {/* ── Screen Patient Portal (Hidden in Print) ── */}
      <div className="print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {/* Loading Spinner */}
          {loading && (
            <div className="bg-white rounded-2xl p-8 border border-emerald-200 text-center shadow-xs">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-700">Loading verified medical prescription…</p>
            </div>
          )}

          {/* ── Main Prescription View (Original Normal Layout) ── */}
          {!loading && p && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* 1. Patient & Prescription Header Strip */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      PATIENT RX
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-500">
                      {p.rxId || query}
                    </span>
                    <span className="bg-[#d1fae5] text-[#047857] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#6ee7b7] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#047857]" />
                      <span>Verified Rx</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSearchModal(true)}
                      className="ml-auto sm:ml-2 px-2.5 py-0.5 border border-gray-300 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 text-gray-600 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer print:hidden"
                      title="Lookup another prescription"
                    >
                      <Search className="w-3 h-3 text-gray-500" />
                      <span>Search Another Rx</span>
                    </button>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2">
                    <span>{p.patientName}</span>
                    {(p.patientAge || p.patientGender) && (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {p.patientAge ? `${p.patientAge} Y` : ""} {p.patientGender ? `/ ${p.patientGender}` : ""}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Diagnosis: <strong className="text-emerald-900">{p.diagnosis || "Clinical Consultation"}</strong> • Date: <strong>{p.date}</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    CONSULTING PHYSICIAN
                  </span>
                  <span className="text-sm font-bold text-gray-900 block">
                    Dr. Pramod Shingare
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold block">
                    MD (Ayu) D.Dermatology • MMC Reg. I-87218-A
                  </span>
                </div>
              </div>

              {/* 2. Doctor's Authentic Voice Note Player */}
              {p.doctorVoiceAudioUrl && (
                <div className="bg-[#f0fdf4] border-2 border-[#10b981]/50 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                  {/* Hidden HTML5 Native Audio */}
                  <audio
                    ref={audioRef}
                    src={p.doctorVoiceAudioUrl}
                    preload="auto"
                    playsInline
                    crossOrigin="anonymous"
                    onTimeUpdate={() => {
                      if (audioRef.current && Number.isFinite(audioRef.current.currentTime)) {
                        setAudioCurrentTime(audioRef.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (
                        audioRef.current &&
                        Number.isFinite(audioRef.current.duration) &&
                        audioRef.current.duration > 0
                      ) {
                        setAudioDuration(audioRef.current.duration);
                      }
                    }}
                    onPlay={() => {
                      setIsPlaying(true);
                      setAudioError(false);
                    }}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setAudioCurrentTime(0);
                    }}
                    onError={() => {
                      setIsPlaying(false);
                      setAudioError(true);
                    }}
                  />

                  <div className="flex items-center justify-between gap-2 border-b border-[#a7f3d0] pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#047857] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#064e3b] flex items-center gap-1.5">
                          <span>डॉ. प्रमोद शिनगारे यांचे व्हॉईस मार्गदर्शन (Doctor&apos;s Voice Protocol)</span>
                        </h3>
                        <p className="text-[11px] text-[#047857]/80">
                          Authentic spoken instructions recorded directly by Dr. Pramod Shingare
                        </p>
                      </div>
                    </div>

                    <span className="bg-white text-[#047857] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#6ee7b7] shadow-2xs shrink-0 flex items-center gap-1">
                      <Mic className="w-3 h-3 text-[#047857]" />
                      <span>Recorded Doctor Voice</span>
                    </span>
                  </div>

                  {/* Player Controls */}
                  <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#a7f3d0] shadow-2xs space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleAudio}
                        className="w-12 h-12 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white flex items-center justify-center shadow-md shadow-emerald-950/20 transition-all cursor-pointer shrink-0 active:scale-95"
                        title={isPlaying ? "Pause Doctor Voice" : "Play Doctor Voice"}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleReplay}
                        className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
                        title="Restart audio"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#064e3b]">
                          <span>{isPlaying ? "Playing Doctor Instructions" : "Listen Spoken Medicine Protocol"}</span>
                          <span className="font-mono text-xs font-semibold text-slate-600">
                            {formatSeconds(audioCurrentTime)} / {formatSeconds(audioDuration)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={audioDuration > 0 ? audioDuration : 13}
                          step="0.1"
                          value={Math.min(audioCurrentTime, audioDuration)}
                          onChange={handleSeek}
                          className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-[#047857]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSpeedChange}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#047857] border border-emerald-200 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
                        title="Playback Speed"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>

                    {audioError && (
                      <div className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        Audio buffering issue. Tap play again or refresh the page.
                      </div>
                    )}

                    {/* Transcript */}
                    {p.doctorVoiceTranscript && (
                      <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-950 font-medium leading-relaxed">
                        <span className="font-bold text-emerald-900 block text-[10px] uppercase tracking-wider mb-0.5">
                          Spoken Protocol Instructions:
                        </span>
                        &ldquo;{p.doctorVoiceTranscript}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Prescribed Formulary Medications */}
              {Boolean(p.medicines && p.medicines.length > 0) && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-[#047857]" />
                      <h3 className="font-bold text-sm sm:text-base text-gray-900">
                        Prescribed Medications (औषधोपचार)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRoutineModal(true)}
                      className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1 cursor-pointer print:hidden"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Daily Schedule</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {p.medicines?.map((med, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-xl p-3 bg-[#faf9f6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-sm text-gray-900 truncate">
                              {med.name}
                            </span>
                          </div>
                          <p className="text-gray-600 pl-7">
                            Frequency: <strong>{med.frequency}</strong> • Duration: <strong>{med.duration}</strong>
                            {med.count && <span> • Qty: <strong>{med.count}</strong></span>}
                          </p>
                          {med.instructions && (
                            <p className="text-gray-600 pl-7 text-[11px]">{med.instructions}</p>
                          )}
                          {med.marathiInstruction && (
                            <p className="text-[#047857] font-semibold pl-7 text-[11px]">
                              मराठी सूचना: {med.marathiInstruction}
                            </p>
                          )}
                        </div>

                        <span className="border border-emerald-200 bg-emerald-50 rounded-lg px-2.5 py-1 text-[#047857] font-bold text-[11px] self-start sm:self-auto shrink-0 whitespace-nowrap">
                          {med.timing || "As directed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Doctor's Clinical Advice & Scheduled Follow-up */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-700">
                    Doctor&apos;s Advice &amp; Care Guidance
                  </span>
                  {p.followUpDate && (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-800" />
                      <span>Next Follow-up: {p.followUpDate}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed bg-[#faf9f6] p-3 rounded-xl border border-gray-200">
                  {p.generalAdvice ||
                    "Take all prescribed medicines on time. Apply topicals gently on clean, dry skin. Protect face from direct sunlight."}
                </p>
              </div>

              {/* 5. Print & Helpline Bottom Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted Official Prescription • Valid at all retail pharmacies</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href="tel:+917249727104"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Reception (+91 72497 27104)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Prescription Slip</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Front Section ONLY: Simple Neumorphic Card (Inner elements kept clean & simple) */}
          {!loading && !p && !searched && (
            <div className="rounded-2xl sm:rounded-3xl bg-[#E6ECEF] border border-white/80 max-w-2xl mx-auto p-4 sm:p-11 text-center animate-in fade-in duration-300">
              {/* Simple Editorial Eyebrow (No box) */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                <span className="h-px w-6 sm:w-8 bg-slate-300 shrink-0" />
                <span className="text-[9.5px] xs:text-[10.5px] font-semibold tracking-[0.16em] sm:tracking-[0.24em] uppercase text-slate-500 truncate">
                  Patient Consultation Archive
                </span>
                <span className="h-px w-6 sm:w-8 bg-slate-300 shrink-0" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 tracking-tight leading-tight">
                Digital Prescription &amp; Voice Protocol
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                Enter your prescription slip code or registered mobile number to access your prescribed medications and listen to Dr. Pramod Shingare&apos;s audio protocol.
              </p>

              {/* Separate Input and Button */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) fetchRx(query);
                }}
                className="mt-7 max-w-lg mx-auto text-left"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 flex items-center rounded-xl bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-white/60 px-4 py-3">
                    <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter Rx Code (e.g. rx_62dodybi) or Mobile"
                      className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 bg-[#108283] hover:bg-[#0d6e6f] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_3px_10px_rgba(16,130,131,0.25)] transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] text-center"
                  >
                    Access Rx
                  </button>
                </div>
              </form>

              {/* Simple Guidance & Reception Strip */}
              <div className="mt-9 pt-6 border-t border-slate-300/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500 text-left">
                <div className="flex items-start gap-2.5">
                  <QrCode className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-800 block text-xs">Paper Slip QR Code</span>
                    <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">
                      Scan the QR code on your printed prescription slip using your phone camera for instant access.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-800 block text-xs">Clinic Reception Desk</span>
                    <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">
                      Need assistance? Call:{" "}
                      <a href="tel:+917249727104" className="font-semibold text-emerald-800 hover:underline">
                        +91 72497 27104
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Not Found State */}
          {!loading && searched && rxResult && !rxResult.found && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-4 shadow-xs max-w-xl mx-auto">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Prescription Record Not Found</h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                No digital prescription matched &ldquo;{query}&rdquo;. Please verify the Rx code on your slip or check your token number.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearched(false);
                    setQuery("");
                  }}
                  className="px-5 py-2.5 bg-[#047857] hover:bg-[#065f46] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Try Another Code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Modal for Looking up Another Rx */}
        {showSearchModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSearchModal(false);
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overscroll-contain"
          >
            <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-gray-200 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Search Digital Prescription</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Enter Prescription Code or Token
                  </label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. RX-102 or rx_62dodybi"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSearchModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    Lookup Rx
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Routine Schedule Modal */}
        {showRoutineModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowRoutineModal(false);
            }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overscroll-contain"
          >
            <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl border border-gray-200 animate-in fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    Daily Dosage Timeline &amp; Routine
                  </h3>
                  <p className="text-xs text-gray-400">
                    Visual daily medication schedule for {p?.patientName || "Patient"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRoutineModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Morning */}
                <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-3.5 space-y-1">
                  <span className="font-bold text-xs text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sunrise className="w-3.5 h-3.5 text-emerald-700" />
                    <span>MORNING (8:30 AM – 9:00 AM)</span>
                  </span>
                  <p className="text-xs text-gray-800 font-semibold">
                    • Gentle Skin Wash / Cleanser with normal water
                  </p>
                  <p className="text-xs text-gray-800 font-semibold">
                    • Apply prescribed daytime topicals / Sunscreen Gel SPF 50+
                  </p>
                </div>

                {/* Afternoon */}
                <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-3.5 space-y-1">
                  <span className="font-bold text-xs text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-700" />
                    <span>AFTERNOON (1:30 PM)</span>
                  </span>
                  <p className="text-xs text-gray-800 font-semibold">
                    • Re-apply Moisturizer / Sunscreen if stepping outdoors
                  </p>
                  <p className="text-xs text-gray-600 text-[11px]">
                    • Keep hydrated (drink at least 1 full glass of water)
                  </p>
                </div>

                {/* Night */}
                <div className="border border-indigo-200 bg-indigo-50/50 rounded-xl p-3.5 space-y-1">
                  <span className="font-bold text-xs text-indigo-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-700" />
                    <span>NIGHT (9:30 PM – 10:00 PM)</span>
                  </span>
                  <p className="text-xs text-gray-800 font-semibold">
                    • Take nighttime oral tablets after dinner with water
                  </p>
                  <p className="text-xs text-gray-800 font-semibold">
                    • Apply nighttime spot treatment before sleeping
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRoutineModal(false)}
                className="w-full bg-[#047857] hover:bg-[#065f46] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Close Routine View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* AUTHENTIC DOCTOR MEDICAL PRESCRIPTION SLIP (PRINT ONLY)       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {p && (
        <div className="hidden print:block rx-slip-container w-full max-w-[210mm] mx-auto bg-white text-black p-4 font-sans text-xs">
          {/* 1. Official Clinic Header */}
          <div className="border-b-2 border-[#93231f] pb-2.5 mb-3">
            {/* Title Row */}
            <div className="text-center mb-2">
              <div className="flex items-center justify-center gap-3">
                <span
                  style={{
                    fontFamily: "'Amita', 'Karma', serif",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#93231f",
                    lineHeight: 1,
                  }}
                >
                  शिनगारे
                </span>
                <span
                  style={{
                    fontFamily: "'Mukta', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#3b2c63",
                    lineHeight: 1,
                    paddingTop: "6px",
                  }}
                >
                  स्किन &amp; कॉस्मेटीक क्लिनिक
                </span>
              </div>
              <div className="text-[11px] font-bold text-gray-600 tracking-wider uppercase mt-1">
                Shingare Skin &amp; Cosmetics Clinic • Advanced Dermatology &amp; Laser Center
              </div>
            </div>

            {/* Doctors & Timings Row */}
            <div className="flex justify-between items-start pt-1 px-1 text-[11px] leading-tight">
              {/* Doctor 1 (Left) */}
              <div className="w-[35%] text-left">
                <div className="text-[#29558c] font-black text-sm font-sans mb-0.5 uppercase">
                  Dr. Pramod Shingare
                </div>
                <div className="font-bold text-gray-900 text-[10.5px]">M.D. (Ayu), D.Dermatology</div>
                <div className="text-gray-700 text-[9px] font-semibold">
                  (Consultant Dermatologist &amp; Cosmetologist)
                </div>
                <div className="font-bold text-gray-900 text-[10px] mt-0.5">Reg. No. I-87218-A</div>
                <div className="font-bold text-[#111] text-[10.5px]">त्वचारोग, केस व सौंदर्य तज्ज्ञ</div>
              </div>

              {/* Timings (Center) */}
              <div className="w-[30%] text-center text-[10px] text-gray-800 leading-snug pt-0.5">
                <div className="font-medium">✤ वेळ : सकाळी १०:०० ते १:३०</div>
                <div className="font-medium">सायं. ५:०० ते ९:००</div>
                <div className="text-red-700 font-semibold">✤ दर रविवारी बंद राहिल.</div>
                <div className="font-bold text-gray-950 text-[11px] mt-1">
                  फोन: 72497 27104 / 96577 27104
                </div>
              </div>

              {/* Doctor 2 (Right) */}
              <div className="w-[35%] text-right">
                <div className="text-[#29558c] font-black text-sm font-sans mb-0.5 uppercase">
                  Dr. Priyanka Shingare
                </div>
                <div className="font-bold text-gray-900 text-[10.5px]">B.H.M.S., F.C.H.D.</div>
                <div className="text-gray-700 text-[9px] font-semibold">
                  (Consultant Cosmetologist &amp; Homeopath)
                </div>
                <div className="font-bold text-gray-900 text-[10px] mt-0.5">Reg. No. 51838</div>
                <div className="font-bold text-[#111] text-[10.5px]">स्त्रीरोग व सौंदर्य सल्लागार</div>
              </div>
            </div>

            {/* Address Strip */}
            <div className="bg-[#89b740] text-gray-900 text-center py-1 px-2 font-medium text-[11px] rounded mt-2">
              एस.टी.स्टँड जवळ, राजाराम चित्र मंदिर समोर, कल्याणी बझार वरती गाळा नं. 6, पेठ वडगांव (जि. कोल्हापूर)
            </div>
          </div>

          {/* 2. Patient Demographics Box */}
          <div className="border border-gray-800 rounded p-2 mb-3 bg-white text-[11px] leading-relaxed">
            <div className="grid grid-cols-12 gap-2 pb-1 border-b border-gray-200">
              <div className="col-span-8 flex items-baseline gap-1.5">
                <span className="font-bold text-gray-700 whitespace-nowrap">पेशंटचे नाव (Patient Name):</span>
                <span className="font-extrabold text-gray-950 text-xs border-b border-dotted border-gray-400 flex-1 truncate">
                  {p.patientName}
                </span>
              </div>
              <div className="col-span-4 flex items-baseline gap-1.5 justify-end">
                <span className="font-bold text-gray-700 whitespace-nowrap">दिनांक (Date):</span>
                <span className="font-bold text-gray-950 border-b border-dotted border-gray-400">
                  {formatRxDate(p.date)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 pt-1 pb-1 border-b border-gray-200">
              <div className="col-span-5 flex items-baseline gap-1.5">
                <span className="font-bold text-gray-700 whitespace-nowrap">वय / लिंग (Age/Sex):</span>
                <span className="font-semibold text-gray-950">
                  {p.patientAge ? `${p.patientAge} वर्षे` : "-"} / {p.patientGender === "M" ? "Male (पुरुष)" : p.patientGender === "F" ? "Female (स्त्री)" : p.patientGender || "-"}
                </span>
              </div>
              <div className="col-span-4 flex items-baseline gap-1.5">
                <span className="font-bold text-gray-700 whitespace-nowrap">गाव (Town):</span>
                <span className="font-semibold text-gray-950 truncate">
                  {p.patientVillage || "पेठ वडगांव / स्थानिक"}
                </span>
              </div>
              <div className="col-span-3 flex items-baseline gap-1.5 justify-end">
                <span className="font-bold text-gray-700 whitespace-nowrap">Rx ID:</span>
                <span className="font-mono font-bold text-gray-950">
                  {p.rxId || query}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 pt-1">
              <div className="col-span-12 flex items-baseline gap-1.5">
                <span className="font-bold text-gray-700 whitespace-nowrap">निदान (Diagnosis):</span>
                <span className="font-bold text-[#065f46]">
                  {p.diagnosis || p.complaint || "Dermatological Treatment Protocol"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Prescription Symbol & Medicines Table */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-serif italic font-extrabold text-3xl text-gray-900 leading-none">
                  ℞
                </span>
                <span className="text-[10.5px] font-bold text-gray-600 uppercase tracking-wider pt-1">
                  Prescription Protocol
                </span>
              </div>
              <svg width="28" height="32" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="47.5" y="14" width="5" height="88" rx="2.5" fill="#2d773f" />
                <circle cx="50" cy="12" r="5" fill="#2d773f" />
                <path d="M 46 22 C 32 10, 15 15, 8 21 C 22 26, 36 27, 46 30 Z" fill="#2d773f" />
                <path d="M 45 27 C 32 20, 20 22, 12 27 C 24 30, 36 30, 45 32 Z" fill="#2d773f" />
                <path d="M 54 22 C 68 10, 85 15, 92 21 C 78 26, 64 27, 54 30 Z" fill="#2d773f" />
                <path d="M 55 27 C 68 20, 80 22, 88 27 C 76 30, 64 30, 55 32 Z" fill="#2d773f" />
                <ellipse cx="50" cy="38" rx="18" ry="7.5" stroke="#2d773f" strokeWidth="4.5" fill="none" />
                <ellipse cx="50" cy="54" rx="15" ry="7" stroke="#2d773f" strokeWidth="4.5" fill="none" />
                <ellipse cx="50" cy="69" rx="12" ry="6" stroke="#2d773f" strokeWidth="4" fill="none" />
                <ellipse cx="50" cy="82" rx="9" ry="5" stroke="#2d773f" strokeWidth="3.5" fill="none" />
                <ellipse cx="50" cy="93" rx="6" ry="3.5" stroke="#2d773f" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <table className="w-full border-collapse border border-gray-700 text-[11px] leading-snug">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-700 font-bold text-gray-900">
                  <th className="border border-gray-600 py-1.5 px-1 text-center w-8">अ.क्र.</th>
                  <th className="border border-gray-600 py-1.5 px-2 text-left w-[34%]">औषधाचे नाव (Medicine Name)</th>
                  <th className="border border-gray-600 py-1.5 px-2 text-left w-[44%]">मात्रा व सूचना (Dosage &amp; Instructions)</th>
                  <th className="border border-gray-600 py-1.5 px-1.5 text-left w-[12%]">कालावधी</th>
                  <th className="border border-gray-600 py-1.5 px-1 text-center w-[10%] text-[#047857]">संख्या (Qty)</th>
                </tr>
              </thead>
              <tbody>
                {p.medicines && p.medicines.length > 0 ? (
                  p.medicines.map((med, idx) => (
                    <tr key={idx} className="border-b border-gray-400">
                      <td className="border border-gray-400 py-2 px-1 text-center font-mono font-bold text-gray-700">
                        {idx + 1}
                      </td>
                      <td className="border border-gray-400 py-2 px-2 align-top">
                        <div className="font-bold text-gray-950 text-xs">{med.name}</div>
                        {med.timing && med.timing !== "As directed" && (
                          <div className="text-[10px] text-gray-500 font-medium">{med.timing}</div>
                        )}
                      </td>
                      <td className="border border-gray-400 py-2 px-2 align-top">
                        <div className="font-semibold text-gray-900">{med.frequency}</div>
                        {med.marathiInstruction && (
                          <div className="text-[#047857] font-bold text-[10.5px] mt-0.5">
                            मराठी: {med.marathiInstruction}
                          </div>
                        )}
                        {med.instructions && med.instructions !== med.frequency && (
                          <div className="text-gray-600 text-[10px] mt-0.5">{med.instructions}</div>
                        )}
                      </td>
                      <td className="border border-gray-400 py-2 px-1.5 align-top font-medium text-gray-800">
                        {med.duration}
                      </td>
                      <td className="border border-gray-400 py-2 px-1 text-center align-top font-bold text-[#047857]">
                        {med.count || "1"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      कोणतेही औषध नमूद केलेले नाही (No medications prescribed)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 4. Doctor's Clinical Advice & Special Guidance */}
          {(p.generalAdvice || (p.counsellingDone && p.counsellingDone.length > 0) || (p.specialAdvice && p.specialAdvice.length > 0)) && (
            <div className="border border-gray-300 rounded p-2 mb-3 bg-gray-50/50 text-[11px] leading-relaxed">
              <div className="font-bold text-gray-900 text-xs mb-1">
                डॉक्टरांचा सल्ला व सूचना (Doctor&apos;s Advice &amp; Care Guidance):
              </div>
              {p.generalAdvice && (
                <div className="text-gray-800 mb-1">{p.generalAdvice}</div>
              )}
              {((p.counsellingDone && p.counsellingDone.length > 0) || (p.specialAdvice && p.specialAdvice.length > 0)) && (
                <div className="text-gray-700 text-[10.5px] pl-2 border-l-2 border-[#10b981] space-y-0.5 mt-1">
                  {(p.counsellingDone || p.specialAdvice || []).map((item, i) => (
                    <div key={i}>• {item}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Voice Prescription QR Badge */}
          {qrDataUrl && (
            <div className="border border-emerald-600 rounded p-1.5 mb-3 flex items-center justify-between bg-emerald-50/30">
              <div className="flex items-center gap-2.5">
                <img
                  src={qrDataUrl}
                  alt="Prescription QR Code"
                  className="w-12 h-12 border border-emerald-400 p-0.5 bg-white rounded shrink-0 object-contain"
                />
                <div>
                  <div className="font-bold text-xs text-[#065f46]">
                    बोलती पर्ची / Voice Prescription (Audio QR)
                  </div>
                  <div className="text-[10px] text-gray-700">
                    फोन कॅमेराने हा QR कोड स्कॅन करा आणि डॉ. प्रमोद शिनगारे यांचा spoken voice protocol ऐका.
                  </div>
                  <div className="text-[9px] text-[#047857] font-semibold mt-0.5">
                    Verified Digital Record • Instant Audio Playback
                  </div>
                </div>
              </div>
              <div className="text-right text-[10px] font-bold text-emerald-800 pr-1">
                <div>Verified Rx</div>
                <div className="text-[9px] text-gray-600 font-mono">{p.rxId || query}</div>
              </div>
            </div>
          )}

          {/* 6. Footer: Follow-up & Doctor's Official Signature Block */}
          <div className="pt-2 border-t border-gray-400 flex items-end justify-between text-[11px]">
            <div className="space-y-1">
              <div>
                <span className="font-bold text-gray-800">पुढील तपासणी (Next Follow-up): </span>
                <span className="font-extrabold text-gray-950 underline">
                  {p.followUpDate ? formatRxDate(p.followUpDate) : "7 दिवसांनंतर (After 7 Days)"}
                </span>
              </div>
              <div className="text-gray-500 text-[10px]">
                पेशंटची स्वाक्षरी (Patient Signature): ____________________
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <div className="text-gray-400 text-[10px] pb-5">
                डॉक्टरांची स्वाक्षरी व शिक्का (Doctor&apos;s Signature &amp; Stamp)
              </div>
              <div className="border-t border-gray-800 pt-1">
                <div className="font-black text-gray-950 text-xs uppercase">
                  Dr. Pramod Shingare
                </div>
                <div className="font-bold text-gray-700 text-[10px]">
                  M.D. (Ayu), D.Dermatology
                </div>
                <div className="font-semibold text-gray-600 text-[9.5px]">
                  MMC Reg. No. I-87218-A
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function MyRxPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#c0e6b9]">
          <span className="text-sm font-semibold text-slate-600">
            Loading prescription portal…
          </span>
        </div>
      }
    >
      <MyRxContent />
    </Suspense>
  );
}
