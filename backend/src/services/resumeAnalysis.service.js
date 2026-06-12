import axios from "axios";

export const analyzeResume =
async (resumeText) => {

  try {

    const prompt = `
Analyze this resume.

Extract:

1. Most suitable role
2. Technical skills

Return ONLY valid JSON:

{
  "role": "",
  "skills": []
}

Resume:

${resumeText}
`;

    const response =
      await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model:
           "nex-agi/nex-n2-pro:free",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization:
              `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type":
              "application/json",
          },
        }
      );

    return JSON.parse(
      response.data.choices[0]
        .message.content
    );

  } catch (error) {

    console.error(error);

    return {
      role: "",
      skills: [],
    };

  }
};