import type { AppView } from "../../../domain/entities/portfolio";

export function placeShot(img: HTMLImageElement, view: AppView) {
  const clip = img.parentElement;
  if (!clip) return;
  const cw = clip.clientWidth;
  const ch = clip.clientHeight;
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!cw || !ch || !nw || !nh) return;

  const crop = view.crop;
  const scale = Math.max(cw / (crop.w * nw), ch / (crop.h * nh));
  const dw = nw * scale;
  const dh = nh * scale;
  const x = (cw - crop.w * nw * scale) / 2 - crop.x * nw * scale;
  const y = (ch - crop.h * nh * scale) / 2 - crop.y * nh * scale;
  img.style.width = `${dw}px`;
  img.style.height = `${dh}px`;
  img.style.transform = `translate(${x}px, ${y}px)`;
}
