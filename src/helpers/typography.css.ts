export default `
a {
	text-decoration: none;
}

body {
	font-family: 'Roboto', sans-serif;
	color: var(--color);
	font-size: 14px;
	font-weight: 400;
	letter-spacing: 0.01071em;
}

@media only screen and (min-width: 0) {
		font-size: 14px;
	}
	@media only screen and (min-width: 992px) {
		font-size: 14.5px;
	}
	@media only screen and (min-width: 1200px) {
		font-size: 15px;
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
	font-size: 4.2rem;
	line-height: 110%;
	margin: calc(4.2rem / 1.5) 0 calc(4.2rem  / 2.5) 0;
}

h2 {
	font-size: 3.56rem;
	line-height: 110%;
	margin: calc(3.56rem / 1.5) 0 calc(3.56rem  / 2.5) 0;
}

h3 {
	font-size: 2.92rem;
	line-height: 110%;
	margin: calc(2.92rem / 1.5) 0 calc(2.92rem  / 2.5) 0;
}

h4 {
	font-size: 2.28rem;
	line-height: 110%;
	margin: calc(2.28rem / 1.5) 0 calc(2.28rem / 2.5) 0;
}

h5 {
	font-size: 1.64rem;
	line-height: 110%;
	margin: calc(1.64rem / 1.5) 0 calc(1.64rem  / 2.5) 0;
}

h6 {
	font-size: 1.15rem;
	line-height: 110%;
	margin: calc(1.15rem / 1.5) 0 calc(1.15rem  / 2.5) 0;
}
`;
