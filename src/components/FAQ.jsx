export default function FAQ({ items }) {
  return (
    <div className="faq-grid">
      {items.map((item) => (
        <section className="faq-item" key={item.question}>
          <h2>{item.question}</h2>
          <p>{item.answer}</p>
        </section>
      ))}
    </div>
  );
}
