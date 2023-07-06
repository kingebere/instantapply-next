import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { getUserPdf } from "@/supabase";
import * as pdfjsLib from "pdfjs-dist";

const Index = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pdfViewerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchUserPdf = async () => {
      try {
        const result = await getUserPdf(router.query.id as string);
        if (result && result.length !== 0) {
          let shouldAllowDownload: boolean = false;
          const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(
            result[0].resume_url
          )}&download=${shouldAllowDownload ? "true" : "false"}`;
          setPdfUrl(proxyUrl);
        }
      } catch (error) {
        console.error("Error fetching user PDF:", error);
      }
    };

    fetchUserPdf();
  }, [router.query.id]);

  useEffect(() => {
    // Timer-related variables and functions
    let startTime: number | null = null;

    const startTimer = () => {
      startTime = Date.now();
      console.log("Timer started at:", startTime);
    };

    const stopTimer = () => {
      if (startTime) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log("PDF viewed for", duration, "milliseconds");
        startTime = null;
      }
    };

    const handlePageUnload = () => {
      stopTimer();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      }
    };

    // Add event listeners for page unload and visibility change
    window.addEventListener("beforeunload", handlePageUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the timer when the component mounts
    startTimer();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handlePageUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const removeQueryParameterFromUrl = () => {
    // Remove the query parameter from the URL using the History API
    const { protocol, host, pathname } = window.location;
    const newUrl = `${protocol}//${host}${pathname}`;
    window.history.replaceState({}, document.title, newUrl);
  };

  useEffect(() => {
    // Call the function to remove query parameter from URL
    removeQueryParameterFromUrl();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const iframe = pdfViewerRef.current;
      if (iframe && iframe.contentWindow) {
        const scrollOffset = iframe.contentWindow.scrollY || 0;
        const pageHeight = iframe.offsetHeight || 0;
        const currentPageNumber = Math.ceil(scrollOffset / pageHeight) + 1;
        setCurrentPage(currentPageNumber);
      }
    };

    if (pdfUrl && pdfViewerRef.current) {
      const iframe = pdfViewerRef.current;

      iframe.addEventListener("load", () => {
        iframe.contentWindow?.addEventListener("scroll", handleScroll);
      });

      // Set the iframe source after adding the load event listener
      // to ensure the event is properly triggered
      iframe.src = `${pdfUrl}#page=1`;
    }

    return () => {
      if (pdfViewerRef.current) {
        const iframe = pdfViewerRef.current;
        iframe.removeEventListener("load", () => {
          iframe.contentWindow?.removeEventListener("scroll", handleScroll);
        });
      }
    };
  }, [pdfUrl]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="auto"
          ref={pdfViewerRef}
        />
      )}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        Current Page: {currentPage}
      </div>
    </div>
  );
};

export default Index;
