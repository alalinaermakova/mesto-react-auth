import React, { useEffect } from 'react';
import {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    avatar: '',
    name: 'Жак Ив-Кусто',
    about: 'Исследователь океана'
  })

  React.useEffect(() => {
    api.getInfo()
    .then((data) => {
      setCurrentUser(data)
    })
    .catch((err) => {
      console.log(err)
      })
    }, [])

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

  function handleUpdateUser(data) {
    api.updateUserInfo(data.name, data.about)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.setNewAvatar(data.avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    
    function updateCards(newCard) {

      const newCards = cards.map((c) => (c._id === card._id ? newCard : c))

      setCards(newCards)
  }
      if (isLiked) {
        api.removeLike(card._id)
        .then((newCard) => {
          updateCards(newCard)
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        api.setLike(card._id)
        .then((newCard) => {
          updateCards(newCard)
        })
        .catch((err) => {
          console.log(err)
        })
      }
  }

  function handleDeleteCard(card) {
    const isOwn = card.owner._id === currentUser._id
    if (isOwn) {
      api.deleteYourCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          if (c._id === card._id) {
            return false 
          } else {
            return true
          }
        })
        setCards(newCards)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  function handleAddPlaceSubmit(data) {
    api.addNewPost(data.name, data.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(() => {
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    const promises = [api.getInfo(), api.getCards()];

    Promise.all(promises)
    .then(([user,cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="theme theme_dark">
        <Header />
        <Main
          onEditProfile= {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}

        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} >
        </EditAvatarPopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} >     
        </EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        >
        </AddPlacePopup>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={selectedCard.isOpen} />
        <Footer />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;