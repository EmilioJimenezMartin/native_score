"use client";

import { useState } from "react";
import { Button, Card, Modal, ModalHeader, XIcon } from "@/components/ui";
import { useInstallability } from "@/hooks/useInstallability";
import { IosInstallSteps } from "./IosInstallSteps";

export function InstallBanner() {
  const { isInstallable, isIos, isIpad, dismissed, setDismissed, promptInstall } =
    useInstallability();
  const [showInstructions, setShowInstructions] = useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <>
      <Card className="flex items-center gap-3 rounded-2xl">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Instala EMI Score</p>
          <p className="text-sm text-muted">
            {isIos
              ? "Añádela a tu pantalla de inicio en unos pasos."
              : "Añádela a tu pantalla de inicio para abrirla como una app."}
          </p>
        </div>

        <Button size="sm" onClick={isIos ? () => setShowInstructions(true) : promptInstall}>
          {isIos ? "Ver instrucciones" : "Instalar"}
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

      {isIos && (
        <Modal open={showInstructions} onClose={() => setShowInstructions(false)}>
          <ModalHeader title="Instala EMI Score" onClose={() => setShowInstructions(false)} />
          <IosInstallSteps isIpad={isIpad} />
        </Modal>
      )}
    </>
  );
}
