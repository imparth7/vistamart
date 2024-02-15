import React from 'react'

const New = ({ name }) => {
  return (
    <div>{name ? name : "Hello world"}</div>
  )
}

export default New