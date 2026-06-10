import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { ADMIN_EMAILS } from "@/services/admin-access";
 

export function middleware(request: NextRequest) {
    const userCookie = request.cookies.get('user')?.value;

    if (!userCookie) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    try {
        const user = JSON.parse(userCookie);
        const email = String(user?.email ?? "").toLowerCase();

        if (!ADMIN_EMAILS.includes(email)) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } catch {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: '/admin/:path*',
}
