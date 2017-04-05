import React from 'react'
import ReactDOM from 'react-dom'


const isTouchDevice = !!(
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
)


const draggableEvents = {
  touch: {
    react: {
      down: 'onTouchStart',
      mouseDown: 'onMouseDown',
      drag: 'onTouchMove',
      drop: 'onTouchEnd',
      move: 'onTouchMove',
      mouseMove: 'onMouseMove',
      up: 'onTouchEnd',
      mouseUp: 'onMouseUp'
    },
    native: {
      down: 'touchstart',
      mouseDown: 'mousedown',
      drag: 'touchmove',
      drop: 'touchend',
      move: 'touchmove',
      mouseMove: 'mousemove',
      up: 'touchend',
      mouseUp: 'mouseup'
    }
  },
  desktop: {
    react: {
      down: 'onMouseDown',
      drag: 'onDragOver',
      drop: 'onDrop',
      move: 'onMouseMove',
      up: 'onMouseUp'
    },
    native: {
      down: 'mousedown',
      drag: 'dragStart',
      drop: 'drop',
      move: 'mousemove',
      up: 'mouseup'
    }
  }
}
const deviceEvents = isTouchDevice ? draggableEvents.touch : draggableEvents.desktop


class TouchCrop extends React.Component {
  setCanvas (canvas) {
    this.canvas = canvas
  }

  render () {
    const defaultStyle = {
      cursor: this.state.drag ? 'grabbing' : 'grab'
    }

    const attributes = {
      width: this.getDimensions().canvas.width,
      height: this.getDimensions().canvas.height,
      style: {
        ...defaultStyle,
        ...this.props.style
      }
    }

    attributes[deviceEvents.react.down] = this.handleMouseDown
    attributes[deviceEvents.react.drag] = this.handleDragOver
    attributes[deviceEvents.react.drop] = this.handleDrop
    if (isTouchDevice) attributes[deviceEvents.react.mouseDown] = this.handleMouseDown

    return (
      <canvas ref={this.setCanvas} {...attributes} />
    )
  }
}

export default TouchCrop