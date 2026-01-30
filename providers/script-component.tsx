import Script from "next/script";

const source = process.env.PAYSTACK_SCRIPT!;

function ScriptComponent() {
  return <Script src={source} strategy="afterInteractive" />;
}

export default ScriptComponent;
