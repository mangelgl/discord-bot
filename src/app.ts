import { Server } from "./server-app";

/**
 * Se ejecutará cuando se inicie el script
 */
(() => {
    main();
})();

function main () {
    new Server();
}
