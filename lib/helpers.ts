import axios from "axios";
import pdf from "pdf-parse";

//function for asking chat GPT questions
export async function askQuestion(question: string) {
	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo",
				messages: [
					{ role: "system", content: "You are" },
					{ role: "user", content: question },
				],
			},
			{
				headers: {
					Authorization: `Bearer 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`,
					"Content-Type": "application/json",
				},
			}
		);

		const { choices } = response.data;
		if (choices && choices.length > 0) {
			const answer = choices[0].message.content;
			return answer;
		}

		return null;
	} catch (error: any) {
		console.log("error happened at askQuestion", error);
		throw new Error(error.message);
	}
}

//fucntion for parsing resume of user by url
export const parsePDFBYURL = async (resume_url: string) => {
	try {
		// Fetch the PDF file from the provided URL
		const response = await axios.get(resume_url, {
			responseType: "arraybuffer",
		});

		// Parse the PDF data
		const data = await pdf(response.data);

		// Get the extracted text
		const text = data.text;

		// Return the extracted text as the API response
		return text;
	} catch (error: any) {
		console.log("error happened at parsePDFBYURL", error);

		throw new Error(error.message);
	}
};

//function for getting tailored responses from chatGPT based on job and resume of user

//gets the response for the question
export async function getChatGPTResponse(
	jobDescription: string,
	pdfText: string
) {
	const parsedDescription: JobDescritption = JSON.parse(jobDescription);

	try {
		const question = ` I need a cover letter for a job called ${parsedDescription.jobTitle} with the following requirements ${parsedDescription.jobRequirements} using my resume ${pdfText}`;
		const chatGPTresponse = await askQuestion(question);
		return chatGPTresponse;
	} catch (error: any) {
		console.log("error happened at getChatGPTResponse", error);
		throw new Error(error.message);
		
	}
}
