import React from 'react'

const Suggestions = (
    suggestions = [],
    onClick,
    setSearchString,
    showIcon,
    maxResults,
    suggestionKey,
    highlightedItem,
    setHighlightedItem,
    formatSuggestions,
) => {

    const formatSuggestions = formatSuggestions
        ? formatSuggestions
        : (item) => item[suggestionKey]

    const handleClick = (result) => {
        onClick(result)
        setSearchString(result[suggestionKey])
    }


    const handleMouseDown = ({
        event,
        result
    }) => {
        if (event.button === 0) {
            event.preventDefault()
            handleClick(result)
        }
    }

    
    return (
        <div>Suggestions</div>
    )
}

export default Suggestions