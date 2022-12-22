import { Mask, Text as TextImpl, useMask } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  Ref,
  Suspense,
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
  MutableRefObject,
} from "react";
import { BufferGeometry, Group, Material, Mesh, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils";
import { TextParamsTypes } from ".";
import { getCaretAtPoint } from "troika-three-text";

const tempVec = new Vector3();

type PropTypes = TextParamsTypes & {
  active: boolean;
  width: number;
  height: number;
  padding: [number, number];
};

const Text = (props: PropTypes) => {
  const { fontSize, font, color, active, padding, width, height, type } = props;
  const ref: Ref<Mesh<BufferGeometry, Material>> = useRef();
  const groupRef: Ref<Group> = useRef();
  const caretRef: Ref<Mesh<BufferGeometry, Material>> = useRef();
  const stencil = useMask(1);

  // STATE
  const clock = useThree((s) => s.clock);
  const time: MutableRefObject<number> = useRef(0);
  const overflowAmount: MutableRefObject<number> = useRef(0);
  const [content, setContent]: [string, any] = useState("");
  const [caret, setCaret]: [number, any] = useState(1);
  const [selectionStart, setSelectionStart]: [number, any] = useState(0);
  const [renderInfo, setRenderInfo] = useState(null);

  const caretPositions: number[] = useMemo(() => {
    if (!renderInfo?.caretPositions) return [];

    let lastCaret =
      renderInfo.caretPositions[renderInfo.caretPositions.length - 2];

    const caretPositions = [
      ...renderInfo.caretPositions.filter(
        (_: any, idx: number) => idx % 3 === 0
      ),
    ];

    caretPositions.push(lastCaret);
    return caretPositions;
  }, [renderInfo]);

  // EVENTS
  const handleSync = useCallback(
    (text: any) => {
      setRenderInfo(text.textRenderInfo);

      let bbox = text.geometry.boundingBox;
      if (bbox) {
        let w = Math.abs(bbox.max.x - bbox.min.x);

        if (w > width) {
          overflowAmount.current = w - width + padding[0] * width * 2;
          if (caret === caretPositions.length) {
            groupRef.current.position.x = -overflowAmount.current;
          }
        }
      }
    },
    [width, caret, caretPositions, padding]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      if (!active || e.ctrlKey || e.altKey || e.metaKey) return;

      let part1: string, part2: string;

      let left = caret <= selectionStart ? caret : selectionStart;
      let right = caret <= selectionStart ? selectionStart : caret;

      if (caret !== selectionStart) {
        part1 = content.slice(0, left);
        part2 = content.slice(right);
      } else {
        part1 = content.slice(0, caret);
        part2 = content.slice(caret);
      }

      let newContent = part1 + e.key + part2;

      setContent(newContent);

      if (caret > selectionStart) {
        setCaret(selectionStart + 1);
        setSelectionStart((cur: number) => cur + 1);
      } else {
        setCaret((cur: number) => {
          let c = Math.min(cur + 1, newContent.length);
          setSelectionStart(c);
          return c;
        });
      }
    },
    [content, caret, active, selectionStart]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active) return;
      e.stopPropagation();

      switch (e.key) {
        case "Backspace": {
          if (!content) return;
          let part1: string, part2: string;

          let left = caret <= selectionStart ? caret : selectionStart;
          let right = caret <= selectionStart ? selectionStart : caret;

          if (caret !== selectionStart) {
            part1 = content.slice(0, left);
            part2 = content.slice(right);
          } else {
            part1 = content.slice(0, Math.max(caret - 1, 0));
            part2 = content.slice(caret);
          }

          if (overflowAmount.current > 0) {
            // text clipped by mask, make sure to translate with caret pos
            let cx = caretRef.current.getWorldPosition(tempVec).x;
            let shift = Math.abs(
              caretPositions[caret] - caretPositions[Math.max(caret - 1, 0)]
            );

            if (cx < -(width / 2 - padding[0] * width * 2)) {
              groupRef.current.position.x = Math.min(
                shift + groupRef.current.position.x,
                0
              );
            }
          }

          setContent(part1 + part2);
          setCaret((cur: number) => {
            let c = caret === selectionStart ? Math.max(cur - 1, 0) : left;
            setSelectionStart(c);
            return c;
          });
          break;
        }
        case "Delete": {
          let part1: string, part2: string;

          let left = caret <= selectionStart ? caret : selectionStart;
          let right = caret <= selectionStart ? selectionStart : caret;

          if (caret !== selectionStart) {
            part1 = content.slice(0, left);
            part2 = content.slice(right);

            setCaret(left);
            setSelectionStart(left);
          } else {
            part1 = content.slice(0, caret);
            part2 = content.slice(caret + 1);
          }

          setContent(part1 + part2);
          break;
        }
        case "ArrowLeft": {
          if (e.shiftKey) {
            setCaret((cur: number) => Math.max(cur - 1, 0));
          } else {
            if (selectionStart > caret) {
              setSelectionStart(caret);
            } else if (caret > selectionStart) {
              setCaret(selectionStart);
            } else {
              setCaret((cur: number) => {
                let c = Math.max(cur - 1, 0);
                setSelectionStart(c);
                return c;
              });
            }
          }

          if (overflowAmount.current > 0) {
            // text clipped by mask, make sure to translate with caret pos
            let cx = caretRef.current.getWorldPosition(tempVec).x;
            let shift = Math.abs(
              caretPositions[caret] - caretPositions[Math.max(caret - 1, 0)]
            );

            if (cx < -(width / 2 - padding[0] * width * 2)) {
              groupRef.current.position.x = Math.min(
                shift + groupRef.current.position.x,
                0
              );
            }
          }
          break;
        }
        case "ArrowRight": {
          if (e.shiftKey) {
            setCaret((cur: number) => Math.min(cur + 1, content.length));
          } else {
            if (selectionStart < caret) {
              setSelectionStart(caret);
            } else if (caret < selectionStart) {
              setCaret(selectionStart);
            } else {
              setCaret((cur: number) => {
                let c = Math.min(cur + 1, content.length);
                setSelectionStart(c);
                return c;
              });
            }
          }

          if (overflowAmount.current > 0) {
            // text clipped by mask, make sure to translate with caret pos
            let cx = caretRef.current.getWorldPosition(tempVec).x;
            let shift = Math.abs(
              caretPositions[caret] - caretPositions[Math.max(caret - 1, 0)]
            );

            if (cx > width / 2 - padding[0] * width * 2) {
              groupRef.current.position.x = Math.max(
                groupRef.current.position.x - shift,
                -overflowAmount.current
              );
            }
          }
          break;
        }
        default: {
          // console.log(e.key);
          break;
        }
      }

      time.current = clock.elapsedTime;
    },
    [
      content,
      caret,
      clock,
      active,
      selectionStart,
      caretPositions,
      padding,
      width,
    ]
  );

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      time.current = clock.elapsedTime;
      if (!renderInfo || !content || !ref.current) return;

      let p = ref.current.worldToLocal(e.point);
      let c = getCaretAtPoint(renderInfo, p.x, p.y);
      setCaret(c.charIndex);
      setSelectionStart(c.charIndex);
    },
    [renderInfo, content, clock]
  );

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!renderInfo || !content || !ref.current) return;

      if (!(e.buttons === 1 || e.buttons === 3)) return;

      let p = ref.current.worldToLocal(e.point);
      let c = getCaretAtPoint(renderInfo, p.x, p.y);
      setCaret(c.charIndex);

      if (overflowAmount.current > 0) {
        if (caret > selectionStart) {
          // text clipped by mask, make sure to translate with caret pos
          let cx = caretRef.current.getWorldPosition(tempVec).x;
          let shift = Math.abs(
            caretPositions[caret] - caretPositions[Math.max(caret - 1, 0)]
          );

          if (cx > width / 2 - padding[0] * width * 2) {
            groupRef.current.position.x = Math.max(
              groupRef.current.position.x - shift,
              -overflowAmount.current
            );
          }
        } else if (caret < selectionStart) {
          // text clipped by mask, make sure to translate with caret pos
          let cx = caretRef.current.getWorldPosition(tempVec).x;
          let shift = Math.abs(
            caretPositions[caret] - caretPositions[Math.max(caret - 1, 0)]
          );

          if (cx < -(width / 2 - padding[0] * width * 2)) {
            groupRef.current.position.x = Math.min(
              shift + groupRef.current.position.x,
              0
            );
          }
        }
      }

      time.current = clock.elapsedTime;
    },
    [
      renderInfo,
      content,
      clock,
      selectionStart,
      caret,
      caretPositions,
      padding,
      width,
    ]
  );

  const handleCopy = useCallback(
    (e: ClipboardEvent) => {
      e.stopPropagation();
      if (!active) return;

      let selection =
        caret < selectionStart
          ? content.slice(caret, selectionStart)
          : content.slice(selectionStart, caret);

      e.clipboardData.setData("text/plain", selection);
      e.preventDefault();
    },
    [caret, selectionStart, content, active]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      e.stopPropagation();
      if (!active) return;

      let part1: string, part2: string;

      let left = caret <= selectionStart ? caret : selectionStart;
      let right = caret <= selectionStart ? selectionStart : caret;

      if (caret !== selectionStart) {
        part1 = content.slice(0, left);
        part2 = content.slice(right);

        setCaret(left);
        setSelectionStart(left);
      } else {
        part1 = content.slice(0, caret);
        part2 = content.slice(caret);
      }

      let paste = e.clipboardData.getData("text");

      if (paste) {
        setContent(part1 + paste + part2);
        setCaret((cur: number) => {
          let c = cur + paste.length;
          setSelectionStart(c);
          return c;
        });
      }
    },
    [caret, content, active, selectionStart]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("copy", handleCopy);
    };
  }, [handleKeyPress, handleKeyDown, handlePaste, handleCopy]);

  useEffect(() => {
    if (!active) {
      setSelectionStart(caret);
    }
  }, [active, caret]);

  useFrame((_, delta) => {
    if (!caretRef.current) return;

    let t = (clock.elapsedTime - time.current) % 2;
    let opacity = t <= 1.25 ? 1 : 0;

    caretRef.current.material.opacity = damp(
      caretRef.current.material.opacity,
      opacity,
      24,
      delta
    );
  });

  return (
    <group>
      <Mask id={1} onPointerDown={handlePointerDown}>
        <planeGeometry args={[width, height]} />
      </Mask>

      <group position={[-width / 2 + padding[0] * width, 0, 0]}>
        <group ref={groupRef}>
          <Suspense fallback={null}>
            <TextImpl
              ref={ref}
              onSync={handleSync}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              whiteSpace="overflowWrap"
              fontSize={fontSize}
              font={font}
              anchorX="left"
              anchorY="top-baseline"
              letterSpacing={type === "password" ? 0.1 : 0}
              depthOffset={0.2}
              maxWidth={width - padding[0] * width * 2}
              position-y={-renderInfo?.capHeight / 2}
            >
              {type === "password" ? "•".repeat(content.length) : content}
              <meshBasicMaterial
                color={color}
                {...stencil}
                depthWrite={false}
              />
            </TextImpl>
          </Suspense>

          <mesh
            ref={caretRef}
            position={[content ? caretPositions[caret] : 0, 0, 0]}
            visible={active}
          >
            <planeGeometry args={[0.005, fontSize]} />
            <meshBasicMaterial color={color} transparent depthWrite={false} />
          </mesh>

          <group
            position={[
              (caretPositions[caret] + caretPositions[selectionStart]) / 2,
              0,
              0,
            ]}
          >
            <mesh
              scale-x={Math.abs(
                caretPositions[caret] - caretPositions[selectionStart]
              )}
            >
              <planeGeometry args={[1, fontSize]} />
              <meshBasicMaterial
                color="blue"
                transparent
                opacity={0.25}
                depthWrite={false}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Text;
