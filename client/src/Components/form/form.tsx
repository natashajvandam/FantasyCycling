import './form.scss';
import { useState } from 'react';
import { IRider } from '../../interfaces';
import React from 'react';

type FormProps = {
  filterList: (query: string) => void;
};

const Form: React.FC<FormProps> = ({ filterList }: FormProps) => {
  const [input, setInput] = useState<string>('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    filterList(e.target.value);
  }

  return (
    <form className='search_form'>
      <input
        placeholder='search...'
        className='search_input_text'
        type='text'
        value={input}
        onChange={handleChange}
      ></input>
    </form>
  );
};
export default Form;
