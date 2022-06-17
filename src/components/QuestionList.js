import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem.js";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json()) 
      .then(questions => setQuestions(questions))
  }, [])

  function deleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions);
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex: correctIndex})
    })
      .then(resp => resp.json())
      .then(updatedQuestion => {
        const updatedQuestions = questions.map(question => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          else {
            return question;
          }
        })
        setQuestions(updatedQuestions);
      })
  }

  const renderQuestions = questions.map(question => {
    return <QuestionItem key={question.id} question={question} onDeleteQuestion={deleteQuestion} onAnswerChange={handleAnswerChange} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;
