import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/auth";
import NavBar from "./components/NavBar/NavBar";
import Comment from "./components/Comments/comments";
import AuthContex from "./Context/context";
import "./App.css";

function App() {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	const login = (token, userId, tokenExpiration) => {
		setToken(token);
		setUserId(userId);
	};
	const logout = () => {
		setToken(null);
		setUserId(null);
	};
	return (
		<BrowserRouter>
			<React.Fragment>
				<AuthContex.Provider
					value={{
						token: token,
						userId: userId,
						login: login,
						logout: logout,
					}}>
					<NavBar onLogout={logout} />
					<Switch>
						<Route path="/auth" component={Auth} />
						{token && <Route path="/makecomment" component={Comment} />}
						<Route path="/comments" component={Auth} />
						<Redirect from="/" to="/auth" />
						{token && <Redirect from="/auth" to="/comments" />}
						{!token && <Redirect from="/comments" to="/auth" />}
					</Switch>
				</AuthContex.Provider>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
