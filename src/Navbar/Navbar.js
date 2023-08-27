import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";

const pages = ["Learn About Mental Health", "About Us"];
//const settings = ["Account", "Dashboard", "Logout"];
const forms = ["Signup", "Login"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Change this to your desired background color
    },
  },
});

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight:700,
              letterSpacing: ".3rem",
              color: "#103b28",
              textDecoration: "none",
            }}
          >
            Vitalize<br/> Mind
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {forms.map((form) => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/${form}`}
                    >
                      {form}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#46856a",
              textDecoration: "none",
            }}
          >
            Vitalize Mind
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              padding: "2px 20px",
            }}
          >
            {pages.map((page, index) => (
              <React.Fragment key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    position: "relative",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "#347559" }}
                    to={`/${page}`}
                    className="home_links"
                  >
                    {page}
                  </Link>
                </Button>
                {index !== pages.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "24px",
                      backgroundColor: "gray",
                      marginLeft: "10px",
                      alignSelf: "center", // Vertically center the divider
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              marginRight: "auto",
            }}
          >
            {forms.map((form, index) => (
              <React.Fragment key={form}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    position: "relative",
                  }}
                >
                  <Link
                    className="home_links"
                    style={{ textDecoration: "none", color: "#347559" }}
                    to={`/${form}`}
                  >
                    {form}
                  </Link>
                </Button>
                {index !== forms.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "20px",
                      backgroundColor: "gray",
                      position: "relative",
                      top: "27px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
}
export default NavBar;
