import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`pop-up pop-up_picture ${props.isOpen ? "pop-up_opened" : false}`}>
                <div className="pop-up__photo-content">
                    <button className="pop-up__button-close" type="button" onClick={props.onClose}></button>
                    <img className="pop-up__img" alt="#" src={props.card.link} />
                    <p className="pop-up__post-title">{props.card.title}</p>
                </div>
        </div>
    )
}

export default ImagePopup;