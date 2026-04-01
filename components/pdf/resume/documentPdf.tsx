import { Document, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { Watermarker } from "./watermaker";

export default function DocumentPdf() {
	return (
		<Document author='Oxunjon Kabirjonov' title='Resume'>
			<Page size={"A4"}>
				<View>
					<Text>Hello World</Text>
				</View>
				{/* <Watermarker /> */}
			</Page>
		</Document>
	);
}
