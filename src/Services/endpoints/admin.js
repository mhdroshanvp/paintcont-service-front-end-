export const AdminEndpoints = {
    login:'/admin/login',
    blockpainter:(painterId)=>`/admin/painter/isBlocked/${painterId}`,
    blockuser:(userId)=>`/admin/user/isBlocked/${userId}`,
    fetchpost:'/admin/posts',
    deletePost: (postId) => `/admin/painter/posts/deletePost/${postId}`
}