import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Truncate from "./Truncate";
import default_book from '../Images/default_book.png'

const Books = ({ currentEmotion, preferences }) => {
	const [bookdata, setBookdata] = useState([]);
	const [err, setErr] = useState()

	const bookFetch = () => {
		axios.post('https://vitalizemind-nodeapi.onrender.com/content/books', {currentEmotion:currentEmotion, preferences:preferences})
		.then(response=>{
		setBookdata(response.data.books)
		}).catch(error=>{
		console.error("Error fetching books: " + error)
		setErr(error)
		}
		)
	}
	useEffect(()=>{
		bookFetch()
	},[err])

	return (
			<div className="container">
				<Row>
				<div className="book_boxes">
					<div >
					{bookdata?.length > 0 ? (
						bookdata.map((book) => {
						let title = book.volumeInfo.title;
						let author = book.volumeInfo.authors;
						let bookId = book.id
						{console.log(title, author, bookId)}
						let thumbnail =
							book.volumeInfo.imageLinks &&
							book.volumeInfo.imageLinks.smallThumbnail;
						if (title !== undefined && bookId !== undefined) {
							return (
							<div
								className="book_card"
								onClick={() =>
								(window.location.href =
									`http://books.google.co.in/books?id=${bookId}&printsec=frontcover&hl=&cd=1&source=gbs_api`)
								}
							>
								<img src={thumbnail} alt={default_book} />
								<div className="bottom">
									<Truncate title={title} maxLength={15} />
									<Truncate title={author} maxLength={10} />
								</div>
							</div>
							);
						}
						})
					) : (
						<div className="loading">
							<Spinner animation="border" role="status" style={{ color: "#616b74" }}></Spinner>
							<p>Loading...</p>
						</div>
					)}
					</div>
				</div>
				</Row>
			</div>
		
	);
};

export default Books;