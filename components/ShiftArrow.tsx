// Flecha de marca de Shift. Por defecto apunta hacia la esquina superior derecha (↗).
// Rotaciones disponibles:
//   "up-right"   ↗  abrir / subir un modal / ver más (default)
//   "down-right" ↘  enviar
//   "up"         ↑  volver arriba
//   "left"       ←  volver
const rotations = {
  "up-right": 0,
  "down-right": 90,
  up: -45,
  left: -135,
} as const;

export type ArrowDirection = keyof typeof rotations;

export function ShiftArrow({
  direction = "up-right",
  className = "h-3.5 w-3.5",
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      data-dir={direction}
      className={`shrink-0 ${className}`}
    >
      <g transform={`rotate(${rotations[direction]} 8 8)`}>
      <path
        d="M14.6432 12.9794C14.6432 13.8983 13.8983 14.6432 12.9794 14.6432C12.0605 14.6432 11.3156 13.8983 11.3156 12.9794V6.68033L3.84017 14.1557C3.19041 14.8055 2.1372 14.8055 1.48744 14.1557C0.837687 13.506 0.837687 12.4528 1.48744 11.803L8.96286 4.32761H2.6638C1.74491 4.32761 1 3.5827 1 2.6638C1 1.74491 1.74491 1 2.6638 1H12.5068C13.6867 1 14.6432 1.95647 14.6432 3.13634V12.9794Z"
        fill="currentColor"
      />
      </g>
    </svg>
  );
}
