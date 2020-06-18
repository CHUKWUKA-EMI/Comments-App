import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context/context";

import "./NavBar.css";

const NavBar = (props) => {
	const context = useContext(AuthContext);
	return (
		<div className="Nav">
			<h1>CommentsApp</h1>
			<div style={{ width: "90px" }}>
				<ul>
					{!context.token && (
						<li>
							<NavLink to="/auth">Authentication</NavLink>
						</li>
					)}
					<li>
						<NavLink to="/comments">Comments</NavLink>
					</li>

					{context.token && (
						<li>
							<NavLink to="/makecomment">MakeComments</NavLink>
						</li>
					)}

					<li onClick={props.onLogout}>
						<NavLink to="/auth">Logout</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
