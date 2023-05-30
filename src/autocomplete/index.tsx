import React, { useState } from "react";

interface AutocompleteProps {
  options: string[];
}

const filterMatchingOptions = (text: string, options: string[]) => {
  return options.filter(
    option => option.substring(0, text.length).toLowerCase().includes(text.toLowerCase())
  )
}

const Autocomplete = ({options}: AutocompleteProps) => {
  const [option, setOption] = useState("");
  const [matchingOptions, setMatchingOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false);

  /**
   * For production this component should also enable users to use arrow keys to navigate through options 
   */

  const handleOptionChange = async (inputValue: string) => {
    setOption(inputValue);
    
    const filteredOptions = await filterMatchingOptions(inputValue, options);
      
    setShowOptions(inputValue.length > 0 && filteredOptions.length > 0 ? true : false);
    setMatchingOptions(filteredOptions);
  }

  const handleOptionSelection = (selectedOption: string) => {
    handleOptionChange(selectedOption)
    setShowOptions(false);
  }

  return (
    <div>
      <input
        data-testid="input"
        className="autocomplete-input"
        type="text"
        value={option}
        onChange={e => handleOptionChange(e.target.value)}>
      </input>
      {
        showOptions &&
        <ul className="autocomplete-list">
          {
            matchingOptions.map(
              matchingOption => <li role="option" key={matchingOption} data-testid={matchingOption} onClick={() => handleOptionSelection(matchingOption)}><span style={{fontWeight: "bold"}}>{option}</span>{matchingOption.substring(option.length)}</li>
            )
          }
        </ul>
      }
    </div>
  )
}

export default Autocomplete;