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
import FormStepper from "@/components/FormStepper";

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
  gmailContent:string;
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
    gmailContent:"",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [active, setActive] = useState<number>(1);
  const [uploadProgress, setUploadProgress] = useState<number>(1);
  const [uploadPdfProgress, setUploadPdfProgress] = useState<number>(0);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>("");
  const [stepperTitle, setStepperTitle] = useState<string>("Add Profile");
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

  useEffect(() => {
    setIsButtonDisabled(areAllValuesFilled(formData));
  }, [formData]);

  const textAreaFields=[
    {
      label: "Your gmailContent",
   
      name: "gmailContent",
      id: "gmailContent",
      value: formData.gmailContent,
      onChange: updateName,
      placeholder: "put your content here",
      required: true,
      step: 1,
    },
  ]

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

  /**
   *
   * @param event
   * @returns
   */

  //This function passes the pdf blob to the backend , which returns the url string
  // from Cloudfare R2 .
  // It also shows a loading state . This function showed me shege :)
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadPdfProgress(2);
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

      setPdfPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
      setUploadPdfProgress(3);
    } catch (error) {
      // Handle the error from the backend
      console.error(error);
    }
  }

  //add input values to the formdata state
  function updateName(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>
  ) {
    const fieldName = event.target.name;
    setFormData((prev) => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: event.target.value,
    }));
  }
console.log(formData.gmailContent)
  //submit formdata
  async function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadProgress(2);
    const data = await insertToProfile(formData, user);
    if (data && data.length !== 0) {
      setUploadProgress(3);
      router.push("/dashboard");
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-white mt-4">
        <FormStepper
          active={active}
          title={stepperTitle}
          inputFields={inputFields}
          textAreaFields={textAreaFields}
          handleChange={handleChange}
          selectFields={selectFields}
          uploadPdfProgress={uploadPdfProgress}
          pdfPreviewUrl={pdfPreviewUrl}
          uploadProgress={uploadProgress}
          formSubmit={formSubmit}
          firstStepNumber={firstStepNumber}
          prevPage={prevPage}
          finalStepNumber={finalStepNumber}
          isButtonDisabled={isButtonDisabled}
          nextPage={nextPage}
        />
      </section>
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
