import '../static/Home.css';
import { slide as Menu } from 'react-burger-menu'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {

  const navigate = useNavigate();

  const team = () => {
    navigate('/team'); 
  };

  const search = () => {
    navigate('/search'); 
  };

  const waiver = () => {
    navigate('/waiver'); 
  };

  const injury = () => {
    navigate('/injuryreport'); 
  };

  useEffect(() => {
    // Select the element and override the style
    const element = document.querySelector('.bm-menu') as HTMLElement; // Type assertion here
    if (element) {
      element.style.overflow = 'visible';
    }
  }, []);

  return (
    <div>
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="team" className="menu-item" href="/team">Team</a>
        <a id="search" className="menu-item" href="/search">Search</a>
        <a id="aisearch" className="menu-item" href="/aisearch">AI Search</a>
        <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
        <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
      </Menu>

      <div className="home-top-container">
        <div className="title-text">LeGM</div>
      </div>

      <div className="home-main-container">
        <div className="home-content-container"></div>
      </div>

      <div className="home-bottom-container">
        <div className="home-button-container">

          <button onClick={team} className='home-nav-buttons' style={{ marginLeft:'10px'}}>My Team</button>
          <button onClick={search} className='home-nav-buttons'>Search</button>
          <button onClick={waiver} className='home-nav-buttons'>Waiver Wire</button>
          <button onClick={injury} className='home-nav-buttons' style={{ marginRight:'10px'}}>News</button>

        </div>
      </div>
    </div>
    );
}