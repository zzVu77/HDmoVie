import { Router } from 'express'
import { GenreController } from '~/controllers/genre.controller'
import { AppDataSource } from '~/data-source'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreService } from '~/services/genre.service'
import { createGenreMiddleware } from '~/middlewares/genre.middleware'

const genreRouter = Router()

// Khởi tạo dependencies
const genreRepository = new GenreRepository(AppDataSource)
const genreService = new GenreService(genreRepository)
const genreController = new GenreController(genreService)

// Định nghĩa routes
genreRouter.get('/', (req, res) => genreController.getAllGenres(req, res))

genreRouter.post('/create', createGenreMiddleware, (req, res) => genreController.createGenre(req, res))

genreRouter.delete('/delete/:id', (req, res) => genreController.deleteGenre(req, res))

export default genreRouter
