const questions = [
  // React
  {
    category: "React",
    difficulty: "Easy",
    question: "What is React?",
    followUps: [
      "What is JSX?",
      "What is Virtual DOM?"
    ],
    tags: ["react", "frontend"],
     expectedKeywords: [
    "react",
    "javascript",
    "library",
    "ui",
    "component",
    "virtual dom"
  ]
  },

  {
    category: "React",
    difficulty: "Easy",
    question: "What is JSX?",
    followUps: [
      "Why do we use JSX?",
      "Can React work without JSX?"
    ],
    tags: ["jsx", "react"],
    expectedKeywords: [
  "jsx",
  "javascript",
  "html",
  "react",
  "syntax"
]
  },

  {
    category: "React",
    difficulty: "Medium",
    question: "What are React Hooks?",
    followUps: [
      "What is useState?",
      "What is useEffect?"
    ],
    tags: ["hooks", "react"]
  },

  // NodeJS
  {
    category: "NodeJS",
    difficulty: "Easy",
    question: "What is Node.js?",
    followUps: [
      "What is the Event Loop?",
      "Why is Node.js fast?"
    ],
    tags: ["nodejs", "backend"],
    expectedKeywords: [
  "nodejs",
  "javascript",
  "runtime",
  "server",
  "event loop"
]
  },

  {
    category: "NodeJS",
    difficulty: "Medium",
    question: "Explain the Event Loop.",
    followUps: [
      "What is non-blocking I/O?",
      "What is a callback queue?"
    ],
    tags: ["event-loop", "nodejs"]
    
  },

  // MongoDB
  {
    category: "MongoDB",
    difficulty: "Easy",
    question: "What is MongoDB?",
    followUps: [
      "What is a document?",
      "What is a collection?"
    ],
    tags: ["mongodb", "database"]
  },

  {
    category: "MongoDB",
    difficulty: "Medium",
    question: "Difference between SQL and MongoDB?",
    followUps: [
      "When would you choose MongoDB?",
      "What are the drawbacks?"
    ],
    tags: ["mongodb", "sql"]
  },

  // JavaScript
 {
  category: "JavaScript",
  difficulty: "Easy",
  question: "Difference between var, let and const?",
  followUps: [
    "Which one is block scoped?",
    "Can const variables be modified?"
  ],
  tags: ["javascript", "variables"],
  expectedKeywords: [
    "var",
    "let",
    "const",
    "scope",
    "block"
  ]
},

{
  category: "JavaScript",
  difficulty: "Easy",
  question: "What is the difference between == and === ?",
  followUps: [
    "Which one performs type coercion?",
    "Which one is recommended?"
  ],
  tags: ["javascript", "operators"],
  expectedKeywords: [
    "equality",
    "strict",
    "type",
    "coercion"
  ]
},

{
  category: "JavaScript",
  difficulty: "Medium",
  question: "Explain the event loop in JavaScript.",
  followUps: [
    "What is the callback queue?",
    "What is the call stack?"
  ],
  tags: ["event-loop"],
  expectedKeywords: [
    "event loop",
    "call stack",
    "callback queue",
    "asynchronous"
  ]
},

{
  category: "JavaScript",
  difficulty: "Medium",
  question: "What are promises in JavaScript?",
  followUps: [
    "What are promise states?",
    "What is Promise.all?"
  ],
  tags: ["promises"],
  expectedKeywords: [
    "promise",
    "pending",
    "fulfilled",
    "rejected",
    "asynchronous"
  ]
},

{
  category: "JavaScript",
  difficulty: "Hard",
  question: "What is currying in JavaScript?",
  followUps: [
    "Why is currying useful?",
    "Give a practical example."
  ],
  tags: ["currying"],
  expectedKeywords: [
    "function",
    "argument",
    "closure",
    "partial application"
  ]
}
];

export default questions;