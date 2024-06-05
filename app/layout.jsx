import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
	title: "PropertyPulse | Find the Perfect Rental",
	description:
		"PropertyPulse is an app that helps you find the perfect rental. Find your next property with ease, and discover the best deals on the market.",
	keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
};

export default MainLayout;
