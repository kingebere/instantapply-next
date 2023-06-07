import useAuth from "@/hooks/useAuth"
import { insertToProfile } from "@/supabase"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Onboarding() {
  const user = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
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
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const areAllValuesFilled = (obj: Record<string, any>) => {
    // Iterate over each key in the object
    for (const key in obj) {
      // Check if the key belongs to the object (not inherited from prototype)
      if (obj.hasOwnProperty(key)) {
        // Check if the value is undefined, null, or an empty string , added extra checkers because anything can happen :)
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
          // If any value is empty, return true
          return true
        }
      }
    }
    // If all values are filled, return false
    return false
  }

  useEffect(() => {
    setIsButtonDisabled(areAllValuesFilled(formData))
  }, [formData])

  async function handleChange(event: any) {
    // Extract the name of the input field and the selected file
    const fieldName = event.target.name
    const file = event.target.files[0]

    // Encode the file name and type using encodeURIComponent to ensure safe URL parameter values
    const filename = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)

    // Function to convert Blob to base64
    function toBase64(file: Blob) {
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file)
        reader.onload = function () {
          resolve(reader.result) // Resolve with the base64 data
        }
        reader.onerror = reject
      })
    }

    // Convert the file to base64
    const pdfBlob = await toBase64(file)

    // Send a POST request to the server to upload the PDF file
    const data = await fetch(
      `/api/upload-pdf?file=${filename}&fileType=${fileType}`,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ pdfBlob }), // Send the base64-encoded PDF data in the request body
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    // Parse the response data as JSON
    const res = await data.json()

    setFormData((prev) => ({
      // Retain the existing values
      ...prev,
      // update the current field
      filename: res.filename,
    }))

    setFormData((prev) => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: res.url,
    }))
  }

  //add input values to the formdata state
  function updateName(e: { target: { name: any; value: any } }) {
    const fieldName = e.target.name
    setFormData((prev) => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: e.target.value,
    }))
  }

  //submit formdata
  async function formSubmit(e: any) {
    e.preventDefault()
    const data = await insertToProfile(formData, user)
    router.push("/dashboard")
  }

  console.log(formData, "p")

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="/assets/images/Instantapply-logo.png"
              alt="logo"
            />
            InstantApply
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Profile
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="resume_email"
                    id="email"
                    value={formData.resume_email}
                    onChange={updateName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Github
                  </label>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    value={formData.github}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Linkedin
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="youlatino"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Are you Latino?
                  </label>
                  <select
                    name="youlatino"
                    id="youlatino"
                    onChange={updateName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.youlatino}
                  >
                    {formData.youlatino === "" && (
                      <option value="" disabled>
                        Are you Latino?
                      </option>
                    )}
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Decline To Self Identify">
                      Decline To Self Identify
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    onChange={updateName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.gender}
                  >
                    {formData.gender === "" && (
                      <option value="" disabled>
                        Gender
                      </option>
                    )}

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Decline To Self Identify">
                      Decline To Self Identify
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Veteran Status?
                  </label>
                  <select
                    name="veteranstatus"
                    id="veteran"
                    onChange={updateName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.veteranstatus}
                  >
                    {formData.veteranstatus === "" && (
                      <option value="" disabled>
                        Veteran Status?
                      </option>
                    )}

                    <option value="I am not a protected veteran">
                      I am not a protected veteran
                    </option>
                    <option value="I identity as one or more of the classifications of a protected veteran">
                      I identity as one or more of the classifications of a
                      protected veteran
                    </option>
                    <option value="I don't wish to answer">
                      I don&lsquo;t wish to answer
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Disability Status?
                  </label>
                  <select
                    name="disabilitystatus"
                    id="disability"
                    onChange={updateName}
                    value={formData.disabilitystatus}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    {formData.disabilitystatus === "" && (
                      <option value="" disabled>
                        Disbality Status?
                      </option>
                    )}

                    <option value="Yes, I have a disability, or have a history/record of having a disablity">
                      Yes, I have a disability, or have a history/record of
                      having a disablity{" "}
                    </option>
                    <option value="No, I don't have a disablity, or a history/record of having a disablity">
                      No, I don&lsquo;t have a disablity, or a history/record of
                      having a disablity{" "}
                    </option>
                    <option value="I don't wish to answer">
                      I don&lsquo;t wish to answer
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
