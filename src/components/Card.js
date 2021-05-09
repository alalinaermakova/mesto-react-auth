import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, link, name, likes, owner,  onCardClick, onCardLike, onCardDelete }) {

    const card = {
        _id: _id,
        link: link,
        name: name,
        owner: owner,
        likes: likes,
    };

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-delete ${isOwn ? '' : 'element__button-delete_hidden'}`
      );
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like_active' : ''}`;

    function handleClick() {
        onCardClick({
            link: link,
            name: name,
        });
    }
    
    function handleLikeClick() {
        onCardLike(card)
      }
    
    function handleDeleteClick() {
        onCardDelete(card)
      }

    return(
        
        <li className="element">
            <button type="button"
            className={cardDeleteButtonClassName}
            onClick={handleDeleteClick}
            ></button>
            <img 
            src={link} className="element__item element__item_image" 
            alt={name} 
            onClick={handleClick} 
            />
                <div className="element__like-bar">
                    <h3 className="element__description element__description_input">{card.name}</h3>
                        <div className="element__like-counter">
                            <button type="button" 
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                            ></button>
                            <p className="element__likes-number">{likes.length}</p>
                        </div>
                </div>
        </li>
    )
}

export default Card;