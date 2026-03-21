"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircleMore, Send, Sparkles, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChatMessage = {
	id: string;
	role: "assistant" | "user";
	text: string;
	contacts?: Array<{ label: string; href: string }>;
};

type ChatResponse = {
	reply: string;
	contacts?: Array<{ label: string; href: string }>;
};

function createId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatWidget() {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: "assistant-greeting",
			role: "assistant",
			text: t("chat.greeting"),
		},
	]);
	const shownSuggestionsRef = useRef(false);

	const suggestions = t("chat.suggestions", {
		returnObjects: true,
	}) as string[];

	const canShowSuggestions = useMemo(
		() =>
			!shownSuggestionsRef.current &&
			messages.length === 1 &&
			messages[0]?.role === "assistant",
		[messages],
	);

	async function sendMessage(messageText: string) {
		const trimmed = messageText.trim();
		if (!trimmed || isSending) return;

		shownSuggestionsRef.current = true;
		const userMessage: ChatMessage = {
			id: createId(),
			role: "user",
			text: trimmed,
		};

		setMessages(current => [...current, userMessage]);
		setInput("");
		setIsSending(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: trimmed,
					language: i18n.language,
				}),
			});

			const data = (await response.json()) as ChatResponse;
			setMessages(current => [
				...current,
				{
					id: createId(),
					role: "assistant",
					text: data.reply,
					contacts: data.contacts,
				},
			]);
		} catch {
			setMessages(current => [
				...current,
				{
					id: createId(),
					role: "assistant",
					text: t("chat.error"),
				},
			]);
		} finally {
			setIsSending(false);
		}
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		void sendMessage(input);
	}

	return (
		<div className='fixed bottom-5 right-5 z-50'>
			{isOpen ? (
				<div className='flex h-[560px] w-[360px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#081f44] shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur-sm'>
					<div className='flex items-center justify-between bg-gradient-to-r from-[#3bd6c6] to-[#4bd4db] px-4 py-4 text-slate-950'>
						<div className='flex items-center gap-3'>
							<div className='flex size-10 items-center justify-center rounded-full bg-white/20'>
								<Sparkles size={18} />
							</div>
							<div>
								<p className='text-base font-semibold leading-none'>
									{t("chat.title")}
								</p>
								<p className='mt-1 text-xs text-slate-900/80'>
									{t("chat.status")}
								</p>
							</div>
						</div>

						<button
							type='button'
							onClick={() => setIsOpen(false)}
							className='inline-flex size-10 items-center justify-center rounded-full bg-slate-900/10 transition hover:bg-slate-900/20'
							aria-label={t("chat.close")}
						>
							<X size={18} />
						</button>
					</div>

					<div className='flex-1 space-y-3 overflow-y-auto bg-[#071b3a] px-3 py-4'>
						{messages.map(message => (
							<div
								key={message.id}
								className={`flex ${
									message.role === "assistant"
										? "justify-start"
										: "justify-end"
								}`}
							>
								<div
									className={`max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-relaxed ${
										message.role === "assistant"
											? "rounded-tl-md border border-cyan-400/15 bg-[#0f2c5a] text-slate-100"
											: "rounded-br-md bg-[#2b3f74] text-[#8eb4ff]"
									}`}
								>
									<p>{message.text}</p>
									{message.contacts?.length ? (
										<div className='mt-3 flex flex-wrap gap-2'>
											{message.contacts.map(contact => (
												<Link
													key={contact.href}
													href={contact.href}
													target={
														contact.href.startsWith("http") ? "_blank" : "_self"
													}
													className='rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100 transition hover:bg-cyan-400/20'
												>
													{contact.label}
												</Link>
											))}
										</div>
									) : null}
								</div>
							</div>
						))}

						{canShowSuggestions ? (
							<div className='flex flex-col items-end gap-2 pt-2'>
								{suggestions.map(question => (
									<button
										key={question}
										type='button'
										onClick={() => void sendMessage(question)}
										className='max-w-[92%] rounded-[22px] rounded-br-md bg-[#2b3f74] px-5 py-3 text-right text-sm font-medium text-[#8eb4ff] transition hover:bg-[#334b88]'
									>
										{question}
									</button>
								))}
							</div>
						) : null}
					</div>

					<form
						onSubmit={handleSubmit}
						className='border-t border-cyan-400/10 bg-[#0a2248] p-3'
					>
						<div className='flex items-center gap-3 rounded-[24px] border border-cyan-400/15 bg-[#0a2248]'>
							<input
								value={input}
								onChange={event => setInput(event.target.value)}
								placeholder={t("chat.placeholder")}
								className='h-12 flex-1 bg-transparent px-4 text-sm text-slate-100 outline-none placeholder:text-slate-400'
								maxLength={500}
							/>
							<button
								type='submit'
								disabled={isSending || !input.trim()}
								className='mr-3 inline-flex size-10 items-center justify-center rounded-xl bg-[#2eaab0] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'
								aria-label={t("chat.send")}
							>
								<Send size={18} />
							</button>
						</div>
					</form>
				</div>
			) : (
				<button
					type='button'
					onClick={() => setIsOpen(true)}
					className='inline-flex size-15 items-center justify-center rounded-full bg-gradient-to-r from-[#3bd6c6] to-[#4bd4db] text-slate-950 shadow-[0_18px_40px_rgba(59,214,198,0.35)] transition hover:scale-105'
					aria-label={t("chat.open")}
				>
					<MessageCircleMore size={26} />
				</button>
			)}
		</div>
	);
}

export default ChatWidget;
