export class HeaderMenu {
    constructor(document, visible){
        this.document = document || window.document;
        this.button = null;;
        this.menu = null;
        this.visible = visible || 'visible';
    }

    toggle(event) {
        this.menu.classList.toggle(this.visible);
    }

    loadElements(button, menu) {
        if (typeof(button) == 'string') {
            this.button = this.document.querySelector(button)
        }else{
            this.button = button;
        }

        if (typeof(menu) == 'string') {
            this.menu = this.document.querySelector(menu)
        }else{
            this.menu = menu;
        }
    }

    mount(button, menu) {
        var self = this;

        this.loadElements(button, menu);
        this.button.addEventListener('click', (event) => {
            self.toggle()
        }, false, false);
    }
}
