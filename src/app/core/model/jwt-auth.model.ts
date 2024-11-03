export interface JwtAuth {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string, 
    pointOfSales : number[]
}