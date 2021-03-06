import React, { useState, useContext } from "react";
import AuthContext from "../../Context/context";
import axios from "axios";
import "./auth.css";
import dotenv from "dotenv";

const Auth = (props) => {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [isLogIn, setIsLoggedIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMsg, setSucessMsg] = useState("");

	const context = useContext(AuthContext);

	const submitHandler = async () => {
		if (userEmail.trim().length === 0 || userPassword.trim().length === 0) {
			setErrorMessage("Input field cannot be Empty!");
		}
		dotenv.config();
		const URL = process.env.REACT_APP_API_URL;

		//For User's login
		let requestBody = {
			email: userEmail,
			password: userPassword,
		};
		try {
			const loginRes = await fetch(URL + "api/login", {
				method: "POST",
				body: JSON.stringify(requestBody),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (loginRes.status !== 200 && loginRes !== 201) {
				setErrorMessage("Failed");
			}
			const data = await loginRes.json();
			setSucessMsg("You are logged in.");

			context.login(data.userId, data.token, data.tokenExpiration);
		} catch (err) {
			setErrorMessage(err.message);
		}

		//For user's Registration
		if (!isLogIn) {
			requestBody = {
				name: userName,
				email: userEmail,
				password: userPassword,
			};
		}

		try {
			const result = await fetch(URL + "api/register", {
				method: "POST",
				body: JSON.stringify(requestBody),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (result.status !== 200 && result.status !== 201) {
				setErrorMessage("Failed");
			}
			const data = await result.json();
			setSucessMsg("Please Login to continue");
			setIsLoggedIn(true);
			console.log(data);
		} catch (err) {
			setErrorMessage(err.message);
		}
	};
	return (
		<div className="form-class">
			<h1>{isLogIn ? "Login" : "Sign Up"}</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler();
				}}>
				{errorMessage && !successMsg && <h3 className="err">{errorMessage}</h3>}
				{successMsg && <h4 className="success">{successMsg}</h4>}
				{!isLogIn && (
					<input
						type="text"
						id="username"
						name="username"
						value={userName}
						placeholder="Full Name"
						onChange={(e) => setUserName(e.target.value)}
					/>
				)}
				<br />
				<input
					type="email"
					id="email"
					name="email"
					value={userEmail}
					placeholder="Email"
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<br />
				<input
					type="password"
					id="password"
					name="password"
					value={userPassword}
					placeholder="Password"
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<br />
				<button type="submit">{isLogIn ? "Login" : "Sign Up"}</button>
				<p>
					{!isLogIn
						? "Already have an account?"
						: "You don't have an account yet?"}{" "}
					<a onClick={(e) => setIsLoggedIn(!isLogIn)}>
						{!isLogIn ? "Login" : "Sign Up"}
					</a>
				</p>
			</form>

			<marquee>ReactJS Comments App...&copy;2020</marquee>
		</div>
	);
};

export default Auth;
