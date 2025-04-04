// pages/_app.tsx
import type { AppProps } from "next/app";
import Footer from "../src/components/Footer";
import "../src/styles/globals.css"; // Assure-toi d'avoir un fichier CSS global, sinon tu peux l'enlever

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
