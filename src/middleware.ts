import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/auth(.*)",
  "/",
  "/api(.*)", // This will match all routes under /api/uploadthing
]);

export default clerkMiddleware(
  (auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  },
  {
    afterSignInUrl: "/home",
    afterSignUpUrl: "/onboarding",
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
