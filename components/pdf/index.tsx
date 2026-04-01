"use client";

import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

// export { PDFViewer } from "@react-pdf/renderer";
export { default as DocumentPdf } from "./resume/documentPdf";
export const PDFViewer = dynamic(
	() => import("@react-pdf/renderer").then(mod => mod.PDFViewer),
	{ ssr: false, loading: () => <div>Loading PDF Viewer...</div> },
);
export const PDFDownloadLink = dynamic(
	() => import("@react-pdf/renderer").then(mod => mod.PDFDownloadLink),
	{
		ssr: false,
		loading: () => (
			<Button disabled>
				<Loader2 className='animate-spin' />
				Loading...
			</Button>
		),
	},
);
