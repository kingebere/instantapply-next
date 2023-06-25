import { GetServerSidePropsContext } from "next";
import React from "react";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

//This fixes the "window is undefined" error
import dynamic from "next/dynamic";
import JobsTable from "@/components/JobsTable";
import Link from "next/link";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },

      colors: ["#006aff"],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 23, 67],
      },
    ],
  };
  return (
    <>
      <header>
        <nav className="bg-instant-light-100 border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://instantapply.co" className="flex items-center"></a>
            <div className="flex md:order-2"></div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-instant-light-100 rounded-lg bg-instant-light-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-instant-light-100 dark:bg-instant-light-100 md:dark:bg-instant-light-100 dark:border-instant-light-100">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Jobs
                  </a>
                </li>

                <Link href="/profile">
                  <li>
                    {" "}
                    <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      Profile
                    </a>
                  </li>
                </Link>

                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="bg-gray-50   dark:bg-gray-800">
        <div className="flex overflow-hidden w-[1300px] mx-auto pt-6 bg-gray-50 dark:bg-gray-900">
          <div
            className="hidden fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="overflow-y-auto relative w-full h-full bg-gray-50  dark:bg-gray-900"
          >
            <main>
              <div className="px-4 pt-6">
                <JobsTable />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
};
