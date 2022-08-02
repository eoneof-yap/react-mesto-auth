import React from 'react';

import EditAvatarPopup from './popups/EditAvatarPopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import AddPlacePopup from './popups/AddPlacePopup.js';
import ImagePopup from './popups/ImagePopup.js';
import PopupConfirm from './popups/PopupConfirm.js';
// import InfoTooltip from './InfoTooltip .js';

export default function Popups(props) {
  return (
    <>
      {/* <InfoTooltip isOpen={props.isInfoToolTipOpen} onClose={props.onClose} /> */}
      <EditAvatarPopup
        isOpen={props.isUpdatePopupOpen}
        onSubmit={props.handleAvatarSubmit}
        onClose={props.onClose}
      />
      <EditProfilePopup
        isOpen={props.isEditPopupOpen}
        onSubmit={props.handleUserInfoSubmit}
        onClose={props.onClose}
      />
      <AddPlacePopup
        isOpen={props.isAddPopupOpen}
        onSubmit={props.handleNewPlaceSubmit}
        onClose={props.onClose}
      />
      <PopupConfirm
        isOpen={props.isConfirmPopupOpen}
        onSubmit={props.handleCardDelete}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
      />
      <ImagePopup
        isOpen={props.isImageViewPopupOpen}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
      />
    </>
  );
}
