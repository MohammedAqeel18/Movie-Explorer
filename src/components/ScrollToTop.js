import React, { useEffect, useState } from "react";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const checkScroll = () => {
    setVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollUp}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          boxShadow: 3,
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
