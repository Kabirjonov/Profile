type Lang = "uz" | "ru" | "en";
type ContactMethod = { label: string; href: string };

const MAX_MESSAGE_LENGTH = 500;

const CONTACT_METHODS: ContactMethod[] = [
	{ label: "Telegram", href: "https://t.me/kabirjonov_o" },
	{ label: "Phone", href: "tel:+998946684005" },
	{ label: "Email", href: "mailto:info.kabirjonov@gmail.com" },
	{ label: "Github", href: "https://github.com/Kabirjonov" },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/oxunjon-kabirjanov-022b5325b/",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/kab1rjonov_o/",
	},

	{
		label: "Download CV",
		href: "/resume.pdf",
	},
	{ label: "Contact Form", href: "/#contact" },
];

const replies: Record<
	Lang,
	{
		default: string;
		empty: string;
		tooLong: string;
		error: string;
		intents: Record<string, string>;
	}
> = {
	uz: {
		default:
			"Kechirasiz, savolingizni to'liq tushunmadim. Narx, aloqa, xizmatlar yoki loyiha haqida so'rab ko'ring.",
		empty: "Iltimos, xabar matnini yozing.",
		tooLong: `Xabar juda uzun. Iltimos, ${MAX_MESSAGE_LENGTH} belgidan oshirmang.`,
		error: "Serverda xatolik yuz berdi.",
		intents: {
			greeting: "Salom. Sizga qanday yordam bera olaman?",
			intro:
				"Men Oxunjon Kabirjonovman. Frontend va full-stack yo'nalishda ishlayman, asosan zamonaviy web interfeyslar, dashboardlar va API integratsiyalar ustida tajribam bor.",
			price: "Narxlar xizmat turiga bog'liq. Qaysi xizmat sizni qiziqtiryapti?",
			contact:
				"Men bilan bog'lanish uchun qulay usulni tanlang: Telegram, telefon, email yoki Contact bo'limi.",
			services:
				"Frontend, backend, Telegram bot va portfolio saytlar bo'yicha yordam bera olaman.",
			portfolio:
				"Loyihalarimni Projects bo'limida ko'rishingiz mumkin. Xohlasangiz yo'nalishingizga mos tavsiya beraman.",
			timeline:
				"Muddat loyiha murakkabligiga bog'liq: oddiy landing odatda 2-5 kun, murakkab web app 2-6 hafta.",
			tech: "Asosan Next.js, React, TypeScript va API integratsiyalar bilan ishlayman.",
			workFormat:
				"Remote, hybrid va project-based hamkorlik formatlariga ochiqman. Qisqa muddatli tasklardan tortib to'liq product developmentgacha ishlashim mumkin.",
			thanks: "Marhamat. Yana savol bo'lsa, yozavering.",
			bye: "Xayr. Yaxshi kun tilayman.",
			insult: "Fuck you too 🖕",
		},
	},
	ru: {
		default:
			"Не до конца понял вопрос. Попробуйте спросить о цене, контактах, услугах или проектах.",
		empty: "Пожалуйста, введите сообщение.",
		tooLong: `Сообщение слишком длинное. До ${MAX_MESSAGE_LENGTH} символов.`,
		error: "Произошла ошибка на сервере.",
		intents: {
			greeting: "Здравствуйте. Чем могу помочь?",
			intro:
				"Я Охунджон Кабирджонов. Занимаюсь frontend и full-stack разработкой, чаще всего работаю над современными веб-интерфейсами, dashboard-страницами и API-интеграциями.",
			price: "Стоимость зависит от типа услуги. Что именно вас интересует?",
			contact:
				"Выберите удобный способ связи: Telegram, телефон, email или форма в разделе Contact.",
			services:
				"Могу помочь с frontend, backend, Telegram-ботами и портфолио-сайтами.",
			portfolio:
				"Мои проекты доступны в разделе Projects. Могу подсказать релевантные примеры под вашу задачу.",
			timeline:
				"Срок зависит от сложности: простой лендинг обычно 2-5 дней, сложное веб-приложение 2-6 недель.",
			tech: "Обычно работаю с Next.js, React, TypeScript и API-интеграциями.",
			workFormat:
				"Открыт к remote, hybrid и project-based формату работы. Могу подключаться как к отдельным задачам, так и к полноценной разработке продукта.",
			thanks: "Пожалуйста. Если есть вопросы, пишите.",
			bye: "До связи. Хорошего дня.",
			insult: "Fuck you too 🖕",
		},
	},
	en: {
		default:
			"I did not fully understand your question. Try asking about pricing, contact, services, or projects.",
		empty: "Please enter a message.",
		tooLong: `Message is too long. Keep it under ${MAX_MESSAGE_LENGTH} characters.`,
		error: "Server error occurred.",
		intents: {
			greeting: "Hello. How can I help you?",
			intro:
				"I am Oxunjon Kabirjonov, a frontend and full-stack developer focused on modern web interfaces, dashboard experiences, and API-driven products.",
			price: "Pricing depends on the service type. Which service do you need?",
			contact:
				"Choose a convenient way to contact me: Telegram, phone, email, or the Contact section form.",
			services:
				"I can help with frontend, backend, Telegram bots, and portfolio websites.",
			portfolio:
				"You can check my work in the Projects section. I can also suggest relevant examples for your case.",
			timeline:
				"Timeline depends on complexity: simple landing pages usually take 2-5 days, complex web apps 2-6 weeks.",
			tech: "I mainly work with Next.js, React, TypeScript, and API integrations.",
			workFormat:
				"I am open to remote, hybrid, and project-based collaboration. I can join both short-term tasks and full product development work.",
			thanks: "You are welcome. Feel free to ask more.",
			bye: "Goodbye. Have a great day.",
			insult: "Fuck you too 🖕",
		},
	},
};

const intentKeywords: Record<string, string[]> = {
	greeting: [
		"salom",
		"assalomu",
		"ассалому",
		"привет",
		"здравствуйте",
		"hello",
		"hi",
	],
	intro: [
		"o'zingiz",
		"ozingiz",
		"haqingizda",
		"tanishtir",
		"расскажите о себе",
		"о себе",
		"introduce yourself",
		"about yourself",
		"briefly introduce",
	],
	price: ["narx", "narxi", "qancha", "цена", "стоимость", "price", "cost"],
	contact: [
		"aloqa",
		"boglanish",
		"bog'lanish",
		"boglan",
		"kontakt",
		"contact",
		"email",
		"pochta",
		"telegram",
		"tg",
		"phone",
		"telefon",
		"номер",
		"mail",
		"телефон",
	],
	services: ["xizmat", "xizmatlar", "service", "services", "услуг", "услуги"],
	portfolio: [
		"portfolio",
		"портфолио",
		"project",
		"projects",
		"loyiha",
		"лойиҳа",
		"проект",
		"проекты",
	],
	timeline: [
		"muddat",
		"qancha vaqt",
		"сколько времени",
		"срок",
		"deadline",
		"timeline",
	],
	tech: [
		"texnologiya",
		"stek",
		"stack",
		"technology",
		"technologies",
		"react",
		"next",
		"typescript",
		"tailwind",
	],
	workFormat: [
		"format",
		"remote",
		"hybrid",
		"office",
		"on-site",
		"onsite",
		"work format",
		"работы",
		"формат",
		"удален",
		"remote format",
		"ishga",
		"ishlashga",
		"formatda",
	],
	thanks: ["rahmat", "спасибо", "thanks", "thank you"],
	bye: ["xayr", "hayr", "пока", "до свидания", "bye", "goodbye"],
	insult: ["fuck you"],
};

function normalizeMessage(input: string): string {
	return input
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s']/gu, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function parseLanguage(value: unknown): Lang {
	if (value === "ru" || value === "en" || value === "uz") return value;
	return "uz";
}

function detectIntent(
	message: string,
): keyof (typeof replies)["uz"]["intents"] | null {
	for (const [intent, keywords] of Object.entries(intentKeywords)) {
		if (keywords.some(keyword => message.includes(keyword))) {
			return intent as keyof (typeof replies)["uz"]["intents"];
		}
	}
	return null;
}

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as {
			message?: unknown;
			language?: unknown;
		};
		const language = parseLanguage(body.language);
		const copy = replies[language];

		if (typeof body.message !== "string") {
			return Response.json({ reply: copy.empty }, { status: 400 });
		}

		const rawMessage = body.message.trim();
		if (!rawMessage) {
			return Response.json({ reply: copy.empty }, { status: 400 });
		}

		if (rawMessage.length > MAX_MESSAGE_LENGTH) {
			return Response.json({ reply: copy.tooLong }, { status: 413 });
		}

		const message = normalizeMessage(rawMessage);
		const intent = detectIntent(message);
		const reply = intent ? copy.intents[intent] : copy.default;
		const contacts = intent === "contact" ? CONTACT_METHODS : undefined;

		return Response.json({ reply, contacts, intent });
	} catch {
		return Response.json({ reply: replies.uz.error }, { status: 500 });
	}
}
