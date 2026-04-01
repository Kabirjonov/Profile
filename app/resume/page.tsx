import { DocumentPdf, PDFViewer } from "@/components/pdf";

export default function Page() {
	return (
		<PDFViewer className='min-h-screen w-full'>
			<DocumentPdf />
		</PDFViewer>
	);
}
