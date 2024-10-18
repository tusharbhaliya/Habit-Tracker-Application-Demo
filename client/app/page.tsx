import { useEffect, useState } from "react"
import axios from 'axios'
const api = require("./_utils/api");
export default function Home() {

  const [text, setText] = useState("Loading...");
  useEffect(() => {
    setTextHelper()
  }, []);

  const setTextHelper = async () => {
    const data = await api.getTasks();
    if (data)
      setText(data[0].name)
  }
  return (
    <div>
      <div>{text}</div>
    </div>
  )
}

