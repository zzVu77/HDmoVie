import { Router } from 'express'
import { GenreController } from '~/controllers/genre.controller'
import { AppDataSource } from '~/data-source'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreService } from '~/services/genre.service'
import { createGenreMiddleware, updateGenreMiddleware } from '~/middlewares/genre.middleware'
import { authenticateToken } from '~/middlewares/auth.middleware'

const genreRouter = Router()

// Khởi tạo dependencies
const genreRepository = new GenreRepository(AppDataSource)
const genreService = new GenreService(genreRepository)
const genreController = new GenreController(genreService)
genreRouter.use(authenticateToken)
// Định nghĩa routes
genreRouter.get('/', (req, res) => genreController.getAllGenres(req, res))

genreRouter.post('/create', authenticateToken, createGenreMiddleware, (req, res) =>
  genreController.createGenre(req, res),
)

genreRouter.delete('/delete/:id', authenticateToken, (req, res) => genreController.deleteGenre(req, res))

genreRouter.put('/update/:id', authenticateToken, updateGenreMiddleware, (req, res) =>
  genreController.updateGenre(req, res),
)
export default genreRouter
