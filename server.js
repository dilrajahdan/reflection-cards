const fs = require("fs");
const path = require("path");

const imageDirectory = "images"; // replace with your image directory

// read the image directory and create an array of file information objects
const imageFiles = fs.readdirSync(imageDirectory).map((file) => {
	const filePath = path.join(imageDirectory, file);
	const stats = fs.statSync(filePath);
	return {
		filename: file,
		path: filePath,
		size: stats.size,
		dateCreated: stats.birthtime,
	};
});

// write the array of image file information to a JSON file
fs.writeFileSync("image.json", JSON.stringify(imageFiles));
