import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className='font-bold text-xl'>Home</h1>
      <div className='flex item-center justify-between'>
        <h1>Snippets</h1>
        <Button>New</Button>
      </div>
    </div>
  )
}

export default page
