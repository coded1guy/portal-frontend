import { useState, useEffect } from "react";

export const useSessionStorage = (name) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  return value
}

export const useCreateSessionStorage = (key, item) => {
  useEffect(() => {
    sessionStorage.setItem(key,item);
  }, [])
}