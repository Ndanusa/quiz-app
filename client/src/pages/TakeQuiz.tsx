import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URI } from "../config/config.js";

function TakeQuiz() {
  const params = useParams();

  return <div>{params.id}</div>;
}

export default TakeQuiz;
