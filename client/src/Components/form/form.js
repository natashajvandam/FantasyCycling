import './form.scss';
import { useState } from 'react';

function Form({filterList}) {
  const [input, setInput] = useState('');
  function handleChange (e) {
    setInput(e.target.value);
    filterList(input); 
  }

  return (
    <form className="search_form">
      <input placeholder="search..." className="search_input_text" type="text" value={input} onChange={handleChange}></input>
    </form>
  )
}
export default Form;