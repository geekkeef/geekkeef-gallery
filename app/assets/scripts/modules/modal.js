import $ from 'jquery';

class Modal {
    constructor(){
        this.openModalClick = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalClick = $('.modal__close');
        this.events();
    }

    events(){
        this.openModalClick.click(this.openModal.bind(this));
        this.closeModalClick.click(this.closeModal.bind(this));
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if(e.keyCode==27){
            this.closeModal();
        }
    }

    openModal(){
        this.modal.addClass('modal--visible');
        return false; // prevent default scroll up functionality in browser fomr '#' link
    }

    closeModal(){
        this.modal.removeClass('modal--visible'); // remove modal class
    }
}

export default Modal;