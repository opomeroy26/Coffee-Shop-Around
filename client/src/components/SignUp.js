import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogIn from './LogIn';
import { useHistory } from 'react-router-dom';

function Copyright() {
    return (
        <div id="created">
        <a href= "https://github.com/opomeroy26" target="_blank" rel="noreferrer"><GitHubIcon/> Olivia Pomeroy </a>
        </div>
      );
}

const theme = createTheme();

export default function SignUp( {setUser}) {
    const [showLogin, setShowLogin] = useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    function handleSubmit(event){
        event.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password})
        }).then((r) => {
            if (r.ok) {
                r.json().then((user)=> setUser(user));
                history.push("/")
                // window.location.reload(true);
            } else {
                r.json().then(err => window.alert(err.errors))
            }
        })
    }; 


  return (
      <div>
          {showLogin ? (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value = {username}
                  onChange = {(e) => setUsername(e.target.value)}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => setShowLogin(false)}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  ) : (
      <LogIn />
  )}
  </div>
  );
}