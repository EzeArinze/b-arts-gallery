"use server";

export async function isDisposableEmail(email: string) {
  const res = await fetch(
    `https://disposable.debounce.io/${encodeURIComponent(email)}`,
  );

  if (!res.ok) return false;

  const data: { disposable: "true" | "false" } = await res.json();
  return data.disposable === "true";
}
