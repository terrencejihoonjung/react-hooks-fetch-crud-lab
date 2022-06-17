import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${question.id}`, {method: "DELETE"})
      .then(resp => resp.json())
      .then(() => onDeleteQuestion(question))
  }

  function handleAnswerChange(event) {
    onAnswerChange(id, parseInt(event.target.value));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
