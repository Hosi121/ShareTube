import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authServices";
import { User } from "../types/user";

interface NavbarProps {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await logout();
            setCurrentUser(null);
            navigate("/login");
        }catch (err){
            console.error("ログアウトに失敗しました",err);
        }
    };

    return (
        <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Video SNS
        </Typography>
        {currentUser ? (
          <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {currentUser.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>ログアウト</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>ログイン</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>登録</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
    )
};

export default Navbar;