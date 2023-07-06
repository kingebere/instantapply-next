import useAuth from "@/hooks/useAuth";
import { Jobs, useUserJobs } from "@/hooks/useUserJobs";
import { formatDate } from "@/utils/formatDate";
import { useState, useEffect } from "react";
import { getUserJobsCount } from "@/supabase";
const JobsTable = () => {
  const user = useAuth();
  const jobs = useUserJobs(user);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function jobCount() {
      const data = await getUserJobsCount(user);
      if (data) {
        setCount(data);
      }
    }
    jobCount();
  }, [user]);
  return (
    <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800 mt-4">
      {/* Card Title */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {count} Job{count > 1 ? `s` : ``}
          </h3>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            List of Jobs Applied For
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
              {jobs.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        Job Title
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
                        Time Commitment
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        Date Applied
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
                    {jobs.slice(0, 10)?.map((job: Jobs, i) => (
                      <tr key={i}>
                        <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          <span className="font-semibold">{job.position}</span>
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {job.companyApplied}
                        </td>
                        <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                          {job.commitment || "Full time"}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {formatDate(job.created_at)}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`${
                              job.status === "APPLIED" && "bg-green-100"
                            } dark:bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center">
                  <h3 className="font-bold text-gray-500 text-lg">
                    You haven&apos;t Applied For any Jobs at this Time{" "}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Card Footer  */}
      <div className="flex justify-between items-center pt-3 sm:pt-6">
        <div>
          <button
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            type="button"
          >
            {jobs.length > 2 && (
              <>
                {" "}
                Load More Jobs{" "}
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
              </>
            )}
          </button>
        </div>
        <div className="flex-shrink-0">
          {jobs.length > 0 && (
            <a
              href="#"
              className="inline-flex underline items-center p-2 text-lg font-medium rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
            >
              View All Jobs
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
