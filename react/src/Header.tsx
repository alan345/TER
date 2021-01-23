import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import { PostsContext } from "./Context"
import Logout from "./pages/Logout"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import MenuIcon from "@material-ui/icons/Menu"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: "white",
      flexGrow: 1,
    },
  })
)

export default function Header() {
  const context = React.useContext(PostsContext)
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.title} to="/">
                Naperg
              </Link>
            </Typography>

            {context.user.id ? (
              <Logout />
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="contained" color="primary">
                    Signup
                  </Button>
                </Link>{" "}
                <Link to="/login">
                  <Button variant="contained" color="secondary">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}
