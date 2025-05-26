import { Request, Response } from 'express'
import { CastService } from '~/services/cast.service'
import { Cast } from '~/models/cast.model'

export class CastController {
  constructor(private castService: CastService) {}

  async getAllCasts(req: Request, res: Response): Promise<void> {
    try {
      const Casts = await this.castService.getAllCasts()
      res.json(Casts)
    } catch (error) {
      console.error('Error fetching casts:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  async createCast(req: Request, res: Response): Promise<void> {
    try {
      const { name, profilePath } = req.body

      const newCast = await this.castService.createCast(name, profilePath)
      res.status(201).json(newCast)
    } catch (error) {
      console.error('Error creating Cast:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async deleteCast(req: Request, res: Response): Promise<void> {
    try {
      const castId = req.params.id
      const cast = await this.castService.getCastById(castId)
      if (!cast) {
        res.status(404).json({ message: 'Cast not found' })
        return
      }
      await this.castService.deleteCast(castId)
      res.status(200).json({ message: 'Cast deleted successfully' })
    } catch (error) {
      console.error('Error deleting Cast:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async updateCast(req: Request, res: Response): Promise<void> {
    try {
      const castId = req.params.id
      const { name, profilePath } = req.body

      const updatedCast = await this.castService.updateCast(castId, name, profilePath)
      if (!updatedCast) {
        res.status(404).json({ message: 'Cast not found' })
        return
      }
      res.json(updatedCast)
    } catch (error) {
      console.error('Updating cast failed ==>', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
