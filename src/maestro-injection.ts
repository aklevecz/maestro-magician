import { MaestroMagician } from "./maestro-magician";
import { MaestroUser } from "./maestro-user";
import {
    cartAndQuantityMutationCallback,
    createAccountOrLogin,
} from "./maestro-mutation-callbacks";

declare global {
    interface Window {
        analytics: any;
        m: any;
    }
}

console.log("Magic will happen");
document.addEventListener("DOMContentLoaded", () => {
    console.log("Making things disappear...");
    new MaestroMagician(
        "SidebarContainer",
        cartAndQuantityMutationCallback,
        window
    );
    const user = new MaestroUser(window);
});

// const m = new MaestroMagician(
//     "SidebarContainer",
//     cartAndQuantityMutationCallback,
//     window,
//     {childList: true}
// );
// const mw = new MaestroMagician(
//     "view__Background",
//     createAccountOrLogin,
//     window
// );
// window.m = m;
