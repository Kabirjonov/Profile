"use client";

import Image from "next/image";
import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useId, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Check, ImagePlus, Palette, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DocumentPdf, PDFDownloadLink, PDFViewer } from "@/components/pdf";
import { resumeFontOptions } from "@/lib/resume-fonts";
import {
	defaultCustomThemeColors,
	resumeThemeOptions,
} from "@/lib/resume-theme";
import { resumeSchema, type ResumeSchemaValues } from "@/schema/resume.schema";
import { defaultResumeValues } from "@/types/resume";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

type FormFieldProps = {
	label: string;
	error?: string;
	children: ReactNode;
};

function FormField({ label, error, children }: FormFieldProps) {
	return (
		<label className='grid gap-2'>
			<span className='text-sm font-medium text-foreground'>{label}</span>
			{children}
			{error ? <span className='text-xs text-destructive'>{error}</span> : null}
		</label>
	);
}

const inputClassName =
	"w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ResumeBuilderPage() {
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ResumeSchemaValues>({
		resolver: zodResolver(resumeSchema),
		defaultValues: defaultResumeValues,
		mode: "onChange",
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "profiles",
	});

	const values = useWatch({
		control,
		defaultValue: defaultResumeValues,
	});
	const previewValues = useMemo(
		() => ({
			...defaultResumeValues,
			...values,
			customColors: {
				...defaultCustomThemeColors,
				...values.customColors,
			},
			profiles:
				values.profiles?.map((item, index) => ({
					label: item.label ?? defaultResumeValues.profiles[index]?.label ?? "",
					value: item.value ?? defaultResumeValues.profiles[index]?.value ?? "",
				})) ?? defaultResumeValues.profiles,
		}),
		[values],
	);
	const [debouncedPreviewValues, setDebouncedPreviewValues] =
		useState(previewValues);
	const photoInputId = useId();
	const backgroundInputId = useId();
	const pdfPreviewKey = useMemo(
		() => JSON.stringify(debouncedPreviewValues),
		[debouncedPreviewValues],
	);
	const pdfDocument = useMemo(
		() => <DocumentPdf data={debouncedPreviewValues} />,
		[debouncedPreviewValues],
	);

	const onSubmit = (data: ResumeSchemaValues) => data;

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedPreviewValues(previewValues);
		}, 2000);

		return () => window.clearTimeout(timeoutId);
	}, [previewValues]);

	const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const base64Photo = await readFileAsDataUrl(event.target.files?.[0]);
		setValue("photo", base64Photo, { shouldDirty: true, shouldValidate: true });
	};

	const handleBackgroundChange = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const base64Image = await readFileAsDataUrl(event.target.files?.[0]);
		setValue("backgroundImage", base64Image, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<div className='min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8'>
			<div className='mx-auto grid max-w-[80%] gap-6 lg:grid-cols-[420px_minmax(0,1fr)]'>
				<section className='rounded-3xl border border-border bg-card/85 p-5 shadow-sm backdrop-blur-sm sm:p-6'>
					<div className='space-y-2'>
						<p className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
							Resume Builder
						</p>
						<h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
							Create your resume as PDF
						</h1>
						<p className='text-sm leading-relaxed text-muted-foreground'>
							Fill the form, preview the PDF on the right, and download it when
							you are ready.
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='mt-6 grid gap-4'>
						<FormField label='PDF language' error={errors.language?.message}>
							<select className={inputClassName} {...register("language")}>
								<option value='uz'>O&apos;zbekcha</option>
								<option value='ru'>Русский</option>
								<option value='en'>English</option>
							</select>
						</FormField>

						<Accordion
							type='single'
							collapsible
							// className='max-w-lg rounded-lg border'
							// defaultValue='billing'
						>
							<AccordionItem value='item-3'>
								<AccordionTrigger>Customization Fonts</AccordionTrigger>
								<AccordionContent>
									<div className='grid gap-3 rounded-2xl border border-border bg-background/30 p-4'>
										<div>
											<p className='text-sm font-medium text-foreground'>
												Fonts
											</p>
											<p className='text-xs text-muted-foreground'>
												Choose separate fonts for name, title, and body text.
											</p>
										</div>

										<div className='grid gap-4 sm:grid-cols-3'>
											<FormField
												label='Name font'
												error={errors.nameFont?.message}
											>
												<select
													className={inputClassName}
													{...register("nameFont")}
												>
													{resumeFontOptions.map(option => (
														<option key={option.id} value={option.id}>
															{option.label}
														</option>
													))}
												</select>
											</FormField>

											<FormField
												label='Title font'
												error={errors.titleFont?.message}
											>
												<select
													className={inputClassName}
													{...register("titleFont")}
												>
													{resumeFontOptions.map(option => (
														<option key={option.id} value={option.id}>
															{option.label}
														</option>
													))}
												</select>
											</FormField>

											<FormField
												label='Body font'
												error={errors.bodyFont?.message}
											>
												<select
													className={inputClassName}
													{...register("bodyFont")}
												>
													{resumeFontOptions.map(option => (
														<option key={option.id} value={option.id}>
															{option.label}
														</option>
													))}
												</select>
											</FormField>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-1'>
								<AccordionTrigger>Customization theme</AccordionTrigger>
								<AccordionContent>
									<div className='grid gap-3 rounded-2xl border border-border bg-background/30 p-4'>
										<div className='flex items-center gap-2'>
											<Palette size={18} />
											<div>
												<p className='text-sm font-medium text-foreground'>
													Theme
												</p>
												<p className='text-xs text-muted-foreground'>
													Choose one of 5 presets or switch to custom colors.
												</p>
											</div>
										</div>

										<div className='grid gap-3 sm:grid-cols-2'>
											{resumeThemeOptions.map(option => {
												const active = previewValues.theme === option.id;
												return (
													<button
														key={option.id}
														type='button'
														onClick={() =>
															setValue("theme", option.id, {
																shouldDirty: true,
																shouldValidate: true,
															})
														}
														className={`rounded-2xl border p-3 text-left transition ${
															active
																? "border-primary bg-primary/10"
																: "border-border bg-card/70 hover:border-primary/40"
														}`}
													>
														<div className='mb-3 flex items-center justify-between gap-3'>
															<span className='text-sm font-medium text-foreground'>
																{option.label}
															</span>
															{active ? <Check size={16} /> : null}
														</div>
														<div className='flex gap-2'>
															{Object.values(option.colors).map(color => (
																<span
																	key={`${option.id}-${color}`}
																	className='h-5 w-5 rounded-full border border-black/10'
																	style={{ backgroundColor: color }}
																/>
															))}
														</div>
													</button>
												);
											})}
										</div>

										<Button
											type='button'
											variant={
												previewValues.theme === "custom" ? "default" : "outline"
											}
											className='rounded-xl'
											onClick={() =>
												setValue("theme", "custom", {
													shouldDirty: true,
													shouldValidate: true,
												})
											}
										>
											Use custom theme
										</Button>

										{previewValues.theme === "custom" ? (
											<div className='grid gap-4 sm:grid-cols-2'>
												<ColorField
													label='Page background'
													value={previewValues.customColors.pageBackground}
													onChange={value =>
														setValue("customColors.pageBackground", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<ColorField
													label='Sidebar background'
													value={previewValues.customColors.sidebarBackground}
													onChange={value =>
														setValue("customColors.sidebarBackground", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<ColorField
													label='Accent'
													value={previewValues.customColors.accent}
													onChange={value =>
														setValue("customColors.accent", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<ColorField
													label='Text'
													value={previewValues.customColors.text}
													onChange={value =>
														setValue("customColors.text", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<ColorField
													label='Muted text'
													value={previewValues.customColors.mutedText}
													onChange={value =>
														setValue("customColors.mutedText", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<ColorField
													label='Border'
													value={previewValues.customColors.border}
													onChange={value =>
														setValue("customColors.border", value, {
															shouldDirty: true,
															shouldValidate: true,
														})
													}
												/>
												<Button
													type='button'
													variant='outline'
													className='rounded-xl sm:col-span-2'
													onClick={() => {
														setValue("theme", "custom", {
															shouldDirty: true,
															shouldValidate: true,
														});
														setValue("customColors", defaultCustomThemeColors, {
															shouldDirty: true,
															shouldValidate: true,
														});
													}}
												>
													Reset custom colors
												</Button>
											</div>
										) : null}
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						{/* <div className='grid gap-3 rounded-2xl border border-border bg-background/30 p-4'>
							<div className='flex items-center gap-2'>
								<ImagePlus size={18} />
								<div>
									<p className='text-sm font-medium text-foreground'>
										Background
									</p>
									<p className='text-xs text-muted-foreground'>
										Upload your own background image for the PDF page.
									</p>
								</div>
							</div>

							<input
								id={backgroundInputId}
								type='file'
								accept='image/*'
								className='hidden'
								onChange={handleBackgroundChange}
							/>
							<div className='flex flex-col gap-3 sm:flex-row'>
								<label
									htmlFor={backgroundInputId}
									className='inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-background/40 px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:bg-background/70'
								>
									Choose background
								</label>
								<Button
									type='button'
									variant='outline'
									className='rounded-xl'
									onClick={() =>
										setValue("backgroundImage", "", {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
								>
									Clear background
								</Button>
							</div>

							{previewValues.backgroundImage ? (
								<Image
									src={previewValues.backgroundImage}
									alt='Background preview'
									width={640}
									height={220}
									className='h-32 w-full rounded-2xl border border-border object-cover'
								/>
							) : (
								<div className='flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground'>
									No background selected
								</div>
							)}
						</div> */}

						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField label='Full name' error={errors.fullName?.message}>
								<input className={inputClassName} {...register("fullName")} />
							</FormField>
							<FormField label='Job title' error={errors.jobTitle?.message}>
								<input className={inputClassName} {...register("jobTitle")} />
							</FormField>
						</div>

						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField label='Email' error={errors.email?.message}>
								<input
									type='email'
									className={inputClassName}
									{...register("email")}
								/>
							</FormField>
							<FormField label='Profile photo'>
								<div className='grid gap-3'>
									<input
										id={photoInputId}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handlePhotoChange}
									/>
									<label
										htmlFor={photoInputId}
										className='inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-background/40 px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:bg-background/70'
									>
										Choose image
									</label>
									{previewValues.photo ? (
										<Image
											src={previewValues.photo}
											alt='Resume preview'
											className='h-24 w-24 rounded-2xl border border-border object-cover'
											width={96}
											height={96}
										/>
									) : (
										<div className='flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground'>
											No image
										</div>
									)}
								</div>
							</FormField>
						</div>

						<div className='grid gap-3 rounded-2xl border border-border bg-background/30 p-4'>
							<div className='flex items-center justify-between gap-3'>
								<div>
									<p className='text-sm font-medium text-foreground'>
										Profiles
									</p>
									<p className='text-xs text-muted-foreground'>
										Add label and profile name.
									</p>
								</div>
								<Button
									type='button'
									variant='outline'
									size='sm'
									className='rounded-full'
									onClick={() => append({ label: "", value: "" })}
								>
									<Plus />
									Add profile
								</Button>
							</div>

							<div className='grid gap-3'>
								{fields.map((field, index) => (
									<div
										key={field.id}
										className='rounded-2xl border border-border bg-card/80 p-3'
									>
										<div className='mb-3 flex items-center justify-between gap-3'>
											<p className='text-sm font-medium text-foreground'>
												Profile #{index + 1}
											</p>
											<Button
												type='button'
												variant='ghost'
												size='icon-sm'
												onClick={() => remove(index)}
												disabled={fields.length === 1}
											>
												<Trash2 />
											</Button>
										</div>
										<div className='grid gap-3 sm:grid-cols-2'>
											<FormField
												label='Label'
												error={errors.profiles?.[index]?.label?.message}
											>
												<input
													className={inputClassName}
													placeholder='GitHub'
													{...register(`profiles.${index}.label`)}
												/>
											</FormField>
											<FormField
												label='Profile name'
												error={errors.profiles?.[index]?.value?.message}
											>
												<input
													className={inputClassName}
													placeholder='kabirjonov'
													{...register(`profiles.${index}.value`)}
												/>
											</FormField>
										</div>
									</div>
								))}
							</div>
						</div>

						<FormField
							label='Professional summary'
							error={errors.summary?.message}
						>
							<textarea
								rows={4}
								className={inputClassName}
								{...register("summary")}
							/>
						</FormField>

						<FormField
							label='Skills, one per line'
							error={errors.skills?.message}
						>
							<textarea
								rows={6}
								className={inputClassName}
								{...register("skills")}
							/>
						</FormField>

						<FormField
							label='Experience blocks'
							error={errors.experience?.message}
						>
							<textarea
								rows={8}
								className={inputClassName}
								placeholder='Role | Company | Years&#10;What you did...&#10;&#10;Role | Company | Years&#10;What you did...'
								{...register("experience")}
							/>
						</FormField>

						<FormField
							label='Education blocks'
							error={errors.education?.message}
						>
							<textarea
								rows={5}
								className={inputClassName}
								placeholder='Degree | School | Year&#10;Short description...'
								{...register("education")}
							/>
						</FormField>

						<div className='flex flex-col gap-3 pt-2 sm:flex-row'>
							<Button type='submit' className='rounded-xl'>
								Update preview
							</Button>
							<PDFDownloadLink
								key={pdfPreviewKey}
								document={pdfDocument}
								fileName={`${debouncedPreviewValues.fullName || "resume"}-resume.pdf`}
							>
								{({ loading }: { loading: boolean }) => (
									<Button
										type='button'
										variant='outline'
										className='rounded-xl'
									>
										{loading ? "Preparing PDF..." : "Download PDF"}
									</Button>
								)}
							</PDFDownloadLink>
						</div>
					</form>
				</section>

				<section className='rounded-3xl border border-border bg-card/70 p-3 shadow-sm backdrop-blur-sm sm:p-4'>
					<div className='mb-3 flex items-center justify-between gap-3 px-1'>
						<div>
							<h2 className='text-lg font-semibold'>Live preview</h2>
							<p className='text-sm text-muted-foreground'>
								PDF preview updates 2 seconds after you stop typing.
							</p>
						</div>
					</div>
					<div className='overflow-hidden rounded-2xl border border-border bg-background'>
						<PDFViewer key={pdfPreviewKey} className='h-[900px] w-full'>
							{pdfDocument}
						</PDFViewer>
					</div>
				</section>
			</div>
		</div>
	);
}

function fileToDataUrl(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result || ""));
		reader.onerror = () => reject(new Error("Failed to read image file."));
		reader.readAsDataURL(file);
	});
}

async function readFileAsDataUrl(file?: File) {
	if (!file) {
		return "";
	}

	return fileToDataUrl(file);
}

type ColorFieldProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

function ColorField({ label, value, onChange }: ColorFieldProps) {
	return (
		<label className='grid gap-2'>
			<span className='text-sm font-medium text-foreground'>{label}</span>
			<div className='flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3 py-2'>
				<input
					type='color'
					value={value}
					onChange={event => onChange(event.target.value)}
					className='h-10 w-12 cursor-pointer rounded border-0 bg-transparent p-0'
				/>
				<input
					type='text'
					value={value}
					onChange={event => onChange(event.target.value)}
					className='w-full bg-transparent text-sm outline-none'
				/>
			</div>
		</label>
	);
}
