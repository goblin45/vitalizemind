import React from "react";

const Truncate = ({ title, maxLength }) => {
	if (title !== undefined) {
		const truncatedTitle =
		title.length > maxLength ? title.slice(0, maxLength) + "..." : title;

		return <h6 className="truncated-title">{truncatedTitle}</h6>
	}
	
};

export default Truncate;
