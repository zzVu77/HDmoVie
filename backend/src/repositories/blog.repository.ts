import { DataSource, Repository, In } from 'typeorm'
import { Blog } from '~/models/blog.model'
import { BlogComment } from '~/models/blogComment.model'

export class BlogRepository {
    private repository: Repository<Blog>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Blog)
    }

    async findById(id: string): Promise<Blog | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['owner', 'tags']
        })
    }

    async findAll(): Promise<Blog[]> {
        return this.repository.find({
            relations: ['owner', 'tags']
        })
    }

    async create(blog: Blog): Promise<Blog> {
        return this.repository.save(blog)
    }

    async delete(id: string): Promise<void> {
        // const comments = await this.blogCommentRepository.find({
        //     where: { blog: { id } },
        //     relations: ['parentComment'],
        // });
    
        // if (comments.length > 0) {
        //     const commentIds = comments.map(comment => comment.getId());
    
        //     if (commentIds.length > 0) {
        //         const childComments = await this.blogCommentRepository
        //             .createQueryBuilder('blogComment')
        //             .leftJoin('blogComment.parentComment', 'parentComment')
        //             .where('parentComment.id IN (:...ids)', { ids: commentIds })
        //             .getMany();
    
        //         if (childComments.length > 0) {
        //             const childCommentIds = childComments.map(c => c.getId());
        //             await this.blogCommentRepository.delete(childCommentIds);
        //         }
    
        //         await this.blogCommentRepository.delete(commentIds);
        //     }
        // }
    
        await this.repository.delete(id);
    }    
}    