import { useState } from 'react'
import './App.css'
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  const [widgets, setWidgets] = useState([]);

  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData('widgetType', widgetType)
  }

  const handleOnDrop = (e) => {
    const widgetType =  e.dataTransfer.getData('widgetType');
    setWidgets([...widgets, widgetType])
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  return (
    <div className='App'>
      <div className='widgets'>
        <div className='widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget 1')}>Widget One</div>
        <div className='widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget 2')}>Widget Two</div>
        <div className='widget' draggable onDragStart={(e) => handleOnDrag(e, 'Widget 3')}>Widget Three</div>
      </div>
      <div className='widget-container' onDrop={handleOnDrop} onDragOver={handleDragOver}>
      <ReactGridLayout
        className="layout custom-layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={820}
      >
        {
          widgets.map((widget, index) => (
            <div key={index} className='dropped-widget'>
              {widget}
            </div>
          ))
        }
        </ReactGridLayout>
      </div>
    </div>
  )
}

export default App
