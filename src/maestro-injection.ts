import { MaestroMagician } from "./maestro-magician";
import { MaestroUser } from "./maestro-user";
import { cartAndQuantityMutationCallback } from "./maestro-mutation-callbacks";
import { CustomWindow } from "./custom.window";
import { initSegmentScript } from "./maestro-segment-calls";

const customWindow = (window as unknown) as CustomWindow;
initSegmentScript(customWindow)

console.log("Magic will happen");
document.addEventListener("DOMContentLoaded", () => {
    console.log("Making things disappear...");
    new MaestroMagician("SidebarContainer", cartAndQuantityMutationCallback);
    new MaestroUser(customWindow);
});
