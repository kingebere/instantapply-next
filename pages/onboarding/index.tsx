import useAuth from "@/hooks/useAuth"
import { insertToProfile } from "@/supabase"
import { useState } from "react"

export default function Onboarding() {
  const user = useAuth()
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
  }
  console.log(formData)
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Are you Latino?
                  </label>
                  <input
                    type="text"
                    name="youlatino"
                    id="youlatino"
                    value={formData.youlatino}
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
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
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
                    Veteran Status
                  </label>
                  <input
                    type="text"
                    name="veteranstatus"
                    id="veteranstatus"
                    value={formData.veteranstatus}
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
                    Disability Status
                  </label>
                  <input
                    type="text"
                    name="disabilitystatus"
                    id="disabilitystatus"
                    value={formData.disabilitystatus}
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
                <div className="flex items-start">
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
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
