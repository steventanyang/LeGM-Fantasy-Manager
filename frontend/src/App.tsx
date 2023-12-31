import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Injury from './components/InjuryReport';
import Team from './components/Team';
import Search from './components/Search';
import Waiver from './components/Waiver';

import SearchAi from './components/Aisearch';


function App() {

	return(
		<BrowserRouter>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="team" element={<Team />} />
					<Route path="/search" element={<Search />} />
					<Route path="/waiver" element={<Waiver />} />
					<Route path="/injuryreport" element={<Injury />} />
					<Route path="/aisearch" element={<SearchAi />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;

// test
