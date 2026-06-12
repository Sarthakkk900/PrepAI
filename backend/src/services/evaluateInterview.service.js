import axios from "axios";

export const evaluateInterview =
async (
  responses,
  role,
  difficulty
) => {
  try {

    const prompt = `
Role: ${role}

Difficulty: ${difficulty}

Evaluate each answer separately

Scoring Rules:
- Score MUST be between 0 and 10.
- 0 = completely incorrect
- 5 = average answer
- 10 = excellent answer

Responses:

${JSON.stringify(responses)}

Return ONLY valid JSON:

[
 {
   "score": 0,
   "feedback": "",
   "strengths": [],
   "weaknesses": [],
   "idealAnswer": ""
 }
]
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

   const content =
  response.data.choices[0]
    .message.content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

try {
  return JSON.parse(content);
} catch (err) {
  console.log(content);
  return [];
}


  } catch (error) {
    console.error(error);

    return [];
  }
};