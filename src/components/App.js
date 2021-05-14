import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api, authApi} from '../utils/api';

import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    avatar: '',
    name: '',
    about: ''
  })

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [toolTipResult, setToolTipResult] = React.useState(false);

  function handleToolTipOpen(result) {
    setIsToolTipOpen(true)
    setToolTipResult(result)
  }

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
    setSelectedCard({isOpen: false});
    setIsToolTipOpen(false);
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

      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)))
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
        setCards((cards) => cards.filter((c) => {
          if (c._id === card._id) {
            return false
          } else {
            return true
          }
        }))
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

  function onSignUp(data){
    authApi.signUp(data)
    .then(() => {
      handleToolTipOpen(true)
      history.push('./login')
    })
    .catch((err) => {
      handleToolTipOpen(false)
      console.log(`Не получилось зарегистрироваться: ${err}`)
    })
  }

  function onSignIn(data){
    authApi.signIn(data)
    .then((res) => {
      console.log(res)
      localStorage.setItem('token', res.token)
      setLoggedIn(true)
      setEmail(data.email)
    })
    .then(() => {
      history.push('./main')
    })
    .catch((err) => {
      handleToolTipOpen(false)
      console.log(`Не получилось войти: ${err}`)
    })
  }

  function onSignOut(){
    setLoggedIn(false)
    localStorage.removeItem('token')
    history.push('./login')
  }

  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      authApi.isAuthorized()
      .then((data) => {
        console.log(data.email)
        setEmail(data.email)
        setLoggedIn(true)
        history.push('./main')
      })
      .catch((err) => {
        setLoggedIn(false)
        console.log(`Не получилось ${err}`)
      })
    }
  }, [])

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
    <div className="theme theme_dark">
      <Header
      email={email}
      loggedIn={loggedIn}
      onSignOut={onSignOut}
       />
    <Switch>
    <Route path="/login">
            <Login onSignIn={onSignIn} />
    </Route>
    <Route path="/register">
            <Register onSignUp={onSignUp} />
    </Route>
      <ProtectedRoute
        path="/main"
        loggedIn={loggedIn}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
        component={Main}
      />
        <Route>
            <Main
              onEditProfile= {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}

            />
            <InfoToolTip></InfoToolTip>
        </Route>
        <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
        </Route>
    </Switch>
    <Footer />
    <InfoToolTip
    isOpen={isToolTipOpen}
    onClose={closeAllPopups}
    result={toolTipResult} />
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
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;