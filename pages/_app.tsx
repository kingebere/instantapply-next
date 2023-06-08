import { useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import "../styles/globals.css";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import AuthProvider from "@/context/AuthContext";

import { Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AuthProvider>
        {/* script to embed Google Ads */}
        {/* <Script
						data-ad-client='ca-pub-5952673528545779'
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
					></Script> */}
        {/* script to embed Google tags */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        {/* script to embed Google analytics */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
				  window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
				
				  gtag('config', '${gtag.GA_TRACKING_ID}');
					`}
        </Script>

        <Component {...pageProps} />

        <Analytics />
      </AuthProvider>
    </SessionContextProvider>
  );
}
