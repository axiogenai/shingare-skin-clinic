"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function QRRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const drVoice = searchParams.get("dr_voice");
    const rxId = searchParams.get("rx_id");
    const rx = searchParams.get("rx");
    const cert = searchParams.get("cert");

    if (drVoice || rxId || rx) {
      router.push(`/my-rx?${searchParams.toString()}`);
    } else if (cert) {
      router.push(`/verify?${searchParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}
