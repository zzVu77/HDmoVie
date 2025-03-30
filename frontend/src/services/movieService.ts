//Example code for a movie service
export const movieService = {
  getMovies: async () => {
    const response = await fetch('http://localhost:8080/api/movies')
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    const data = await response.json()
    return data
  },

  getMovieById: async (id: number) => {
    const response = await fetch(`http://localhost:8080/api/movies/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch movie')
    }
    const data = await response.json()
    return data
  },
}
