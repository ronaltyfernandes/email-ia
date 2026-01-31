export function Footer() {
  return (
    <footer className="bg-bg-secondary text-slate-500">
      {/* Bottom bar */}
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        <span className="text-slate-500">
          Desenvolvido por{" "}
          <a
            href="https://ronaltyfernandes.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light"
          >
            Ronalty Fernandes
          </a>
        </span>
      </div>
    </footer>
  );
}
