import './form.scss'
import React, { useState } from 'react'

type formProps = {
  filterList: any
}

function Form({ filterList }: formProps) {
  const [input, setInput] = useState('')
  function handleChange(e: any) {
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
