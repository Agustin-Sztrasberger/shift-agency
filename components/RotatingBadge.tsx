"use client";
 
import Image from "next/image";
 
const RING_OFFSET_X = 0; // px
const RING_OFFSET_Y = 10; // px
 
export function RotatingBadge({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} aria-hidden>
      {/* Este wrapper solo posiciona el anillo (offset fijo, no se anima) */}
      <div
        className="absolute left-1/2 top-1/2 z-10 h-full w-full"
        style={{
          transform: `translate(calc(-50% + ${RING_OFFSET_X}px), calc(-50% + ${RING_OFFSET_Y}px))`,
        }}
      >
        {/* El giro vive acá adentro, en un elemento aparte del que posiciona */}
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full animate-spin-slow text-cream"
          aria-hidden
        >
          <defs>
            <path
              id="badge-circle-path"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <text fill="currentColor" fontSize="24" letterSpacing="2.5">
            <textPath href="#badge-circle-path" startOffset="0%">
              SHIFT AGENCY&nbsp;&nbsp;-&nbsp;&nbsp;SHIFT AGENCY&nbsp;&nbsp;-&nbsp;&nbsp;
            </textPath>
          </text>
        </svg>
      </div>
 
      {/* GIF fijo en el centro, no rota con el anillo de texto */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/videos/gif-animado.gif"
          alt=""
          width={36}
          height={36}
          unoptimized
          className="h-[100%] w-[100%] object-contain"
        />
      </div>
    </div>
  );
}