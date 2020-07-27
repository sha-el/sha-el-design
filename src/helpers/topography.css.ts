export default `
a {
	text-decoration: none;
}

body {
	font-family: "Roboto", sans-serif;
	@media only screen and (min-width: 0) {
		font-size: 14px;
	}
	@media only screen and (min-width: 992px) {
		font-size: 14.5px;
	}
	@media only screen and (min-width: 1200px) {
		font-size: 15px;
	}
	font-weight: normal;
	color: rgba(0, 0, 0, 0.87) !default;
}

h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
	font-weight: inherit;
}

h1 {
	font-size: 4.2rem !default;
	line-height: 110%;
	margin: (4.2rem !default / 1.5) 0 (4.2rem !default / 2.5) 0;
}

h2 {
	font-size: 3.56rem !default;
	line-height: 110%;
	margin: (3.56rem !default / 1.5) 0 (3.56rem !default / 2.5) 0;
}

h3 {
	font-size: 2.92rem !default;
	line-height: 110%;
	margin: (2.92rem !default / 1.5) 0 (2.92rem !default / 2.5) 0;
}

h4 {
	font-size: 2.28rem !default;
	line-height: 110%;
	margin: (2.28rem !default / 1.5) 0 (2.28rem !default / 2.5) 0;
}

h5 {
	font-size: 1.64rem !default;
	line-height: 110%;
	margin: (1.64rem !default / 1.5) 0 (1.64rem !default / 2.5) 0;
}

h6 {
	font-size: 1.15rem !default;
	line-height: 110%;
	margin: (1.15rem !default / 1.5) 0 (1.15rem !default / 2.5) 0;
}
`;