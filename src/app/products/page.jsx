import Link from 'next/link'
import React from 'react'

export default function products() {
  return (
    <div className='min-h-screen flex flex-col'> 
    <h1 className='text-3xl'>All Products</h1>
    <Link href='/products/1'>This is product 1</Link>
    <Link href='/products/2'>This is product 2</Link>
    <Link href='/products/3'>This is product 3</Link>
    <Link href='/products/4'>This is product 4</Link>
  
     </div>
  )
}
