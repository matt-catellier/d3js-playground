var body = d3.select("body")
body.style('margin', '0px')

var app = d3.select("#app")
var button = d3.select('#button')

app.style('padding', '0px').style('width', '800px').style('height', '500px').style('border', '1px solid black')
button.style('width', '200px').style('padding', '10px').style('border', '1px solid black')

const r = 10;
var svg = app.append("svg").attr("width", '100%').attr("height", '100%')
svg.append("circle").attr("cx", 760).attr("cy", 25).attr("r", r).style("fill", "purple")


let xDir = 1;
let yDir = 1;
let step = 10;
const move = () => {
  const circle = d3.select('circle')
  moveHorizontally(circle, svg)
  moveVertically(circle, svg)
}

const moveHorizontally= (element, parent) => {
  const x = element.node().cx.baseVal.value
  const {width} = parent.node().getBoundingClientRect()
  if (x + r + step * xDir > width) xDir = -1
  if (x - r + step * xDir < 0) xDir = 1
  element.attr("cx", x + (step * xDir))
}

const moveVertically = (element, parent) => {
  const y = element.node().cy.baseVal.value
  const {height} = parent.node().getBoundingClientRect()
  if (y + r + step * yDir > height) yDir = -1
  if (y - r + step * yDir < 0) yDir = 1
  element.attr("cy", y + (step * yDir))
}

let interval = null;
const start = () => {
  interval = setInterval(move, 100);
}
const stop = () => {
  clearInterval(interval);
  interval = null
}

const startStop = () => {
  !interval ? start() : stop()
}

button.on('click', startStop)