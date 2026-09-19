const headings = new Set([
  "Introduction",
  "Responsibilities",
  "Requirements",
  "What We Offer",
  "Apresentação",
  "What are Cookies?",
  "How can you block the use of Cookies?",
  "Which entities can have access to the information collected by Cookies?",
  "I - Global Assessment",
  "II - Equality in access to employment, work and professional training",
  "III - Promotion of work-life balance",
]);
export default function Content({ blocks = [], document = false }) {
  const groups = [];
  for (const block of blocks) {
    if (block.type === "item") {
      if (groups.at(-1)?.type !== "list")
        groups.push({ type: "list", items: [] });
      groups.at(-1).items.push(block.text);
    } else groups.push(block);
  }
  return groups.map((block, index) =>
    block.type === "list" ? (
      <ul key={index}>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) : document && headings.has(block.text) ? (
      <h2 key={index}>{block.text}</h2>
    ) : (
      <p key={index}>{block.text}</p>
    ),
  );
}
