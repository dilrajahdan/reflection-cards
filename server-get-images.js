const axios = require("axios");
const fs = require("fs");
const path = require("path");

const downloadDirectory = "images"; // replace with your download directory
const numberOfImages = 500; // replace with the number of images you want to download
const unsplashUrl = `https://source.unsplash.com/random`;

async function downloadImages() {
	for (let i = 1; i <= numberOfImages; i++) {
		const imageFileName = `image-${i}.jpg`;
		const imageUrl = `${unsplashUrl}/1024x${Math.floor(
			Math.random() * (1024 - 512 + 1) + 512
		)}`;
		const imageFilePath = path.join(downloadDirectory, imageFileName);
		console.log(
			`Downloading image ${imageFileName} from ${imageUrl} to ${imageFilePath}`
		);
		axios({
			url: imageUrl,
			responseType: "stream",
		})
			.then((response) => {
				response.data.pipe(fs.createWriteStream(imageFilePath));
			})
			.catch((error) => {
				console.error(`Error downloading image ${imageFileName}: ${error}`);
			});
	}
}

downloadImages();
