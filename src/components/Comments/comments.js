import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../Context/context";

import dotenv from "dotenv";
import "./comments.css";

const Comments = () => {
	const [comment, setComment] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [successMsg, setSucessMsg] = useState("");

	const context = useContext(AuthContext);

	const postComment = async () => {
		const requestBody = {
			comment: comment,
		};

		if (comment.trim().length === 0) {
			setErrMsg("Comments box cannot be empty!");
		}
		dotenv.config();
		const URL = process.env.REACT_APP_API_URL;
		console.log(URL);
		try {
			const commentData = await fetch(
				"http://localhost:5000/apicomment/comments",
				{
					method: "POST",
					body: JSON.stringify(requestBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: context.token,
					},
				}
			);
			if (commentData.status !== 200 && commentData.status !== 201) {
				setErrMsg("Failed");
			}
			const data = await commentData.json();
			console.log(commentData);
			console.log(data);
		} catch (err) {
			setErrMsg(err.message);
		}
	};
	return (
		<div className="comment-class">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					postComment();
				}}>
				{errMsg && !successMsg && <div className="error">{errMsg}</div>}
				{successMsg && <div className="success">{successMsg}</div>}
				<h2>Create Your Comment</h2>
				<div>
					<label>Comment:</label>
					<br />
					<input
						type="text"
						name="comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Comments;
