import "../styles/global.css";
import "../styles/prism-vsc-dark-plus.css";

import "github-markdown-css/github-markdown-light.css";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
