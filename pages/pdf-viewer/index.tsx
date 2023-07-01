import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getUserPdf } from "@/supabase";

const Index = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user PDF based on router query parameter
    const fetchUserPdf = async () => {
      try {
        //to do. also pass the unique id of the pdf to track the pdf that is been opened
        const result = await getUserPdf(router.query.id as string);
        if (result && result.length !== 0) {
          setPdfUrl(result[0].resume_url);
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

  return (
    <div style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0 }}>
      {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: "100%", height: "100%", border: "none" }}></iframe>
      )}
    </div>
  );
};

export default Index;
