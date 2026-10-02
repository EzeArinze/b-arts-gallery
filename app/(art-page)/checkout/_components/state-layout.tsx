export function StateLayout({
  eyebrow,
  heading,
  message,
  children,
}: {
  eyebrow: string;
  heading: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-[46ch] motion-safe:animate-[fade-up_600ms_cubic-bezier(0.23,1,0.32,1)_both]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {message}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </main>
  );
}
