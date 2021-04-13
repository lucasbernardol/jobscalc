import { getMessage } from './static.js';

const fields = document.querySelectorAll('[required]');

const validateField = (event) => {
  const field = event.target;

  const spanElement = field.parentNode.querySelector('.error-wrapper');
  const className = 'active';

  const verifyErrors = (stateObject) => {
    let error = null;

    for (const key in stateObject) {
      if (stateObject[key] && !stateObject.valid) {
        error = key;
      }
    }

    return error;
  };

  const displayErrors = (fieldType, error) => {
    if (error) {
      spanElement.classList.add(className);
      spanElement.textContent = getMessage(fieldType, error);
      return;
    }

    spanElement.classList.remove(className);
    spanElement.textContent = null;
  };

  const result = verifyErrors(field.validity);

  if (result) {
    displayErrors(field.type, result);
    return;
  }

  displayErrors();
};

const addFieldEvent = (field) => {
  const handlePreventDefault = (event) => {
    event.preventDefault();

    validateField(event);
  };

  field.addEventListener('invalid', handlePreventDefault);
  field.addEventListener('blur', validateField);
  field.addEventListener('keyup', validateField);
};

fields.forEach(addFieldEvent);
