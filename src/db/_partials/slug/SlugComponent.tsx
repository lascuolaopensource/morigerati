'use client'
import React, { useCallback, useEffect } from 'react'
import { TextFieldClientProps } from 'payload'

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'

type SlugComponentProps = { fieldToUse: string; checkboxFieldPath: string } & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()
  // Utilizziamo un valore fisso per locale, visto che getLocale non è più disponibile
  const locale = 'it'

  // Debug logging
  useEffect(() => {}, [field, fieldToUse, path, locale, value])

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    const fieldValue = fields[fieldToUse]?.value

    // Handle localized fields - check if fieldValue is an object with locale keys
    if (typeof fieldValue === 'object' && fieldValue !== null && locale in fieldValue) {
      return fieldValue[locale]
    }

    return fieldValue as string
  })

  // Debug logging for field values
  useEffect(() => {}, [targetFieldValue, checkboxValue, locale])

  useEffect(() => {
    // When a localized field changes, we should update the slug regardless of the lock
    // This ensures that each language gets its own slug
    const isLocalizedField = field.localized === true

    // Update the slug when the source field changes if:
    // 1. The slug is locked AND we're dealing with a localized field
    // 2. OR if the slug is unlocked (normal behavior)
    if ((checkboxValue && isLocalizedField) || !checkboxValue) {
      if (targetFieldValue) {
        const targetValue =
          typeof targetFieldValue === 'string' ? targetFieldValue : String(targetFieldValue)
        const formattedSlug = formatSlug(targetValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value, field.localized, locale])

  const handleLock = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      dispatchFields({ type: 'UPDATE', path: checkboxFieldPath, value: !checkboxValue })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || (checkboxValue && !field.localized)

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={`${label} (${locale})`} />

        <Button
          className="lock-button"
          buttonStyle="none"
          onClick={(e: React.MouseEvent) => handleLock(e as React.MouseEvent<HTMLButtonElement>)}
        >
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
      />
    </div>
  )
}
