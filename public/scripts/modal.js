export default function Modal({ animateClasses = [] }) {
  const modalWrapper = document.querySelector('.modal-wrapper');
  const modalContainer = document.querySelector('.modal');
  const cancelButton = modalContainer.querySelector('.cancel-button');

  modalWrapper.addEventListener('click', closeOnOutsideClick);
  cancelButton.addEventListener('click', close);

  function open() {
    document.addEventListener('keydown', closeOnEscape);
    modalWrapper.classList.add('on');
    modalContainer.classList.add(...animateClasses);
  }

  function close() {
    document.removeEventListener('keydown', closeOnEscape);
    modalWrapper.classList.remove('on');
    modalContainer.classList.remove(...animateClasses);
  }

  function closeOnEscape({ key }) {
    if (key === 'Escape') {
      close();
    }
  }

  function closeOnOutsideClick(event) {
    if (event.target === modalWrapper) {
      close();
    }
  }

  return {
    open,
    close,
  };
}
