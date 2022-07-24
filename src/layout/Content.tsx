import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ResultsPage from "../pages/ResultsPage";
import UserPage from "../pages/UserPage";

const Content = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ResultsPage />} />
        <Route path="users/:login" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default Content;
