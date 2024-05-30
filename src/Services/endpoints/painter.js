
export const PainterEndpoints = {
    Home:"/painter/getAllPost",
    Login:"/painter/login",
    MailForReset:"/painter/otp/resend",
    Otp:"/painter/otp",
    Profile:"/painter/create-post",
    Signup:"/painter/signup",
    painterProfile:(painterId)=>`/painter/profile/${painterId}`,
    updateDetails: (painterId) => `/painter/update-profile/${painterId}`,
    // createSlote:(painterId)=>`/painter/create-slot/${painterId}`,
    // deletePost:(postId)=>`/painter/delete-post/${postId}`
}