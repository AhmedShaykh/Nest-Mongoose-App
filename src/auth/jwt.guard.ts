import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard("jwt") {

    canActivate(context: ExecutionContext) {

        return super.canActivate(context);

    };

    handleRequest(err: any, user: any) {

        if (err || !user) {

            if (err) {

                console.log("Authentication Error:", err);

            } else {

                console.log("User Not Found");

            }

            throw err || new UnauthorizedException("Invalid Or Expired JWT Token");

        }

        return user;

    };

};