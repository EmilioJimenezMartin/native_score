"use client";

import { useState } from "react";
import { Button, DownloadIcon, Modal, ModalHeader } from "@/components/ui";
import { useInstallability } from "@/hooks/useInstallability";
import { IosInstallSteps } from "./IosInstallSteps";

export function InstallMenuButton() {
  const { isInstallable, isIos, isIpad, dismissed, promptInstall } = useInstallability();
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
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground transition-colors hover:bg-white/[0.1]"
      >
        <DownloadIcon className="size-5" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Instala EMI Score" onClose={() => setOpen(false)} />
        {isIos ? (
          <IosInstallSteps isIpad={isIpad} />
        ) : (
          <>
            <p className="text-muted">
              Añádela a tu pantalla de inicio para abrirla como una app.
            </p>
            <Button size="lg" fullWidth className="mt-5" onClick={handleInstall}>
              Instalar
            </Button>
          </>
        )}
      </Modal>
    </>
  );
}
