import { useState } from "react";
import "./App.css";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Bar Chart",
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			barPercentage: 0.5,
			barThickness: 6,
			maxBarThickness: 8,
			minBarLength: 2,
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Dataset 2",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

function App() {
	const [widgets, setWidgets] = useState([]);
	const [widgetCounter, setWidgetCounter] = useState(0);

	const handleOnDrag = (e, widgetType) => e.dataTransfer.setData("widgetType", widgetType);

	const handleOnDrop = e => {
		const widgetType = e.dataTransfer.getData("widgetType");

		setWidgets([
			...widgets,
			{ i: `${widgetType}-${widgetCounter}`, x: (widgets?.length * 3) % 12, y: Infinity, w: 3, h: 3 },
		]);
		setWidgetCounter(widgetCounter + 1);
	};

	const handleDragOver = e => e.preventDefault();

	let widgetsList = ["widget-1", "widget-2", "widget-3", "widget-4", "widget-5", "widget-6"];

	console.log(widgets);

	return (
		<div className='App'>
			<div className='widgets'>
				{widgetsList?.map((item, i) => (
					<div key={i} id={item} className='widget' draggable onDragStart={e => handleOnDrag(e, `${item}`)}>
						{item}
					</div>
				))}
			</div>
			<div className='widget-container' onDrop={handleOnDrop} onDragOver={handleDragOver}>
				<ReactGridLayout
					className='layout custom-layout'
					layout={widgets}
					cols={12}
					autoSize={true}
					isResizable={true}
					rowHeight={30}
					width={820}
					onLayoutChange={l => setWidgets(l)}
				>
					{widgets.map(widget => (
						<div key={widget?.i} className='dropped-widget'>
							{widget?.i.includes("widget-1") && (
								<div style={{ height: "100%", width: "100%" }}>
									<Bar options={options} data={data} />
								</div>
							)}
						</div>
					))}
				</ReactGridLayout>
			</div>
		</div>
	);
}

export default App;
