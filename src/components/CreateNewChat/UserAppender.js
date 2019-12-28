import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { HOST } from '../whoami'

async function getSuggestions(value, setState) {
  fetch(HOST + 'users/profile/' + value, {
    crossDomain: true,
    mode: 'cors',
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const parsedDate = JSON.parse(data)
      setState({ value: value, suggestions: parsedDate.users })
    })
}

const renderSuggestion = (suggestion) => <div>{`${suggestion.first_name} ${suggestion.last_name}`}</div>

// SEARCH USERS
function UserSuggester({ selectedUsers, setSelectedUsers }) {
  const [state, setState] = useState({
    value: '',
    suggestions: [],
  })
  const onChange = (event, { newValue }) => {
    setState({
      ...state,
      value: newValue,
    })
  }
  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setState({
      value: '',
      suggestions: [],
    })
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.name

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value, setState)
  }

  const inputProps = {
    placeholder: 'Type a some part of user name',
    value: state.value,
    onChange: onChange.bind(this),
  }

  const onSuggestionSelected = (e, { suggestion }) => {
    console.log(suggestion)
    setSelectedUsers([...selectedUsers, suggestion])
  }

  return (
    <Autosuggest
      suggestions={state.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  )
}

export default UserSuggester
