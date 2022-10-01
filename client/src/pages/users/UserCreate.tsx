import React from 'react'
import BackBlock from '../../components/BackBlock'
import UserCreateBlock from '../../components/users/UserCreateBlock'

export default function UserCreate() {
  return (
    <div className="flex-1 space-y-4">
        <BackBlock />
        <UserCreateBlock />
    </div>
  )
}
