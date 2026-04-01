import type { ResumeFontId } from "@/types/resume";

export const resumeFontOptions: Array<{
	id: ResumeFontId;
	label: string;
	family: string;
}> = [
	{ id: "sans", label: "Sans", family: "DejaVu Sans" },
	{ id: "serif", label: "Serif", family: "DejaVu Serif" },
	{ id: "mono", label: "Mono", family: "DejaVu Sans Mono" },
];

export function getResumeFontFamily(font: ResumeFontId) {
	return (
		resumeFontOptions.find(option => option.id === font)?.family ??
		resumeFontOptions[0].family
	);
}
