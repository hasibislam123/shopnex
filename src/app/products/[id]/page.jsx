import React from 'react'

export default async function page({params}) {
   const  {id} = await params
  return (
    <div>Product details page : {id}</div>
  )
}
