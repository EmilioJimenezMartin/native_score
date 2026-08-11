"use client";

import { Button, Card, XIcon } from "@/components/ui";
import { useInstallability } from "@/hooks/useInstallability";

export function InstallBanner() {
  const { isInstallable, isIos, dismissed, setDismissed, promptInstall } = useInstallability();

  if (!isInstallable || dismissed) return null;

  return (
    <Card className="flex items-center gap-3 rounded-2xl">
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Instala EMI Score</p>
        <p className="text-sm text-muted">
          {isIos
            ? 'Toca compartir y luego "Añadir a pantalla de inicio".'
            : "Añádela a tu pantalla de inicio para abrirla como una app."}
        </p>
      </div>

      {!isIos && (
        <Button size="sm" onClick={promptInstall}>
          Instalar
        </Button>
      )}

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Cerrar"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-foreground"
      >
        <XIcon className="size-4" />
      </button>
    </Card>
  );
}
