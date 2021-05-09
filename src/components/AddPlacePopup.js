import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({ name, link });
    }



    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Новое место"
            name="add-card"
            buttonTitle="Создать"
        >
            <input value={name} onChange={handleNameChange} id="input_post-title" name="name" type="text" placeholder="Название" className="pop-up__input pop-up__input_post-name"  minLength="2" maxLength="30" required />
            <span id="input_post-title-error" className="pop-up__error-visible"></span>
            <input value={link} onChange={handleLinkChange} id="input_url" name="description" type="url" placeholder="Ссылка на картинку" className="pop-up__input pop-up__input_post-link" required />
            <span id="input_url-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;