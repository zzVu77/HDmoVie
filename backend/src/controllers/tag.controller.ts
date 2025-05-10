import { Request, Response } from 'express'
import { TagService } from '~/services/tag.service'

export class TagController {
  constructor(private tagService: TagService) {}

  async getAllTags(req: Request, res: Response): Promise<void> {
    try {
      const tags = await this.tagService.getAllTags()
      res.json(tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async createTag(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body
      const newTag = await this.tagService.createTag(name)
      res.status(201).json(newTag)
    } catch (error) {
      console.error('Error creating tag:', error)
      if ((error as Error).message.includes('duplicate')) {
        res.status(409).json({ message: 'Tag with this name already exists' })
      } else {
        res.status(400).json({ message: (error as Error).message })
      }
    }
  }

  async getTagById(req: Request, res: Response): Promise<void> {
    try {
      const tagId = req.params.id
      const tag = await this.tagService.getTagById(tagId)
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' })
        return
      }
      res.json(tag)
    } catch (error) {
      console.error('Error fetching tag:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async deleteTag(req: Request, res: Response): Promise<void> {
    try {
      // Check if user is admin
      if (res.locals.user.role !== 'ADMIN') {
        res.status(403).json({ message: 'Only administrators can delete tags' })
        return
      }

      const tagId = req.params.id
      await this.tagService.deleteTag(tagId)
      res.status(200).json({ message: 'Tag deleted successfully' })
    } catch (error) {
      console.error('Error deleting tag:', error)
      if ((error as Error).message === 'Tag not found') {
        res.status(404).json({ message: 'Tag not found' })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
