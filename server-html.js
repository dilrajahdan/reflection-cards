const fs = require("fs");
const path = require("path");

const imageDirectory = "cards"; // replace with your image directory

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

// create the HTML for the image gallery
const galleryHtml = `
    
    ${imageFiles
      .map(
        (image, index) => `
    <figure>
        <img loading="lazy" src="${image.path}" alt="${image.filename}" />
        <figcaption><a href="#">${index + 1}</a></figcaption>
    </figure>
    `
      )
      .join("")}
`;

// write the HTML to an index.html file
fs.writeFileSync("images.html", galleryHtml);
