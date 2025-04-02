import type { Locale } from './localization'
import fs from 'fs'
import path from 'path'

// Cache for dictionaries
const dictionaries: Record<string, any> = {}

// Function to get all messages for a locale
export async function getMessages(locale: Locale, namespaces: string[] = ['common']) {
  const messages: Record<string, any> = {}

  for (const namespace of namespaces) {
    const cacheKey = `${locale}:${namespace}`

    // Check if we have this dictionary in cache
    if (!dictionaries[cacheKey]) {
      try {
        // Path to the dictionary file
        const filePath = path.join(process.cwd(), 'src', 'messages', locale, `${namespace}.json`)

        // Read the dictionary file if it exists
        if (fs.existsSync(filePath)) {
          const fileContents = fs.readFileSync(filePath, 'utf-8')

          // Parse the JSON and get the inner object
          const parsed = JSON.parse(fileContents)
          dictionaries[cacheKey] = parsed[namespace] || parsed
        } else {
          console.warn(`Translation file not found: ${filePath}`)
          dictionaries[cacheKey] = {}
        }
      } catch (error) {
        console.error(`Error loading messages for ${locale}:${namespace}`, error)
        dictionaries[cacheKey] = {}
      }
    }

    // Merge this namespace into the messages
    messages[namespace] = dictionaries[cacheKey]
  }

  return messages
}

// Function to get a specific message
export function getMessage(messages: Record<string, any>, key: string, defaultValue: string = '') {
  // Split the key by dots (e.g., 'navigation.home')
  const keyParts = key.split('.')

  // Start with the root of the messages
  let currentObject = messages

  // Traverse the object using the key parts
  for (const part of keyParts) {
    if (currentObject && typeof currentObject === 'object' && part in currentObject) {
      currentObject = currentObject[part]
    } else {
      return defaultValue
    }
  }

  return currentObject || defaultValue
}
