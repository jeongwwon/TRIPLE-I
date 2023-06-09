import React from "react";
import { Box, Button, Toolbar, AppBar, Divider } from "@mui/material";
import { Link } from "react-router-dom/dist";
import { useState, useEffect } from "react";
import Profile from "../component/Profile";
import { useLocation } from "react-router-dom";
import { ElevatorSharp } from "@mui/icons-material";
import Logo from "../images/Logo.png";
import { useDispatch, useSelector } from "react-redux";

export default function HomeHeader({}) {
  const [propensity, setpropensity] = useState("");
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const pk = useSelector((state) => state.pk);
  const dispatch = useDispatch();

  const fetchProfile = () => {
    const pk = localStorage.getItem("pk");
    fetch(`https://triplei.herokuapp.com/users/profile/${pk}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("프로필 불러오기 실패");
        }
      })
      .then((data) => {
        dispatch({ type: "UPDATE_username", payload: data.username });
        dispatch({ type: "UPDATE_email", payload: data.email });
        setpropensity(data.propensity);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    dispatch({ type: "UPDATE_login", payload: false });
    dispatch({ type: "UPDATE_PK", payload: null });
    localStorage.setItem("pk", null);
    localStorage.setItem("isLoggedIn", false);
  };
  
  useEffect(() => {
    const storedPk = localStorage.getItem("pk");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedPk && storedIsLoggedIn) {
      dispatch({ type: "UPDATE_login", payload: true });
      dispatch({ type: "UPDATE_PK", payload: storedPk });
      fetchProfile(storedPk);
    } else {
      dispatch({ type: "UPDATE_login", payload: false });
    }
  }, [dispatch]);
  

  return (
    <AppBar
      position="static"
      sx={{
        position: "fixed",
        top: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        left: 0,
        zIndex: 1,
        height: "100px",
        right: 0, // Set the background color to transparent
        "& a": {
          textDecoration: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <Link to="/" sx={{ textDecoration: "none", color: "black" }}>
            <img
              src={Logo}
              style={{
                width: "200px",
                height: "95px",
                marginTop: 5,
                marginLeft: "8rem",
                marginRight: "9rem",
              }}
            />
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1, // Added flexGrow to push the buttons to the right
              marginLeft: 80,
            }}
          >
            {console.log(isLoggedIn)}
            {isLoggedIn ? (
              <>
                <Profile
                  email={email}
                  onChangeState={handleLogout}
                  sx={{ zIndex: 1 }}
                />
                <Button sx={{ color: "black", fontSize: 20 }}>
                  {username}
                </Button>
              </>
            ) : (
              <>
                <Link to="/SignIn">
                  <Button sx={{ color: "black", fontSize: 20 }}>로그인</Button>
                </Link>
                <Link to="/SignUp">
                  <Button
                    sx={{ color: "black", marginLeft: "1rem", fontSize: 20 }}
                  >
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
