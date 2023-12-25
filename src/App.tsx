import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Injury from './components/InjuryReport';
import Team from './components/Team';
import Search from './components/Search';
import Waiver from './components/Waiver';


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
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
