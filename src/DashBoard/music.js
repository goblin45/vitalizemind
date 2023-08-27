import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Music = ({ currentEmotion, preferences }) => {
    const [musicIds, setmusicIds] = useState([]);

    useEffect(() => {
		console.log(preferences);
		console.log(currentEmotion)
		axios.post("https://vitalizemind-nodeapi.onrender.com/content/music", {
			currentEmotion: currentEmotion,
			preferences: preferences,
		})
		.then((response) => {
			const musicsToShow = response.data.musicIds;
			setmusicIds(musicsToShow);
		})
	}, [currentEmotion]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="iframe-container">
						{musicIds?.length ? (
						musicIds.map((musicId) => (
							<iframe
								className="vid_boxes"
								key={musicId}
								src={`https://www.youtube.com/embed/${musicId}`}
								title="YouTube music player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen="true"
								style={{ borderRadius: "40px" }}
							></iframe>
						))
						) : (
						<div className="loading">
							<Spinner animation="border" role="status" style={{ color: "#616b74" }}></Spinner>
							<p>Loading...</p>
						</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Music;
