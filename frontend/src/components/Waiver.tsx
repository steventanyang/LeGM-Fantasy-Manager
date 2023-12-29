import '../App.css';
import { slide as Menu } from 'react-burger-menu'

export default function Waiver() {

  return (
      <>
        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="team" className="menu-item" href="/team">Team</a>
          <a id="search" className="menu-item" href="/search">Search</a>
          <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
          <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
        </Menu>
      </>
    );
}