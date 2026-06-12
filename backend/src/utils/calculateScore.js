const calculateScore = (
  answer,
  expectedKeywords
) => {
  if (
    !answer ||
    expectedKeywords.length === 0
  ) {
    return 0;
  }

  const lowerAnswer =
    answer.toLowerCase();

  let matchedKeywords = 0;

  expectedKeywords.forEach(
    (keyword) => {
      if (
        lowerAnswer.includes(
          keyword.toLowerCase()
        )
      ) {
        matchedKeywords++;
      }
    }
  );

  const percentage =
    (matchedKeywords /
      expectedKeywords.length) *
    100;

  const score =
    Number(
      (percentage / 10).toFixed(1)
    );

  return score;
};

export default calculateScore;