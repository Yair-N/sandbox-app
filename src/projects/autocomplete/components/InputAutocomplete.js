import React, { useState, useEffect } from 'react'
import Input from './Input'

import styled, { ThemeProvider } from 'styled-components'
import { defaultTheme, defaultFuseOptions } from '../conf/config'

const InputAutocomplete = (
  {
    items = [],
    fuseOptions = {},
    onSearch = () => { },
    onHover = () => { },
    onSelect = () => { },
    onFocus = () => { },
    onClear = () => { },
    placeholder = '',
    autoFocus = false,
    styling = {},
    suggestionKey = '',
    inputSearchTerm = '',
    formatSuggestions = {},
    showItemsOnFocus = false,
    maxLength = 0 }

) => {

  const theme = { ...defaultTheme, ...styling }
  const options = { ...defaultFuseOptions, ...fuseOptions }

  const [searchTerm, setSearchTerm] = useState(inputSearchTerm)
  const [suggestions, setSuggestions] = useState([])
  const [activeItem, setActiveItem] = useState(-1)

  const [isSearchComplete, setIsSearchComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  



  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <div className='wrapper'>
          <Input
            onChange={(event) => handleChange(event)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={placeholder}
            onClear = {onClear}
            inputSearchTerm ={inputSearchTerm}
          />
        </div>
      </MainWrapper>
    </ThemeProvider>
  )

}

export default InputAutocomplete



const MainWrapper = styled.div`
  position: relative;

  height: ${props => parseInt(props.theme.height) + 2 + 'px'};

  > .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    maxWidth: ${props => props.theme.width ? props.theme.width : '%100'} ;

    border: ${props => props.theme.border};
    border-radius: ${props => props.theme.borderRadius};

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};

    font-size: ${props => props.theme.fontSize};
    font-family: ${props => props.theme.fontFamily};

    z-index: ${props => props.theme.zIndex};

    &:hover {
      box-shadow: ${props => props.theme.boxShadow};
    }
    &:active {
      box-shadow: ${props => props.theme.boxShadow};
    }
    &:focus-within {
      box-shadow: ${props => props.theme.boxShadow};
    }
  }
`
