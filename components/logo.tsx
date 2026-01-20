import Image from "next/image";
import Bumezlogo from "@/public/Bumezlogo.png";

function Logo() {
  return (
    <div className="">
      <Image
        src={Bumezlogo}
        alt="logo"
        width={32}
        height={32}
        className="size-7 object-contain brightness-95 contrast-110 rounded-full "
      />
    </div>
  );
}

export default Logo;
