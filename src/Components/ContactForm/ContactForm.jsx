// import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Form } from './ContactForm.styled';

export const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const isValidatedForm = validateForm();
    if (!isValidatedForm) return;
    onAdd({ id: uuid(), name, number });
    resetForm();
  };

  const validateForm = () => {
    return onCheckUnique(name);
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeForm}
          placeholder="Enter contact's name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="The name can only consist of letters, apostrophe, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc."
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeForm}
          placeholder="Enter contact's phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
};
