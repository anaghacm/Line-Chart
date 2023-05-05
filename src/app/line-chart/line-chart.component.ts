import { Component, Input, OnInit } from '@angular/core';
import { LinechartData } from '../Services/linechart-data';
import * as d3 from 'd3'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() projectDetails!: LinechartData[];

  public margin = { top: 10, right: 30, bottom: 30, left: 60 };
  public width = 460 - this.margin.left - this.margin.right;
  public height = 400 - this.margin.top - this.margin.bottom;
  public svg: any

  constructor() { }

  ngOnInit(): void {
    console.log('Init : ', this.projectDetails);
    this.createSvg();
    this.drawChart();
  }

  createSvg() {
    this.svg = d3.select('#linechart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
  }

  drawChart() {
    //x-axis
    var x = d3.scaleLinear()
      .domain([2017,2023])
      .range([0, this.width]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x).ticks(7));

    //y-axis
    var y = d3.scaleLinear()
      .domain([0, 35])
      .range([this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y));

    //scatter dots
    this.svg.append('g')
      .selectAll("dot")
      .data(this.projectDetails)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => { return x(d.year) })
      .attr("cy", (d: any) => { return y(d.projects) })
      .attr("r", 5)
      .style("fill", "#fff")
      .on('mouseover', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('r', 10)
          .style('fill', '#e66b5b')
      })
      .on('mouseout', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('r', 5)
          .style("fill", "#fff")
      })
      .append('title')
      .text((d: any) => { return 'Projects : '+d.projects });

    //Add line
    var line = d3.line()
      .x((d:any) => { return x(d.year) })
      .y((d:any) => { return y(d.projects) });

    this.svg.append("path")
      .datum(this.projectDetails)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#fff")
      .style("stroke-width", "2");
  }
}
