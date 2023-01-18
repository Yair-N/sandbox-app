import React, { useState, useEffect } from 'react'
import InputAutocomplete from './components/InputAutocomplete'
import { getCountries } from './utils/tools'
import { useCounter } from './hooks/useCounter'

const AutocompleteDemo = () => {

	// extracted props
	const onSearch = (event) => {
		// console.log('search', event)
	}
	const onHover = (event) => {
		// console.log('hover', event)
	}
	const onSelect = (event, item) => {
		// console.log('selected:', item)
	}
	const onFocus = (event) => {
		// console.log('focus', event)
	}
	const onClear = () => {
		// console.log('clear')
	}

	//format example
	const formatSuggestions = (item) => {
		return (
			<>
				<span style={{
					cursor: 'default'
					, display: 'block', textAlign: 'left',
				}}>{item.cioc} | {item.name} | {item.nativeName}</span>
			</>
		)

	}
	const style = {}
	//const items =[]


	/*
	Setup for some mock DATA 
	*/
	const [items, setItems] = useState([])

	const renderCounter = useCounter()

	console.log('renders:', renderCounter)
	// get a sample json of countries for demo
	useEffect(() => {

		const queryCountries = async () => {
			let response = await getCountries()
			sessionStorage.setItem('countries', JSON.stringify(response.data))
			setItems(response.data)
		}

		let countriesState = sessionStorage?.getItem('countries')
		if (countriesState !== 'undefined' && countriesState !== null) {
			setItems(JSON.parse(countriesState))
			console.log('loaded from storage')
		} else {
			console.log('no countries stored')
			queryCountries()
		}
	}, [])
	/*
	Setup end
	*/


	return (
		<div style={{display:'block',width:'100%', alignSelf: 'center'}}>
			<InputAutocomplete
				style={{ minWidth: '600px' }}
				onSearch={onSearch}
				onHover={onHover}
				onSelect={onSelect}
				onFocus={onFocus}
				onClear={onClear}
				formatSuggestions={formatSuggestions}
				items={items}
				placeholder={'search a country by name, capital or IATA code'}
				fuseOptions={{ keys: ['name', 'cioc', 'capital'] }}
			/>
		</div>
	)
}

export default AutocompleteDemo