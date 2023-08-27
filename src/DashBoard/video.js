import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Video = ({ currentEmotion, preferences }) => {
	const [videoIds, setVideoIds] = useState([]);

	useEffect(() => {
		console.log(preferences);

		axios
		.post("https://vitalizemind-nodeapi.onrender.com/content/video", {
			currentEmotion: currentEmotion,
			preferences: preferences,
		})
		.then((response) => {
			const videosToShow = response.data.videoIds;
			setVideoIds(videosToShow);
			videoIds.forEach((videoId) => {
			console.log(videoId);
			});
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="iframe-container">
						{videoIds?.length ? (
						videoIds.map((videoId) => (
							<iframe
								className="vid_boxes"
								key={videoId}
								src={`https://www.youtube.com/embed/${videoId}`}
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen="true"
								style={{ borderRadius: "40px" }}
							></iframe>
						))
						) : (
						<div className="loading" style={{ color: "#616b74" }}>
							<Spinner animation="border" role="status"></Spinner>
							<p>Loading...</p>
						</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Video;
