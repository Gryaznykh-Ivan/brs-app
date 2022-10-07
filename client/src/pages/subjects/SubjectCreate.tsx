import React from 'react'
import BackBlock from '../../components/BackBlock'
import SubjectCreateBlock from '../../components/subjects/SubjectCreateBlock'

export default function SubjectCreate() {
  return (
    <div className="flex-1 space-y-4">
      <BackBlock />
      <SubjectCreateBlock />
    </div>
  )
}
