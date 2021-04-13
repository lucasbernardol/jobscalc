const getMessage = (fieldType, typeError) => {
  const messages = {
    text: {
      valueMissing: 'Por favor, preencha esse campo.',
    },

    number: {
      valueMissing: 'Por favor, preencha esse campo.',
    },

    url: {
      valueMissing: 'Por favor, preencha esse campo.',
      typeMismatch: 'Por favor, preencha com uma url válida.',
    },
  };

  return messages[fieldType][typeError];
};

export { getMessage };
