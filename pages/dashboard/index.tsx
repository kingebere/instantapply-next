import { GetServerSidePropsContext } from "next";
import React from "react";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

//This fixes the "window is undefined" error
import dynamic from "next/dynamic";
import JobsTable from "@/components/JobsTable";
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
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Profile
                  </a>
                </li>
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
                <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-2 xl:grid-cols-6">
                  <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800 col-span-6 sm:col-span-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                          2,340
                        </span>
                        <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Jobs applied this week
                        </h3>
                      </div>
                      <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500 dark:text-green-400">
                        14.6%
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div id="new-products-chart" className="overflow-x-scroll">
                      <Chart
                        options={data.options}
                        series={data.series}
                        type="bar"
                        width="100%"
                        height={320}
                      />
                    </div>
                    {/* Card Footer  */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                      <div>
                        <button
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          type="button"
                          data-dropdown-toggle="new-products-dropdown"
                        >
                          Last 7 days{" "}
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                        {/* Dropdown menu  */}
                        <div
                          className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          id="new-products-dropdown"
                        >
                          <div className="py-3 px-4" role="none">
                            <p
                              className="text-sm font-medium text-gray-900 truncate dark:text-white"
                              role="none"
                            >
                              Sep 16, 2021 - Sep 22, 2021
                            </p>
                          </div>
                          <ul className="py-1" role="none">
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Yesterday
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Today
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 7 days
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 30 days
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 90 days
                              </a>
                            </li>
                          </ul>
                          <div className="py-1" role="none">
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              Custom...
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href="#"
                          className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                        >
                          View More
                          <svg
                            className="ml-1 w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800 col-span-6 sm:col-span-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                          5,355
                        </span>
                        <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Applied Jobs
                        </h3>
                      </div>
                      <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500 dark:text-green-400">
                        32.9%
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div id="visitors-chart">
                      <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                          <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                    >
                                      Transaction
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                    >
                                      Date &amp; Time
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                    >
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800">
                                  <tr>
                                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Bonnie Green
                                      </span>
                                    </td>
                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      Apr 23 ,2021
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                      $2300
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">
                                        Completed
                                      </span>
                                    </td>
                                  </tr>
                                  <tr className="bg-gray-50 dark:bg-gray-700">
                                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                      Payment refund to{" "}
                                      <span className="font-semibold">
                                        #00910
                                      </span>
                                    </td>
                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      Apr 23 ,2021
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                      -$670
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="bg-green-100 dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">
                                        Completed
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                      Payment failed from{" "}
                                      <span className="font-semibold">
                                        #087651
                                      </span>
                                    </td>
                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      Apr 18 ,2021
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                      $234
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="bg-red-100 dark:bg-red-200 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">
                                        Cancelled
                                      </span>
                                    </td>
                                  </tr>
                                  <tr className="bg-gray-50 dark:bg-gray-700">
                                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Lana Byrd
                                      </span>
                                    </td>
                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      Apr 15 ,2021
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                      $5000
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="bg-purple-100 dark:bg-purple-200 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md">
                                        In progress
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card Footer  */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 sm:pt-6 mt-3.5 dark:border-gray-700">
                      <div>
                        <button
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          type="button"
                          data-dropdown-toggle="visitors-dropdown"
                        >
                          Last 7 days{" "}
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                        {/* Dropdown menu  */}
                        <div
                          className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                          id="visitors-dropdown"
                        >
                          <div className="py-3 px-4" role="none">
                            <p
                              className="text-sm font-medium text-gray-900 truncate dark:text-white"
                              role="none"
                            >
                              Sep 16, 2021 - Sep 22, 2021
                            </p>
                          </div>
                          <ul className="py-1" role="none">
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Yesterday
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Today
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 7 days
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 30 days
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                Last 90 days
                              </a>
                            </li>
                          </ul>
                          <div className="py-1" role="none">
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              Custom...
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href="#"
                          className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                        >
                          View More
                          <svg
                            className="ml-1 w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

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
