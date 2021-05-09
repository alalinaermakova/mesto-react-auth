import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Обновить аватар"
            name="avatar-change"
            buttonTitle="Сохранить"
        >
            <input ref={avatarRef} id="input_avatar" name="description" type="url" placeholder="Ссылка на картинку" className="pop-up__input pop-up__input_avatar-link" required />    
            <span id="input_avatar-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;