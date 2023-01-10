export interface SignUpResponse {
    using2FA: boolean,
    qrCodeImage: string|null,
    secret: string|null,
    signupDone: boolean
}
