// 1. Place this line right above your main component function
const totalQuestions = QUESTION_BANK.length;

function NtaMockTest() {
  // 2. Update your state variables to look exactly like this:
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [status, setStatus] = React.useState(() => {
    const initialStatus = {};
    for (let i = 1; i <= totalQuestions; i++) {
      initialStatus[i] = "Not Visited";
    }
    // Set the very first question as visited
    initialStatus[1] = "Not Answered";
    return initialStatus;
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // ... rest of your component rendering code continues below
