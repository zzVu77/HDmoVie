import { Router } from 'express'
import { GenreController } from '~/controllers/genre.controller'
import { AppDataSource } from '~/data-source'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreService } from '~/services/genre.service'
// import { GenreMiddleware } from '~/middlewares/genre.middleware'

const genreRouter = Router()

// Khởi tạo dependencies
const genreRepository = new GenreRepository(AppDataSource)
const genreService = new GenreService(genreRepository)
const genreController = new GenreController(genreService)

// Định nghĩa routes
genreRouter.get('/', (req, res) => genreController.getAllGenres(req, res))

export default genreRouter
