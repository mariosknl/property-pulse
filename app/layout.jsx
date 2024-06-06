import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Navbar";

import "@/assets/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
