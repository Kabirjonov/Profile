"use client";

import { useTranslation } from "react-i18next";
import { useContactForm } from "@/hooks/useContactForm";
import { Controller } from "react-hook-form";
import { formatUzPhone } from "@/lib/PhoneFormater";

export function ContactSection() {
	const { t } = useTranslation();
	const { register, control, formState, onSubmit, isPending, serverError } =
		useContactForm();
	const { errors } = formState;

	return (
		<section
			id='contact'
			className='mx-auto w-full max-w-6xl px-6 py-20 sm:px-10'
		>
			<div className='rounded-2xl border border-border/80 bg-card/85 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
				<div className='mx-auto max-w-3xl text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
						{t("sections.contact.title")}
					</h2>
					<div className='mx-auto mt-4 h-1 w-16 rounded-full bg-primary/80' />
					<p className='mx-auto mt-5 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base'>
						{t("sections.contact.description")}
					</p>
				</div>
				<form onSubmit={onSubmit} className='mt-8 grid gap-5'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<div className='grid gap-2 min-w-0'>
							<label htmlFor='fullName' className='text-sm font-medium'>
								{t("sections.contact.form.fullName")}
							</label>
							<input
								id='fullName'
								type='text'
								placeholder={t("sections.contact.form.fullNamePlaceholder")}
								className='w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
								{...register("fullName")}
							/>
							{errors.fullName && (
								<p className='text-xs text-destructive'>
									{errors.fullName.message}
								</p>
							)}
						</div>

						<div className='grid gap-2 min-w-0'>
							<label htmlFor='phone' className='text-sm font-medium'>
								{t("sections.contact.form.phone")}
							</label>
							<Controller
								control={control}
								name='phone'
								render={({ field }) => (
									<input
										id='phone'
										type='tel'
										inputMode='numeric'
										autoComplete='tel'
										placeholder={t("sections.contact.form.phonePlaceholder")}
										className='w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
										value={field.value ?? "+998"}
										onBlur={field.onBlur}
										onChange={event =>
											field.onChange(formatUzPhone(event.target.value))
										}
									/>
								)}
							/>
							{errors.phone && (
								<p className='text-xs text-destructive'>
									{errors.phone.message}
								</p>
							)}
						</div>
					</div>

					<div className='grid gap-2'>
						<label htmlFor='description' className='text-sm font-medium'>
							{t("sections.contact.form.description")}
						</label>
						<textarea
							id='description'
							rows={5}
							placeholder={t("sections.contact.form.descriptionPlaceholder")}
							className='w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
							{...register("description")}
						/>
						{errors.description && (
							<p className='text-xs text-destructive'>
								{errors.description.message}
							</p>
						)}
					</div>

					<div className='grid gap-2'>
						<label htmlFor='file' className='text-sm font-medium'>
							{t("sections.contact.form.file")}
						</label>
						<input
							id='file'
							type='file'
							className='w-full  rounded-lg border border-border bg-background/60 px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary'
							{...register("file")}
						/>
						<p className='text-xs text-muted-foreground'>
							{t("sections.contact.form.fileHint")}
						</p>
						{errors.file && (
							<p className='text-xs text-destructive'>{errors.file.message}</p>
						)}
					</div>

					<button
						type='submit'
						disabled={isPending}
						className='inline-flex jumping w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
					>
						{isPending
							? t("sections.contact.form.submitting")
							: t("sections.contact.form.submit")}
					</button>
					{serverError && (
						<p className='text-sm text-destructive'>{serverError}</p>
					)}
				</form>
			</div>
		</section>
	);
}
