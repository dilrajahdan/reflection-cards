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

// create the HTML for the image gallery
const galleryHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reflective Cards</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KLJ7FJK');</script>
    <!-- End Google Tag Manager -->
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLJ7FJK"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    <header>
        <section>
        <h1>Reflective Cards Online</h1>
        <p>
        Reflective cards are a useful tool for social workers to help initiate
        conversations with their clients. The cards contain thought-provoking
        prompts designed to encourage clients to reflect on their thoughts,
        feelings, and experiences.
        </p>

        <p>
            Ask you client to go through the image and ask to share their thoughts
            on the topic. The reflective cards can be used in a variety of settings,
            such as individual or group therapy sessions, and can help clients gain
            insight into their emotions and behaviors. Whether you're a seasoned
            social worker or a new practitioner, the reflective cards can be a
            valuable addition to your toolkit.
        </p>
        </section>
        <form name="subscribe" method="POST" data-netlify="true">
        <h2>Take your practice to the next level</h2>
        <label for="email">Get tips and tools straight to your inbox</label>
        <input type="email" id="email" name="email" placeholder="Your email" />
        <button type="submit">Subscribe</button>
    </form>
    </header>
    <main class="container">
    ${imageFiles
			.map(
				(image, index) => `
    <figure>
        <img lazy src="${image.path}" alt="${image.filename}" />
        <figcaption><a href="#">${index + 1}</a></figcaption>
    </figure>
    `
			)
			.join("")}
    </main>
</body>
</html>
`;

// write the HTML to an index.html file
fs.writeFileSync("index.html", galleryHtml);
