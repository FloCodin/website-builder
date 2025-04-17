'use client'

import React from 'react'
// @ts-expect-error: Payload internals are not typed
import { useField } from 'payload/components/forms/useField'
// @ts-expect-error: Payload internals are not typed
import TextInput from 'payload/components/forms/fields/TextInput'

type Props = {
  path: string
  label?: string
  required?: boolean
}

const TailwindClassInput: React.FC<Props> = ({ path, label, required }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type text">
      {label && <label htmlFor={path}>{label}</label>}
      <TextInput
        path={path}
        name={path}
        value={value || ''}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="z. B. bg-blue-600 text-white"
      />
    </div>
  )
}

export default TailwindClassInput
