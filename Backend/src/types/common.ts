import { AuthContext, JWTPayload } from "./authentication"

export type AppEnv = {
    Variables: {
        jwtPayload: JWTPayload;
        authContext: AuthContext;
        validated: Record<string, any>;
    }
}