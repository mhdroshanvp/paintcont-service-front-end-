export const AdminEndpoints = {
    login:'/admin/login',
    blockpainter:(painterId)=>`/admin/painter/isBlocked/${painterId}`,
    blockuser:(userId)=>`/admin/user/isBlocked/${userId}`
}