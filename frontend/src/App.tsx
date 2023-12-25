import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Injury from './components/InjuryReport';
import Team from './components/Team';
import Search from './components/Search';
import Waiver from './components/Waiver';

import { useState, useEffect } from 'react'


function App() {

	const [data, setData] = useState([{}])

	useEffect(() => {
		fetch('/members').then(response =>
			response.json().then(data => {
				console.log(data);
			})
		);
	}, [])

	return(
		<BrowserRouter>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="/search" element={<Search />} />
          <Route path="/waiver" element={<Waiver />} />
          <Route path="/injuryreport" element={<Injury />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;

// test
