import React from 'react';
import { 
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import "./App.module.scss";

// component imports
import HomePage from "./components/pages/HomePage/HomePage";
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";
import CommunitiesPage from "./components/pages/CommunitiesPage/CommunitiesPage";

const App = () => {
	return (
		<div className="App">
			<Router basename='/'>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/communities" element={<CommunitiesPage />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App