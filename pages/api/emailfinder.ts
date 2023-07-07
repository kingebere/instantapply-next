import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.status(200).end();
    return;
  }

  const url = "https://increase.com"; // Replace with the target website URL
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  const additionalUrls = [
    url,
    url + `/contact`,
    url + `/about`,
    url + `/privacy`,
    url + `/privacy-policy`,
    url + `/security`,
    url+'/terms',
    url + `/terms-of-use`,
    url + `/terms-of-service`,
    url + `/account-agreement`,
    url+'/fees',
    url+'/careers',
    url+'/blog',
    url+'/help',
    url+'/subscribe',
    url+'/pricing',
    url+'/legal',
    url+'/demo',
    url+'/docs',
    url+'/developers',
    url+'/developer',
    url+'/faq',
    url+'/press',
    url+'/complaints',
    url+'complaint',
    url+'/about-us',
    url+'/enterprise',
    url+'/guides',
    url+'/webinars',
    url+'/contact-sales',
    // Add any additional URLs you have knowledge of here
  ];

  const urls = [...additionalUrls];

  const scrapeEmails = async () => {
    const emailAddresses: any[] = [];

    for (const url of urls) {
      try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Add CSS selectors for elements likely to contain email addresses on each page
        const selectors = [
          'a[href^="mailto:"]', // Anchor tags with mailto links
          '.email', // Elements with a specific class "email"
          '[data-email]', // Elements with a data attribute "data-email"
          'p',
          'div',
          'h2',
          'span',
          'h3',
          'h4',
          'h5',
          'h1',
          'li'
        ];

        selectors.forEach((selector) => {
          $(selector).each((index: any, element: any) => {
            const email =
              $(element).attr("href")?.replace("mailto:", "") ||
              $(element).attr("data-email") ||
              $(element).text();
            if (isValidEmail(email) && email.includes(domain)) {
              emailAddresses.push(email);
            }
          });
        });
      } catch (error:any) {
        if (error.response && error.response.status === 404) {
            // console.error(`Page not found: ${url}`);
            continue; // Skip to the next URL
          }
        // Handle the error gracefully, for example:
        // res.status(500).json({ error: `Error scraping ${url}` });
      }
    }

    const uniqueEmails = Array.from(new Set(emailAddresses));
    console.log("Extracted Email Addresses:", uniqueEmails);
  };

  // Helper function to validate email address format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  scrapeEmails()
    .then(() => {
      // Handle the extracted email addresses as needed
      res.status(200).end();
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
