import {useState} from 'react'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'

export function useLocalStorage<T>(key: keyof typeof LocalStorageKeys, defaultValue: T) {
  const [value, setValue] = useState<T>(localStorage.getItem(key) || defaultValue)
  return [value, setValue] as const
}