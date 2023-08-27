import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AssistantIcon from "@mui/icons-material/Assistant";
import Video from "./video";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Books from "./Books";
import { useParams } from "react-router-dom";
import Music from "./music";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Preference from "./Preference";
import Chatbot from "./Chatbot";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    const { _id, name } = location.state || {};
    const urlParams = new URLSearchParams(window.location.search);

    const userId = urlParams.get("user_id");
    const userName = urlParams.get("user_name");

    if (_id && name) {
      console.log("Parameters are  in props");
      setId(_id);
      setUser(name);
      console.log(id, user);
    } else if (userId && userName) {
      console.log("Parameters are not in props");
      setId(userId);
      setUser(userName);
    }
  }, []);

  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [openAccountDropDown, setOpenAccountDropDown] = useState(false);

  const [preferStatus, setPreferStatus] = useState(202);
  const [preferences, setPreferences] = useState([]);
  const [videoSelected, setVideoSelected] = useState(false);
  const [musicSelected, setMusicSelected] = useState(false);
  const [booksSelected, setBooksSelected] = useState(true);
  const [chatBotSelected, setChatBotSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState();
  const [hoverContact, setHoverContact] = useState(false);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const accountDropDown = () => {
    setOpenAccountDropDown(!openAccountDropDown);
    console.log("Dropdown state :", openAccountDropDown);
  };

  useEffect(() => {
    console.log("id: ", id);
    console.log("status :", preferStatus);

    if (id) {
      axios
        .post("https://vitalizemind-nodeapi.onrender.com/user/preferences", { _id: id })
        .then((response) => {
          //  console.log(response.status)
          let tempStatus = response.status;
          setPreferStatus(tempStatus);
          console.log("status :", preferStatus);

          if (tempStatus === 200) {
            setPreferences(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      axios
        .post("https://vitalizemind-nodeapi.onrender.com/user/currentEmotion", { _id: id })
        .then((response) => {
          setCurrentEmotion(response.data.currentEmotion);
          console.log(currentEmotion);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleVideoClicked = () => {
    setVideoSelected(true);
    setMusicSelected(false);
    setBooksSelected(false);
    setChatBotSelected(false);
  };
  const handleMusicClicked = () => {
    setVideoSelected(false);
    setMusicSelected(true);
    setBooksSelected(false);
    setChatBotSelected(false);
  };
  const handleBooksClicked = () => {
    setVideoSelected(false);
    setMusicSelected(false);
    setBooksSelected(true);
    setChatBotSelected(false);
  };
  const handleChatBotClicked = () => {
    setChatBotSelected(true);
    setVideoSelected(false);
    setMusicSelected(false);
    setBooksSelected(false);
  };
  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleOptionClicked = (event) => {
    const selectedEmotion = event.target.value;
    setCurrentEmotion(selectedEmotion);
    console.log("Selected Option:", currentEmotion);
    axios
      .post("https://vitalizemind-nodeapi.onrender.com/user/setCurrentEmotion", {
        _id: id,
        currentEmotion: selectedEmotion,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const customComponent = () => {
    if (preferStatus === 202) {
      return (
        <div className="preference_box">
          <Preference
            _id={id}
            preferStatus={preferStatus}
            setPreferStatus={setPreferStatus}
          />
        </div>
      );
    } else {
      if (videoSelected) {
        return (
          <Video
            preferences={preferences.video}
            currentEmotion={currentEmotion}
          />
        );
      } else if (musicSelected) {
        return (
          <Music
            preferences={preferences.music}
            currentEmotion={currentEmotion}
          />
        );
      } else if (booksSelected) {
        return (
          <Books
            preferences={preferences.books}
            currentEmotion={currentEmotion}
          />
        );
      }
    }
  };

  return (
    <Box
      style={{
        backgroundColor: "rgb(166 224 171 / 47%)",
        height: "100vh",
        width: "100%",
        overflow: "auto",
        // display: "flex",
        // justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#ffff" }}
        >
          <Toolbar>
            <IconButton
              color="white"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                color: "#597c59",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ color: "#256e53", fontWeight: "600" }}
            >
              Dashboard
            </Typography>
            <List style={{ color: "#33916e", fontWeight: 400 }}>
              <ListItem>
                <ListItemButton
                  onClick={() =>
                    navigate("/dashboard", { state: { _id: id, name: user } })
                  }
                >
                  <ListItemText>Welcome {user}</ListItemText>
                </ListItemButton>
                <ListItemButton
                  onClick={() =>
                    navigate("/extension", {
                      state: {
                        _id: id,
                        name: user,
                        preferStatus: preferStatus,
                      },
                    })
                  }
                >
                  <ListItemText>Get Extension</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                marginRight: "auto",
              }}
            >
              <FormControl style={{ width: "250px" }}>
                <InputLabel id="demo-simple-select-label">
                  How are you feeling?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentEmotion}
                  onChange={handleOptionClicked}
                  label="How are you feeling"
                >
                  <MenuItem value="Happy">Happy</MenuItem>
                  <MenuItem value="Sad">Sad</MenuItem>
                  <MenuItem value="Anxious">Anxious</MenuItem>
                  <MenuItem value="Angry">Angry</MenuItem>
                  <MenuItem value="Depressed">Depressed</MenuItem>
                  <MenuItem value="Stressed">Stress</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <ListItemButton> */}
            <ListItemIcon
              style={{
                color: "#33916e",
                //color: "#b75886",
                marginLeft: "auto",
                padding: "20px",
                cursor: "pointer",
              }}
              onClick={() => accountDropDown()}
            >
              <AccountCircleIcon style={{ fontSize: "40px" }} />
            </ListItemIcon>

            {/* </ListItemButton> */}
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader style={{ height: "" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List
            style={{
              backgroundColor: "rgb(145 200 150)",
              height: "100%",
              color: "white",
            }}
          >
            {videoSelected === true ? (
              <ListItem sx={{ display: "block" }} onClick={handleVideoClicked}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    <PlayCircleFilledIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Video"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                disabled
                sx={{ display: "block" }}
                onClick={handleVideoClicked}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <PlayCircleFilledIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Video"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            {musicSelected === true ? (
              <ListItem sx={{ display: "block" }} onClick={handleMusicClicked}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    <GraphicEqIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Music"
                    color="black"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                disabled
                sx={{ display: "block" }}
                onClick={handleMusicClicked}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <GraphicEqIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Music"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            {booksSelected === true ? (
              <ListItem sx={{ display: "block" }} onClick={handleBooksClicked}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    <ImportContactsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Books"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                disabled
                sx={{ display: "block" }}
                onClick={handleBooksClicked}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <ImportContactsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Books"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )}

				{chatBotSelected === true ? (
				<ListItem
					sx={{ display: "block" }}
					onClick={handleChatBotClicked}
				>
					<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: open ? "initial" : "center",
						px: 2.5,
					}}
					>
					<ListItemIcon
						sx={{
						minWidth: 0,
						mr: open ? 3 : "auto",
						justifyContent: "center",
						color: "black",
						}}
					>
						<AssistantIcon />
					</ListItemIcon>
					<ListItemText
						primary="ChatBot"
						sx={{ opacity: open ? 1 : 0 , color:"black"}}
					/>
					</ListItemButton>
				</ListItem>
				) : (
				<ListItem
					disabled
					sx={{ display: "block" }}
					onClick={handleChatBotClicked}
				>
					<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: open ? "initial" : "center",
						px: 2.5,
					}}
					>
					<ListItemIcon
						sx={{
						minWidth: 0,
						mr: open ? 3 : "auto",
						justifyContent: "center",
						color: "white",
						}}
					>
						<AssistantIcon />
					</ListItemIcon>
					<ListItemText
						primary="ChatBot"
						sx={{ opacity: open ? 1 : 0 }}
					/>
					</ListItemButton>
				</ListItem>
				)}
			</List>
			</Drawer>

			<DrawerHeader />
			{chatBotSelected === true ? (
			<div className="chat_container">
				<Chatbot />
			
			</div>
			) : (
			<div />
			)}

        {customComponent()}
        {openAccountDropDown && (
          <div
            style={{
              backgroundColor: "white",
              marginTop: "6rem",
              marginRight: "2rem",
              width: "20rem",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              height: "50%",
              boxShadow: "5px 10px 7px #65835d85",
              marginLeft: "auto",
            }}
          >
            <List
              style={{
                color: "rgb(69 78 74 / 89%)",
              }}
            >
              {/* <Typography>{name}</Typography> */}
              <ListItem sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() =>
                      navigate("/editprofile", {
                        state: { _id: id, name: user },
                      })
                    }
                  >
                    Edit Profile
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText onClick={() => navigate("/")}>
                    Logout
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        )}
        <Box
          onMouseEnter={() => setHoverContact(true)}
          onMouseLeave={() => setHoverContact(false)}
          style={{
            display: "flex",
            position: "fixed",
            right: 30,
            bottom: 30,
            backgroundColor: "white",
            borderRadius: "50px",
            padding: "5px",
            boxShadow: "5px 10px 7px #65835d85",
            justifyContent: "center",
            cursor: "pointer",
            //transition: "0.5s",
          }}
        >
          <IconButton>
            {/* <Typography>Contact Us </Typography> */}
            <MailOutlineIcon style={{ fontSize: "30px", color: "#33916e" }} />
          </IconButton>
          {hoverContact && (
            <Box style={{ margin: "auto", padding: "5px", color: "#33916e" }}>
              <h5>Contact Us</h5>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
