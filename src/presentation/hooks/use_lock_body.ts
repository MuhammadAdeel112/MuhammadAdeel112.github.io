import { useEffect } from "react";
import { useStageStore } from "../store/stage_store";
import { useUiStore } from "../store/ui_store";

export function useLockBody() {
  const menuOpen = useUiStore((s) => s.menuOpen);
  const stageOpen = useStageStore((s) => s.isOpen);

  useEffect(() => {
    document.body.style.overflow = menuOpen || stageOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, stageOpen]);
}
