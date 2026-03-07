import { NextResponse } from "next/server";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const TELEGRAM_API_BASE = "https://api.telegram.org";

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

async function sendTelegramMessage({
	token,
	chatId,
	text,
}: {
	token: string;
	chatId: string;
	text: string;
}) {
	const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chat_id: chatId,
			text,
			parse_mode: "HTML",
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data?.description || "Telegram sendMessage failed");
	}

	return data;
}

async function sendTelegramDocument({
	token,
	chatId,
	file,
	caption,
}: {
	token: string;
	chatId: string;
	file: File;
	caption: string;
}) {
	const telegramForm = new FormData();
	telegramForm.append("chat_id", chatId);
	telegramForm.append("caption", caption);
	telegramForm.append("parse_mode", "HTML");
	telegramForm.append("document", file, file.name);

	const response = await fetch(
		`${TELEGRAM_API_BASE}/bot${token}/sendDocument`,
		{
			method: "POST",
			body: telegramForm,
		},
	);

	if (!response.ok) {
		throw new Error("Telegram sendDocument failed");
	}
}

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
			{ status: 400 },
		);
	}

	if (file && file instanceof File && file.size > MAX_FILE_SIZE_BYTES) {
		return NextResponse.json(
			{ error: "File size should be less than 5MB" },
			{ status: 400 },
		);
	}

	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;

	if (!token || !chatId) {
		return NextResponse.json(
			{ error: "Telegram is not configured on server" },
			{ status: 500 },
		);
	}

	const messageText = [
		"<b>New contact request</b>",
		`<b>Name:</b> ${escapeHtml(fullName)}`,
		`<b>Phone:</b> ${escapeHtml(phone)}`,
		`<b>Description:</b> ${escapeHtml(description)}`,
	].join("\n");

	try {
		await sendTelegramMessage({ token, chatId, text: messageText });

		if (file instanceof File) {
			await sendTelegramDocument({
				token,
				chatId,
				file,
				caption: `<b>Attachment</b>: ${escapeHtml(file.name)}`,
			});
		}
	} catch {
		return NextResponse.json(
			{ error: "Failed to send message to Telegram" },
			{ status: 502 },
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
