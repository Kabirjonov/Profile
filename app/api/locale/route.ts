import { NextResponse } from "next/server";

import { defaultLocale, isValidLocale, localeCookieName } from "@/lib/i18n";

export async function POST(request: Request) {
	const body = (await request.json().catch(() => null)) as {
		locale?: string;
	} | null;
	const locale = body?.locale;

	if (!locale || !isValidLocale(locale)) {
		return NextResponse.json(
			{ error: "Invalid locale" },
			{
				status: 400,
			},
		);
	}

	const response = NextResponse.json({ ok: true });
	response.cookies.set(localeCookieName, locale, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
	});

	return response;
}

export async function DELETE() {
	const response = NextResponse.json({ ok: true });
	response.cookies.set(localeCookieName, defaultLocale, {
		path: "/",
		maxAge: 0,
		sameSite: "lax",
	});

	return response;
}
