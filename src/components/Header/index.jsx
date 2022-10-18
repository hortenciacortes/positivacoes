import logo from '../../assets/logo.png';

import './styles.scss'

export function Header() {

  return (
    <div className='grid-pattern'>
      <header className='container'>
        <a href="/">
          <img src={logo} alt="Logo" className='logo' />
        </a>
        <nav>
          <ul>
            <a href="/products">
              <li>Produtos</li>
            </a>
            <a href="/romanian">
              <li>Romaneio</li>
            </a>
          </ul>
        </nav>
      </header>
    </div>
  )
}
