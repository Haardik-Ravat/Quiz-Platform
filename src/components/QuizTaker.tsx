import React, { useState, useEffect } from 'react';
import { Quiz } from '../App';
import {
  Card, CardContent, Typography, Button, RadioGroup, FormControl, FormControlLabel, Radio, Grid, Box, ThemeProvider, createTheme
} from '@mui/material';
import { styled } from '@mui/system';

type QuizTakerProps = {
  quiz: Quiz;
  setUserAnswers: (answers: string[]) => void;
  setIsQuizComplete: (complete: boolean) => void;
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

const QuizContainer = styled('div')({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
});

const TimerBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#424242', 
  borderRadius: theme.shape.borderRadius, 
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#ffffff', 
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, 
  backgroundColor: '#1e1e1e', 
}));

const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, setUserAnswers, setIsQuizComplete }) => {
  const [answers, setAnswers] = useState<string[]>(Array(quiz.questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(60); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
// adding new answer to answers array
  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setUserAnswers(answers);
    setIsQuizComplete(true);
  };
//timer update
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  return (
    <ThemeProvider theme={darkTheme}>
      <QuizContainer>
        <Typography variant="h4" gutterBottom align="center" color="textPrimary">
          {quiz.title}
        </Typography>

        <TimerBox>
          <Typography variant="h6">Time Left: {timeLeft} seconds</Typography>
        </TimerBox>
{/* mapping the questions and options for cards for display */}
        <Grid container spacing={3}>
          {quiz.questions.map((q, index) => (
            <Grid item xs={12} key={index}>
              <StyledCard raised>
                <CardContent>
      
                  <Typography variant="h6" gutterBottom align="left" color="textPrimary">
                    {q.question}
                  </Typography>

              
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      name={`question-${index}`}
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      style={{ textAlign: 'left' }} 
                    >
                      <Grid container direction="column" alignItems="flex-start">
                        {q.choices.map((choice, cIndex) => (
                          <Grid item xs={12} key={cIndex}>
                            <FormControlLabel
                              value={choice}
                              control={<Radio color="primary" />}
                              label={choice}
                              sx={{ color: '#ffffff', ml: 0 }} 
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </Box>
      </QuizContainer>
    </ThemeProvider>
  );
};

export default QuizTaker;
