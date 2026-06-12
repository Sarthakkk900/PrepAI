const generateFeedback = (
  percentage
) => {
  if (percentage >= 90) {
    return "Excellent performance. Strong understanding of concepts.";
  }

  if (percentage >= 75) {
    return "Good performance. You have a solid understanding but can improve further.";
  }

  if (percentage >= 60) {
    return "Average performance. Revise important concepts and practice more.";
  }

  return "Needs improvement. Focus on fundamentals and interview preparation.";
};

export default generateFeedback;