import HomeHeader from "./HomeHeader";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Divider, Box } from "@mui/material";
import Radio5 from "../component/Test5";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import GppMaybeTwoToneIcon from '@mui/icons-material/GppMaybeTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { useDispatch,useSelector } from "react-redux";
import Profit from "../component/Test6";


export default function Portfolio() {
  const ariaLabel = { "aria-label": "description" };
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [profit, setprofit] = useState(0);
  const [riskPreference, setRiskPreference] = useState(0);
  const [open, setOpen] = useState(true);
  const [importance, setImportance] = useState(null);

  const username=useSelector(state => state.username);
  const dispatch = useDispatch();
  const handledispatch = () => {
    dispatch({ type:'UPDATE_amount',payload:investmentAmount});
    dispatch({ type:'UPDATE_risk',payload:riskPreference});
    dispatch({ type:'UPDATE_profit',payload:profit});
    dispatch({ type:'UPDATE_importance',payload:importance});
  }
  const handleprofit=(value)=>{
    setprofit(value);
  }

  const handleImportanceChange = (value) => {
    setImportance(value);
    setOpen(false);
  };
 
  // 투자금액 입력값 변경 핸들러
  const handleInvestmentAmountChange = (event) => {
    setInvestmentAmount(event.target.value);
  };
  // 위험선호도 값 변경 핸들러
  const handleRiskPreferenceChange = (value) => {
    setRiskPreference(value);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      height: "200px",
      width: "500px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // 두 개의 동일한 크기의 열로 구성
      alignItems: "center", // 수직 정렬
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <GppMaybeTwoToneIcon style={{ fontSize: 100, marginBottom: "10px", color: "red" }} />
      <Button
        variant={importance === "0" ? "contained" : "outlined"}
        onClick={() => handleImportanceChange("0")}
        sx={{ margin: "10px", width: "200px", height: "60px", fontSize: "20px" }}
      >
        위험도 중시
      </Button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <MonetizationOnTwoToneIcon
        style={{
          fontSize: 100,
          marginBottom: "10px",
          color: "rgba(218, 165, 32, 1)",
        }}
      />
      <Button
        variant={importance === "1" ? "contained" : "outlined"}
        onClick={() => handleImportanceChange("1")}
        sx={{ margin: "10px", width: "200px", height: "60px", fontSize: "20px" }}
      >
        수익률 중시
      </Button>
    </div>
  </div>
</Modal>

      <HomeHeader  />
      <div
        style={{
          fontSize: 30,
          position: "absolute",
          top: "20%",
          alignItems: "center",
          display: "flex",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <AssessmentIcon
            sx={{
              fontSize: 30,
              marginLeft: 17,
              marginTop: 3,
            }}
          />

          <li
            style={{
              display: "inline",
              listStyle: "none",
              paddingLeft: "1px",
              color: "black",
            }}
          >
            포트폴리오 진단
          </li>
          <Divider
            sx={{
              backgroundColor: "red",
              height: "100%",
              marginTop: "8px",
              width: "1200px",
              marginLeft: "140px",
              borderWidth: "2px", // 굵기를 2px로 설정
              borderStyle: "solid",
            }}
          />
        </ul>
      </div>
      <div
        style={{
          fontSize: 20,
          position: "absolute",
          top: "32%",
          alignItems: "center",
          display: "flex",
          marginLeft: 150,
        }}
      >
        1.투자금액:
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 5 },
          marginTop: 25,
          marginLeft: 28,
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          placeholder="금액을 입력하세요."
          onChange={handleInvestmentAmountChange}
          inputProps={ariaLabel}
        />
      </Box>
      <div style={{marginLeft:150,fontSize: 20}}>
      2.기대 수익률
      </div>
      <div style={{marginTop:115}}>
      <Profit onChange={handleprofit}/>
      </div>
      <div style={{marginLeft:150,fontSize: 20,marginTop:50}}>
      3.위험 선호도
      </div>
      <div
        style={{
          fontSize: 30,
          position: "absolute",
          top: "70%",
          alignItems: "center",
          display: "flex",
          marginLeft: 150,
        }}
      >
        <Radio5 onChange={handleRiskPreferenceChange} />
      </div>
      <div
        style={{
          fontSize: 30,
          position: "absolute",
          top: "100%",
          alignItems: "center",
          display: "flex",
          marginLeft: 670,
        }}
      >
        <Link to="/Result">
          <Button sx={{ fontSize: 30,marginTop:30,marginLeft:-5 }} variant="contained" onClick={handledispatch}>
            결과보기
          </Button>
        </Link>
      </div>
      <br/><br/>
    </div>
  );
}
