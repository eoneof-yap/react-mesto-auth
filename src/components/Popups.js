import React from 'react';
import { createPortal } from 'react-dom';

import EditAvatarPopup from './popups/EditAvatarPopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import AddPlacePopup from './popups/AddPlacePopup.js';
import ImagePopup from './popups/ImagePopup.js';
import PopupConfirm from './popups/PopupConfirm.js';
// import InfoTooltip from './InfoTooltip .js';

export default function Popups(props) {
  return createPortal(
    // render popups in their1 own div
    <div className='popups'>
      {/* <InfoTooltip isOpen={props.isInfoToolTipOpen} onClose={props.onClose} /> */}
      <EditAvatarPopup
        isOpen={props.isOpen.updateAvatar}
        onSubmit={props.onSubmitAvatar}
        onClose={props.onClose}
      />
      <EditProfilePopup
        isOpen={props.isOpen.editProfile}
        onSubmit={props.onSubmitUser}
        onClose={props.onClose}
      />
      <AddPlacePopup
        isOpen={props.isOpen.addCard}
        onSubmit={props.onSubmitNewPlace}
        onClose={props.onClose}
      />
      <PopupConfirm
        isOpen={props.isOpen.confirmDelete}
        onSubmit={props.onSubmitCardDelete}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
      />
      <ImagePopup
        isOpen={props.isOpen.viewImage}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
      />
    </div>,
    document.querySelector('#mesto-react-app'),
  );
}
