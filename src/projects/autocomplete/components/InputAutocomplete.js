import React, { useState, useEffect } from 'react'
import Input from './Input'
import Suggestions from './Suggestions'

import styled, { ThemeProvider } from 'styled-components'
import { defaultTheme, defaultFuseOptions } from '../conf/config'

import useFuse from '../hooks/useFuse'

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
    style = {},
    suggestionKey = '',
    inputSearchTerm = '',
    formatSuggestions = null,
    showItemsOnFocus = false,
    maxSuggestions = 12
  }

) => {

  const theme = { ...defaultTheme, ...style }
  const options = { ...defaultFuseOptions, ...fuseOptions }
  const [searchTerm, setSearchTerm] = useState(inputSearchTerm)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [activeItem, setActiveItem] = useState({})

  const [selectedItem, setSelectedItem] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  const suggestions = useFuse(searchTerm, items, options)
  const suggestionsLen = maxSuggestions > 0 && maxSuggestions <= suggestions.length ? maxSuggestions : suggestions.length

  useEffect(() => {
    const handleDocumentClick = () => {
      setSearchComplete(true)
    }

    document.addEventListener('click', handleDocumentClick)

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const reset = () => {
    setSearchTerm(inputSearchTerm)
    setActiveSuggestion(-1)
    setSelectedItem({})
  }

  const handleChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
    setActiveSuggestion(-1)
    setSelectedItem({})
    setSearchComplete(false)
    setHasFocus(true)
    onSearch(event)
  }

  const handleClear = () => {
    reset()
    onClear()
  }

  const updateActiveSuggestion = (index) => {
    setActiveSuggestion(index)
    setActiveItem(suggestions[index])
  }

  const handleOnKeyDown = (event) => {
    // console.log(event)
    switch (event.key) {
      case 'Enter':
        if (activeSuggestion > -1 && suggestions.length > 0) {
          event.preventDefault()
          handleSelection(event, activeItem)
        }

        break
      case 'ArrowUp':
        if (activeSuggestion > 0)
          updateActiveSuggestion(activeSuggestion - 1)
        break
      case 'ArrowDown':
        if (activeSuggestion  < suggestionsLen -1)
          updateActiveSuggestion(activeSuggestion + 1)
        break

        break
      case 'Escape':
        event.preventDefault()
        reset()
        break
      default:
        break
    }
  }


  const handleFormatting = (item) => {
    if (suggestionKey.length > 1 || formatSuggestions) {

      return formatSuggestions ? formatSuggestions(item) : `${suggestionKey}:${item[suggestionKey]}`
    } else {
      // handle a case with no key name or suggestion formatting
      return `${Object.keys(item)[0]}:${item[Object.keys(item)[0]]}`
    }
  }

  const stringifySuggestion = (item) => {
    let element = handleFormatting(item)
    let string = element['props']['children']['props']['children'].join("").toString()
    return string
  }

  const handleSelection = (event, item) => {
    if (searchTerm !== inputSearchTerm && suggestions.length > 0){
    setSearchTerm(stringifySuggestion(item))
    setSearchComplete(true)
    onSelect(event, item)}
  }

  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <div className='wrapper'>
          <Input
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={(event) => handleChange(event)}
            onKeyDown={handleOnKeyDown}
            onClear={onClear}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            inputSearchTerm={inputSearchTerm}
            handleClear={handleClear}
            onFocus = {onFocus}
          />
          <Suggestions
            onClick={handleSelection}
            handleActiveSuggestion={updateActiveSuggestion}
            setActiveItem={setActiveItem}
            setActiveSuggestion={setActiveSuggestion}
            setSearchTerm={setSearchTerm}
            setSelectedItem={setSelectedItem}
            formatSuggestions={handleFormatting}
            suggestionsLen={suggestionsLen}
            activeItem={activeItem}
            activeSuggestion={activeSuggestion}
            suggestions={suggestions}
            searchComplete={searchComplete}
            onHover = {onHover}
          />
        </div>
      </MainWrapper>
    </ThemeProvider>
  )

}

export default InputAutocomplete



const MainWrapper = styled.div`
  position: relative;

  height: ${props => parseInt(props.theme.maxHeight) + 2 + 'px'};
  > .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-width: ${props => props.theme.maxWidth ? props.theme.maxWidth : '100%'} ;
    min-width:${props => props.theme.minWidth ? props.theme.minWidth : '100%'} ;
    border: ${props => props.theme.border};
    border-radius: ${props => props.theme.borderRadius};

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};

    font-size: ${props => props.theme.fontSize};
    font-family: ${props => props.theme. Family};

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