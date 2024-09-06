import { usePathname } from 'next/navigation'

interface UseChangeLogoNameProps<T> {
  nameOptions: T
  defaultName: keyof T
}

export function useChangeLogoName<T> ({ nameOptions, defaultName }: UseChangeLogoNameProps<T>) {
  const pathname = usePathname()

  const parts = pathname.split('/')

  for (let i = 0; i < parts.length; i++) {
    const category = parts[i] as keyof T

    if (nameOptions[category]) {
      return nameOptions[category]
    }
  }

  return nameOptions[defaultName]
}
