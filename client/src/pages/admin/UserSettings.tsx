import React from 'react'
import BackBlock from '../../components/BackBlock'
import UserSettingsBlock from '../../components/users/UserSettingsBlock'

export default function UserSettings() {
  return (
    <div className="flex-1 space-y-4">
        <BackBlock />
        <UserSettingsBlock />
    </div>
  )
}
