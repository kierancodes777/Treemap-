let kickstarterData;
let kickstarterURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawRect = () => {
  let hierarchy = d3.hierarchy(kickstarterData, node => node['children'])
  .sum(node => node['value'])
  .sort((node1, node2) => node2['value'] - node1['value']);
   
  let createTreeMap = d3.treemap()
  .size([975, 575]);
  
  createTreeMap(hierarchy);

  let gPlacment = canvas.selectAll('g')
  .data(hierarchy.leaves())
  .enter()
  .append('g')
  .attr('transform', d => 'translate(' + d['x0'] + ', ' + d['y0'] + ')');

  gPlacment
  .append('rect')
  .attr('class', 'tile')
  .attr('fill', d => {
  let kickstarter = d['data']['category'];
  return kickstarter == 'Product Design' ? 'steelBlue' : kickstarter == 'Tabletop Games' ? '#B9D9EB' : kickstarter == 'Video Games' ? '#FF7F50' : kickstarter == 'Sound' ? '#71BC78' : kickstarter == 'Gaming Hardware' ? '#CE2029' : kickstarter == 'Narrative Film' ? '#FA8072' : kickstarter == '3D Printing' ? '#662d91' : kickstarter == 'Television' ? '#DDA0DD' : kickstarter == 'Food' ? '#C71585' : kickstarter == 'Technology' ? '#c4caa0' : kickstarter == 'Hardware' ? '#32CD32' : kickstarter == 'Web' ? 'sienna' : kickstarter == 'Wearables' ? 'burlywood' : kickstarter == 'Sculpture' ? '#A9A9A9' : kickstarter == 'games' ? '#eec0c8' : kickstarter == 'Apparel' ? '#D0D0D0' : kickstarter == 'Art' ? '#DADD98' : kickstarter == 'Games' ? '#ffb6c1' : kickstarter == 'Gadgets' ? '#004953' : '#008B8B'
  })
  .attr('data-name', d => d['data']['name'])
  .attr('data-category', d => d['data']['category'])
  .attr('data-value', d => d['data']['value'])
  .attr('height', d => d['y1'] - d['y0'])
  .attr('width', d => d['x1'] - d['x0'])
  .on('mouseover', (event, d) => {
   tooltip.transition()
   .style('visibility', 'visible');
   
   tooltip.html('name: ' + d['data']['name'] + '<br />' + 'category: ' + d['data']['category'] + '<br />' + 'value: ' + d['data']['value'])
   .style('left', event.pageX + 20 + 'px')
   .style('top', event.pageY - 100 + 'px')
   .attr('data-value', d['data']['value'])
  })
  .on('mouseout', (event, d) => {
    tooltip.transition()
    .style('visibility', 'hidden')
  })
  console.log(hierarchy.leaves());

  gPlacment.append('text')
  .attr('id', 'textInBox')
  .text(d => d['data']['name'])
  .attr('font-size', 13)
  .attr('x', 5)
  .attr('y', 20);
};

d3.json(kickstarterURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    kickstarterData = data;
    console.log(kickstarterData);
    drawRect();
  }
});