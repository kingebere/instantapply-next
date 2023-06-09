import { FormEvent, useEffect, useState } from "react";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

// Hooks
import useAuth from "@/hooks/useAuth";

import { insertToProfile } from "@/supabase";

//Packages
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

interface FormDataInterface {
  resume_email: string;
  firstname: string;
  lastname: string;
  resume_url: string;
  filename: string;
  phone: string;
  github: string;
  linkedin: string;
  gender: string;
  youlatino: string;
  disabilitystatus: string;
  veteranstatus: string;
  currentCompany: string;
}

export default function Onboarding() {
  const user = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataInterface>({
    resume_email: "",
    firstname: "",
    lastname: "",
    resume_url: "",
    filename: "",
    phone: "",
    github: "",
    linkedin: "",
    gender: "",
    youlatino: "",
    disabilitystatus: "",
    veteranstatus: "",
    currentCompany: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [active, setActive] = useState<number>(1);
  const areAllValuesFilled = (obj: Record<string, any>) => {
    // Iterate over each key in the object
    for (const key in obj) {
      // Check if the key belongs to the object (not inherited from prototype)
      if (obj.hasOwnProperty(key)) {
        // Check if the value is undefined, null, or an empty string , added extra checkers because anything can happen :)
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
          // If any value is empty, return true
          return true;
        }
      }
    }
    // If all values are filled, return false
    return false;
  };

  const inputFields = [
    {
      label: "Your email",
      type: "email",
      name: "resume_email",
      id: "email",
      value: formData.resume_email,
      onChange: updateName,
      placeholder: "name@company.com",
      required: true,
      step: 1,
    },
    {
      label: "First Name",
      type: "text",
      name: "firstname",
      id: "firstname",
      value: formData.firstname,
      onChange: updateName,
      placeholder: "Dave King",
      required: true,
      step: 1,
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastname",
      id: "lastname",
      value: formData.lastname,
      onChange: updateName,
      placeholder: "Dave King",
      required: true,
      step: 1,
    },
    {
      label: "Github Url",
      type: "text",
      name: "github",
      id: "github",
      value: formData.github,
      onChange: updateName,
      placeholder: "https://github.com/username",
      required: true,
      step: 3,
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phone",
      id: "phone",
      value: formData.phone,
      onChange: updateName,
      placeholder: "+254909887455",
      required: true,
      step: 2,
    },
    {
      label: "Linkedin Url",
      type: "text",
      name: "linkedin",
      id: "linkedin",
      value: formData.linkedin,
      onChange: updateName,
      placeholder: "https://linkedin/in/username",
      required: true,
      step: 2,
    },
    {
      label: "Current Company",
      type: "text",
      name: "currentCompany",
      id: "currentCompany",
      value: formData.currentCompany,
      onChange: updateName,
      placeholder: "Alphabet",
      required: true,
      step: 2,
    },
  ];

  const selectFields = [
    {
      label: "Are you Latino?",
      name: "youlatino",
      id: "youlatino",
      onChange: updateName,
      value: formData.youlatino,
      options: [
        { value: "", label: "Are you Latino?", disabled: true },
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        {
          value: "Decline To Self Identify",
          label: "Decline To Self Identify",
        },
      ],
      step: 1,
    },
    {
      label: "Gender",
      name: "gender",
      id: "gender",
      onChange: updateName,
      value: formData.gender,
      options: [
        { value: "", label: "Gender", disabled: true },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        {
          value: "Decline To Self Identify",
          label: "Decline To Self Identify",
        },
      ],
      step: 2,
    },

    {
      label: "Disability Status?",
      name: "disabilitystatus",
      id: "disabilitystatus",
      onChange: updateName,
      value: formData.disabilitystatus,
      options: [
        { value: "", label: "Disability Status?", disabled: true },
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        {
          value: "Decline To Self Identify",
          label: "Decline To Self Identify",
        },
      ],
      step: 3,
    },

    {
      label: "Veteran Status?",
      name: "veteranstatus",
      id: "veteranstatus",
      onChange: updateName,
      value: formData.veteranstatus,
      options: [
        { value: "", label: "Veteran Status?", disabled: true },
        {
          value: "I am not a protected veteran",
          label: "I am not a protected veteran",
        },
        {
          value:
            "I identity as one or more of the classifications of a protected veteran",
          label:
            "I identity as one or more of the classifications of a protected veteran",
        },
        {
          value: "I don&lsquo;t wish to answer",
          label: "I don&lsquo;t wish to answer",
        },
      ],
      step: 3,
    },
  ];

  useEffect(() => {
    setIsButtonDisabled(areAllValuesFilled(formData));
  }, [formData]);

  const firstStepNumber = 1;
  const finalStepNumber = 3;
  //function for the previous state
  function prevPage(firstStepNumber: number) {
    setActive((prev) => {
      let prevPage = prev - firstStepNumber;
      if (prevPage < firstStepNumber || prevPage === firstStepNumber) {
        prevPage = firstStepNumber;
      }
      return prevPage;
    });
  }
  //function for the next state

  function nextPage(finalStepNumber: number) {
    setActive((next) => {
      let nextPage = next + 1;
      if (nextPage > finalStepNumber || nextPage === finalStepNumber) {
        nextPage = finalStepNumber;
      }
      return nextPage;
    });
  }
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Extract the name of the input field and the selected file
    const fieldName = event.target.name;
    const file = event.target.files?.[0];
  
    if (!file) {
      return; // No file selected, exit the function
    }
  
    // Encode the file name and type using encodeURIComponent to ensure safe URL parameter values
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
  
    // Function to convert Blob to base64
    function toBase64(file: Blob) {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result as string); // Resolve with the base64 data
        };
        reader.onerror = reject;
      });
    }
  
    try {
      // Convert the file to base64
      const pdfBlob = await toBase64(file);
  
      // Send a POST request to the server to upload the PDF file
      const response = await fetch(
        `/api/upload-pdf?file=${filename}&fileType=${fileType}`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ pdfBlob }), // Send the base64-encoded PDF data in the request body
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error uploading PDF file"); // Throw an error for non-OK responses
      }
  
      // Parse the response data as JSON
      const res = await response.json();
  
      setFormData((prev) => ({
        // Retain the existing values
        ...prev,
        // Update the current field
        filename: res.filename,
        [fieldName]: res.url,
      }));
    } catch (error) {
      // Handle the error from the backend
      console.error(error);
    }
  }
  

  //add input values to the formdata state
  function updateName(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const fieldName = event.target.name;
    setFormData((prev) => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: event.target.value,
    }));
  }

  //submit formdata
  async function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await insertToProfile(formData, user);
    if(data && data.length !== 0 ){
      router.push("/dashboard");
    }
    
  }

  return (
    <>
      <section className="bg-white dark:bg-white mt-4">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-instant-600 font-silka dark:text-white"
          >
            <img
              src="/assets/images/instantapply-logo.svg"
              className="mr-1 h-6 sm:h-9"
              alt="InstantApply Logo"
            />
            InstantApply
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Profile
              </h1>

              {/* Next page indicator */}
              <div className={`dot ${active === 1 && "active"}`}></div>
              <div className={`dot ${active === 2 && "active"}`}></div>
              <div className={`dot ${active === 3 && "active"}`}></div>

              <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
                {/* This maps the input tag */}
                {inputFields
                  .filter((items) => items.step === active)
                  .map((field, index) => (
                    <div key={index}>
                      <label
                        htmlFor={field.id}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.id}
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    </div>
                  ))}
                {/* This maps the select tag */}

                {selectFields
                  .filter((items) => items.step === active)
                  .map((field, index) => (
                    <div key={index}>
                      <label
                        htmlFor={field.id}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {field.label}
                      </label>
                      <select
                        name={field.name}
                        id={field.id}
                        onChange={field.onChange}
                        value={field.value}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {/* This is to prevent this option from being clickable */}

                        {field.options[0].value === "" && (
                          <option value="" disabled>
                            {field.options[0].label}
                          </option>
                        )}

                        {/* This filters out the option with the empty value and displays the remaining options */}

                        {field.options
                          .filter((values) => values.value !== "")
                          .map((option, index) => (
                            <option
                              key={index}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}

                {/* Since we want the resume to be the last thing a user fills , we
                dont add it to the array */}
                {active === finalStepNumber && (
                  <>
                    <div>
                      <label
                        htmlFor="file"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Input CV
                      </label>
                      <input
                        onChange={handleChange}
                        accept="image/*,.pdf"
                        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="default_size"
                        name="resume_url"
                        type="file"
                      />
                    </div>
                  </>
                )}

                {active !== firstStepNumber ? (
                  <button onClick={() => prevPage(firstStepNumber)}>
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                {active !== finalStepNumber && (
                  <>
                    <button
                      className="active"
                      onClick={() => nextPage(finalStepNumber)}
                    >
                      Next
                    </button>
                  </>
                )}

                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                {active === finalStepNumber && (
                  <>
                    <button
                      type="submit"
                      disabled={isButtonDisabled}
                      className={`w-full text-white   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                        isButtonDisabled
                          ? `bg-gray-300`
                          : `bg-primary-600 hover:bg-primary-700`
                      }`}
                    >
                      Create a profile
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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
};
