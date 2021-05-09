import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                    <div className="profile__avatar-container">
                        <button type="button" className="profile__button-edit-avatar" onClick={onEditAvatar}></button>
                        <img className="profile__img" src={currentUser.avatar} alt="фото Жак-Ив Кусто"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="elements">
                    <template id="post-template"/>
                    {cards.map((item) => 
                        (< Card 
                            key={item._id} 
                            _id={item._id}
                            owner={item.owner}
                            link={item.link}
                            name={item.name}
                            likes={item.likes}
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />) 
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;

