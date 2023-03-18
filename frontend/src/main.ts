import "./app.css";
import "@fontsource/inter/variable.css";
import App from "./App.svelte";
import { registerSW } from "virtual:pwa-register";

// Register SW
let updateSW;

updateSW = registerSW({
  onNeedRefresh() {
    // For now, just refresh straight away. Doing this rather than the autoUpdate
    // behaviour as future-proofing in case we want to display a prompt in future.

    if (updateSW) updateSW(true);
  },
});

// Future proof with a version so we can perform 'migrations' or show explainers
// about a change in visualisation to users who were used to something else.
//
// For now, we're using the presence of this (don't care about the number) to see
// if the user has visited the site before, so if we should start the infobox as
// expanded or collapsed.
//
// This will always get set *after* the initial render, which is what we want.
localStorage.setItem("lastVisitedVersion", "1");

// Add event listener to persist hash to localStorage on change
// See https://stackoverflow.com/a/64927639
window.history.replaceState = new Proxy(window.history.replaceState, {
  apply: (target, thisArg, argArray) => {
    // trigger here what you need
    const hash = argArray[2].split("#")[1];
    localStorage.setItem("lastHash", hash);

    return target.apply(thisArg, argArray);
  },
});

// When page loads, if there's no hash and we have a hash saved, use that
if (!window.location.hash && localStorage.getItem("lastHash")) {
  window.location.hash = localStorage.getItem("lastHash");
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
