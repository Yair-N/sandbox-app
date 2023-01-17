import React from 'react'
import InputAutocomplete from './components/InputAutocomplete'


const TestAutocomplete = () => {
	const onSearch = () => { }
	const onHover = () => { }
	const onSelect = () => { }
	const onFocus = () => { }
	const onClear = () => { }
	const formatSuggestions = () => { }
	const styling = {}
	const items = []


	return (
		<InputAutocomplete
			onSearch={() => { onSearch() }}
			onHover={() => { onHover() }}
			onSelect={() => { onSelect() }}
			onFocus={() => { onFocus() }}
			onClear={() => { onClear() }}
			formatSuggestions={() => { formatSuggestions() }}
			items={items}
			placeholder={'some random text'}
		/>
	)
}

export default TestAutocomplete