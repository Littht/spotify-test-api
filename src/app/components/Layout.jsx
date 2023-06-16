

export const Layout = ({children}) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Mas buscados</a></li>
            <li><a href="/about">Buscador</a></li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

    </div>
  )
}
