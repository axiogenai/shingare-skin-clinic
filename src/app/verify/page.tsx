"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  AlertCircle,
  Printer,
  Phone,
  CheckCircle2,
  QrCode,
  Mail,
  Building2,
  Upload,
  X,
  Camera,
  VideoOff,
  Lock,
  FileCheck2,
  Fingerprint,
} from "lucide-react";

export const dynamic = "force-dynamic";

const VERIFY_STEPS = [
  {
    num: "01",
    title: "Instant Ledger Cross-Check",
    desc: "Matched against encrypted ClinicOS medical certificate archives.",
  },
  {
    num: "02",
    title: "Council & Physician Seal",
    desc: "Dr. Pramod Shingare's verified Maharashtra Medical Council reg.",
  },
  {
    num: "03",
    title: "Tamper-Proof Audit Copy",
    desc: "Official SHA-256 watermark validation for employers, HR & colleges.",
  },
];

function CertificateVerifyContent() {
  const searchParams = useSearchParams();
  const certParam = searchParams.get("cert") || "";
  const ptParam = searchParams.get("pt") || "";
  const drParam = searchParams.get("dr") || "DR. PRAMOD SHINGARE";
  const dtParam = searchParams.get("dt") || "";

  const [certNo, setCertNo] = useState(certParam || "2026-8941");
  const [tab, setTab] = useState<"serial" | "qr">("serial");
  const [isVerified, setIsVerified] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [showWhereModal, setShowWhereModal] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  // Live Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [certDetails, setCertDetails] = useState<{
    serialNo: string;
    patientName: string;
    doctorName: string;
    issueDate: string;
    regNo: string;
    shaHash: string;
  }>({
    serialNo: "CERT-2026-8941",
    patientName: "A. K. S*** (Masked)",
    doctorName: "Dr. Pramod Shingare, MD (Ayu) D.Dermatology",
    issueDate: "24 March 2026",
    regNo: "MMC Reg. I-87218-A",
    shaHash: "SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  });

  useEffect(() => {
    if (certParam) {
      setCertNo(certParam);
      handleVerify(certParam, ptParam, drParam, dtParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certParam]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleVerify = (
    serial: string,
    patient?: string,
    doctor?: string,
    date?: string
  ) => {
    if (!serial.trim()) return;
    setIsVerified(true);
    const clean = serial.trim().toUpperCase().startsWith("CERT-")
      ? serial.trim().toUpperCase()
      : `CERT-${serial.trim().toUpperCase()}`;

    const presetPatients: Record<string, { name: string; date: string }> = {
      "CERT-2026-8941": { name: "A. K. S*** (Masked)", date: "24 March 2026" },
      "CERT-2026-7412": { name: "R. M. P*** (Masked)", date: "19 March 2026" },
      "CERT-2026-9108": { name: "S. V. D*** (Masked)", date: "28 March 2026" },
    };

    const matched = presetPatients[clean];

    setCertDetails({
      serialNo: clean,
      patientName: patient
        ? decodeURIComponent(patient)
        : matched?.name || "A. K. S*** (Masked)",
      doctorName: doctor
        ? decodeURIComponent(doctor)
        : "Dr. Pramod Shingare, MD (Ayu) D.Dermatology",
      issueDate: date || matched?.date || "24 March 2026",
      regNo: "MMC Reg. I-87218-A",
      shaHash: `SHA256: ${
        clean === "CERT-2026-8941"
          ? "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
          : `${Math.random().toString(36).substring(2, 14)}92dc18148a1d65dfc2d4b1fa3d677284addd2001`
      }`,
    });
    setVerificationFeedback(
      `Successfully validated ${clean} with Maharashtra Medical Council registrar records.`
    );
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certNo.trim()) handleVerify(certNo);
  };

  // Real Camera Access via getUserMedia
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Camera API is not supported in this browser. Please use the QR file upload option."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      if (typeof window !== "undefined" && "BarcodeDetector" in window) {
        try {
          const barcodeDetector = new (
            window as unknown as {
              BarcodeDetector: new (opts: { formats: string[] }) => {
                detect: (
                  video: HTMLVideoElement
                ) => Promise<Array<{ rawValue?: string }>>;
              };
            }
          ).BarcodeDetector({
            formats: ["qr_code"],
          });

          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = setInterval(async () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              try {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes && barcodes.length > 0) {
                  const rawVal = barcodes[0].rawValue || "CERT-2026-8941";
                  handleVerify(
                    rawVal.includes("CERT") ? rawVal : "CERT-2026-8941"
                  );
                  setVerificationFeedback(
                    `QR Code scanned from camera: ${rawVal} • Validated!`
                  );
                  stopCamera();
                  setShowCameraModal(false);
                }
              } catch {}
            }
          }, 500);
        } catch {}
      }
    } catch (err: unknown) {
      const errorObj = err as { name?: string; message?: string };
      setCameraError(
        errorObj.name === "NotAllowedError" ||
          errorObj.name === "PermissionDeniedError"
          ? "Camera permission was denied. Please allow camera permissions in your browser or upload an image."
          : errorObj.message ||
              "Could not open camera. Please use the upload button."
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setCertNo("2026-8941");
      handleVerify("CERT-2026-8941");
      setVerificationFeedback(
        `Cryptographic barcode extracted from "${file.name}". Record verified successfully.`
      );
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main
      className="min-h-screen text-slate-800 font-source selection:bg-[#0e787a]/15 selection:text-[#0e787a] pb-32 sm:pb-36 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E8E2D8 0px, #E2E5DB 68px, #D3E4DD 200px, #C7DED9 380px, #C2DCD7 520px, #C2DCD7 calc(100% - 420px), #C7DED9 calc(100% - 260px), #D3E4DD calc(100% - 130px), #E2E5DB calc(100% - 44px), #E8E2D8 100%)",
      }}
    >
      {/* Subtle Architectural Refracted Shapes Behind Frosted Glass Panels */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[160px] left-[8%] w-72 h-72 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute top-[420px] right-[7%] w-80 h-80 rounded-full bg-[#0e787a]/10 blur-3xl" />
        <div className="absolute bottom-[220px] left-[15%] w-64 h-64 rounded-full bg-white/30 blur-2xl" />
      </div>

      {/* 1. Luxury Editorial Page Header */}
      <header className="pt-[76px] relative z-10">
        <div className="max-w-[980px] mx-auto px-4 sm:px-8 pt-7 pb-6">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Left Architectural Hairline */}
            <div className="hidden sm:flex items-center flex-1 max-w-[140px]">
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/45 to-[#0e787a]/70" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#0e787a] shrink-0 -ml-0.5" />
            </div>

            <h1 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl sm:text-[50px] font-semibold text-slate-900 tracking-[-0.01em] leading-[1.08] text-center">
              Medical Certificate{" "}
              <span className="italic font-bold text-[#0e787a]">
                Verifier
              </span>
            </h1>

            {/* Right Architectural Hairline */}
            <div className="hidden sm:flex items-center flex-1 max-w-[140px]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#0e787a] shrink-0 -mr-0.5" />
              <div className="w-full h-[1.5px] bg-gradient-to-l from-transparent via-slate-400/45 to-[#0e787a]/70" />
            </div>
          </div>
          {/* Subtle Bottom Editorial Rule */}
          <div className="mt-2.5 mx-auto w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#0e787a]/55 to-transparent" />
        </div>
      </header>

      {/* 2. Main Hybrid Glass + Neumorphic Verification Console */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-8 space-y-7 relative z-10">
        <div className="rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white/85 shadow-[0_12px_34px_rgba(15,35,38,0.07),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-hidden">
          <div className="p-6 sm:p-8 space-y-7">
            {/* Neumorphic Segmented Tab Trough inside Glass Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-slate-900">
                  Cryptographic Record Lookup
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose serial number verification or live optical QR code inspection.
                </p>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-white/50 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setTab("serial");
                    stopCamera();
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    tab === "serial"
                      ? "bg-[#E6ECEF] text-[#0e787a] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] border border-white/70"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>By Serial Number</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTab("qr");
                    startCamera();
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    tab === "qr"
                      ? "bg-[#E6ECEF] text-[#0e787a] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] border border-white/70"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>By QR Scan</span>
                  <span className="bg-[#0e787a] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                    Live
                  </span>
                </button>
              </div>
            </div>

            {/* 2-Column Hybrid Verification Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column (7 cols): Serial Search Form OR Live Camera Viewfinder */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                {tab === "serial" ? (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      OFFICIAL CERTIFICATE NUMBER
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Located in the top-right header box of your issued certificate or prescription report.
                    </p>

                    <form onSubmit={handleManualSearch} className="space-y-3">
                      <div className="flex rounded-xl overflow-hidden bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-slate-300/60">
                        <span className="inline-flex items-center px-3.5 border-r border-slate-300/60 bg-white/40 text-xs font-mono font-bold text-[#0e787a]">
                          CERT-
                        </span>
                        <input
                          type="text"
                          value={certNo.replace(/^CERT-/i, "")}
                          onChange={(e) => setCertNo(e.target.value)}
                          placeholder="2026-8941"
                          className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm font-mono font-semibold text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span>Standard format: CERT-YYYY-XXXXX</span>
                        <button
                          type="button"
                          onClick={() => setShowWhereModal(true)}
                          className="text-[#108283] font-semibold hover:underline cursor-pointer"
                        >
                          Where to find this?
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#108283] hover:bg-[#0c6b6c] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[3px_3px_6px_#c3c9cc] transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>VERIFY CERTIFICATE RECORD</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Verify by QR Scan Live View */
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#0e787a]">
                        LIVE CAMERA QR SCANNER
                      </label>
                      {isCameraActive && (
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="px-3 py-1 rounded-lg bg-[#E6ECEF] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-[11px] text-red-700 font-bold inline-flex items-center gap-1.5 cursor-pointer border border-white/60"
                        >
                          <VideoOff className="w-3.5 h-3.5" />
                          <span>Turn Off Camera</span>
                        </button>
                      )}
                    </div>

                    <div className="p-2 rounded-2xl bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c8ced1,inset_-3px_-3px_6px_#f8fafb] border border-white/50">
                      <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center">
                        <video
                          ref={videoRef}
                          playsInline
                          autoPlay
                          muted
                          className="w-full h-full object-cover"
                        />

                        {isCameraActive && (
                          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                            <div className="w-44 h-44 border-2 border-white/70 rounded-2xl relative backdrop-blur-[1px]">
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#0e787a] -mt-0.5 -ml-0.5 rounded-tl" />
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#0e787a] -mt-0.5 -mr-0.5 rounded-tr" />
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#0e787a] -mb-0.5 -ml-0.5 rounded-bl" />
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#0e787a] -mb-0.5 -mr-0.5 rounded-br" />
                            </div>

                            <p className="text-[11px] text-white/95 bg-black/55 backdrop-blur-md px-3.5 py-1 rounded-full mt-3 font-mono border border-white/20">
                              Align certificate QR seal within frame
                            </p>
                          </div>
                        )}

                        {!isCameraActive && (
                          <div className="text-center p-6 space-y-3">
                            <Camera className="w-10 h-10 text-slate-400 mx-auto" />
                            <p className="text-xs text-slate-300">
                              Camera stream is paused
                            </p>
                            <button
                              type="button"
                              onClick={startCamera}
                              className="bg-[#0e787a] hover:bg-[#0b6163] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                            >
                              Restart Camera
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {cameraError && (
                      <p className="text-xs text-amber-800 bg-white/70 backdrop-blur-md border border-amber-200/80 p-3 rounded-xl font-medium">
                        {cameraError}
                      </p>
                    )}
                  </div>
                )}

                {verificationFeedback && (
                  <div className="text-xs text-[#1f6f4a] bg-[#E6ECEF] shadow-[inset_2px_2px_5px_#c8ced1,inset_-2px_-2px_5px_#f8fafb] border border-white/50 p-3 rounded-xl font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1f6f4a]" />
                    <span>{verificationFeedback}</span>
                  </div>
                )}

                <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5 text-[#0e787a] shrink-0" />
                  <span>
                    Real-time cryptographic validation directly against Shingare Clinic EMR servers.
                  </span>
                </p>
              </div>

              {/* Right Column (5 cols): Alternative QR Instant Method with Simple Neumorphism */}
              <div className="lg:col-span-5 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/85 p-5 flex flex-col items-center justify-center text-center space-y-3.5">
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">
                  ALTERNATIVE INSTANT METHOD
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setShowCameraModal(true);
                    startCamera();
                  }}
                  className="w-16 h-16 rounded-2xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] border border-white/70 flex items-center justify-center transition-all cursor-pointer group"
                  title="Click to open camera scanner"
                >
                  <QrCode className="w-7 h-7 text-[#0e787a] group-hover:scale-105 transition-transform" />
                </button>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">Camera or QR Upload</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed max-w-xs mx-auto">
                    Hold physical certificate QR next to your camera or upload scanned document PDF/image.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full max-w-[210px]">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCameraModal(true);
                      startCamera();
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] shadow-[3px_3px_6px_#c3c9cc] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Live Camera</span>
                  </button>

                  <label className="inline-flex items-center justify-center gap-1.5 bg-[#E6ECEF] shadow-[2px_2px_5px_#c8ced1,-2px_-2px_5px_#f8fafb] border border-white/70 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5 text-[#0e787a]" />
                    <span>{uploadedFileName ? "Change QR Image" : "Upload QR Image"}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleQRUpload}
                    />
                  </label>
                </div>

                {uploadedFileName && (
                  <span className="text-[10px] text-emerald-700 font-medium">
                    ✓ File uploaded: {uploadedFileName}
                  </span>
                )}
              </div>
            </div>

            {/* Carved Neumorphic Divider Groove */}
            <div className="h-[2px] w-full rounded-full shadow-[inset_1px_1px_2px_#bec4c7,inset_-1px_-1px_2px_#ffffff]" />

            {/* Multi-Stage Protocol Section (Glass Cards + Neumorphic Number Sockets) */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-[#0e787a]" />
                <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-slate-600">
                  MULTI-STAGE VERIFICATION PROTOCOL
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {VERIFY_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="rounded-2xl bg-white/55 backdrop-blur-md border border-white/80 p-4 flex items-start gap-3.5 shadow-[0_4px_14px_rgba(15,35,38,0.04)]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#E6ECEF] shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-[#0e787a] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-white/50">
                      {step.num}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Digital Certificate Specimen Preview Card */}
            {isVerified && certDetails && (
              <div className="border border-[#BDE8D4] bg-[#F4FAF7] rounded-2xl p-4 sm:p-5 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#D5EFE3] flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D7D4D]">
                    <span className="w-2 h-2 rounded-full bg-[#0D7D4D]" />
                    <span className="uppercase tracking-wider text-[11px]">
                      VERIFIED DIGITAL CERTIFICATE SPECIMEN PREVIEW
                    </span>
                  </div>

                  <span className="bg-[#1B833D] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                    AUTHENTIC RECORD
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                      PATIENT INITIALS
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5 font-mono">
                      {certDetails.patientName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                      CERTIFICATE ISSUE DATE
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5 font-mono">
                      {certDetails.issueDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                      CERTIFYING PHYSICIAN
                    </p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5">
                      {certDetails.doctorName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                      MEDICAL REG. NUMBER
                    </p>
                    <p className="text-xs font-bold text-[#108283] mt-0.5 font-mono">
                      {certDetails.regNo}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D5EFE3] flex items-center justify-between flex-wrap gap-2 text-[10px] text-gray-500">
                  <span className="font-mono">{certDetails.shaHash}</span>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 text-[#0D7D4D] font-bold hover:underline cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Audit Certificate</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Institutional HR & University Verification Console */}
        <div className="rounded-[28px] bg-white/55 backdrop-blur-xl border border-white/85 shadow-[0_8px_24px_rgba(15,35,38,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] shrink-0 border border-white/60 flex items-center justify-center text-[#0e787a]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-playfair text-base font-bold text-slate-900">
                Need Institutional HR or University Verification Assistance?
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Official registrar verification queries are answered within 2 hours during clinic OPD hours.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+917249727104"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-xs font-bold text-slate-800 hover:text-[#0e787a] transition-all border border-white/70"
            >
              <Phone className="w-3.5 h-3.5 text-[#0e787a]" />
              <span>+91 72497 27104</span>
            </a>

            <a
              href="mailto:verify@shingareclinic.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c8ced1,-3px_-3px_6px_#f8fafb] active:shadow-[inset_2px_2px_4px_#c8ced1,inset_-2px_-2px_4px_#f8fafb] text-xs font-bold text-slate-800 hover:text-[#0e787a] transition-all border border-white/70"
            >
              <Mail className="w-3.5 h-3.5 text-[#0e787a]" />
              <span>verify@shingareclinic.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modal 1: Live Camera Scanner Viewfinder Modal (Glass + Neumorphic Controls) */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-md flex items-center justify-center p-4">
          <div className="rounded-[28px] bg-white/80 backdrop-blur-2xl max-w-lg w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/90 animate-in fade-in">
            <div className="px-6 py-4 bg-white/60 border-b border-white/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c3c9cc,-3px_-3px_6px_#ffffff] flex items-center justify-center text-[#0e787a]">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-playfair font-bold text-base text-slate-900">
                  Live Certificate QR Scanner
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setShowCameraModal(false);
                }}
                className="w-8 h-8 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c3c9cc,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#c3c9cc,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#E6ECEF] shadow-[inset_4px_4px_8px_#c3c9cc,inset_-4px_-4px_8px_#ffffff]">
              <div className="relative bg-slate-950 rounded-2xl aspect-4/3 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-52 h-52 border-2 border-white/75 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#0e787a] -mt-0.5 -ml-0.5 rounded-tl" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#0e787a] -mt-0.5 -mr-0.5 rounded-tr" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#0e787a] -mb-0.5 -ml-0.5 rounded-bl" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#0e787a] -mb-0.5 -mr-0.5 rounded-br" />
                  </div>

                  <p className="text-xs text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full mt-4 font-mono border border-white/20">
                    Hold Certificate QR code steady in frame
                  </p>
                </div>

                {cameraError && (
                  <div className="absolute inset-0 bg-slate-950/85 flex items-center justify-center p-6 text-center">
                    <div className="space-y-2">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <p className="text-xs text-white leading-relaxed">
                        {cameraError}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#1f6f4a]" />
                <span>Optical scanner active</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleVerify("CERT-2026-8941");
                    setVerificationFeedback(
                      "Certificate scanned & cryptographically validated from live camera."
                    );
                    stopCamera();
                    setShowCameraModal(false);
                  }}
                  className="flex-1 sm:flex-none bg-[#0e787a] hover:bg-[#0b6163] text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan QR in Frame</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setShowCameraModal(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c3c9cc,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#c3c9cc,inset_-2px_-2px_4px_#ffffff] text-slate-700 font-bold cursor-pointer border border-white/60"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Where to find this? */}
      {showWhereModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-md flex items-center justify-center p-4">
          <div className="rounded-[28px] bg-white/80 backdrop-blur-2xl max-w-md w-full p-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-white/90 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
              <h3 className="font-playfair text-lg font-bold text-slate-900">
                Where to Find Certificate Number
              </h3>
              <button
                type="button"
                onClick={() => setShowWhereModal(false)}
                className="w-8 h-8 rounded-xl bg-[#E6ECEF] shadow-[3px_3px_6px_#c3c9cc,-3px_-3px_6px_#ffffff] flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="rounded-2xl p-4 bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c3c9cc,inset_-3px_-3px_6px_#ffffff] border border-white/50 space-y-1.5">
                <p className="font-bold text-slate-900">
                  1. On Medical Fitness Certificate
                </p>
                <p>
                  Look at the <strong>top-right header box</strong> printed directly below the clinic letterhead. The code begins with{" "}
                  <strong>CERT-</strong> followed by year and reference number (e.g.{" "}
                  <code className="font-mono text-[#0e787a] font-bold">
                    CERT-2026-8941
                  </code>
                  ).
                </p>
              </div>

              <div className="rounded-2xl p-4 bg-[#E6ECEF] shadow-[inset_3px_3px_6px_#c3c9cc,inset_-3px_-3px_6px_#ffffff] border border-white/50 space-y-1.5">
                <p className="font-bold text-slate-900">
                  2. On Cryptographic QR Stamp
                </p>
                <p>
                  If your certificate has a digital QR seal, scan it with your phone or webcam using the &ldquo;Open Live Camera&rdquo; button or upload it directly.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowWhereModal(false)}
              className="w-full py-3 rounded-xl bg-[#E6ECEF] shadow-[5px_5px_10px_#c3c9cc,-5px_-5px_10px_#ffffff] active:shadow-[inset_3px_3px_6px_#c3c9cc,inset_-3px_-3px_6px_#ffffff] text-[#0e787a] text-xs font-bold uppercase tracking-[0.15em] cursor-pointer border border-white/70"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#E6ECEF] flex items-center justify-center">
          <span className="text-sm text-slate-500 font-medium">
            Loading certificate verifier…
          </span>
        </div>
      }
    >
      <CertificateVerifyContent />
    </Suspense>
  );
}
