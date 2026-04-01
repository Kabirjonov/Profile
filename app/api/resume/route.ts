import { NextResponse } from "next/server";

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

type ResumePayload = {
	fullName?: string;
	jobTitle?: string;
	email?: string;
	phone?: string;
	language?: string;
	theme?: string;
	nameFont?: string;
	titleFont?: string;
	bodyFont?: string;
	summary?: string;
	skills?: string;
	experience?: string;
	education?: string;
	profiles?: Array<{ label?: string; value?: string }>;
};

function buildResumeMessage(payload: ResumePayload) {
	const profiles = (payload.profiles ?? [])
		.filter(item => item.label || item.value)
		.map(
			(item, index) =>
				`${index + 1}. ${escapeHtml(item.label ?? "")}: ${escapeHtml(item.value ?? "")}`,
		);

	return [
		"<b>New resume generated</b>",
		`<b>Full name:</b> ${escapeHtml(payload.fullName ?? "")}`,
		`<b>Job title:</b> ${escapeHtml(payload.jobTitle ?? "")}`,
		`<b>Phone:</b> ${escapeHtml(payload.phone ?? "")}`,

		`<b>Email:</b> ${escapeHtml(payload.email ?? "")}`,
		`<b>Profiles:</b>\n${profiles.length ? profiles.join("\n") : "None"}`,
	].join("\n");
}

export async function POST(request: Request) {
	const formData = await request.formData().catch(() => null);

	if (!formData) {
		return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
	}

	const payloadRaw = String(formData.get("payload") ?? "");
	const pdfFile = formData.get("file");

	if (!payloadRaw || !(pdfFile instanceof File)) {
		return NextResponse.json(
			{ error: "payload and file are required" },
			{ status: 400 },
		);
	}

	const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
	const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

	if (!token || !chatId) {
		return NextResponse.json(
			{ error: "Telegram is not configured on server" },
			{ status: 500 },
		);
	}

	let payload: ResumePayload;

	try {
		payload = JSON.parse(payloadRaw) as ResumePayload;
	} catch {
		return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
	}

	try {
		await sendTelegramMessage({
			token,
			chatId,
			text: buildResumeMessage(payload),
		});

		await sendTelegramDocument({
			token,
			chatId,
			file: pdfFile,
			caption: `<b>Resume PDF</b>: ${escapeHtml(pdfFile.name)}`,
		});
	} catch {
		return NextResponse.json(
			{ error: "Failed to send resume to Telegram" },
			{ status: 502 },
		);
	}

	return NextResponse.json({ ok: true });
}
