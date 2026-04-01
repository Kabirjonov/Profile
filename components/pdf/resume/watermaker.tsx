import { Canvas, View } from "@react-pdf/renderer";

const path = "M10 10 L200 10 L200 60 L10 60 Z";

export function Watermarker() {
	const paint = (
		painter: any,
		availableWidth: number,
		availableHeight: number,
	): null => {
		painter.path(path).opacity(0.3).strokeColor("#000000").stroke();
		return null;
	};

	return (
		<View style={{ position: "absolute", right: -9, top: 20, zIndex: 9 }} fixed>
			<Canvas paint={paint} style={{ width: 423, height: 120, right: 470 }} />
		</View>
	);
}
