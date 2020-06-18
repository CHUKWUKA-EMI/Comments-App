import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/auth";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/make-comment" component={Auth} />
				<Route path="/comments" component={Auth} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
