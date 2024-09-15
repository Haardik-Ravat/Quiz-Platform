import React, { useState } from 'react';
import QuizCreator from './components/QuizCreator';
import QuizTaker from './components/QuizTaker';
import QuizResult from './components/QuizResult';
import './styles/styles.css';

export type Question = {
  question: string;
  choices: string[];
  correctAnswer: string;
};

export type Quiz = {
  title: string;
  questions: Question[];
};

const App: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

// retaking functions to set the previously filled variables to original state
  const handleRetakeQuiz = () => {
    setUserAnswers([]); 
    setIsQuizComplete(false); 
  };


  const handleCreateNewQuiz = () => {
    setQuiz(null);
    setUserAnswers([]); 
    setIsQuizComplete(false); 
  };

  // returning the components based on states
  return (
    <div className="App">
      <h1>BrightChamps Online Quiz Platform</h1>
      {!quiz ? (
  
        <QuizCreator setQuiz={setQuiz} />
      ) : !isQuizComplete ? (
      
        <QuizTaker 
          quiz={quiz} 
          setUserAnswers={setUserAnswers} 
          setIsQuizComplete={setIsQuizComplete} 
        />
      ) : (
      
        <QuizResult 
          quiz={quiz} 
          userAnswers={userAnswers} 
          onRetakeQuiz={handleRetakeQuiz} 
          onCreateNewQuiz={handleCreateNewQuiz} 
        />
      )}
    </div>
  );
};

export default App;
