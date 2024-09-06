import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useUrl () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  return {
    searchParams,
    router,
    pathname,
    params
  }
}
