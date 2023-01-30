import { createContext, h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/home';

export const AppContext = createContext(null);

const App = () => (
	<div id="app">
		<Router>
			<Route path="/:instrument?" component={Home} />
		</Router>
	</div>
);

export default App;
