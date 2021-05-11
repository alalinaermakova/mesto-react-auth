import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title="Редактировать профиль" 
        name="profile" 
        buttonTitle="Сохранить"
        >
            <input id="input-name" name="name" type="text" placeholder="Имя" className="pop-up__input pop-up__input_name"  minLength="2" maxLength="200" required
            value={name}
            onChange={handleChangeName} />
            <span id="input-name-error" className="pop-up__error-visible"></span>
            <input id="input-description" name="description" type="text" placeholder="O себе" className="pop-up__input pop-up__input_description"  maxLength="400" minLength="2" required
            value={description}
            onChange={handleChangeDescription} />
            <span id="input-description-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;