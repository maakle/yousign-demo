"use client";

import { YouSignComponent } from "@/components/YouSignComponent";
import { useState } from "react";

export default function Home() {
  const [signatureLink, setSignatureLink] = useState("");

  return (
    <div>
      <main className="flex bg-stone-100 dark:bg-zinc-900 min-h-screen flex-col items-center justify-between md:p-24">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="mt-8 w-full mx-auto px-8 space-y-6">
            <h2 className="text-xl font-bold">YouSign e-signature demo</h2>
            <div>
              <div>Enter your signature link here:</div>
              <input
                className="px-3 py-2 mt-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 w-full"
                placeholder="e.g. https://yousign.app/signatures/933abc28-28df-4..."
                onChange={(e) => setSignatureLink(e.target.value)}
              />
            </div>
            {signatureLink.length > 0 && (
              <div>
                <div className="mb-2">Signature Document:</div>
                <YouSignComponent
                  signatureLink={signatureLink}
                  isSandbox={true}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
