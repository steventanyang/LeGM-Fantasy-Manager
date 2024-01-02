import '../static/SearchAi.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';


export default function SearchAi() {

  const [searchTerm, setSearchTerm] = useState("Who's scored the most points this season?");
  const [searchResult, setSearchResult] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/aisearch?query=${encodeURIComponent(searchTerm)}`);
      setSearchResult(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Select the element and override the style
    const element = document.querySelector('.bm-menu') as HTMLElement; // Type assertion here
    if (element) {
      element.style.overflow = 'visible';
    }
  }, []);

  return (
      <div style={{ backgroundColor:'#5C7C8A', width: '100vw', height: '100vh' }}>
        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="team" className="menu-item" href="/team">Team</a>
          <a id="search" className="menu-item" href="/search">Search</a>
          <a id="aisearch" className="menu-item" href="/aisearch">AI Search</a>
          <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
          <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
        </Menu>

        <div className="ai-search-bar-container">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onRequestSearch={handleSearch}
            style={{
              color: '#ddd',
              borderRadius: '25px',
              width: '800px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
        
        <div className='card_container'>
          {isLoading ? 
            <div className="dot-typing"></div> : 
            searchResult && 
            <p className='search-text'>
              {searchResult}
            </p>
          }
        </div>
      </div>
    );
}