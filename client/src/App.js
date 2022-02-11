import React from 'react';
import { 
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

// component imports
import HomePage from "./components/pages/HomePage/HomePage";
import SignUpPage from "./components/pages/SignUpPage/SignUpPage";

const App = () => {
	return (
		<div className="App">
			<Router basename='/'>
				<Routes>
					<Route exact path="/" element={<HomePage />}>
						<Route path="/sign-up" element={<SignUpPage />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App