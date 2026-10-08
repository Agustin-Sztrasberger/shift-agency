"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type GalleryItem = {
  id: string;
  type: "image" | "shift";
  gridClass?: string;
  background?: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "p1",
    type: "image",
    background:
      "linear-gradient(135deg, #2a2a2a 0%, #4d4d4d 100%)",
  },
  {
    id: "p2",
    type: "image",
    background:
      "linear-gradient(135deg, #1e1e1e 0%, #3c3c3c 100%)",
  },
  {
    id: "p3",
    type: "image",
    background:
      "linear-gradient(135deg, #242424 0%, #585858 100%)",
  },
  {
    id: "p4",
    type: "image",
    background:
      "linear-gradient(135deg, #1d1d1d 0%, #424242 100%)",
  },
  {
    id: "p5",
    type: "image",
    background:
      "linear-gradient(135deg, #303030 0%, #5b5b5b 100%)",
  },
  {
    id: "p6",
    type: "image",
    gridClass: "middle-left",
    background:
      "linear-gradient(135deg, #202020 0%, #3b3b3b 100%)",
  },
  {
    id: "shift",
    type: "shift",
    gridClass: "target",
  },
  {
    id: "p8",
    type: "image",
    gridClass: "middle-right",
    background:
      "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)",
  },
  {
    id: "p9",
    type: "image",
    background:
      "linear-gradient(135deg, #2b2b2b 0%, #4f4f4f 100%)",
  },
  {
    id: "p10",
    type: "image",
    background:
      "linear-gradient(135deg, #1b1b1b 0%, #353535 100%)",
  },
  {
    id: "p11",
    type: "image",
    background:
      "linear-gradient(135deg, #2c2c2c 0%, #595959 100%)",
  },
  {
    id: "p12",
    type: "image",
    background:
      "linear-gradient(135deg, #222222 0%, #4c4c4c 100%)",
  },
  {
    id: "p13",
    type: "image",
    background:
      "linear-gradient(135deg, #1f1f1f 0%, #444444 100%)",
  },
];

export function ShiftExperience() {
  const { content, language } = useLanguage();

  const wordsTail = content.shiftExperience.tailWords.map(
    (text, index) => ({
      text,
      className: index === 0 ? "word" : "word thin",
    })
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const gridStageRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const horizontalStageRef =
    useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const clusterShiftRef =
    useRef<HTMLDivElement | null>(null);
  const progressFillRef =
    useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        typeof window === "undefined" ||
        !sectionRef.current
      ) {
        return;
      }

      const section = sectionRef.current;

      let masterTimeline: gsap.core.Timeline | null = null;
      let resizeTimer: number | undefined;

      const buildExperience = () => {
        const gridStage = gridStageRef.current;
        const grid = gridRef.current;

        const target = grid?.querySelector(
          ".target"
        ) as HTMLDivElement | null;

        const horizontalStage =
          horizontalStageRef.current;

        const track = trackRef.current;
        const clusterShift =
          clusterShiftRef.current;

        const progressFill =
          progressFillRef.current;

        if (
          !gridStage ||
          !grid ||
          !target ||
          !horizontalStage ||
          !track ||
          !clusterShift
        ) {
          return;
        }

        /*
         * Limpiamos el timeline anterior.
         * Esto es especialmente importante en mobile,
         * donde el viewport puede cambiar varias veces.
         */
        if (masterTimeline) {
          masterTimeline.scrollTrigger?.kill();
          masterTimeline.kill();
          masterTimeline = null;
        }

        const others = grid.querySelectorAll(
          ".grid-cell:not(.target)"
        );

        const leadSpacer =
          document.getElementById("leadSpacer");

        const reduceMotion = window
          .matchMedia(
            "(prefers-reduced-motion: reduce)"
          )
          .matches;

        const isMobile = window.innerWidth < 768;

        /*
         * Calculamos el centro de la celda Shift
         * para usarlo como origen del zoom.
         */
        const setGridTransformOrigin = () => {
          const gridRect =
            grid.getBoundingClientRect();

          const targetRect =
            target.getBoundingClientRect();

          const originX =
            (((targetRect.left - gridRect.left) +
              targetRect.width / 2) /
              gridRect.width) *
            100;

          const originY =
            (((targetRect.top - gridRect.top) +
              targetRect.height / 2) /
              gridRect.height) *
            100;

          grid.style.transformOrigin =
            `${originX}% ${originY}%`;
        };

        /*
         * Centra el primer bloque horizontal.
         */
        const centerHorizontalShift = () => {
          if (!leadSpacer) {
            return;
          }

          leadSpacer.style.width = "0px";

          gsap.set(track, {
            x: 0,
          });

          void track.offsetWidth;

          const clusterRect =
            clusterShift.getBoundingClientRect();

          const clusterCenter =
            clusterRect.left +
            clusterRect.width / 2;

          const offsetNeeded = Math.max(
            window.innerWidth / 2 -
              clusterCenter,
            0
          );

          leadSpacer.style.width =
            `${offsetNeeded}px`;
        };

        const getHorizontalDistance = () => {
          return Math.max(
            track.scrollWidth -
              window.innerWidth,
            0
          );
        };

        /*
         * Estado inicial.
         */
        gsap.set(gridStage, {
          opacity: 1,
        });

        gsap.set(
          grid.querySelectorAll(
            ".grid-cell"
          ),
          {
            x: 0,
            y: 0,
            scale: 1,
          }
        );

        gsap.set(grid, {
          scale: 1,
        });

        gsap.set(others, {
          opacity: 1,
        });

        gsap.set(horizontalStage, {
          opacity: 0,
        });

        gsap.set(track, {
          x: 0,
        });

        gsap.set(progressFill, {
          width: "0%",
        });

        setGridTransformOrigin();
        centerHorizontalShift();

        /*
         * Volvemos a medir después de centrar el track.
         */
        const targetRect =
          target.getBoundingClientRect();

        const targetCoverSize = Math.max(
          window.innerWidth,
          window.innerHeight
        );

        const baseScale =
          targetCoverSize /
          targetRect.width;

        /*
         * Desktop conserva el zoom original.
         * Mobile tiene un zoom un poco más contenido.
         */
        const scaleNeeded = isMobile
          ? baseScale * 0.92
          : baseScale * 1.15;

        const distance =
          getHorizontalDistance();

        /*
         * La fase inicial es un poco más corta
         * en mobile para que no se sienta pesada.
         */
        const gridPhase = isMobile
          ? window.innerHeight * 1.15
          : window.innerHeight * 1.42;

        const horizontalStart =
          gridPhase;

        const horizontalEnd =
          horizontalStart + distance;

        const transitionDuration =
          isMobile
            ? window.innerHeight * 0.38
            : window.innerHeight * 0.5;

        const microDuration = Math.min(
          isMobile ? 140 : 180,
          Math.max(
            isMobile ? 70 : 90,
            distance *
              (isMobile ? 0.045 : 0.06)
          )
        );

        /*
         * Reduced motion.
         */
        if (reduceMotion) {
          gsap.set(gridStage, {
            opacity: 0,
          });

          gsap.set(horizontalStage, {
            opacity: 1,
          });

          gsap.set(track, {
            x: -distance,
          });

          if (progressFill) {
            progressFill.style.width =
              "100%";
          }

          return;
        }

        /*
         * ==============================
         * MASTER TIMELINE
         * ==============================
         */
        masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${horizontalEnd}`,
            pin: true,
            scrub: isMobile ? 0.8 : 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              if (progressFill) {
                progressFill.style.width =
                  `${self.progress * 100}%`;
              }
            },
          },
        });

        /*
         * ==============================
         * GRID
         * ==============================
         */

        masterTimeline.to(
          grid.querySelectorAll(
            ".grid-cell:nth-child(5n+1), .grid-cell:nth-child(5n+2)"
          ),
          {
            y: isMobile ? -18 : -30,
            x: isMobile ? -5 : -8,
            duration:
              gridPhase * 0.52,
            ease: "none",
          },
          0
        );

        masterTimeline.to(
          grid.querySelectorAll(
            ".grid-cell:nth-child(5n+3)"
          ),
          {
            y: isMobile ? 14 : 22,
            scale: isMobile
              ? 1.015
              : 1.025,
            duration:
              gridPhase * 0.52,
            ease: "none",
          },
          0
        );

        masterTimeline.to(
          grid.querySelectorAll(
            ".grid-cell:nth-child(5n+4), .grid-cell:nth-child(5n+5)"
          ),
          {
            y: isMobile ? -28 : -48,
            x: isMobile ? 5 : 8,
            duration:
              gridPhase * 0.52,
            ease: "none",
          },
          0
        );

        /*
         * Zoom hacia Shift.
         */
        masterTimeline.to(
          grid,
          {
            scale: scaleNeeded,
            duration: gridPhase,
            ease: "power1.in",
          },
          0
        );

        /*
         * Desaparición progresiva de las
         * imágenes exteriores.
         */
        masterTimeline.to(
          others,
          {
            opacity: 0,
            duration:
              gridPhase * 0.7,
            stagger: {
              each: isMobile
                ? 2.5
                : 4,
              from: "edges",
            },
            ease: "power1.in",
          },
          0.15
        );

        /*
         * ==============================
         * TRANSICIÓN
         * ==============================
         */

        masterTimeline.to(
          horizontalStage,
          {
            opacity: 1,
            duration:
              transitionDuration,
            ease: "none",
          },
          gridPhase -
            window.innerHeight * 0.5
        );

        masterTimeline.to(
          gridStage,
          {
            opacity: 0,
            duration:
              transitionDuration,
            ease: "none",
          },
          gridPhase -
            window.innerHeight * 0.5
        );

        /*
         * ==============================
         * HORIZONTAL
         * ==============================
         */

        masterTimeline.to(
          track,
          {
            x: -distance,
            duration: distance,
            ease: "none",
          },
          horizontalStart
        );

        /*
         * ==============================
         * SHIFT
         * ==============================
         */


        masterTimeline.fromTo(
          "#clusterShift",
          {
            opacity: 0,
            scale: 0.9,
            x: isMobile ? 18 : 28,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration:
              transitionDuration,
            ease: "power2.out",
          },
          gridPhase -
            transitionDuration
        );

        /*
         * ==============================
         * CONTENIDO HORIZONTAL
         * ==============================
         */

        masterTimeline.fromTo(
          "#enLabel",
          {
            opacity: 0,
            y: "0.9em",
          },
          {
            opacity: 1,
            y: 0,
            duration: microDuration,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.03
        );

        masterTimeline.fromTo(
          "#pillAgency",
          {
            opacity: 0,
            rotation: -46,
          },
          {
            opacity: 1,
            rotation: 8,
            duration: microDuration,
            ease: "back.out(1.8)",
          },
          horizontalStart +
            distance * 0.04
        );

        masterTimeline.fromTo(
          "#wordAyudamos",
          {
            opacity: 0,
            y: "0.5em",
          },
          {
            opacity: 1,
            y: 0,
            duration: microDuration,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.08
        );

        masterTimeline.fromTo(
          "#typewriterWrap",
          {
            clipPath:
              "inset(0 100% 0 0)",
            opacity: 0,
          },
          {
            clipPath:
              "inset(0 0% 0 0)",
            opacity: 1,
            duration: microDuration,
            ease: "steps(12)",
          },
          horizontalStart +
            distance * 0.16
        );

        masterTimeline.fromTo(
          "#decoSymbols",
          {
            opacity: 0,
            y: "0.3em",
          },
          {
            opacity: 1,
            y: 0,
            duration:
              microDuration * 0.85,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.2
        );

        masterTimeline.fromTo(
          "#decoDashes",
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration:
              microDuration * 0.9,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.23
        );

        masterTimeline.fromTo(
          "#pillComunicar",
          {
            opacity: 0,
            rotation: 34,
          },
          {
            opacity: 1,
            rotation: -5,
            duration: microDuration,
            ease: "back.out(1.8)",
          },
          horizontalStart +
            distance * 0.3
        );

        masterTimeline.fromTo(
          "#amp",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration:
              microDuration * 0.7,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.38
        );

        masterTimeline.fromTo(
          "#pillVerse",
          {
            opacity: 0,
            rotation: -40,
          },
          {
            opacity: 1,
            rotation: 6,
            duration: microDuration,
            ease: "back.out(1.8)",
          },
          horizontalStart +
            distance * 0.45
        );

        masterTimeline.fromTo(
          ["#spark1", "#spark2"],
          {
            opacity: 0,
            scale: 0.4,
            rotation: -20,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration:
              microDuration * 0.85,
            ease: "back.out(3)",
          },
          horizontalStart +
            distance * 0.52
        );

        masterTimeline.fromTo(
          "#starCom",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 0.85,
            scale: 1,
            duration: microDuration,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.28
        );

        masterTimeline.fromTo(
          "#starVerse",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 0.85,
            scale: 1,
            duration: microDuration,
            ease: "power2.out",
          },
          horizontalStart +
            distance * 0.48
        );

        /*
         * ==============================
         * PALABRAS FINALES
         * ==============================
         */

        const words =
          gsap.utils.toArray<HTMLElement>(
            "#wordsTail [data-w]"
          );

        words.forEach((word, index) => {
          masterTimeline?.fromTo(
            word,
            {
              opacity: 0,
              y: "0.5em",
            },
            {
              opacity: 1,
              y: 0,
              duration:
                microDuration * 0.85,
              ease: "power2.out",
            },
            horizontalStart +
              distance *
                (0.62 +
                  index * 0.025)
          );
        });

        masterTimeline.fromTo(
          "#pillUnica",
          {
            opacity: 0,
            x: "2.4em",
          },
          {
            opacity: 1,
            x: 0,
            duration: microDuration,
            ease: "power3.out",
          },
          horizontalStart +
            distance * 0.82
        );

        /*
         * Le damos un frame al navegador para que
         * termine de calcular las dimensiones antes
         * de refrescar ScrollTrigger.
         */
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      const handleResize = () => {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
          buildExperience();
        }, 200);
      };

      buildExperience();

      window.addEventListener(
        "resize",
        handleResize
      );

      /*
       * En mobile, visualViewport cambia cuando
       * aparece/desaparece la barra del navegador.
       */
      if (window.visualViewport) {
        window.visualViewport.addEventListener(
          "resize",
          handleResize
        );
      }

      return () => {
        window.clearTimeout(resizeTimer);

        window.removeEventListener(
          "resize",
          handleResize
        );

        if (window.visualViewport) {
          window.visualViewport.removeEventListener(
            "resize",
            handleResize
          );
        }

        if (masterTimeline) {
          masterTimeline.scrollTrigger?.kill();
          masterTimeline.kill();
        }

        gsap.killTweensOf([
          gridRef.current,
          gridStageRef.current,
          horizontalStageRef.current,
          trackRef.current,
        ]);
      };
    },
    {
      scope: sectionRef,
      dependencies: [language],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      id="shift-experience"
      ref={sectionRef}
      className="shift-experience-shell"
    >
      <div
        className="grid-stage"
        ref={gridStageRef}
      >
        <div
          className="zoom-grid"
          ref={gridRef}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`grid-cell ${
                item.gridClass ?? ""
              } ${
                item.type === "shift"
                  ? "target"
                  : ""
              }`.trim()}
            >
              {item.type === "image" ? (
                <div
                  className="gallery-visual"
                  style={{
                    background:
                      item.background,
                  }}
                  aria-hidden
                />
              ) : (
<div className="grid-shift" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="horizontal-stage"
        ref={horizontalStageRef}
      >
        <div
          className="horizontal-track"
          ref={trackRef}
        >
          <div id="leadSpacer" />

          <div
            className="item cluster-shift"
            id="clusterShift"
            ref={clusterShiftRef}
          >
            <span
              className="en-label"
              id="enLabel"
            >
              {content.shiftExperience.enLabel}
            </span>

            <span className="pill shift">
              Shift
            </span>

            <span
              className="pill agency"
              id="pillAgency"
            >
              {content.shiftExperience.agency}
            </span>
          </div>

          <div className="item">
            <span
              className="word"
              id="wordAyudamos"
            >
              {content.shiftExperience.helping}
            </span>
          </div>

          <div className="item marca-wrap">
            <span
              className="deco-symbols"
              id="decoSymbols"
            >
              {content.shiftExperience.decoration}
            </span>

            <span
              className="word typewriter"
              id="typewriterWrap"
            >
              <span className="txt">
                {content.shiftExperience.brand}
              </span>
            </span>

            <span
              className="deco-dashes"
              id="decoDashes"
            />
          </div>

          <div className="item">
            <span className="word">
              a
            </span>
          </div>

          <div
            className="item cluster-com"
            id="clusterCom"
          >
            <span
              className="bigstar behind-com"
              id="starCom"
            >
              <span className="spin">
                <svg
                  viewBox="0 0 156 154"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.9951 143.966V110.875"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30.6445 124.348L54.0457 100.951"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.0352 76.9961H44.1266"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30.6543 29.6465L54.0507 53.0476"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M78.0049 10.0352V43.1266"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M125.355 29.6543L101.954 53.0507"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M144.965 77.0039H111.874"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M125.346 124.356L101.949 100.955"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>

            <span
              className="pill comunicar"
              id="pillComunicar"
            >
              {content.shiftExperience.communicate}
            </span>

            <span
              className="word amp"
              id="amp"
            >
              &amp;
            </span>

            <span
              className="pill verse"
              id="pillVerse"
            >
              {content.shiftExperience.verse}
            </span>

            <span
              className="spark s1"
              id="spark1"
            >
              <svg
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z"
                  fill="#F2EFEB"
                />
              </svg>
            </span>

            <span
              className="spark s2"
              id="spark2"
            >
              <svg
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z"
                  fill="#F2EFEB"
                />
              </svg>
            </span>

            <span
              className="bigstar behind-verse"
              id="starVerse"
            >
              <span className="spin">
                <svg
                  viewBox="0 0 156 154"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.9951 143.966V110.875"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30.6445 124.348L54.0457 100.951"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.0352 76.9961H44.1266"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30.6543 29.6465L54.0507 53.0476"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M78.0049 10.0352V43.1266"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M125.355 29.6543L101.954 53.0507"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M144.965 77.0039H111.874"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M125.346 124.356L101.949 100.955"
                    stroke="#F2EFEB"
                    strokeWidth="8.06903"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </div>

          <div
            className="item words-tail"
            id="wordsTail"
          >
            {wordsTail.map((word, index) => (
              <span
                key={`${word.text}-${index}`}
                className={word.className}
                data-w
              >
                {word.text}
              </span>
            ))}
          </div>

          <div className="item">
            <span
              className="pill unica"
              id="pillUnica"
            >
              {content.shiftExperience.unique}
            </span>
          </div>

          <div id="tailSpacer" />
        </div>
      </div>
    </section>
  );
}