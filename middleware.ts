import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("Authorization");

  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();

      if (data.user && data.user.roles && data.user.roles.includes("admin")) {
        return NextResponse.next(NextResponse.redirect(request.url));
      } else {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: "/account/:path*",
};
