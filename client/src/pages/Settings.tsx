import React from 'react'
import GeneralSettingsBlock from '../components/settings/GeneralSettingsBlock'
import PasswordSettingsBlock from '../components/settings/PasswordSettingsBlock'

export default function Settings() {
    return (
        <div className="flex-1 space-y-4">
            <GeneralSettingsBlock />
            <PasswordSettingsBlock />
        </div>
    )
}
