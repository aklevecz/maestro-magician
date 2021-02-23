import { MaestroMagician } from "./maestroMagician";
import { cartAndQuantityMutationCallback } from "./mutationCallbacks";
console.log("Magic will happen");
document.addEventListener("DOMContentLoaded", function () {
    console.log("Making things disappear...");
    new MaestroMagician("SidebarContainer", cartAndQuantityMutationCallback);
});
