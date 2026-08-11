import type { InstallMethod, IosBrowser } from "@/hooks/useInstallability";
import { IosInstallSteps } from "./IosInstallSteps";

export interface InstallInstructionsProps {
  installMethod: InstallMethod;
  isIpad: boolean;
  iosBrowser: IosBrowser;
}

export function InstallInstructions({ installMethod, isIpad, iosBrowser }: InstallInstructionsProps) {
  if (installMethod === "ios") {
    return <IosInstallSteps isIpad={isIpad} iosBrowser={iosBrowser} />;
  }

  if (installMethod === "macos-safari") {
    return (
      <p className="text-muted">
        Ve al menú <strong className="text-foreground">Archivo</strong> de Safari, arriba de la
        pantalla, y elige <strong className="text-foreground">&ldquo;Añadir al Dock&rdquo;</strong>.
      </p>
    );
  }

  return (
    <p className="text-muted">
      Este navegador no permite instalar la app directamente (esto también pasa en modo incógnito o
      privado). Pruébalo desde Chrome, Edge o Safari en una ventana normal, o guarda esta página en
      tus marcadores para volver rápido.
    </p>
  );
}
