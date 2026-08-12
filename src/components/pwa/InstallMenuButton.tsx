"use client";

import { useState } from "react";
import { Button, DownloadIcon, Modal, ModalHeader } from "@/components/ui";
import { useInstallability } from "@/hooks/useInstallability";
import { InstallInstructions } from "./InstallInstructions";

export function InstallMenuButton() {
  const { isInstallable, installMethod, isIpad, iosBrowser, dismissed, promptInstall } =
    useInstallability();
  const [open, setOpen] = useState(false);

  if (!isInstallable || !dismissed) return null;

  const handleInstall = async () => {
    await promptInstall();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Instalar aplicación"
        style={{ top: "calc(var(--safe-top) + 1rem)" }}
        className="fixed right-4 z-40 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-elevated/90 text-foreground shadow-lg shadow-black/30 backdrop-blur-xl transition-colors hover:bg-white/10"
      >
        <DownloadIcon className="size-5" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Instala EMI Score" onClose={() => setOpen(false)} />
        {installMethod === "native" ? (
          <>
            <p className="text-muted">
              Añádela a tu pantalla de inicio para abrirla como una app.
            </p>
            <Button size="lg" fullWidth className="mt-5" onClick={handleInstall}>
              Instalar
            </Button>
          </>
        ) : (
          <InstallInstructions installMethod={installMethod} isIpad={isIpad} iosBrowser={iosBrowser} />
        )}
      </Modal>
    </>
  );
}
