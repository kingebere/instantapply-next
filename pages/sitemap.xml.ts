import React from "react"
import fs from "fs"

import { GetServerSideProps } from "next"
const Sitemap = () => {}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://instantapply.co"

  const mainPage = ["https://instantapply.co"]
  const staticPages = fs
    .readdirSync(
      // 'pages'
      "./.next/server/pages"
    )
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_app.js.map",
        "_document.js.map",
        "_error.js.map",
        "collections.js.map",
        "index.js.map",
        "profile.js.map",
        "sitemap.xml.js.map",
        "screens",
        "_document.js",
        "profile.js",
        "_error.js",
        "collections.js",
        "404.html",
        "admin.tsx",
        "index.js",
        "sitemap.xml.js",

        "_app.tsx",
        "_app.ts.map",
        "_document.ts.map",
        "_error.ts.map",
        "collections.ts.map",
        "index.ts.map",
        "profile.ts.map",
        "sitemap.xml.ts.map",
        "screens",
        "api",
        "_document.tsx",
        "profile.ts",
        "_error.ts",
        "collections.ts",
        "404.html",
        "admin.tsx",
        "index.tsx",
        "sitemap.xml.ts",
      ].includes(staticPage)
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`
    })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${mainPage
    .map((url) => {
      return `
	<url>
	  <loc>${url}</loc>
	  <lastmod>${new Date().toISOString()}</lastmod>
	  <changefreq>weekly</changefreq>
	  <priority>1.0</priority>
	</url>
  `
    })
    .join("")}
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join("")}
  
    </urlset>
  `

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
