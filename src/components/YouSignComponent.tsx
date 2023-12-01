import { Yousign } from "@/lib/yousign-sdk";
import Script from "next/script";
import { useEffect } from "react";

interface YouSignProps {
  signatureLink: string;
  isSandbox: boolean;
}

export function YouSignComponent({ signatureLink, isSandbox }: YouSignProps) {
  useEffect(() => {
    new Yousign({
      signatureLink,
      iframeContainerId: "iframe-container",
      isSandbox,
    });
  }, [signatureLink, isSandbox]);

  return (
    <>
      <Script src="../lib/yousign-sdk.js" crossOrigin="anonymous"></Script>
      <div
        id="iframe-container"
        className="w-full [&_iframe]:w-full [&_iframe]:h-[800px]"
      />
    </>
  );
}
