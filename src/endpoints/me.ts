import type { Endpoint } from 'payload'
import type { PayloadRequest } from 'payload'
import type { Response, NextFunction } from 'express'

export const meEndpoint: Endpoint = {
  path: '/me',
  method: 'get',
  handler: (async (req: PayloadRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      if (!user) {
        return res.status(401).json({ message: 'Not authenticated' })
      }

      const userData: any = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

      // Typensicher extrahieren
      const subscriptionId =
        typeof user.subscription === 'object' ? user.subscription?.id : user.subscription

      if (typeof subscriptionId === 'string' && typeof req.payload?.findByID === 'function') {
        const subscription = await req.payload.findByID({
          collection: 'subscriptions',
          id: subscriptionId,
        })

        if (subscription) {
          userData.subscription = {
            id: subscription.id,
            allowedBlocks: subscription.allowedBlocks || [],
          }
        }
      }

      return res.status(200).json({ user: userData })
    } catch (err) {
      console.error('Error in /api/me:', err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }) as unknown as Endpoint['handler'], // 👈 Typ-Korrektur hier
}
