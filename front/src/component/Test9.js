import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch,useSelector } from "react-redux";
export default function Radio9() {
  const dispatch=useDispatch();
  const handleChange = (event) => {
    const value = event.target.value;
    dispatch({
      type: "UPDATE_sum9",
      payload: value,
    });
  };
  return (
    <div
      style={{
        background: "#f5f5f5",
        paddingLeft:"20px", 
        borderRadius: "4px",
        marginTop: -40,
        backgroundSize: "200% auto",
        flexDirection: "column",
      }}
    >
      <FormControl  >
        <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="column-radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="20% 이내"
          />

          <FormControlLabel
            value="2"
            control={<Radio />}
            label="40% 이내"
          />

          <FormControlLabel
            value="3"
            control={<Radio />}
            label="60% 이내"
          />
           <FormControlLabel
            value="4"
            control={<Radio />}
            label="80%이내"
          />
           <FormControlLabel
            value="5"
            control={<Radio />}
            label="100% 이상
            "
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
