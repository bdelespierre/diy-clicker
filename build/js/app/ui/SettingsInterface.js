var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SettingsInterface_game, _SettingsInterface_ui;
import Assertion from '../../lib/Assertion.js';
import ClickerGame from '../ClickerGame.js';
import { card } from './InterfaceComponents.js';
import { el, on } from '../../lib/Html.js';
export default class SettingsInterface {
    constructor({ container, game }) {
        _SettingsInterface_game.set(this, void 0);
        _SettingsInterface_ui.set(this, {});
        Assertion.instanceOf(game, ClickerGame);
        __classPrivateFieldSet(this, _SettingsInterface_game, game, "f");
        this.build(container);
    }
    build(container) {
        Assertion.element(container);
        __classPrivateFieldGet(this, _SettingsInterface_ui, "f").settings = card({
            title: 'Settings'
        }, [
            el('div', { class: 'd-flex mb-2' }, [
                el('label', 'Auto Save', {
                    for: 'settings-auto-save-switcher',
                    class: 'pe-2 flex-grow-1'
                }),
                el('div', { class: 'form-check form-switch' }, [
                    el('input', {
                        type: 'checkbox',
                        id: 'settings-auto-save-switcher',
                        class: 'form-check-input',
                        checked: __classPrivateFieldGet(this, _SettingsInterface_game, "f").settings.autoSave
                    }, input => {
                        __classPrivateFieldGet(this, _SettingsInterface_ui, "f").autoSaveSwitch = input;
                        on(input, 'change', this.onAutoSaveSwitchChange.bind(this));
                    })
                ])
            ]),
            el('div', { class: 'd-flex mb-2' }, [
                el('label', 'Last save', { class: 'pe-2 flex-grow-1' }),
                el('span', 'n/a', span => {
                    __classPrivateFieldGet(this, _SettingsInterface_ui, "f").lastSaveSpan = span;
                })
            ]),
            el('div', { class: 'd-flex mb-2' }, [
                el('label', 'Save now', { class: 'pe-2 flex-grow-1' }),
                el('button', { type: 'button', class: 'btn btn-primary' }, btn => {
                    on(btn, 'click', this.onSaveBtnClick.bind(this));
                }, [
                    el('i', { class: 'bi bi-save me-2' }),
                    el('span', 'Save')
                ])
            ], div => {
                __classPrivateFieldGet(this, _SettingsInterface_ui, "f").saveNowDiv = div;
            })
        ]);
        __classPrivateFieldGet(this, _SettingsInterface_ui, "f").dangerZone = card({
            title: 'Danger Zone'
        }, [
            el('div', { class: 'd-flex mb-2' }, [
                el('label', 'Delete saved game', { class: 'pe-2 flex-grow-1' }),
                el('button', { type: 'button', class: 'btn btn-danger' }, btn => {
                    on(btn, 'click', this.onDeleteBtnClick.bind(this));
                }, [
                    el('i', { class: 'bi bi-trash me-2' }),
                    el('span', 'Delete')
                ])
            ])
        ]);
        container.appendChild(__classPrivateFieldGet(this, _SettingsInterface_ui, "f").settings);
        container.appendChild(__classPrivateFieldGet(this, _SettingsInterface_ui, "f").dangerZone);
    }
    onAutoSaveSwitchChange() {
        __classPrivateFieldGet(this, _SettingsInterface_game, "f").settings.autoSave = __classPrivateFieldGet(this, _SettingsInterface_ui, "f").autoSaveSwitch.checked;
    }
    onSaveBtnClick() {
        __classPrivateFieldGet(this, _SettingsInterface_game, "f").backups.backup();
    }
    onDeleteBtnClick() {
        __classPrivateFieldGet(this, _SettingsInterface_game, "f").backups.deleteBackup();
    }
    draw(interp) {
        __classPrivateFieldGet(this, _SettingsInterface_ui, "f").lastSaveSpan.innerHTML = __classPrivateFieldGet(this, _SettingsInterface_game, "f").backups.lastSaveDateTime || 'n/a';
        __classPrivateFieldGet(this, _SettingsInterface_game, "f").settings.autoSave
            ? __classPrivateFieldGet(this, _SettingsInterface_ui, "f").saveNowDiv.classList.add('d-none')
            : __classPrivateFieldGet(this, _SettingsInterface_ui, "f").saveNowDiv.classList.remove('d-none');
    }
    rebuild() {
        __classPrivateFieldGet(this, _SettingsInterface_ui, "f").autoSaveSwitch.checked = __classPrivateFieldGet(this, _SettingsInterface_game, "f").settings.autoSave;
    }
}
_SettingsInterface_game = new WeakMap(), _SettingsInterface_ui = new WeakMap();
