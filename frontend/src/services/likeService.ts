import { apiPost } from '@/utils/axiosConfig'
import { LikeResponse } from '@/types'

export const LikeService = {
  /**
   * Create a new like or unlike for a blog post
   */
  likeOrUnlikePost: (blogId: string) => {
    return apiPost<LikeResponse>(`/like`, { blogId }).then((res) => LikeService.transformPostLikeResponse(res.data))
  },

  transformPostLikeResponse: (response: LikeResponse): number => {
    return response.likers.length
  },
}

export default LikeService
