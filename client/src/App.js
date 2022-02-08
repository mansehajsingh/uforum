import React from 'react';
import { 
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import styles from "./App.module";

// component imports
import HomePage from "./components/pages/HomePage/HomePage";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App