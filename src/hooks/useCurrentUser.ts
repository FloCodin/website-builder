"use client"
import { useEffect, useState } from 'react'


type CurrentUser = {
  id: string
  name: string
  email: string
  role: 'editor' | 'admin' | 'superuser'
  subscription?: {
    id: string
    allowedBlocks: string[]
  }
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include',
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading }
}
