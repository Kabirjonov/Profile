"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";

const WIDGET_COPY = {
	uz: {
		title: "Yordamchi",
		online: "Online",
		languagePrompt: "Qaysi tilda chatlashamiz?",
		messagePlaceholder: "Xabar yozing...",
		typing: "Yozmoqda...",
		fallback:
			"Hozircha javob bera olmayapman. Iltimos keyinroq urinib ko‘ring.",
		noReply: "Javob kelmadi",
	},
	ru: {
		title: "Помощник",
		online: "Онлайн",
		languagePrompt: "На каком языке общаемся?",
		messagePlaceholder: "Введите сообщение...",
		typing: "Печатает...",
		fallback: "Сейчас не могу ответить. Попробуйте позже.",
		noReply: "Ответ не получен",
	},
	en: {
		title: "Assistant",
		online: "Online",
		languagePrompt: "Which language should we use?",
		messagePlaceholder: "Type your message...",
		typing: "Typing...",
		fallback: "I cannot answer right now. Please try again later.",
		noReply: "No reply received",
	},
};

const LANGUAGE_OPTIONS = [
	{ id: "uz", label: "O'zbek" },
	{ id: "ru", label: "Русский" },
	{ id: "en", label: "English" },
];

function isExternalLink(href) {
	return (
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:")
	);
}

function getWelcomeMessage(language) {
	if (language === "ru") return "Здравствуйте. Чем могу помочь?";
	if (language === "en") return "Hello. How can I help you?";
	return "Assalom alekum. Sizga qanday yordam bera olaman?";
}

export default function ChatWidget() {
	const [open, setOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(null);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef(null);
	const activeLanguage = selectedLanguage ?? "uz";
	const copy = WIDGET_COPY[activeLanguage];

	useEffect(() => {
		if (!scrollRef.current) return;
		scrollRef.current.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [messages, open, isTyping]);

	const openWidget = () => {
		setOpen(true);
		setSelectedLanguage(null);
		setMessages([]);
		setInput("");
		setIsSending(false);
		setIsTyping(false);
	};

	const closeWidget = () => {
		setOpen(false);
		setSelectedLanguage(null);
		setMessages([]);
		setInput("");
		setIsSending(false);
		setIsTyping(false);
	};

	const animateTyping = async text =>
		new Promise(resolve => {
			setIsTyping(true);
			let currentText = "";
			let i = 0;
			const int = setInterval(() => {
				if (i < text.length) {
					const step =
						Math.floor(Math.random() * Math.min(4, text.length - i)) + 1;
					currentText += text.slice(i, i + step);
					i += step;
					setMessages(prev => {
						const arr = [...prev];
						if (arr[arr.length - 1]?.role === "bot") {
							arr[arr.length - 1] = {
								...arr[arr.length - 1],
								text: currentText,
							};
						}
						return arr;
					});
				} else {
					clearInterval(int);
					setIsTyping(false);
					resolve();
				}
			}, 40);
		});

	const chooseLanguage = async language => {
		setSelectedLanguage(language);
		setInput("");
		setMessages(prev => [...prev, { role: "bot", text: "" }]);
		await animateTyping(getWelcomeMessage(language));
	};

	const sendMessage = async () => {
		if (!input.trim() || isSending || isTyping || !selectedLanguage) return;
		const messageText = input.trim();

		setMessages(prev => [...prev, { role: "user", text: messageText }]);
		setInput("");
		setIsSending(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: messageText,
					language: selectedLanguage,
				}),
			});

			if (!res.ok) {
				throw new Error("Chat API error");
			}
			const data = await res.json();
			const replyText = data.reply || copy.noReply;
			const contacts = Array.isArray(data.contacts) ? data.contacts : undefined;
			setMessages(prev => [...prev, { role: "bot", text: "", contacts }]);
			await animateTyping(replyText);
		} catch {
			setMessages(prev => [...prev, { role: "bot", text: "" }]);
			await animateTyping(copy.fallback);
		} finally {
			setIsSending(false);
		}
	};

	const handleInputKeyDown = e => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<>
			{!open && (
				<button
					onClick={openWidget}
					aria-label='Open chat'
					className='fixed right-4 bottom-4 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition hover:-translate-y-1 hover:brightness-105 sm:right-6 sm:bottom-6'
				>
					<MessageCircle size={24} />
				</button>
			)}

			{open && (
				<div className='fixed right-4 bottom-4 z-[9999] flex h-[min(70vh,38rem)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/95 text-card-foreground shadow-2xl shadow-black/20 backdrop-blur md:right-6 md:bottom-6'>
					<div className='flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-primary/90 via-primary to-primary/80 px-4 py-3 text-primary-foreground'>
						<div className='flex items-center gap-2'>
							<Sparkles size={16} />
							<div className='flex flex-col'>
								<span className='text-sm font-semibold tracking-wide'>
									{copy.title}
								</span>
								<span className='text-[11px] opacity-90'>{copy.online}</span>
							</div>
						</div>
						<button
							onClick={closeWidget}
							aria-label='Close chat'
							className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20'
						>
							<X size={16} />
						</button>
					</div>

					{!selectedLanguage && (
						<div className='flex flex-1 flex-col items-start justify-start gap-4 bg-background/55 p-2 text-center'>
							<p className='rounded-lg bg-secondary p-2 text-sm font-medium'>
								{copy.languagePrompt}
							</p>
							<div className='flex w-full gap-2'>
								{LANGUAGE_OPTIONS.map(language => (
									<Button
										key={language.id}
										variant='outline'
										onClick={() => chooseLanguage(language.id)}
									>
										{language.label}
									</Button>
								))}
							</div>
						</div>
					)}

					{selectedLanguage && (
						<>
							<div
								ref={scrollRef}
								className='flex-1 space-y-3 overflow-y-auto bg-background/55 px-3 py-3 sm:px-4'
							>
								{messages.map((msg, i) => (
									<div
										key={i}
										className={`flex ${
											msg.role === "user" ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
												msg.role === "user"
													? "rounded-br-sm bg-primary text-primary-foreground"
													: "rounded-bl-sm border border-border/70 bg-card text-card-foreground"
											}`}
										>
											{msg.text}
											{msg.role === "bot" &&
												Array.isArray(msg.contacts) &&
												msg.contacts.length > 0 && (
													<div className='mt-2 flex flex-wrap gap-2'>
														{msg.contacts.map(contact => (
															<a
																key={`${contact.label}-${contact.href}`}
																href={contact.href}
																target={
																	isExternalLink(contact.href)
																		? "_blank"
																		: "_self"
																}
																rel='noreferrer'
																className='rounded-lg border border-border bg-secondary px-2 py-1 text-xs font-medium transition hover:bg-primary hover:text-primary-foreground'
															>
																{contact.label}
															</a>
														))}
													</div>
												)}
										</div>
									</div>
								))}
							</div>

							<div className='flex items-center gap-2 border-t border-border/70 bg-card px-3 py-3 sm:px-4'>
								<input
									type='text'
									placeholder={copy.messagePlaceholder}
									value={input}
									onChange={e => setInput(e.target.value)}
									onKeyDown={handleInputKeyDown}
									className='h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60'
								/>
								<Button
									size='icon'
									onClick={sendMessage}
									disabled={isSending || isTyping || !input.trim()}
								>
									<Send />
								</Button>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
