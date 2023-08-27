import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormControl, Checkbox, FormGroup } from "@mui/material";
import { FormLabel } from "react-bootstrap";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

const Extension = () => {
  const location = useLocation();
  const { _id, name, preferStatus } = location.state || {};
  const navigate = useNavigate();

  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [authKey, setAuthKey] = useState(null);

  const handleCheckboxChange = (event) => {
    console.log(_id);
    setPrivacyAgreed(!privacyAgreed);
    if (!privacyAgreed) {
      axios
        .post("https://vitalizemind-nodeapi.onrender.com/user/getAuthKey", { _id: _id })
        .then((response) => {
          const data = response.data.authKey;
          console.log("response: ", data);
          setAuthKey(data);
        })
        .catch((error) => {
          console.error("Axios Error:", error);
        });
    } else {
      setAuthKey(null);
    }
  };

  const onAgreeLinks = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItem>
          <ListItemButton
            onClick={() =>
              (window.location.href =
                "https://github.com/goblin45/Mental_App_Dev_Static/releases/download/v1.0.0/Extension.zip")
            }
          >
            <a className="link_ex">Download Extension</a>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <h6>
            ID: <u>{authKey}</u>
          </h6>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      style={{
        backgroundColor: "rgb(166 224 171 / 47%)",
        height: "100vh",
        width: "100%",
        overflow: "auto",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#ffff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "#256e53", fontWeight: "600" }}
          >
            Privacy Policy
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "flex-end",
              marginRight: "auto",
            }}
          >
            <Button
              onClick={() =>
                navigate("/dashboard", {
                  state: { _id: _id, name: name, preferStatus: preferStatus },
                })
              }
            >
              <Typography
                className="extension_button"
                style={{ color: "#33916e", fontWeight: 400 }}
              >
                Go to Dashboard
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-lg-10">
            <div
              className="policy_container"
              style={{
                backgroundColor: "#ffff",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "10px 10px 10px #65835d85",
                width: "100%",
              }}
            >
              <div className="policy_head">
                <h2>Privacy Policy</h2>
                <h5>Last Updated August 15, 2023</h5>
              </div>

              <div className="policy_content">
                <p>
                  Welcome to Vitalize Mind ("we," "us," or "our"). We are
                  committed to respecting your privacy and protecting your
                  personal information. This Privacy Policy explains how we
                  collect, use, and safeguard your personal data when you visit
                  our website and use our services.
                </p>

                <h5>Informations We Collect</h5>
                <p>
                  <ul>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Password</li>
                  </ul>
                </p>
                <h5>How We Use Your Informations</h5>
                <p>
                  <ul>
                    <li>
                      We are checking the browser search history to get an idea
                      about the state of mind of the user
                    </li>
                    <li>Analyze website usage and trends</li>
                    <li>
                      Respond to your inquiries and provide customer support
                    </li>
                    <li>
                      This information is solely for the betterment of user
                      experience , <b>no third party app is involved here</b>.
                    </li>
                  </ul>
                </p>
                <h5>How to install our extension</h5>
                <p>
                  <ul>
                    <li>
                      On checking the checkbox below you will get the download
                      link of our extension and your unique auth key.
                    </li>
                    <li>
                      Click on the extension download link. This will download
                      the zip folder containing the extension.
                    </li>
                    <li>
                      Go to downloads, right click on the zipped folder and
                      select extract all.
                    </li>
                    <li>Click on 'Extract' and select the extracted folder.</li>
                    <li>
                      Enter the folder and select the one and only folder
                      available.
                    </li>
                    <li>
                      Open chrome's extension manager or type
                      <i>
                        {" "}
                        <u>chrome://extensions</u>
                      </i>{" "}
                      and turn on the developer mode.
                    </li>
                    <li>
                      Drag the selected folder where you have extracted the
                      extension and drop it on the extension manager page.
                    </li>
                  </ul>
                </p>
                <h5>How to use</h5>
                <p>
                  <ul>
                    <li>
                      After getting the extension you can see the icon at the
                      right corner of your browser
                    </li>
                    <li>
                      There you have to paste the auth Key which you got on
                      agreeing the policy.
                    </li>
                    <li>Click submit and you are ready to go !!</li>
                  </ul>
                </p>

                <h5>Your Choices</h5>
                <p>
                  You have the right to access, correct, update, or delete your
                  personal information. You may also withdraw your consent for
                  us to collect and process your data, subject to legal
                  obligations.
                </p>

                <h5>Contact Us</h5>
                <p>
                  If you have any questions about our Privacy Policy or your
                  personal data, please contact us at [
                  <a href="#" className="email_policy">
                    vitalize.mind.team@gmail.com
                  </a>
                  ].
                </p>
              </div>
              <div className="agree_box">
                <FormGroup>
                  <FormControl>
                    <label>
                      <Checkbox
                        checked={privacyAgreed}
                        name="privacy_agree"
                        onChange={handleCheckboxChange}
                      />
                      <FormLabel>
                        <h5>
                          I have understood and agreed to the Vitalize Mind's{" "}
                          <b>Terms of Service</b> and<b> Privacy Policy</b>
                        </h5>
                      </FormLabel>
                    </label>
                  </FormControl>
                  {privacyAgreed === true ? <div>{onAgreeLinks}</div> : <div />}
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Extension;
