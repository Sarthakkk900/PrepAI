import axios from "axios";

export const evaluateAnswer = async (
  question,
  answer,
  role,
  difficulty
) => {
  try {
    const prompt = `
You are an expert technical interviewer but be little easy on the person giving interview while giving score.

Role: ${role}
Difficulty: ${difficulty}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Score must be between 0 and 10.

Provide:

1. Overall feedback
2. 2-3 strengths
3. 2-3 weaknesses
4. An ideal answer that would score 10/10

Score must be a NUMBER BETWEEN 0 AND 10.

Examples:
Poor answer = 2
Average answer = 5
Good answer = 8
Excellent answer = 10

Return ONLY valid JSON.

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "weaknesses": [],
  "idealAnswer": ""
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nex-agi/nex-n2-pro:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

//    const content =
//   response.data.choices[0].message.content;

// console.log(
//   "AI Evaluation:",
// //   content
// );

const content =
  response.data.choices[0].message.content;

console.log(
  "AI Evaluation:",
  content
);

const result =
  JSON.parse(content);

result.score = Math.min(
  10,
  Number(result.score)
);

result.strengths =
  result.strengths || [];

result.weaknesses =
  result.weaknesses || [];

result.idealAnswer =
  result.idealAnswer || "";

return result;
  } catch (error) {
  console.error(
    "AI Evaluation Error:",
    error.response?.data ||
      error.message
  );

  return {
    score: 5,
    feedback:
      "Evaluation unavailable.",
  };
}
};