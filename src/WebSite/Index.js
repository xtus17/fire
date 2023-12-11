import React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Body } from "./Body";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

export function Index() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: "100%" }}
    >
      <Header />
      <Hero />
      <Body />
      <Features />
      <Footer />
    </motion.div>
  );
}
