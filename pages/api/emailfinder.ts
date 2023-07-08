import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const cheerio = require("cheerio");
const unirest = require("unirest");

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
  
// uncommenting the cherrio implementation becauae it couldnt see certain mails"
const{ company } = req.body;

  const url = company 
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;

  const name = url.split("://")[1].split(".")[0];
  const additionalUrls = [
    url,
    url + `/contact`,
    url + `/company/about`,
    url + `/company/privacy`,
    url + `/company/careers`,
    url + `/company/terms`,
    url + `/about`,
    url + `/privacy`,
    url + `/privacy-policy`,
    url + `/security`,
    url + "/terms",
    url + `/terms-of-use`,
    url + `/terms-of-service`,
    url + `/account-agreement`,
    url + "/fees",
    url + "/careers",
    url + "/blog",
    url + "/help",
    url + "/subscribe",
    url + "/pricing",
    url + "/legal",
    url + "/demo",
    url + "/docs",
    url + "/developers",
    url + "/developer",
    url + "/faq",
    url + "/press",
    url + "/complaints",
    url + "/complaint",
    url + "/about-us",
    url + "/contact-us",
    url + "/enterprise",
    url + "/guides",
    url + "/webinars",
    url + "/legal/terms",
    url + "/legal/terms-conditions",
    url + "/legal/privacy",
    url + "/legal/privacy-policy",
    url + "/contact-sales",
    url + "/join-our-team",
    url + "/examples",
    url+"/company",
    url+"/support",
    url+"/jobs",
    // `status.+${url.split("//")[1]}`
    "https://paganresearch.io/details/" + name ,
    "https://www.crunchbase.com/organization/"+name,
  ];

  const urls = [...additionalUrls];

  const scrapeEmails = async () => {
    const emailArrays: any[] = [];

    await Promise.all(
      urls.map(async (url) => {
        try {
          const response =  await unirest
          .get(url)
          .headers({
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
          })

          const html = response.body;
          
          const $ = cheerio.load(html);

          const emailAddresses: any[] = [];

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
            'li',
            'a',
          ];

          selectors.forEach((selector) => {
            $(selector).each((index: any, element: any) => {
              const email =
                $(element).attr("href")?.replace("mailto:", "") ||
                $(element).attr("data-email") ||
                $(element).text();
                // console.log(email)
              if (isValidEmail(email) && email.includes(domain)) {
                emailAddresses.push(email);
              }
            });
          });

          emailArrays.push(emailAddresses);
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            console.error(`Page not found: ${url}`);
          } else {
            console.error(`Error scraping ${url}:`, error);
          }
        }
      })
    );

    const uniqueEmails = Array.from(new Set(emailArrays.flat()));
    console.log("Extracted Email Addresses:", uniqueEmails);
    return uniqueEmails
  };

  // Helper function to validate email address format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  scrapeEmails()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}




// import { NextApiRequest, NextApiResponse } from "next";
// import puppeteer from "puppeteer";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//     res.status(200).end();
//     return;
//   }

//   const url = "https://paystack.com"; // Replace with the target website URL
//   const parsedUrl = new URL(url);
//   const domain = parsedUrl.hostname;
//   const additionalUrls = [
//     url,
//     url + "/contact",
//     url + "/about",
//     url + "/privacy",
//     url + "/privacy-policy",
//     url + "/security",
//     url + "/terms",
//     url + "/terms-of-use",
//     url + "/terms-of-service",
//     url + "/account-agreement",
//     url + "/fees",
//     url + "/careers",
//     url + "/blog",
//     url + "/help",
//     url + "/subscribe",
//     url + "/pricing",
//     url + "/legal",
//     url + "/demo",
//     url + "/docs",
//     url + "/developers",
//     url + "/developer",
//     url + "/faq",
//     url + "/press",
//     url + "/complaints",
//     url + "/complaint",
//     url + "/about-us",
//     url + "/enterprise",
//     url + "/guides",
//     url + "/webinars",
//     url + "/legal/terms",
//     url + "/legal/privacy",
//     url + "/contact-sales",
//   ];

//   const urls = [...additionalUrls];

//   const scrapeEmails = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const emailArrays: any[] = [];

//     for (const url of urls) {
//       try {
//         await page.goto(url);
//         const html = await page.content();

//         const emailAddresses: any[] = [];

//         const selectors = [
//           'a[href^="mailto:"]', // Anchor tags with mailto links
//           ".email", // Elements with a specific class "email"
//           '[data-email]', // Elements with a data attribute "data-email"
//           "p",
//           "div",
//           "h2",
//           "span",
//           "h3",
//           "h4",
//           "h5",
//           "h1",
//           "li",
//           "a",
//         ];

//         for (const selector of selectors) {
//           const elements = await page.$$(selector);
//           for (const element of elements) {
//             const email:any = await (await element.getProperty("href")).jsonValue();
         
//             if (isValidEmail(email) && email.includes(domain)) {
//               emailAddresses.push(email);
//             }
//           }
//         }

//         emailArrays.push(emailAddresses);
//       } catch (error: any) {
//         console.error(`Error scraping ${url}:`, error);
//       }
//     }

//     await browser.close();

//     const uniqueEmails = Array.from(new Set(emailArrays.flat()));
//     console.log("Extracted Email Addresses:", uniqueEmails);
//   };

//   // Helper function to validate email address format
//   const isValidEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   try {
//     await scrapeEmails();
//     res.status(200).end();
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
