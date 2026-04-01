import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

import type { ResumeFormValues, ResumeLanguage } from "@/types/resume";
import { getResumeFontFamily } from "@/lib/resume-fonts";
import { getResumeThemeColors } from "@/lib/resume-theme";

Font.register({
	family: "DejaVu Sans",
	fonts: [
		{ src: "/fonts/DejaVuSans.ttf", fontWeight: 400 },
		{ src: "/fonts/DejaVuSans-Bold.ttf", fontWeight: 700 },
	],
});
Font.register({
	family: "DejaVu Serif",
	fonts: [
		{ src: "/fonts/DejaVuSerif.ttf", fontWeight: 400 },
		{ src: "/fonts/DejaVuSerif-Bold.ttf", fontWeight: 700 },
	],
});
Font.register({
	family: "DejaVu Sans Mono",
	fonts: [
		{ src: "/fonts/DejaVuSansMono.ttf", fontWeight: 400 },
		{ src: "/fonts/DejaVuSansMono-Bold.ttf", fontWeight: 700 },
	],
});

const styles = StyleSheet.create({
	page: {
		padding: 32,
		fontSize: 11,
		fontFamily: "DejaVu Sans",
		position: "relative",
	},
	backgroundImage: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	backgroundOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255,255,255,0.78)",
	},
	pageContent: {
		position: "relative",
		zIndex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingBottom: 18,
		marginBottom: 18,
		borderBottomWidth: 1,
		borderBottomColor: "#dbe3f0",
	},
	headerContent: {
		flexGrow: 1,
		paddingRight: 16,
	},
	name: {
		fontSize: 24,
		fontWeight: 700,
	},
	role: {
		marginTop: 6,
		fontSize: 13,
		color: "#2563eb",
	},
	contactRow: {
		marginTop: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	contactText: {
		fontSize: 10,
		color: "#475569",
	},
	photo: {
		width: 82,
		height: 82,
		borderRadius: 14,
		objectFit: "cover",
	},
	photoPlaceholder: {
		width: 82,
		height: 82,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f1f5f9",
		borderWidth: 1,
		borderColor: "#dbe3f0",
	},
	photoPlaceholderText: {
		fontSize: 9,
		color: "#64748b",
	},
	content: {
		flexDirection: "row",
		gap: 20,
	},
	sidebar: {
		width: "32%",
		padding: 14,
		borderRadius: 18,
	},
	main: {
		width: "68%",
	},
	section: {
		marginBottom: 16,
	},
	sectionTitle: {
		marginBottom: 8,
		fontSize: 12,
		fontWeight: 700,
		color: "#0f172a",
	},
	bodyText: {
		fontSize: 10.5,
		lineHeight: 1.5,
		color: "#334155",
	},
	listItem: {
		marginBottom: 6,
		fontSize: 10.5,
		lineHeight: 1.4,
		color: "#334155",
	},
	card: {
		marginBottom: 12,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#edf2f7",
	},
	cardTitle: {
		fontSize: 11.5,
		fontWeight: 700,
	},
	cardSubtitle: {
		marginTop: 4,
		fontSize: 10,
		color: "#64748b",
	},
	cardDescription: {
		marginTop: 6,
		fontSize: 10.5,
		lineHeight: 1.5,
		color: "#334155",
	},
});

type DocumentPdfProps = {
	data: ResumeFormValues;
};

type ResumeBlock = {
	title: string;
	subtitle: string;
	description: string;
};

const pdfLabels: Record<
	ResumeLanguage,
	{
		profiles: string;
		skills: string;
		summary: string;
		experience: string;
		education: string;
		noProfiles: string;
	}
> = {
	uz: {
		profiles: "Profillar",
		skills: "Ko'nikmalar",
		summary: "Qisqacha ma'lumot",
		experience: "Tajriba",
		education: "Ta'lim",
		noProfiles: "Profil qo'shilmagan",
	},
	ru: {
		profiles: "Профили",
		skills: "Навыки",
		summary: "О себе",
		experience: "Опыт",
		education: "Образование",
		noProfiles: "Профили не добавлены",
	},
	en: {
		profiles: "Profiles",
		skills: "Skills",
		summary: "Summary",
		experience: "Experience",
		education: "Education",
		noProfiles: "No profiles added",
	},
};

function toLineList(value: string) {
	return value
		.split("\n")
		.map(item => item.trim())
		.filter(Boolean);
}

function toBlocks(value: string): ResumeBlock[] {
	return value
		.split("\n\n")
		.map(block => block.trim())
		.filter(Boolean)
		.map(block => {
			const [heading = "", ...descriptionLines] = block.split("\n");
			const [title = "", subtitle = ""] = heading
				.split("|")
				.map(part => part.trim());

			return {
				title,
				subtitle,
				description: descriptionLines.join(" ").trim(),
			};
		});
}

function toProfileLines(data: ResumeFormValues) {
	return data.profiles.filter(item => item.label.trim() && item.value.trim());
}

export default function DocumentPdf({ data }: DocumentPdfProps) {
	const skills = toLineList(data.skills);
	const experienceItems = toBlocks(data.experience);
	const educationItems = toBlocks(data.education);
	const profileLines = toProfileLines(data);
	const labels = pdfLabels[data.language];
	const themeColors = getResumeThemeColors(data.theme, data.customColors);
	const nameFontFamily = getResumeFontFamily(data.nameFont);
	const titleFontFamily = getResumeFontFamily(data.titleFont);
	const bodyFontFamily = getResumeFontFamily(data.bodyFont);
	const pageStyle = {
		...styles.page,
		backgroundColor: themeColors.pageBackground,
		color: themeColors.text,
		fontFamily: bodyFontFamily,
	};
	const sidebarStyle = {
		...styles.sidebar,
		backgroundColor: themeColors.sidebarBackground,
		borderWidth: 1,
		borderColor: themeColors.border,
	};
	const headerStyle = {
		...styles.header,
		borderBottomColor: themeColors.border,
	};
	const nameStyle = {
		...styles.name,
		color: themeColors.text,
		fontFamily: nameFontFamily,
	};
	const roleStyle = {
		...styles.role,
		color: themeColors.accent,
		fontFamily: titleFontFamily,
	};
	const contactTextStyle = {
		...styles.contactText,
		color: themeColors.mutedText,
		fontFamily: bodyFontFamily,
	};
	const sectionTitleStyle = {
		...styles.sectionTitle,
		color: themeColors.text,
		fontFamily: titleFontFamily,
	};
	const bodyTextStyle = {
		...styles.bodyText,
		color: themeColors.text,
		fontFamily: bodyFontFamily,
	};
	const listItemStyle = {
		...styles.listItem,
		color: themeColors.text,
		fontFamily: bodyFontFamily,
	};
	const cardStyle = { ...styles.card, borderBottomColor: themeColors.border };
	const cardTitleStyle = {
		...styles.cardTitle,
		color: themeColors.text,
		fontFamily: titleFontFamily,
	};
	const cardSubtitleStyle = {
		...styles.cardSubtitle,
		color: themeColors.mutedText,
		fontFamily: bodyFontFamily,
	};
	const cardDescriptionStyle = {
		...styles.cardDescription,
		color: themeColors.text,
		fontFamily: bodyFontFamily,
	};
	const photoPlaceholderStyle = {
		...styles.photoPlaceholder,
		backgroundColor: themeColors.sidebarBackground,
		borderColor: themeColors.border,
	};
	const photoPlaceholderTextStyle = {
		...styles.photoPlaceholderText,
		color: themeColors.mutedText,
		fontFamily: bodyFontFamily,
	};

	return (
		<>
			<Document author={data.fullName} title={`${data.fullName} Resume`}>
				<Page size='A4' style={pageStyle}>
					{data.backgroundImage ? (
						<>
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<Image
								fixed
								src={data.backgroundImage}
								style={styles.backgroundImage}
							/>
							<View fixed style={styles.backgroundOverlay} />
						</>
					) : null}
					<View style={styles.pageContent}>
						<View style={headerStyle}>
							<View style={styles.headerContent}>
								<Text style={nameStyle}>{data.fullName}</Text>
								<Text style={roleStyle}>{data.jobTitle}</Text>
								<View style={styles.contactRow}>
									<Text style={contactTextStyle}>{data.email}</Text>
								</View>
							</View>
							{data.photo ? (
								// eslint-disable-next-line jsx-a11y/alt-text
								<Image src={data.photo} style={styles.photo} />
							) : (
								<View style={photoPlaceholderStyle}>
									<Text style={photoPlaceholderTextStyle}>No image</Text>
								</View>
							)}
						</View>

						<View style={styles.content}>
							<View style={sidebarStyle}>
								<View style={styles.section}>
									<Text style={sectionTitleStyle}>{labels.profiles}</Text>
									{profileLines.map((item, index) => (
										<Text key={item.label} style={listItemStyle}>
											{index + 1}. {item.label}: {item.value}
										</Text>
									))}
									{profileLines.length === 0 ? (
										<Text style={listItemStyle}>{labels.noProfiles}</Text>
									) : null}
								</View>

								<View style={styles.section}>
									<Text style={sectionTitleStyle}>{labels.skills}</Text>
									{skills.map(skill => (
										<Text key={skill} style={listItemStyle}>
											- {skill}
										</Text>
									))}
								</View>
							</View>

							<View style={styles.main}>
								<View style={styles.section}>
									<Text style={sectionTitleStyle}>{labels.summary}</Text>
									<Text style={bodyTextStyle}>{data.summary}</Text>
								</View>

								<View style={styles.section}>
									<Text style={sectionTitleStyle}>{labels.experience}</Text>
									{experienceItems.map((item, index) => (
										<View
											key={`${item.title}-${item.subtitle}-${index}`}
											style={cardStyle}
										>
											<Text style={cardTitleStyle}>{item.title}</Text>
											{item.subtitle ? (
												<Text style={cardSubtitleStyle}>{item.subtitle}</Text>
											) : null}
											{item.description ? (
												<Text style={cardDescriptionStyle}>
													{item.description}
												</Text>
											) : null}
										</View>
									))}
								</View>

								<View style={styles.section}>
									<Text style={sectionTitleStyle}>{labels.education}</Text>
									{educationItems.map((item, index) => (
										<View
											key={`${item.title}-${item.subtitle}-${index}`}
											style={cardStyle}
										>
											<Text style={cardTitleStyle}>{item.title}</Text>
											{item.subtitle ? (
												<Text style={cardSubtitleStyle}>{item.subtitle}</Text>
											) : null}
											{item.description ? (
												<Text style={cardDescriptionStyle}>
													{item.description}
												</Text>
											) : null}
										</View>
									))}
								</View>
							</View>
						</View>
					</View>
				</Page>
			</Document>
		</>
	);
}
