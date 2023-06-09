import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/Logo.png"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      username: data.get("username"),
      password: data.get('password'), 
      password2: data.get('password'),
      email: data.get('email'),
    };

    fetch('https://triplei.herokuapp.com/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse response body as JSON
        } else {
          throw new Error("회원 가입에 실패했습니다");
        }
      })
      .then(data => {
        setOpen(true);
      })
      .catch(error => {
        // 오류 처리
        console.error('Error:', error);
      });
  };
  const handleClose = () => {
    setOpen(false); // 모달 창을 닫기 위해 상태 변수를 false로 설정
    navigate("/"); // 확인을 누르면 메인화면으로 이동
  };

  return (
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
          <Link to="/">
            <Button>
            <img src={Logo} />
          </Button>
          </Link>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                label="닉네임"
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="비밀번호 확인"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="개인정보 수집 및 이용에 동의합니다."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,fontSize:20 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/SignIn" >
                  이미 아이디가 있으신가요? 로그인 하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog
          open={open} // 모달 창의 열림/닫힘 상태를 설정
          onClose={handleClose} // 모달 창을 닫을 때 호출되는 함수
        >
          <DialogTitle>회원가입 성공</DialogTitle>
          <DialogContent>
            <DialogContentText>
              회원가입이 성공적으로 완료되었습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        Triple I
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();