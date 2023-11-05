import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div id="root">
      <Component {...pageProps} />
    </div>
  );
}
