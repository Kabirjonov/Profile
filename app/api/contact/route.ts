import { NextResponse } from "next/server";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
	const formData = await request.formData().catch(() => null);

	if (!formData) {
		return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
	}

	const fullName = String(formData.get("fullName") ?? "").trim();
	const phone = String(formData.get("phone") ?? "").trim();
	const description = String(formData.get("description") ?? "").trim();
	const file = formData.get("file");

	if (!fullName || !phone || !description) {
		return NextResponse.json(
			{ error: "fullName, phone and description are required" },
			{ status: 400 }
		);
	}

	if (file && file instanceof File && file.size > MAX_FILE_SIZE_BYTES) {
		return NextResponse.json(
			{ error: "File size should be less than 5MB" },
			{ status: 400 }
		);
	}

	return NextResponse.json({
		ok: true,
		message: "Message sent successfully",
		data: {
			fullName,
			phone,
			description,
			fileName: file instanceof File ? file.name : null,
		},
	});
}
