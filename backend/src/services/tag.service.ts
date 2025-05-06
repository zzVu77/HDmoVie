import { Tag } from '~/models/tag.model'
import { TagRepository } from '~/repositories/tag.repository'

export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async getAllTags(): Promise<Tag[]> {
    try {
      return this.tagRepository.findAll()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getTagById(id: string): Promise<Tag | null> {
    try {
      return this.tagRepository.findById(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async createTag(name: string): Promise<Tag> {
    try {
      // Check if tag already exists
      const existingTag = await this.tagRepository.findByName(name)
      if (existingTag) {
        throw new Error('Tag with this name already exists')
      }

      // Create new tag
      const tag = new Tag()
      tag.name = name
      return await this.tagRepository.create(tag)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteTag(id: string): Promise<void> {
    try {
      // Check if tag exists
      const tag = await this.tagRepository.findById(id)
      if (!tag) {
        throw new Error('Tag not found')
      }

      await this.tagRepository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
