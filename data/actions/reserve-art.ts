"use server";

import { backendClient } from "@/sanity/lib/backend-cLient";

const RESERVATION_MINUTES = 20;

type ReserveResult =
  | { ok: true; reservedUntil: string }
  | { ok: false; reason: "not_found" | "unavailable" };

export async function reserveArt(artId: string): Promise<ReserveResult> {
  const art = await backendClient.getDocument(artId);

  if (!art) {
    return { ok: false, reason: "not_found" };
  }

  const activelyReserved =
    typeof art.reservedUntil === "string" &&
    new Date(art.reservedUntil).getTime() > Date.now();

  if (art.available === false || activelyReserved) {
    return { ok: false, reason: "unavailable" };
  }

  const reservedUntil = new Date(
    Date.now() + RESERVATION_MINUTES * 60_000,
  ).toISOString();

  try {
    await backendClient
      .patch(artId)
      .ifRevisionId(art._rev)
      .set({ reservedUntil })
      .commit();
  } catch {
    // Lost the race — someone else claimed it between our read and this write.
    return { ok: false, reason: "unavailable" };
  }

  return { ok: true, reservedUntil };
}

// Called when payment initialization itself fails, so a dead Paystack call
// doesn't lock the piece out for the full 10 minutes over nothing.
export async function releaseReservation(artId: string) {
  await backendClient.patch(artId).unset(["reservedUntil"]).commit();
}
