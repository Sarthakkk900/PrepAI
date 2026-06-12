import axios from "axios";

export const generateQuestions = async (
  role,
  difficulty,
  totalQuestions
) => {
  try {
   const prompt = `
You are a professional technical interviewer.

Generate ${totalQuestions} unique interview questions.

Role: ${role}
Difficulty: ${difficulty}

Rules:

- Questions must match the role.
- Avoid repeating similar questions.
- Mix conceptual and practical questions.
- For Hard difficulty include scenario-based questions.
- For Medium difficulty include implementation questions.
- For Easy difficulty include fundamentals.
- Ask real interview-style questions used by companies.

Return ONLY valid JSON.

Example:

[
  {
    "question":"Explain the Virtual DOM in React."
  }
]
`;

    const response = await axios.post(
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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":
            "application/json",
        },
      }
    );

    const content =
      response.data.choices[0].message.content;

    return JSON.parse(content);
  } catch (error) {
    console.error(
      "AI Question Generation Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};