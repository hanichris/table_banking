export default function Header() {
  return (
    <>
      <header id="mobile-header">
        <a href="/" id="mobile_header-logo">
          <img src="" alt="logo" width={90} height={60}/>
        </a>
      </header>
      <header id='header'>
        <a href="/" id="header-logo">
          <img src="" alt="logo" width={100} height={60}/>
        </a>
        <nav className='navbar-menu' id='header_nav'>
          <ul>
            <li><span className='divider'></span></li>
            <li>
              <a id="header_signin-btn">Sign in</a>
            </li>
            <li>
            <a id="header_signup-btn" className="btn btn--primary btn--s">Sign up</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}