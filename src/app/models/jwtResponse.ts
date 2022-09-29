export interface JwtResponse {
    token: string,
    id: number,
    username: string,
    email: string,
    roles: Set<string>
}
