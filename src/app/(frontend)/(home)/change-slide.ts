export function changeSlide(
  scrollContainer: HTMLElement | null,
  direction: "up" | "down",
  slides: number | undefined,
) {
  if (!scrollContainer || !slides) return;
  const scrollHeight = scrollContainer.scrollHeight;
  const slideHeight = scrollHeight / slides;
  const scrollTop = scrollContainer.scrollTop;
  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop === scrollHeight - slideHeight;
  let top = 0;
  let behavior: ScrollBehavior = "smooth";
  if (direction === "down" && isAtBottom) {
    top = 0;
    behavior = "instant";
  } else if (direction === "down" && !isAtBottom) {
    top = scrollTop + slideHeight;
  } else if (direction === "up" && isAtTop) {
    top = scrollHeight - slideHeight;
    behavior = "instant";
  } else if (direction === "up" && !isAtTop) {
    top = scrollTop - slideHeight;
  }
  scrollContainer.scrollTo({
    top,
    behavior,
  });
}
