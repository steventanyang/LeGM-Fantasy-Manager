import '../static/Search.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';


export default function Search() {

  const [searchTerm, setSearchTerm] = useState('Paul George');
  const [searchResult, setSearchResult] = useState(''); // State to store the search result

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/aisearch?query=${encodeURIComponent(searchTerm)}`);
      setSearchResult(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult('Error fetching data');
    }
  };

  return (
      <div>
        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="team" className="menu-item" href="/team">Team</a>
          <a id="search" className="menu-item" href="/search">Search</a>
          <a id="waiver" className="menu-item" href="/waiver">Waiver</a>
          <a id="injuryreport" className="menu-item" href="/injuryreport">News</a>
        </Menu>

        <div className="search-bar-container">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onRequestSearch={handleSearch}
            style={{ 
              borderRadius: '25px',
              width: '400px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
        
        <div className='card_container'>
            {searchResult && <p>{searchResult}</p>}
        </div>
      </div>
    );
}