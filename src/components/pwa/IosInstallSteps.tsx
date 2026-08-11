import { AddToHomeIcon, CheckIcon, ShareIcon } from "@/components/ui";
import type { IconProps } from "@/components/ui/icons";

interface Step {
  icon: (props: IconProps) => React.ReactElement;
  title: string;
  description: React.ReactNode;
}

export interface IosInstallStepsProps {
  isIpad?: boolean;
}

export function IosInstallSteps({ isIpad = false }: IosInstallStepsProps) {
  const steps: Step[] = [
    {
      icon: ShareIcon,
      title: "Toca compartir",
      description: (
        <>
          Es el icono <strong className="text-foreground">▢↑</strong> (un cuadrado con
          una flecha hacia arriba), {isIpad ? (
            <>
              arriba del todo, junto a la <strong className="text-foreground">barra de direcciones</strong>.
            </>
          ) : (
            <>
              abajo del todo, en el centro de la <strong className="text-foreground">barra de Safari</strong>.
            </>
          )}
        </>
      ),
    },
    {
      icon: AddToHomeIcon,
      title: 'Busca "Añadir a pantalla de inicio"',
      description: (
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
