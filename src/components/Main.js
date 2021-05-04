import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = React.useState('Жак Ив-Кусто');
    const [userDescription, setUserDescription] = React.useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInfo()
        .then((data) => {
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        })
        .then(() => {
            return api.getCards()
        })
        .then((data) => {
            setCards(data)
        })
        .catch((err) => {
            console.log(err);
          });
    }, [])

    return (
        <main className="content">
            <section className="profile">
                    <div className="profile__avatar-container">
                        <button type="button" className="profile__button-edit-avatar" onClick={props.onEditAvatar}></button>
                        <img className="profile__img" src={userAvatar} alt="фото Жак-Ив Кусто"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                    <button type="button" className="profile__button-add" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="elements">
                <template id="post-template"/>
                {cards.map((item) => (<Card card={item} key={item._id} onCardClick={props.onCardClick}/>) )}
                </ul>
            </section>
        </main>
    )
}

export default Main;

