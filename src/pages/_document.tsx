import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="The Cryptocurrency Miners Community"
          key="description"
        />

        <meta
          name="keywords"
          content="GPU Mining, GPU Mining Settings, GPU Mining profitability"
          key="keywords"
        />

        <meta name="author" content="Mining Chamber" key="author" />

        <meta
          name="facebook-domain-verification"
          content="5767tl1jotrkn0xmibskn310vzstql"
          key="facebook-domain-verification"
        />

        <meta
          name="google-site-verification"
          content="3OfvtmHYLrHzSfdky3HX43jhzbbeXH-Jo6HdPFD9Lc8"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <Script id="tailwind-dark-mode" strategy="beforeInteractive">
          {`
            try {
              if (localStorage.mcThemePreference === 'dark' || (!('mcThemePreference' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (_) {}
          `}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
          `}
        </Script>
      </Head>
      <body className="bg-glass-light dark:bg-grey-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
