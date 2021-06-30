import { useState } from "react";

export function useToast () {
  const [state, setState] = useState(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState(false);

  const hideToast = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }

  return [state, show, text, spinner, setState, setShow, setText, setSpinner, hideToast];
}