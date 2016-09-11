import { HeaderMenu } from './menu/index.js';

console.log(HeaderMenu);

function main(){
    var headerMenu = new HeaderMenu();
    headerMenu.mount('.MenuButton', '.Menu');
}

main();
