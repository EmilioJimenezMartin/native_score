"use client";

import { useState } from "react";
import { Button, Card, Modal, ModalHeader, XIcon } from "@/components/ui";
import { useInstallability } from "@/hooks/useInstallability";
import { InstallInstructions } from "./InstallInstructions";

export function InstallBanner() {
  const {
    isInstallable,
    installMethod,
    isIpad,
    iosBrowser,
    dismissed,
    setDismissed,
    promptInstall,
  } = useInstallability();
  const [showInstructions, setShowInstructions] = useState(false);

  if (!isInstallable || dismissed) return null;

  const isNative = installMethod === "native";

  return (
    <>
      <Card className="flex items-center gap-3 rounded-2xl">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Instala EMI Score</p>
          <p className="text-sm text-muted">
            {installMethod === "unsupported"
              ? "Consulta cómo instalarla en este navegador."
              : "Añádela a tu pantalla de inicio para abrirla como una app."}
          </p>
        </div>

        <Button size="sm" onClick={isNative ? promptInstall : () => setShowInstructions(true)}>
          {isNative ? "Instalar" : "Ver instrucciones"}
        </Button>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      </Card>

      {!isNative && (
        <Modal open={showInstructions} onClose={() => setShowInstructions(false)}>
          <ModalHeader title="Instala EMI Score" onClose={() => setShowInstructions(false)} />
          <InstallInstructions installMethod={installMethod} isIpad={isIpad} iosBrowser={iosBrowser} />
        </Modal>
      )}
    </>
  );
}
