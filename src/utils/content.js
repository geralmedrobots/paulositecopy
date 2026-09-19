export const text = (blocks = []) =>
  blocks.map((block) => block.text).join(" ");
