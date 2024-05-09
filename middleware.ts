import { auth } from '@/auth';

export default auth((req) => {
	const isLogged = !!req.auth;
	const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
	const redirect = req.url.replace(req.nextUrl.pathname, '/login');

	if (isDashboardRoute) {
		if (isLogged) return true;

		return false;
	} else if (isLogged) {
		return Response.redirect(redirect);
	}

	return true;
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
