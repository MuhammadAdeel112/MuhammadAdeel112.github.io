import { useCursor } from "../hooks/use_cursor";

const finePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export function Cursor() {
  const { dotRef, outlineRef } = useCursor(finePointer);
  if (!finePointer) return null;
  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={outlineRef} />
    </>
  );
}
