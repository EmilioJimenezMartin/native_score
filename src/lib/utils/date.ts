export function formatGameStartLabel(timestamp: number): string {
  const date = new Date(timestamp);
  const datePart = date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  const timePart = date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return `Partida de ${datePart}, ${timePart}`;
}
