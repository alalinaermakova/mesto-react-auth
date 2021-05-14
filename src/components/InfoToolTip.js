import React from 'react';
import success from '../images/Success.png';
import failed from '../images/Failed.png';

function InfoToolTip(props) {
    const { isOpen, onClose, result} = props;
    
    return(
        <div className={`pop-up ${isOpen && 'pop-up_opened'}`}>
            <div className="pop-up__content">
                <button className="pop-up__button-close" type="button" onClick={onClose} />
                <img src={result ? success : failed} alt={result ? 'Успешно!' : 'Ошибка!'} className="tooltip__image" />
                <h2 className="tooltip__title">{result ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
            </div>
        </div>
    )
}

export default InfoToolTip;