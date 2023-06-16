import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";
const unirest = require("unirest");
const cheerio = require("cheerio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigin = [
    "https://jobs.lever.co",
    "https://boards.greenhouse.io",
  ];

  //since Access-Control-Allow-Origin doesnt allow multiple value , we
  //make a checker that adds the allowed url based on the headers.origin
  if (allowedOrigin.includes(req.headers.origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    if (allowedOrigin.includes(req.headers.origin as string)) {
      res.setHeader(
        "Access-Control-Allow-Origin",
        req.headers.origin as string
      );
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type"
    );
    res.status(200).end();
    return;
  }
  

  let url = req.body.url || "https://www.google.com/search?q=site%3Alever.co+OR+site%3Aashbyhq.com+OR+site%3Agreenhouse.io+OR+site%3Abamboohr.com+OR+site%3Aworkable.com++remote+software+engineer+after%3A2023-04-01&rlz=1C1GCEU_enNG1018NG1018&biw=1504&bih=458&sxsrf=APwXEddBRiELvHrkgm55oICbaTnexXlSKw%3A1686824909787&ei=zeeKZKvXL4idhbIPmtuM2AQ&ved=0ahUKEwjr8a68iMX_AhWITkEAHZotA0s4jAEQ4dUDCA8&uact=5&oq=site%3Alever.co+OR+site%3Aashbyhq.com+OR+site%3Agreenhouse.io+OR+site%3Abamboohr.com+OR+site%3Aworkable.com++remote+software+engineer+after%3A2023-04-01&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAFAAWABgAGgAcAB4AIABAIgBAJIBAJgBAKABAQ&sclient=gws-wiz-serp"
  const resp = await unirest
    .get(url)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response: { body: any }) => {
      let $ = cheerio.load(response.body);

      let titles: any = [];
      let links: any = [];
      let snippets: any = [];
      let displayedLinks: any = [];
      let company: any = [];
      let timePosted: any = [];
      let jobDetails: any = [];

 
      let pages: any = [];
      let pageNumber: any = [];
      $(".yuRUbf > a > h3").each((i: string | number, el: any) => {
        titles[i] = $(el).text();
        // location[i]= $(el).text() ? $(el).text()?.split("-")[1] : "Remote";
      });
      $(".yuRUbf > a").each((i: string | number, el: any) => {
        links[i] = $(el).attr("href");
      });
      $(".g .VwiC3b ").each((i: string | number, el: any) => {
        snippets[i] = $(el).text();
        timePosted[i] = $(el).text() ? $(el).text()?.split("—")[0] : "N/A";
        jobDetails[i] = $(el).text() ? $(el).text()?.split("—")[1] : "N/A";
      });
      $(".g .yuRUbf .NJjxre .tjvcx").each((i: string | number, el: any) => {
        displayedLinks[i] = $(el).text();
        company[i] = $(el).text()
          ? $(el).text()?.split(" ")[2]?.toUpperCase()
          : "N/A";
      });

      $(".AaVjTc > tbody > tr > td > a").each((i: string | number, el: any) => {
        pages[i] = $(el).attr("href");
      });
      $(".AaVjTc > tbody > tr > td > a ").each(
        (i: string | number, el: any) => {
          pageNumber[i] = $(el).text();
        }
      );

      const organicResults = [];
      const paginationDetails: any = [];

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          company: company[i],
          timePosted: timePosted[i],
          jobDetails: jobDetails[i],
          displayedLink: displayedLinks[i],
        };
      }

      for (let i = 0; i < pageNumber.length; i++) {
        paginationDetails[i] = {
          pages: pages[i],
          pageNumber: pageNumber[i],
        };
      }


      res.status(200).json([organicResults, paginationDetails])
    });
}
