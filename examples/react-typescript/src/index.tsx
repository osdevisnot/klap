import React from 'react'

const Button = ({ onClick }) => {
	return (
		<button class="button" onClick={onClick}>
			Hello Button
		</button>
	)
}

export { Button }
