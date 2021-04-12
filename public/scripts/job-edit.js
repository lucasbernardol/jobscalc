import Modal from './modal.js';
const openModal = document.querySelector('.open-modal');

const modal = Modal({
  animateClasses: ['animate-pop', 'back'],
});

openModal.addEventListener('click', modal.open);
