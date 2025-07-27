import { goto } from "$app/navigation";

const newUrl = new URL(window.location.href);
newUrl.pathname = "/sydney";

goto(newUrl, { replaceState: true });
