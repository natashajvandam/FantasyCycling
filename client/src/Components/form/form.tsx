import './form.scss'
import React, { useState, ChangeEvent } from 'react'

type formProps = {
  filterList: (val: string) => void
}

function Form({ filterList }: formProps) {
  const [input, setInput] = useState('')
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
    filterList(e.target.value)
  }

  return (
    <form className="search_form">
      <input
        placeholder="search..."
        className="search_input_text"
        type="text"
        value={input}
        onChange={handleChange}
      />
    </form>
  )
}
export default Form
