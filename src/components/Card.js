import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
      }

    return(
        
        <li className="element" key={props.card._id}>
            <button className="element__button-delete" type="button"></button>
            <img src={props.card.link} className="element__item element__item_image" alt="#" onClick={handleClick} />
                <div className="element__like-bar">
                    <h3 className="element__description element__description_input">{props.card.name}</h3>
                        <div className="element__like-counter">
                            <button type="button" className="element__button-like"></button>
                            <p className="element__likes-number">{props.card.likes.length}</p>
                        </div>
                </div>
        </li>
    )
}

export default Card;