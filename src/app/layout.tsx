// app/layout.tsx
import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata = {
  title: "Mon Site",
  description: "Description de mon site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
