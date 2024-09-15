import React, { useState } from 'react';
import { Quiz } from '../App';
import { Card, CardContent, Typography, TextField, Button, Grid, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

type QuizCreatorProps = {
  setQuiz: (quiz: Quiz) => void;
};


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6', 
    },
    background: {
      default: '#000000',
      paper: '#121212', 
    },
    text: {
      primary: '#e0e0e0', 
    },
  },
  shape: {
    borderRadius: 24,
  },
});

const GradientCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  maxWidth: 700, 
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius, 
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: 670, 
  backgroundColor: '#424242',
  borderRadius: theme.shape.borderRadius,
  input: {
    color: '#ffffff', 
  },
}));

// handler functions
const QuizCreator: React.FC<QuizCreatorProps> = ({ setQuiz }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', choices: ['', '', '', ''], correctAnswer: '' }]);

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (qIndex: number, cIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices[cIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };
// alert boxess
  const handleSubmit = () => {
    if (questions.length === 0) {
      alert('Please add at least one question.');
    } else if (title && questions.every(q => q.question && q.correctAnswer)) {
      setQuiz({ title, questions });
    } else {
      alert('Please fill all fields and correct answers.');
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Typography variant="h4" gutterBottom>
          Create Quiz
        </Typography>

        <StyledTextField
          fullWidth
          label="Quiz Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
{/* mapping the number of questions to cards for display */}
        <div>
          {questions.map((q, qIndex) => (
            <div key={qIndex}>
              <GradientCard raised sx={{ padding: 2 }}>
                <CardContent sx={{ padding: 2 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Question {qIndex + 1}</Typography>
                    <IconButton color="error" onClick={() => handleDeleteQuestion(qIndex)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  <StyledTextField
                    fullWidth
                    label="Enter Question"
                    variant="outlined"
                    margin="normal"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  />

                  <Grid container spacing={2}>
                    {q.choices.map((choice, cIndex) => (
                      <Grid item xs={6} key={cIndex}>
                        <StyledTextField
                          fullWidth
                          label={`Choice ${cIndex + 1}`}
                          variant="outlined"
                          value={choice}
                          onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <StyledTextField
                    fullWidth
                    label="Correct Answer"
                    variant="outlined"
                    margin="normal"
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                  />
                </CardContent>
              </GradientCard>
              &nbsp;
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={addQuestion} sx={{ marginRight: 2 }}>
            Add Question
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default QuizCreator;
