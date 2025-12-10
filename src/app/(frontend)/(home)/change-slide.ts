export function changeSlide(
  scrollContainer: HTMLElement | null,
  direction: "left" | "right",
  slides: number | undefined
) {
  if (!scrollContainer || !slides) return;
  const scrollWidth = scrollContainer.scrollWidth;
  const slideWidth = scrollWidth / slides;
  const scrollLeft = scrollContainer.scrollLeft;
  const isAtFarLeft = scrollLeft === 0;
  const isAtFarRight = scrollLeft === scrollWidth - slideWidth;
  let left = 0;
  let behavior: ScrollBehavior = "smooth";
  if (direction === "left" && isAtFarLeft) {
    left = scrollWidth;
    behavior = "instant";
  } else if (direction === "left" && !isAtFarLeft) {
    left = scrollLeft - slideWidth;
  } else if (direction === "right" && isAtFarRight) {
    left = 0;
    behavior = "instant";
  } else if (direction === "right" && !isAtFarRight) {
    left = scrollLeft + slideWidth;
  }
  scrollContainer.scrollTo({
    left,
    behavior,
  });
}
