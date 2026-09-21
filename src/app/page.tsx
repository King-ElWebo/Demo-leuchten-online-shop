const projectDocuments = [
  ['SITE.md', 'Scope, routes, journeys, and functional requirements'],
  [
    'DESIGN.md',
    'Project-specific creative direction and responsive art direction',
  ],
  ['CONTENT.md', 'Approved copy, entities, image assignments, and alt text'],
  ['ACCEPTANCE.md', 'The objective completion contract and required evidence'],
] as const;

export default function TemplateStatusPage() {
  return (
    <main className="template-shell" aria-labelledby="page-title">
      <section className="template-status">
        <header className="template-introduction">
          <p className="template-label">TEMPLATE_NOT_CONFIGURED</p>
          <h1 id="page-title">Showcase Website Factory</h1>
          <p className="template-summary">
            The production system is installed. Define a project’s scope, visual
            identity, content, and acceptance contract before starting an
            autonomous build.
          </p>
          <a className="template-link" href="#configuration">
            Configure the project
          </a>
        </header>

        <section
          id="configuration"
          className="template-configuration"
          aria-labelledby="configuration-title"
        >
          <h2 id="configuration-title">
            Start with the four project documents
          </h2>
          <ol>
            {projectDocuments.map(([name, purpose]) => (
              <li key={name}>
                <code>{name}</code>
                <span>{purpose}</span>
              </li>
            ))}
          </ol>
          <p>
            Set every project specification to <code>READY</code>, add stable
            local assets, then run the production <code>/goal</code> described
            in the repository README.
          </p>
        </section>
      </section>
    </main>
  );
}
