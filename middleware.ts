import { NextRequest, NextResponse } from "next/server";

/**
 * Basic Auth opcional — solo activo si hay BASIC_AUTH_USER y BASIC_AUTH_PASSWORD
 * configuradas en env vars. Si no existen, el sitio queda público.
 *
 * Para privatizar de nuevo: agregar las dos env vars en Vercel.
 * Para abrir público: eliminar las dos env vars en Vercel.
 */
export function middleware(req: NextRequest) {
  const validUser = process.env.BASIC_AUTH_USER;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  // Sin credenciales configuradas -> sitio público
  if (!validUser || !validPassword) {
    return NextResponse.next();
  }

  // Con credenciales configuradas -> exigir Basic Auth
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1] ?? "";
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Alivio Lite"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
