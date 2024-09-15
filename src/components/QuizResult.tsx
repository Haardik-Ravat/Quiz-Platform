import React from 'react';
import { Quiz } from '../App';
import { Card, CardContent, Typography, Button, Grid, Box, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

type QuizResultProps = {
  quiz: Quiz;
  userAnswers: string[];
  onRetakeQuiz: () => void;
  onCreateNewQuiz: () => void;
};

// darker theme thanks to MUI
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


const ResultContainer = styled('div')({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  textAlign: 'center',
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, 
  backgroundColor: '#1e1e1e', 
  color: '#ffffff', 
}));

// calculating the result and indexing the answers
const QuizResult: React.FC<QuizResultProps> = ({ quiz, userAnswers, onRetakeQuiz, onCreateNewQuiz }) => {
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === userAnswers[index]) score++;
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = quiz.questions.length;

  return (
    <ThemeProvider theme={darkTheme}>
      <ResultContainer>
        <Typography variant="h4" gutterBottom color="textPrimary">
          Quiz Results
        </Typography>

        <Typography variant="h6" color="textPrimary">
          Your score: {score}/{totalQuestions}
        </Typography>
{/* mapping the answers to cards for display */}
        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          {quiz.questions.map((q, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard raised>
                <CardContent>
          
                  <Typography variant="h6" gutterBottom align="left" color="textPrimary">
                    Question {index + 1}
                  </Typography>

 
                  <Typography variant="body1" align="left" color="textSecondary">
                    {q.question}
                  </Typography>

        
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ mt: 1, color: userAnswers[index] === q.correctAnswer ? 'green' : 'red' }}
                  >
                    Your Answer: {userAnswers[index]}
                  </Typography>

      
                  <Typography variant="body2" align="left" sx={{ mt: 1 }} color="textPrimary">
                    Correct Answer: {q.correctAnswer}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" fullWidth onClick={onRetakeQuiz}>
                Retake Quiz
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" fullWidth onClick={onCreateNewQuiz}>
                Create New Quiz
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ResultContainer>
    </ThemeProvider>
  );
};

export default QuizResult;
