import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/protected" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  },
  console.log("withAuth middleware::nonce ")
);

export const config = {
  matcher: ["/protected", "/sign",
  "/editPost"
  ]
};



export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src * 'self';
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}' fonts.googleapis.com;
    img-src * 'self' blob: data: 'nonce-${nonce}' ;
    font-src 'self' https://fonts.gstatic.com ;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  return response;
}

