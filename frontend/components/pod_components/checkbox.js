import React from 'react'
import Constants from 'expo-constants'

export default class Checkbox extends React.Component {

    async componentDidMount() {
			var verify = await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
				.then(response => response.json())
  				.then(data => {
  					console.log(data)
  				}).catch((e) => {
					console.log(e)
				  })
    }

    render () {
		return (
			<div></div>
		)
    }
}