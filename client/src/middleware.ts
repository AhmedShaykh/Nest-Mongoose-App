import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "./lib/routes";

export async function middleware(request: NextRequest) {

    const { pathname, origin } = request.nextUrl;

    let token = request.cookies.get("token")?.value;

    const isPublicRoute = publicRoutes.includes(pathname);

    const isAuthRoute = authRoutes.includes(pathname);

    if (isPublicRoute) {

        if (token) {

            return Response.redirect(new URL(`${origin}`, request.url));

        }

        return null;

    }

    if (!token && isAuthRoute) {

        return NextResponse.redirect(new URL("/login", request.url));

    }

};

export const config = {
    matcher: ["/", "/register", "/login"]
};