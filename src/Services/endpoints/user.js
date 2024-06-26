export const UserEndpoints = {
    homePage: '/user/getAllPost',
    login: '/user/login',
    mailForOtp:'/user/mail4otp',
    OTP:'/user/otp',
    UserPainterProfile:'/painter/create-post',
    userProfile:(userId)=>`/user/profile/${userId}`,
    SignUp:'/user/signup',
    report:'/user/report',
    search:'/user/search',
    changePassword:"/user/profile/change-password",
    updateUserProfile:"/user/profile/updateUserProfile",
    like:'/user/update-like',
    booked:'/user/painter/slot-booking'
}   