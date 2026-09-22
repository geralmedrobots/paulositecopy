import FAQ from "../../components/FAQ.jsx";
export function FAQPage({ data }) {
  return (
    <>
      <header className="faq-heading container">
        <h1>{data.title}</h1>
      </header>
      <section className="faq-section">
        <div className="container">
          <FAQ items={data.items} />
        </div>
      </section>
    </>
  );
}
