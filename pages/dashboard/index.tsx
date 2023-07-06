"use client";

import { GetServerSidePropsContext } from "next";

import React, { useEffect, useState } from "react";
import { initDropdowns } from "flowbite";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";


import dynamic from "next/dynamic";

import axios from "axios";
import JobsTable from "@/components/JobsTable";
import Link from "next/link";

//This fixes the "window is undefined" error
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

  const [showJob, setShowJob] = useState({
    title: "",
    timePosted: "",
    detail: "",
    link: "",
  });

  const [resp, setResp] = useState<any>();
  const [url, setUrl] = useState<string>();
  const [currentIndex, setIndex] = useState<number>(0);

  const [lastIndexContent, setLastIndexContent] = useState<any>();
  const [firstIndexContent, setFirstIndexContent] = useState<any>();

  // Handlers
  const handleOnNext = () => {
    if (resp) {
      setUrl(`https://www.google.com${lastIndexContent?.pages}`);
      setIndex(currentIndex + 1);
    }
  };

  const handleOnPrev = () => {
    if (resp && currentIndex > 0) {
      setUrl(`https://www.google.com${firstIndexContent?.pages}`);
      setIndex(currentIndex - 1);
    }
  };

  console.log(resp);

  useEffect(() => {
    axios
      .post("/api/getJobs", { url })
      .then((res) => setResp(res.data))
      .catch((err) => console.log(JSON.stringify(err)));
  }, [url]);

  useEffect(() => {
    setLastIndexContent(resp && resp[1][resp[1].length - 1]);
    setFirstIndexContent(resp && resp[1][0]);
  }, [resp]);

  useEffect(() => {
    initDropdowns();
  }, []);

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
                <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800 mt-4">
                  {/* Card Title */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        Jobs
                      </h3>
                      <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                        This is a list of latest Jobs
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href="#"
                        className="p-2 text-sm font-medium rounded-lg text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                  {/* Table  */}
                  <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="p-4">
                                  <div className="flex items-center">
                                    <input
                                      id="checkbox-all"
                                      alt=""
                                      type="checkbox"
                                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      htmlFor="checkbox-all"
                                      className="sr-only"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                >
                                  Title
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                >
                                  Company
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                >
                                  Time Posted
                                </th>

                                <th
                                  scope="col"
                                  className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                                >
                                  DisplayedLinks
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800">
                              {resp &&
                                resp[0] &&
                                resp[0]?.map((job: any, i: number) => (
                                  <>
                                    <tr key={job.links}>
                                      <td className="w-4 px-4 py-3">
                                        <div className="flex items-center">
                                          <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                          />
                                          <label
                                            htmlFor="checkbox-table-search-1"
                                            className="sr-only"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </td>
                                      <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                        {job.title}
                                      </td>
                                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        {job.company}
                                      </td>
                                      <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                        {job.timePosted}
                                      </td>

                                      <td
                                        onClick={() =>
                                          setShowJob({
                                            title: job.title,
                                            timePosted: job.timePosted,
                                            detail: job.jobDetails,
                                            link: job.links,
                                          })
                                        }
                                        className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                      >
                                        <button
                                          id={`dropdown-button-${i}`}
                                          type="button"
                                          data-dropdown-toggle={`dropdown-${i}`}
                                          className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        >
                                          <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                          </svg>
                                        </button>
                                        <div
                                          id={`dropdown-${i}`}
                                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                          <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby={`dropdown-button-${i}`}
                                          >
                                            <li>
                                              {/* <!-- Modal toggle --> */}

                                              <a
                                                id="readEventButton"
                                                data-modal-toggle="readEventModal"
                                                className=" cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                type="button"
                                              >
                                                Show
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href={job.links}
                                                target="_blank"
                                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Apply
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>

                                    {/* <!-- Main modal --> */}
                                    <tr
                                      id="readEventModal"
                                      // tabIndex="-1"
                                      aria-hidden="true"
                                      className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                                    >
                                      <td className="relative w-full h-full max-w-md p-4 md:h-auto">
                                        {/* <!-- Modal content --> */}
                                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                          {/* <!-- Modal header --> */}
                                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 rounded-t sm:mb-5 dark:border-gray-700">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                              {showJob?.title}
                                            </h3>
                                            <button
                                              type="button"
                                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                                              data-modal-toggle="readEventModal"
                                            >
                                              <svg
                                                aria-hidden="true"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"
                                                ></path>
                                              </svg>
                                              <span className="sr-only">
                                                Close modal
                                              </span>
                                            </button>
                                          </div>
                                          <dl className="mb-4 sm:mb-5">
                                            <dt className="sr-only">Date</dt>
                                            <dd className="flex items-center mb-2 font-light text-gray-500 dark:text-gray-400">
                                              <svg
                                                className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                  clip-rule="evenodd"
                                                ></path>
                                              </svg>
                                              <span className="font-medium text-gray-900 dark:text-white">
                                                {showJob.timePosted}
                                              </span>
                                            </dd>

                                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                                              Details
                                            </dt>
                                            <dd className="font-light break-all text-gray-500 dark:text-gray-400">
                                              {showJob.detail}
                                            </dd>
                                          </dl>
                                          <div className="flex items-center space-x-4">
                                            <a
                                              href={showJob.link}
                                              target="_blank"
                                            >
                                              <button
                                                type="button"
                                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                              >
                                                Apply
                                              </button>
                                            </a>

                                            <button
                                              type="button"
                                              className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                              data-modal-toggle="readEventModal"
                                            >
                                              Close
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav
                    className="flex items-end justify-end p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                    aria-label="Table navigation"
                  >
                    <ul className="inline-flex items-stretch -space-x-px">
                      <li>
                        <button
                          onClick={handleOnPrev}
                          disabled={
                            resp && resp[1][0]?.pageNumber !== "Previous"
                          }
                          className="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleOnNext}
                          className="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
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
