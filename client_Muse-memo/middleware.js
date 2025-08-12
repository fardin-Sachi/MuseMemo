import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/home"]
const publicRoutes = ["/","/signup"]

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    
    const cookie = await cookies()
    const session = await decrypt(cookie.get('session')?.value)

    // const isProtectedRoute = protectedRoutes.includes(path)
    const isProtectedRoute = path.startsWith("/home")
    const isPublicRoute = publicRoutes.includes(path)

    // console.log(session)

    if(isProtectedRoute && !session?.userId){
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    if(session?.userId) {
        if(path === "/home") return NextResponse.redirect(new URL(`/home/${session.username}`, req.nextUrl))
        if(path === "/home/user") return NextResponse.redirect(new URL(`/home/user/${session.username}`, req.nextUrl))
        if(path === "/home/blog") return NextResponse.redirect(new URL(`/home/blog/${session.username}`, req.nextUrl))
        // return NextResponse.redirect(new URL("/home", req.nextUrl))
    }

    return NextResponse.next()
}