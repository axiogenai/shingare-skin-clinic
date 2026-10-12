"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Stethoscope,
  MapPin,
  Clock,
  RotateCw,
  AlertCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Activity,
  CheckCircle2,
  Headphones,
  Search,
  Hash,
  Sun,
  Timer,
  Users,
  Gauge,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  getQueueStatus,
  getClinicInfo,
  type QueueStatusResult,
  type ClinicInfoResult,
} from "@/lib/clinicApi";
import Link from "next/link";

export const dynamic = "force-dynamic";

const NEU_TOKENS = [
  { num: 10, role: "completed" as const, label: "COMPLETED", sub: "Left Cabin" },
  { num: 11, role: "completed" as const, label: "COMPLETED", sub: "Left Cabin" },
  { num: 12, role: "active" as const, label: "IN CABIN", sub: "Consulting" },
  { num: 13, role: "next" as const, label: "NEXT TURN", sub: "Be Ready" },
  { num: 14, role: "waiting" as const, label: "WAITING", sub: "In Queue" },
  { num: 15, role: "waiting" as const, label: "WAITING", sub: "In Queue" },
];

function LiveQueueContent() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token") || searchParams.get("tracker") || "";

  const [query, setQuery] = useState(tokenParam || "12");
  const [tab, setTab] = useState<"token" | "phone">("token");
  const [loading, setLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<QueueStatusResult | null>(null);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfoResult | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>("just now");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(312);

  const fetchStatus = useCallback(async (val: string) => {
    if (!val.trim()) return;
    setLoading(true);
    try {
      const result = await getQueueStatus(val.trim());
      setStatusResult(result);
      setLastSyncTime("just now");
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClinicOverview = useCallback(async () => {
    try {
      setClinicInfo(await getClinicInfo());
    } catch {}
  }, []);

  // Initial load
  useEffect(() => {
    fetchClinicOverview();
    fetchStatus(tokenParam || "12");
  }, [fetchClinicOverview, fetchStatus, tokenParam]);

  // Periodic clinic overview
  useEffect(() => {
    const iv = setInterval(fetchClinicOverview, 10000);
    return () => clearInterval(iv);
  }, [fetchClinicOverview]);

  // Elapsed timer simulation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh queue status
  useEffect(() => {
    if (!autoRefresh || !query.trim()) return;
    const iv = setInterval(() => {
      fetchStatus(query);
    }, 15000);
    return () => clearInterval(iv);
  }, [autoRefresh, query, fetchStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(query);
  };

  const handleSelectToken = (tokenNum: number) => {
    const str = String(tokenNum);
    setTab("token");
    setQuery(str);
    fetchStatus(str);
  };

  const nowToken = clinicInfo?.liveStatus.nowConsultingToken ?? 12;
  const waitCount = clinicInfo?.liveStatus.waitingCount ?? 5;
  const elapsedMin = Math.floor(elapsedSeconds / 60);
  const elapsedRemSec = elapsedSeconds % 60;

  // Progress calculation for visual Neumorphic progress gauge
  const getQueueProgressPercent = () => {
    if (!statusResult?.found || !statusResult.queueItem) return 0;
    if (statusResult.queueItem.status === "completed") return 100;
    if (statusResult.queueItem.status === "in_consultation") return 88;
    const ahead = statusResult.patientsAhead ?? 1;
    return Math.max(18, Math.min(78, 80 - ahead * 15));
  };

  return (
    <main
      className="min-h-screen text-slate-800 font-source selection:bg-[#0e787a]/15 selection:text-[#0e787a] pb-32 sm:pb-36"
      style={{
        background:
          "linear-gradient(180deg, #E8E2D8 0px, #E4E3D3 64px, #D6E4C7 190px, #C9E5BF 340px, #c0e6b9 520px, #c0e6b9 calc(100% - 420px), #C9E5BF calc(100% - 260px), #D6E4C7 calc(100% - 130px), #E4E3D3 calc(100% - 40px), #E8E2D8 100%)",
      }}
    >
      {/* 1. Neumorphic Console Header */}
      <div className="pt-[76px]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-8 pt-8 pb-6">
          <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 px-6 py-8 sm:px-10 sm:py-9 text-center relative overflow-hidden">
            {/* Top Tactile Recessed Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] px-4 py-1.5 mb-5 border border-white/50">
              <span className="w-2 h-2 rounded-full bg-[#0e787a]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0e787a]">
                CLINICOS REAL-TIME ENGINE • LIVE OPD TRACKER
              </span>
            </div>

            <h1 className="font-playfair text-3xl sm:text-5xl font-normal text-slate-900 mb-3 tracking-tight leading-tight">
              Live Consultation Queue
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Real-time OPD cabin telemetry for Shingare Skin &amp; Cosmetics Clinic. Track active tokens, cabin progression, and your exact turn without waiting room crowding.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-[980px] mx-auto px-4 sm:px-8 space-y-7">
        {/* 2. Doctor & Cabin Telemetry Console (Neumorphic Extruded Chassis) */}
        <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 p-6 sm:p-8 space-y-7">
          {/* Top Doctor Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4 flex-1">
              {/* Simple Single-Layer Neumorphic Icon Box */}
              <div className="w-14 h-14 rounded-2xl bg-[#E6ECEF] shadow-[3px_3px_7px_#c8ced1,-3px_-3px_7px_#f8fafb] shrink-0 border border-white/60 flex items-center justify-center text-[#0e787a]">
                <Stethoscope className="w-6 h-6 stroke-[1.75]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-bold text-[#1f6f4a] bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] px-3 py-1 rounded-full border border-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f6f4a]" />
                    OPD ACTIVE
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.14em] text-[#0e787a] uppercase">
                    SHINGARE SKIN &amp; COSMETICS • MAIN CLINIC
                  </span>
                </div>

                <h2 className="font-playfair text-2xl sm:text-[26px] font-bold text-slate-900 leading-tight">
                  Dr. Pramod &amp; Dr. Priyanka Shingare
                </h2>

                <p className="text-xs text-slate-600 font-medium">
                  MD (Dermatology) • BHMS, FCHD | Clinical Dermatology, Lasers &amp; Aesthetics
                </p>

                <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0e787a] shrink-0" />
                  <span>Near S.T. Bus Stand, Main Road, Peth Vadgaon, Kolhapur (MH)</span>
                </p>
              </div>
            </div>

            {/* Right Shift & Tactile Refresh Control */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2.5 shrink-0">
              <div className="inline-flex items-center gap-2 bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] text-slate-700 text-[11px] font-semibold px-4 py-2 rounded-2xl border border-white/40">
                <Sun className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Morning OPD: 10:00 AM – 1:30 PM</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1f6f4a]" />
                  <span>Synced {lastSyncTime}</span>
                </span>
                <button
                  type="button"
                  onClick={() => fetchStatus(query)}
                  title="Refresh live queue telemetry"
                  className="w-8 h-8 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] flex items-center justify-center text-slate-600 hover:text-[#0e787a] transition-all cursor-pointer border border-white/50"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#0e787a]" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Carved Divider Groove */}
          <div className="h-[2px] w-full rounded-full shadow-[inset_1px_1px_2px_#bec4c7,inset_-1px_-1px_2px_#ffffff]" />

          {/* 3 Sculpted Telemetry Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Module 1: In Cabin Now */}
            <div className="rounded-2xl bg-[#E6ECEF] shadow-[4px_4px_8px_#c8ced1,-4px_-4px_8px_#f8fafb] border border-white/60 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0e787a]" />
                  <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#0e787a]">
                    IN CABIN NOW
                  </p>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Active doctor consultation
                </p>
                <div className="inline-flex items-center gap-1.5 text-[10px] bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-[#0e787a] px-2.5 py-1 rounded-lg font-semibold">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono">
                    {elapsedMin}m {String(elapsedRemSec).padStart(2, "0")}s
                  </span>
                </div>
              </div>

              {/* Tactile Token Dial Button */}
              <button
                type="button"
                onClick={() => handleSelectToken(nowToken)}
                title="Inspect active cabin token"
                className="w-[74px] h-[74px] rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer border border-white/50 group"
              >
                <span className="text-[8px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-0.5 group-hover:text-[#0e787a]">
                  TOKEN
                </span>
                <span className="font-playfair text-2xl font-bold text-[#0e787a]">
                  #{String(nowToken).padStart(2, "0")}
                </span>
              </button>
            </div>

            {/* Module 2: Waiting Patients */}
            <div className="rounded-2xl bg-[#E6ECEF] shadow-[4px_4px_8px_#c8ced1,-4px_-4px_8px_#f8fafb] border border-white/60 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-700">
                    WAITING PATIENTS
                  </p>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Preparing in lounge queue
                </p>
                <div className="inline-flex items-center gap-1.5 text-[10px] bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-amber-800 px-2.5 py-1 rounded-lg font-semibold">
                  <Timer className="w-3 h-3 text-amber-700" />
                  <span>Est. wait: ~{waitCount * 8} mins</span>
                </div>
              </div>

              {/* Recessed Readout Well */}
              <div className="w-[74px] h-[74px] rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] flex flex-col items-center justify-center shrink-0 border border-white/50">
                <span className="text-[8px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-0.5">
                  QUEUE
                </span>
                <span className="font-playfair text-2xl font-bold text-slate-800">
                  {waitCount}
                </span>
              </div>
            </div>

            {/* Module 3: OPD Pace */}
            <div className="rounded-2xl bg-[#E6ECEF] shadow-[4px_4px_8px_#c8ced1,-4px_-4px_8px_#f8fafb] border border-white/60 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#1f6f4a]" />
                  <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-700">
                    OPD PACE
                  </p>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Avg. 8–10 mins / consult
                </p>
                <div className="inline-flex items-center gap-1.5 text-[10px] bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-[#1f6f4a] px-2.5 py-1 rounded-lg font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1f6f4a]" />
                  <span>On Schedule</span>
                </div>
              </div>

              {/* Tactile Next Token Button */}
              <button
                type="button"
                onClick={() => handleSelectToken(nowToken + 1)}
                title="Inspect next patient token"
                className="w-[74px] h-[74px] rounded-2xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer border border-white/60"
              >
                <span className="text-[8px] uppercase tracking-[0.18em] text-amber-700 font-bold mb-0.5">
                  NEXT
                </span>
                <span className="font-playfair text-2xl font-bold text-slate-800">
                  #{String(nowToken + 1).padStart(2, "0")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Track Your Token Status Console */}
        <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-slate-900">
                Track Your Token Status
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your token or mobile number, or tap any token in the cabin strip below.
              </p>
            </div>

            {/* Neumorphic Segmented Tab Trough */}
            <div className="inline-flex p-1 rounded-xl bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-white/50 shrink-0">
              <button
                type="button"
                onClick={() => setTab("token")}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tab === "token"
                    ? "bg-[#E6ECEF] text-[#0e787a] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] border border-white/60"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>By Token Number</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("phone")}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tab === "phone"
                    ? "bg-[#E6ECEF] text-[#0e787a] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] border border-white/60"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>By Mobile Number</span>
              </button>
            </div>
          </div>

          {/* Simple Neumorphic Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="flex-1 flex items-stretch rounded-xl overflow-hidden bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-slate-300/60 focus-within:border-[#0e787a]/60 transition-colors">
              <span className="inline-flex items-center justify-center px-3.5 border-r border-slate-300/60 bg-white/35 text-[#0e787a] font-mono text-sm font-bold select-none shrink-0">
                {tab === "token" ? "#" : <Phone className="w-3.5 h-3.5" />}
              </span>
              <input
                type={tab === "phone" ? "tel" : "text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  tab === "token"
                    ? "Enter your token number (e.g. 12, 13, 15)"
                    : "Enter your registered 10-digit mobile number"
                }
                className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 rounded-xl bg-[#108283] hover:bg-[#0c6b6c] active:scale-[0.99] shadow-[3px_3px_6px_#c3c9cc] text-white text-xs uppercase tracking-wider font-bold disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              {loading ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>CHECK LIVE STATUS</span>
            </button>
          </form>

          {/* Physical Neumorphic Toggle Switch Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => setAutoRefresh((prev) => !prev)}
              className="inline-flex items-center gap-3 cursor-pointer group text-left"
            >
              {/* Recessed Switch Track + Extruded Sliding Thumb */}
              <div className="w-12 h-6 rounded-full bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c3c9cc,inset_-3px_-3px_6px_#ffffff] p-1 flex items-center transition-all border border-white/40">
                <div
                  className={`w-4 h-4 rounded-full bg-[#E6ECEF] shadow-[2px_2px_4px_#b8bec2,-2px_-2px_4px_#ffffff] flex items-center justify-center transition-transform duration-200 ${
                    autoRefresh ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      autoRefresh ? "bg-[#0e787a]" : "bg-slate-400"
                    }`}
                  />
                </div>
              </div>
              <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                Auto-refresh queue position every 15s
              </span>
              <span className="bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c3c9cc,inset_-2px_-2px_4px_#ffffff] text-[#1f6f4a] font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Live Telemetry
              </span>
            </button>

            <span className="text-[11px] text-slate-400 font-medium">
              Tokens are called sequentially in cabin order
            </span>
          </div>

          {/* Carved Divider Groove */}
          <div className="h-[2px] w-full rounded-full shadow-[inset_1px_1px_2px_#bec4c7,inset_-1px_-1px_2px_#ffffff]" />

          {/* Doctor Cabin Queue Strip inside a Recessed Track Well */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[11px] uppercase tracking-[0.14em]">
                <div className="w-6 h-6 rounded-lg bg-[#E6ECEF] shadow-[3px_3px_6px_#c3c9cc,-3px_-3px_6px_#ffffff] flex items-center justify-center text-[#0e787a]">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span>DOCTOR CABIN QUEUE STRIP</span>
                <span className="text-[10px] text-slate-400 font-normal normal-case tracking-normal">
                  (Tap any token button to inspect live patient status)
                </span>
              </div>
              <span className="text-[#0e787a] text-[11px] font-bold tracking-wide">
                Real-Time Cabin Progression
              </span>
            </div>

            {/* Recessed Tray Holding Tactile Token Keys */}
            <div className="p-3.5 sm:p-4 rounded-[24px] bg-[#E6ECEF] shadow-[inset_3px_3px_7px_#c8ced1,inset_-3px_-3px_7px_#f8fafb] border border-white/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
                {NEU_TOKENS.map((item) => {
                  const isSelected = query.trim() === String(item.num);
                  const isActiveCabin = item.role === "active";
                  const isNextTurn = item.role === "next";
                  const isCompleted = item.role === "completed";

                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => handleSelectToken(item.num)}
                      className={`rounded-2xl p-3.5 text-center space-y-1.5 relative transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? "bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border-[#0e787a]/45 scale-[0.98]"
                          : isActiveCabin
                          ? "bg-[#E6ECEF] shadow-[3px_3px_7px_#c8ced1,-3px_-3px_7px_#f8fafb] border-[#0e787a]/40"
                          : isCompleted
                          ? "bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] border-white/30 opacity-75 hover:opacity-100"
                          : "bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] border-white/60"
                      }`}
                    >
                      {isActiveCabin && (
                        <span className="inline-flex items-center gap-1 bg-[#0e787a] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          NOW
                        </span>
                      )}

                      <p
                        className={`text-[8px] uppercase tracking-[0.16em] font-bold ${
                          isActiveCabin
                            ? "text-[#0e787a]"
                            : isNextTurn
                            ? "text-amber-700"
                            : "text-slate-400"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p
                        className={`font-playfair text-2xl font-bold ${
                          isActiveCabin
                            ? "text-[#0e787a]"
                            : isNextTurn
                            ? "text-amber-800"
                            : isCompleted
                            ? "text-slate-400"
                            : "text-slate-800"
                        }`}
                      >
                        #{item.num}
                      </p>

                      <p
                        className={`text-[9px] font-semibold ${
                          isSelected
                            ? "text-[#0e787a]"
                            : isActiveCabin
                            ? "text-[#0e787a]"
                            : isNextTurn
                            ? "text-amber-700"
                            : "text-slate-400"
                        }`}
                      >
                        {isSelected ? "Viewing Now" : item.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Found Patient Token Telemetry Readout Card */}
        {statusResult && statusResult.found && statusResult.queueItem && (
          <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] px-3.5 py-1 text-[10px] uppercase font-bold tracking-[0.16em] text-[#0e787a]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f6f4a]" />
                  <span>LIVE OPD POSITION CONFIRMED</span>
                </div>

                <h4 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">
                  {statusResult.queueItem.patientName}
                </h4>

                <p className="text-xs text-slate-500">
                  Clinical Service:{" "}
                  <strong className="text-slate-800 font-semibold">
                    {statusResult.queueItem.service}
                  </strong>
                </p>
              </div>

              {/* Simple Single-Layer Neumorphic Token Badge */}
              <div className="px-6 py-3.5 rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/60 text-center min-w-[115px] self-start sm:self-center">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-0.5">
                  YOUR TOKEN
                </p>
                <p className="font-playfair text-4xl font-bold text-[#0e787a]">
                  #{String(statusResult.queueItem.tokenNumber).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* Neumorphic Progress Gauge Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Queue Check-In</span>
                <span className="text-[#0e787a]">
                  {statusResult.queueItem.status === "in_consultation"
                    ? "Active Inside Doctor Cabin"
                    : statusResult.queueItem.status === "completed"
                    ? "Consultation Complete"
                    : `${statusResult.patientsAhead ?? 0} Patient(s) Ahead`}
                </span>
                <span>Cabin Entry</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] p-1">
                <div
                  className="h-full rounded-full bg-[#0e787a] transition-all duration-500"
                  style={{ width: `${getQueueProgressPercent()}%` }}
                />
              </div>
            </div>

            {/* 3 Recessed Readout Wells */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl p-4 bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/50 space-y-1">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400 font-bold">
                  QUEUE STATE
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide pt-0.5">
                  {statusResult.queueItem.status === "in_consultation"
                    ? "In Cabin Now"
                    : statusResult.queueItem.status === "completed"
                    ? "Consultation Completed"
                    : "Waiting in Queue"}
                </p>
              </div>

              <div className="rounded-2xl p-4 bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/50 space-y-1">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400 font-bold">
                  AHEAD OF YOU
                </p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 font-playfair">
                  {statusResult.patientsAhead ?? 0}{" "}
                  {statusResult.patientsAhead === 1 ? "Patient" : "Patients"}
                </p>
              </div>

              <div className="rounded-2xl p-4 bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/50 space-y-1">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400 font-bold">
                  ESTIMATED WAIT
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#0e787a] font-playfair">
                  {statusResult.estimatedWaitMinutes ?? 0} mins
                </p>
              </div>
            </div>

            {/* Guidance & WhatsApp Action Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E6ECEF] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] flex items-center justify-center text-[#1f6f4a] shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {statusResult.patientsAhead === 0 &&
                  statusResult.queueItem.status === "in_consultation"
                    ? "You are currently consulting in the cabin with Dr. Pramod & Dr. Priyanka Shingare."
                    : statusResult.patientsAhead === 0 &&
                      statusResult.queueItem.status === "completed"
                    ? "Your consultation is complete. You can collect medicines or scan your case paper QR for voice instructions."
                    : statusResult.patientsAhead === 0
                    ? "Your turn is next! Please step near the main consultation cabin."
                    : statusResult.patientsAhead && statusResult.patientsAhead <= 2
                    ? "Your turn is approaching shortly. Please be seated in the front clinic lounge."
                    : "You can relax comfortably until 2–3 patients remain ahead of your token."}
                </p>
              </div>

              <a
                href={`https://wa.me/917249727104?text=${encodeURIComponent(
                  `Hello Shingare Clinic, I am tracking my OPD Token #${statusResult.queueItem.tokenNumber} (${statusResult.queueItem.patientName}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-xs font-bold text-[#1f6f4a] inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all border border-white/60"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Notify on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {statusResult && !statusResult.found && (
          <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] flex items-center justify-center text-amber-700 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="font-playfair text-xl font-bold text-slate-900">
              Token Not Found in Active Queue
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              No active token matched &ldquo;{query}&rdquo;. Tap any token from{" "}
              <strong className="text-slate-700">#10 to #15</strong> above or book a new OPD token.
            </p>
            <div className="pt-1">
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-xs text-[#0e787a] font-bold transition-all border border-white/60"
              >
                <span>Book New Appointment Token</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* 5. Reception Assistance Console */}
        <div className="rounded-[32px] bg-[#E6ECEF] border border-white/80 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] shrink-0 border border-white/60 flex items-center justify-center text-[#0e787a]">
              <Headphones className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h4 className="font-playfair font-bold text-lg text-slate-900">
                  Need Assistance with Your OPD Position?
                </h4>
                <span className="bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-[#1f6f4a] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Desk Open
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Contact the clinic reception desk for urgent dermatology queries, elderly priority access, or slot rescheduling.
              </p>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0e787a]" />
                <span>Clinic Reception: 9:30 AM – 8:30 PM • Monday to Saturday</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <a
              href="https://wa.me/917249727104?text=Hello%20Shingare%20Clinic,%20I%20need%20assistance%20with%20my%20OPD%20queue%20position."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-slate-700 hover:text-[#1f6f4a] text-xs font-bold transition-all border border-white/60"
            >
              <MessageCircle className="w-4 h-4 text-[#1f6f4a]" />
              <span>WhatsApp Reception</span>
            </a>

            <a
              href="tel:+917249727104"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#108283] hover:bg-[#0c6b6c] shadow-[3px_3px_6px_#c3c9cc] text-white text-xs font-bold transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              <span>+91 72497 27104</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LiveQueuePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#c0e6b9] flex items-center justify-center">
          <span className="text-sm text-slate-700 font-medium">Loading live queue console…</span>
        </div>
      }
    >
      <LiveQueueContent />
    </Suspense>
  );
}
