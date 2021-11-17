import { el } from '/js/lib/Html.js';
import Modal from '/js/app/ui/Modal.js';

export default class PausedModal extends Modal {
    constructor(container) {
        super(container, {
            showHeader: false,
            showFooter: false,
            dialogClass: 'modal-dialog modal-dialog-centered justify-content-center',
            contentClass: 'modal-content w-50',
            title: "Paused",
        });
    }

    get body() {
        return el('div', { class: 'py-3 text-center' }, [
            el('p', "Paused..."),
            el('i', { class: 'bi bi-pause-btn mt-2', style: 'font-size: 3rem' })
        ]);
    }
}
