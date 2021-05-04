import React from 'react';
import {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
    }); 
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false})
  }

  return (
    <div className="App">
      <div className="theme theme_dark">
        <Header />
        <Main
          onEditProfile= {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="avatar-change" buttonTitle="Сохранить" >
              <input id="input_avatar" name="description" type="url" placeholder="Ссылка на картинку" className="pop-up__input pop-up__input_avatar-link" required />    
              <span id="input_avatar-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="profile" buttonTitle="Сохранить" >
              <input id="input-name" name="name" type="text" placeholder="Имя" className="pop-up__input pop-up__input_name"  minLength="2" maxLength="200" required />
              <span id="input-name-error" className="pop-up__error-visible"></span>
              <input id="input-description" name="description" type="text" placeholder="O себе" className="pop-up__input pop-up__input_description"  maxLength="400" minLength="2" required />
              <span id="input-description-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" name="add-card" buttonTitle="Создать" >
              <input id="input_post-title" name="name" type="text" placeholder="Название" className="pop-up__input pop-up__input_post-name"  minLength="2" maxLength="30" required />
              <span id="input_post-title-error" className="pop-up__error-visible"></span>
              <input id="input_url" name="description" type="url" placeholder="Ссылка на картинку" className="pop-up__input pop-up__input_post-link" required />
              <span id="input_url-error" className="pop-up__error-visible"></span>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={selectedCard.isOpen} />
        <Footer />
      </div>
    </div>
  );
}

export default App;