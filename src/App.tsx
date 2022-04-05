import React, { useState } from 'react';
import './App.scss';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function calculateTime(numOfRollsDeveloped: number, baseTime: number = 3.5, factor: number = 0.02): number {
  const newTime = baseTime * (1 + factor * numOfRollsDeveloped);
  return Math.round(newTime * 100) / 100
}

function minToString(minutes: number): string {
  const min = Math.floor(Math.abs(minutes));
  const sec = Math.floor((Math.abs(minutes) * 60) % 60);
  return `${min}:${sec}`;
}

const devTypes: string[] = ['base', 'push1', 'push2', 'push3', 'pull1'];
const devTimes: number[] = [3.5, 4.55, 6.13, 8.75, 2.75];
const devTypeNames: string[] = ['Develop Normally', 'Push +1', 'Push +2', 'Push +3', 'Pull -1'];

function App() {

  const [numOfRollsDeveloped, setNumOfRollsDeveloped] = React.useState(0);
  const [baseTimeSetting, setBaseTimeSetting] = React.useState("base");

  function showTiming() {
    // const a: number = devTimesObj[baseTimeSetting]

    const devIndex: number = devTypes.indexOf(baseTimeSetting);
    const baseTime: number = devTimes[devIndex];
    console.log(devIndex)
    const devTime: number = calculateTime(numOfRollsDeveloped, baseTime);
    return minToString(devTime);
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              C-41 Color Development Timing
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              - With the CineStill CS41 Color Simplified 2-Bath Kit -
            </Typography>
            <Box sx={{ mt: 2 }}>
              I want to <br />
              <NativeSelect
                defaultValue={'base'}
                onChange={e => setBaseTimeSetting(e.target.value as any)}
              >
                {devTypes.map((e, i) => <option key={e} value={e}>{devTypeNames[i]}</option>)}
              </NativeSelect>
              <br />
              and I have already developed <br />
              <TextField variant="standard" value={numOfRollsDeveloped} type="number" onChange={e => setNumOfRollsDeveloped(parseInt(e.target.value))} /><br />
              rolls with this batch of Chemistry so far. <br />

              <p>
                The recommended development time is <br />
                <Typography component="h1" variant="h4">
                  {showTiming()} minutes <br />
                </Typography>
                at 39°C (102°F).
              </p>
            </Box>

          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App;
