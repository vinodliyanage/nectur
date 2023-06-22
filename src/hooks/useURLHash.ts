import { useEffect, useState } from "react";
import { createHash } from "../utils/utils";


export function useURLHash() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const handleTab = (tabs: chrome.tabs.Tab[]) => {
      const _url = tabs?.[0]?.url;
      if (!_url) return;

      const url = new URL(_url);
      const hash = createHash(url.href);
      setHash(String(hash));
    };
    chrome.tabs.query({ active: true, currentWindow: true }, handleTab);
  }, []);

  return hash;
}
