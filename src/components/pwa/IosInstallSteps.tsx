import { AddToHomeIcon, CheckIcon, ShareIcon } from "@/components/ui";
import type { IconProps } from "@/components/ui/icons";
import type { IosBrowser } from "@/hooks/useInstallability";

interface Step {
  icon: (props: IconProps) => React.ReactElement;
  title: string;
  description: React.ReactNode;
}

export interface IosInstallStepsProps {
  isIpad?: boolean;
  iosBrowser?: IosBrowser;
}

export function IosInstallSteps({ isIpad = false, iosBrowser = "safari" }: IosInstallStepsProps) {
  // Safari on iPad, and Chrome on iOS regardless of device, keep Share in a
  // top toolbar; Safari on iPhone keeps it at the bottom.
  const shareOnTop = iosBrowser === "chrome" || isIpad;
  const browserLabel = iosBrowser === "chrome" ? "Chrome" : "tu navegador";

  const steps: Step[] = [
    {
      icon: ShareIcon,
      title: "Toca compartir",
      description: (
        <>
          Es el icono <strong className="text-foreground">▢↑</strong> (un cuadrado con
          una flecha hacia arriba),{" "}
          {shareOnTop ? (
            <>
              arriba del todo, junto a la barra de direcciones de{" "}
              <strong className="text-foreground">{browserLabel}</strong>.
            </>
          ) : (
            <>
              abajo del todo, en el centro de la barra de{" "}
              <strong className="text-foreground">{browserLabel}</strong>.
            </>
          )}
        </>
      ),
    },
    {
      icon: AddToHomeIcon,
      title: 'Busca "Añadir a pantalla de inicio"',
      description:
        iosBrowser === "chrome" ? (
          <>
            En Chrome suele estar oculta: toca{" "}
            <strong className="text-foreground">&ldquo;Más&rdquo;</strong> primero y luego busca{" "}
            <strong className="text-foreground">&ldquo;Añadir a pantalla de inicio&rdquo;</strong>.
          </>
        ) : (
          <>
            Desliza hacia abajo por la lista de opciones que aparece hasta ver{" "}
            <strong className="text-foreground">&ldquo;Añadir a pantalla de inicio&rdquo;</strong> y tócala.
          </>
        ),
    },
    {
      icon: CheckIcon,
      title: 'Confirma con "Añadir"',
      description: (
        <>
          Pulsa <strong className="text-foreground">&ldquo;Añadir&rdquo;</strong> arriba a la derecha. Listo:
          el icono de EMI Score quedará en tu pantalla de inicio.
        </>
      ),
    },
  ];

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-2 to-primary-3 text-primary-foreground shadow-md shadow-primary-2/30">
              <step.icon className="size-5" />
            </span>
            {index < steps.length - 1 && (
              <span className="my-1 w-px flex-1 bg-gradient-to-b from-primary-2/40 to-transparent" />
            )}
          </div>
          <div className={index < steps.length - 1 ? "pb-5" : ""}>
            <p className="font-semibold text-foreground">{step.title}</p>
            <p className="text-sm text-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
