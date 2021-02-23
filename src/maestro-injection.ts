import { MaestroMagician } from "./maestro-magician";
import { cartAndQuantityMutationCallback } from "./maestro-mutation-callbacks";

console.log("Magic will happen")
document.addEventListener("DOMContentLoaded", () => {
    console.log("Making things disappear...")
    new MaestroMagician("SidebarContainer", cartAndQuantityMutationCallback);
});
