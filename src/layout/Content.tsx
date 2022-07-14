import React, { useEffect } from "react";
import { fetchResults } from "../store/results/actions";

const Content = () => {
  useEffect(() => {
    fetchResults();
  }, []);

  return <div>Content</div>;
};

export default Content;
