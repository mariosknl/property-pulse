import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
	title: "PropertyPulse | Find the Perfect Rental",
	description:
		"PropertyPulse is an app that helps you find the perfect rental. Find your next property with ease, and discover the best deals on the market.",
	keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
