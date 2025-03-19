import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      <p>Built with ❤️ and passion. Stay creative & keep building!</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Footer;
