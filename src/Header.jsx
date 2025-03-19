import React, { useEffect, useState } from "react";

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    document.body.className = darkTheme ? "dark-mode" : "light-mode";
  }, [darkTheme]);

  return (
    <>
    <header style={{backgroundColor:'blue'}} className={`header ${darkTheme ? "dark-header" : "light-header"}`}>
      <h1>Geekconnect</h1>

     
      <div className="theme-switch" onClick={toggleTheme}>
        <div className={`toggle-btn ${darkTheme ? "toggle-on" : ""}`}>
          {darkTheme ? "🌙" : "🌞"}
        </div>
      </div>
    </header>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',width:'400px',margin:'5px auto',border:'.1px solid grey',padding:'20px'}}>
        <h1>Hi 👋🏻</h1>
        <h2>Welcome to Geekconnect</h2>
        <p>Love Technology. ❣️</p>
    </div>
    </>
  );
};

export default Header;
