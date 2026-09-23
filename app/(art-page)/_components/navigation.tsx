import Logo from "@/components/logo";
import AuthUser from "./auth-user";
import { ThemeToggle } from "@/components/theme-toggle";

function Navigation() {
  return (
    <div className="z-50 sticky top-2">
      <div className="absolute top-6 left-[10%] text-xs font-extrabold tracking-[0.35em] text-primary">
        <Logo />
      </div>
      <div className="hidden md:block md:absolute top-6 left-1/2 -translate-x-1/2 text-xs font-bold md:font-extrabold tracking-[0.35em] text-primary blur-[0.4px]">
        BUMEZ ART PRESENTS
      </div>

      <div className="absolute flex items-center gap-2 top-6 right-[10%]">
        <AuthUser />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navigation;
