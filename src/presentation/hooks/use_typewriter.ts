import { useEffect, useState } from "react";

export function useTypewriter(texts: string[], enabled = true) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!enabled || texts.length === 0) return;
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = texts[textIndex];
      if (deleting) {
        charIndex -= 1;
        setValue(current.slice(0, charIndex));
      } else {
        charIndex += 1;
        setValue(current.slice(0, charIndex));
      }

      let delay = deleting ? 40 : 80;
      if (!deleting && charIndex === current.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
      }
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 1000);
    return () => window.clearTimeout(timer);
  }, [enabled, texts.join("|")]);

  return value;
}
