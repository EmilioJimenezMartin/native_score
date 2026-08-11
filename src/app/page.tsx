import { Badge, Button, Card, Container } from "@/components/ui";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-between py-10">
      <Container className="flex flex-col gap-6">
        <Badge variant="primary">v0.1.0</Badge>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Native Score
          </h1>
          <p className="text-base leading-relaxed text-muted">
            Base lista: componentes UI, servicios genéricos y capa de hooks
            separados, en modo oscuro y mobile-first.
          </p>
        </div>

        <Card className="flex flex-col gap-3">
          <h2 className="text-lg font-medium text-foreground">Arquitectura</h2>
          <ul className="flex flex-col gap-1 text-sm text-muted">
            <li>components/ui — biblioteca de componentes</li>
            <li>components/layout — estructura de pantalla</li>
            <li>services — funciones genéricas (storage, http, platform)</li>
            <li>hooks — capa de aplicación sobre los servicios</li>
          </ul>
        </Card>
      </Container>

      <Container>
        <Button fullWidth size="lg">
          Empezar
        </Button>
      </Container>
    </main>
  );
}
