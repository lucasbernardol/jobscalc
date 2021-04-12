import Modal from './modal.js';

const cardElements = document.querySelectorAll('.cards .card');
const deleteForm = document.querySelector('#delete-job');

const modal = Modal({
  animateClasses: ['animate-pop', 'back'],
});

function deleteCard(cardId = null) {
  if (cardId) {
    modal.open();
    deleteForm.setAttribute('action', '/job/delete/' + cardId);
  }
}

cardElements.forEach((cardElement) => {
  const { id } = cardElement.dataset;
  const deleteButton = cardElement.querySelector('button.delete');

  deleteButton.addEventListener('click', () => deleteCard(id));
});
