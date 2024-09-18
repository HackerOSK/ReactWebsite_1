/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"hero-pattern": "url('.//projectFrontend//src//Images//Hero.mp4')",
				"footer-texture": "url('/img/footer-texture.png')",
			},
			colors: {
				acidgreen: {
					DEFAULT: "#A8FF04", // The main acid green color
					light: "#BFFF4A", // A lighter shade of acid green
					dark: "#8EBF03", // A darker shade of acid green
				},
			},
		},
	},
	plugins: [],
};
