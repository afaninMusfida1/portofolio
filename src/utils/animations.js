export const bouncyTransition = {
  type: "spring",
  stiffness: 300,
  damping: 15,
  mass: 1
};

export const wiggleHover = {
  rotate: [0, 5, -5, 3, 0],
  scale: [1, 1.1, 1.1, 1.05, 1],
  transition: { duration: 0.5, ease: "easeInOut" }
};