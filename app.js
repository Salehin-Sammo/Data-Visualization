function init() {
  var w = 900;
  var h = 600;

  var color = d3.scaleQuantize()
    .range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

  var projection = d3.geoMercator()
    .center([140, -25])
    .translate([w / 2, h / 2])
    .scale(700);
  var path = d3.geoPath()
    .projection(projection);

  // Creating SVG body for the map
  var mapSvg = d3.select("#mapContainer")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

  // Creating the tooltip element for the map
  var mapTooltip = d3.select("#mapContainer")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Loading the unemployment data
  d3.csv("au.csv", function(data) {
    console.log(data);
    color.domain([0, d3.max(data, function(d) {
      return d.statem_20;
    })]);

    d3.json("australia.json", function(json) {
      console.log(json);
      for (var i = 0; i < data.length; i++) {
        var dataState = data[i].state;
        var dataValue = data[i].statem_20;
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.STATE_NAME;
          if (dataState == jsonState) {
            json.features[j].properties.STATE_CODE = dataValue;
            break;
          }
        }
      }

      mapSvg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", function(d) { return "map-" + d.properties.STATE_NAME.replace(/ /g, "-"); })
    .style("fill", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        return color(value);
      } else {
        return "#aaa";
      }
    })
    .attr("title", function(d) {
      return d.properties.STATE_NAME;
    })

// For New South Wales
    d3.select("#map-New-South-Wales")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 18900 },
        { Country: "India", Migration: 14500 },
        { Country: "Philippines", Migration: 8900 },
        { Country: "Vietnam", Migration: 8900 },
        { Country: "Italy", Migration: 6100 },
        { Country: "South Africa", Migration: 5300 },
        { Country: "Malaysia", Migration: 3100 },
        { Country: "Scotland", Migration: 2900 },
        { Country: "Sri Lanka", Migration: 2800 },
        { Country: "Germany", Migration: 2900 },
        { Country: "Greece", Migration: 3100 },
        { Country: "South Korea", Migration: 5000 },
        { Country: "USA", Migration: 3200 },
        { Country: "Hong Kong", Migration: 4100 },
        { Country: "Lebanon", Migration: 5900 },
        { Country: "Ireland", Migration: 2400 },
        { Country: "Indonesia", Migration: 2900 },
        { Country: "Netherlands", Migration: 1600 }
      ]
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

// For Victoria
    d3.select("#map-Victoria")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 17600 },
        { Country: "India", Migration: 8200 },
        { Country: "Philippines", Migration: 4300 },
        { Country: "Vietnam", Migration: 10500 },
        { Country: "Italy", Migration: 4200 },
        { Country: "South Africa", Migration: 7500 },
        { Country: "Malaysia", Migration: 6200 },
        { Country: "Scotland", Migration: 2400 },
        { Country: "Sri Lanka", Migration: 6100 },
        { Country: "Germany", Migration: 9000 },
        { Country: "Greece", Migration: 6300 },
        { Country: "South Korea", Migration: 3400 },
        { Country: "USA", Migration: 4500 },
        { Country: "Hong Kong", Migration: 3300 },
        { Country: "Lebanon", Migration: 4100 },
        { Country: "Ireland", Migration: 2800 },
        { Country: "Indonesia", Migration: 2500 },
        { Country: "Netherlands", Migration: 4100 }
      ];      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

//For Queensland

    d3.select("#map-Queensland")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 5200 },
        { Country: "India", Migration: 4100 },
        { Country: "Philippines", Migration: 2300 },
        { Country: "Vietnam", Migration: 1600 },
        { Country: "Italy", Migration: 1900 },
        { Country: "South Africa", Migration: 3800 },
        { Country: "Malaysia", Migration: 1900 },
        { Country: "Scotland", Migration: 3200 },
        { Country: "Sri Lanka", Migration: 1500 },
        { Country: "Germany", Migration: 2400 },
        { Country: "Greece", Migration: 1200 },
        { Country: "South Korea", Migration: 2000 },
        { Country: "USA", Migration: 3000 },
        { Country: "Hong Kong", Migration: 1800 },
        { Country: "Lebanon", Migration: 800 },
        { Country: "Ireland", Migration: 2200 },
        { Country: "Indonesia", Migration: 900 },
        { Country: "Netherlands", Migration: 2400 }
      ];
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

//For South Australia

d3.select("#map-South-Australia")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 1140 },
        { Country: "India", Migration: 970 },
        { Country: "Philippines", Migration: 560 },
        { Country: "Vietnam", Migration: 520 },
        { Country: "Italy", Migration: 880 },
        { Country: "South Africa", Migration: 430 },
        { Country: "Malaysia", Migration: 470 },
        { Country: "Scotland", Migration: 590 },
        { Country: "Sri Lanka", Migration: 280 },
        { Country: "Germany", Migration: 650 },
        { Country: "Greece", Migration: 670 },
        { Country: "South Korea", Migration: 390 },
        { Country: "USA", Migration: 680 },
        { Country: "Hong Kong", Migration: 410 },
        { Country: "Lebanon", Migration: 210 },
        { Country: "Ireland", Migration: 380 },
        { Country: "Indonesia", Migration: 240 },
        { Country: "Netherlands", Migration: 530 }
      ];
      
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    //For Northern Territory
    d3.select("#map-Northern-Territory")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'yellow');
      var selectedData = [
        { Country: "China", Migration: 180 },
        { Country: "India", Migration: 320 },
        { Country: "Philippines", Migration: 230 },
        { Country: "Vietnam", Migration: 111 },
        { Country: "Italy", Migration: 69 },
        { Country: "South Africa", Migration: 123 },
        { Country: "Malaysia", Migration: 98 },
        { Country: "Scotland", Migration: 78 },
        { Country: "Sri Lanka", Migration: 66 },
        { Country: "Germany", Migration: 24 },
        { Country: "Greece", Migration: 90 },
        { Country: "South Korea", Migration: 129 },
        { Country: "USA", Migration: 10 },
        { Country: "Hong Kong", Migration: 33 },
        { Country: "Lebanon", Migration: 38 },
        { Country: "Ireland", Migration: 10 },
        { Country: "Indonesia", Migration: 18 },
        { Country: "Netherlands", Migration: 62 }
      ];
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    //For Western Australia
    d3.select("#map-Western-Australia")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 2800 },
        { Country: "India", Migration: 5200 },
        { Country: "Philippines", Migration: 3300 },
        { Country: "Vietnam", Migration: 1600 },
        { Country: "Italy", Migration: 1800 },
        { Country: "South Africa", Migration: 3800 },
        { Country: "Malaysia", Migration: 2700 },
        { Country: "Scotland", Migration: 2500 },
        { Country: "Sri Lanka", Migration: 1100 },
        { Country: "Germany", Migration: 1500 },
        { Country: "Greece", Migration: 900 },
        { Country: "South Korea", Migration: 800 },
        { Country: "USA", Migration: 1000 },
        { Country: "Hong Kong", Migration: 900 },
        { Country: "Lebanon", Migration: 800 },
        { Country: "Ireland", Migration: 1800 },
        { Country: "Indonesia", Migration: 1200 },
        { Country: "Netherlands", Migration: 800 }
      ];
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    //For ACT
    d3.select("#map-ACT")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 970 },
        { Country: "India", Migration: 830 },
        { Country: "Philippines", Migration: 570 },
        { Country: "Vietnam", Migration: 640 },
        { Country: "Italy", Migration: 470 },
        { Country: "South Africa", Migration: 780 },
        { Country: "Malaysia", Migration: 540 },
        { Country: "Scotland", Migration: 690 },
        { Country: "Sri Lanka", Migration: 620 },
        { Country: "Germany", Migration: 880 },
        { Country: "Greece", Migration: 450 },
        { Country: "South Korea", Migration: 590 },
        { Country: "USA", Migration: 910 },
        { Country: "Hong Kong", Migration: 540 },
        { Country: "Lebanon", Migration: 280 },
        { Country: "Ireland", Migration: 400 },
        { Country: "Indonesia", Migration: 490 },
        { Country: "Netherlands", Migration: 520 }
      ];
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    //For Tasmania
    d3.select("#map-Tasmania")
      .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', 'red');
      var selectedData = [
        { Country: "China", Migration: 390 },
        { Country: "India", Migration: 270 },
        { Country: "Philippines", Migration: 150 },
        { Country: "Vietnam", Migration: 90 },
        { Country: "Italy", Migration: 230 },
        { Country: "South Africa", Migration: 320 },
        { Country: "Malaysia", Migration: 200 },
        { Country: "Scotland", Migration: 410 },
        { Country: "Sri Lanka", Migration: 80 },
        { Country: "Germany", Migration: 370 },
        { Country: "Greece", Migration: 110 },
        { Country: "South Korea", Migration: 180 },
        { Country: "USA", Migration: 360 },
        { Country: "Hong Kong", Migration: 120 },
        { Country: "Lebanon", Migration: 50 },
        { Country: "Ireland", Migration: 260 },
        { Country: "Indonesia", Migration: 130 },
        { Country: "Netherlands", Migration: 240 }
      ];
      
  
      updateBarChart(selectedData);

      mapTooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      mapTooltip.html(d.properties.STATE_NAME + " has " + d.properties.STATE_CODE + " migrated people")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      var value = d.properties.STATE_CODE;
      if (value) {
        d3.select(this).style("fill", color(value));
      } else {
        d3.select(this).style("fill", "#aaa");
      }
      barChartSvg.selectAll(".bar").remove();
      barChartSvg.selectAll(".bar-label").remove();
      barChartSvg.select(".x-axis").remove();
      barChartSvg.select(".y-axis").remove();

      var radialElement = d3.select('#chartContainer')
        .selectAll('path')
        .filter(function(dr) {
          return dr.data.State === d.properties.STATE_NAME;
        });
      radialElement.attr('fill', function(dr) {
        return z(dr.data[d3.select(this.parentNode).datum().key]);
      });

      mapTooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

      mapSvg.selectAll("text")
        .data(json.features)
        .enter()
        .append("text")
        .attr("x", function(d) {
          return path.centroid(d)[0];
        })
        .attr("y", function(d) {
          return path.centroid(d)[1];
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text(function(d) {
          return d.properties.STATE_NAME;
        });

      d3.csv("au.csv", function(data) {
        console.log(data);
        mapSvg.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", function(d) {
            return Math.sqrt(parseInt(d.citym_20) * 0.01);
          })
          .style("fill", "black")
          .style("stroke", "yellow")
          .style("stroke-width", 1)
          .style("opacity", 0.75)
          .append("title")
          .text(function(d) {
            return d.city + ": Migration " + d.citym_20;
          });
      });
    });
  });



  var barChartWidth = 800;
  var barChartHeight = 500;
  var barChartMargin = { top: 80, right: 80, bottom: 80, left: 80 };
  var barChartInnerWidth = barChartWidth - barChartMargin.left - barChartMargin.right;
  var barChartInnerHeight = barChartHeight - barChartMargin.top - barChartMargin.bottom;
  
  var barChartSvg = d3.select("#barChartContainer")
    .append("svg")
    .attr("width", barChartWidth)
    .attr("height", barChartHeight)
    .append("g")
    .attr("transform", "translate(" + barChartMargin.left + "," + barChartMargin.top + ")");
  
    function updateBarChart(selectedData) {
      // Sort the data in descending order based on migration numbers
      selectedData.sort(function(a, b) {
        return b.Migration - a.Migration;
      });
    
      // Remove existing bars
      barChartSvg.selectAll(".bar").remove();
    
      // Set the x-axis scale
      var xScale = d3.scaleBand()
        .domain(selectedData.map(function(d) {
          return d.Country;
        }))
        .range([0, barChartInnerWidth])
        .padding(0.1);
    
      // Set the y-axis scale
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(selectedData, function(d) {
          return d.Migration;
        })])
        .range([barChartInnerHeight, 0]);
    
      // Create a linear gradient for the bar colors
      var gradient = barChartSvg.append("defs")
        .append("linearGradient")
        .attr("id", "bar-gradient")
        .attr("gradientTransform", "rotate(90)");
    
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "steelblue");
    
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "lightblue");
    
      // Create the bars
      var bars = barChartSvg.selectAll(".bar")
        .data(selectedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return xScale(d.Country);
        })
        .attr("y", function(d) {
          return yScale(d.Migration);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return barChartInnerHeight - yScale(d.Migration);
        })
        .attr("fill", "url(#bar-gradient)");
    
      // Add labels to the bars
      barChartSvg.selectAll(".bar-label")
        .data(selectedData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .text(function(d) {
          return d.Migration;
        })
        .attr("x", function(d) {
          return xScale(d.Country) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return yScale(d.Migration) - 5;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "grey")
        .attr("font-size", 11);
    
      // Create the x-axis
      var xAxis = d3.axisBottom(xScale);
      barChartSvg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + barChartInnerHeight + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 10)
        .attr("x", -10)
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end")
        .attr("fill", "black");
    
      // Create the y-axis
      var yAxis = d3.axisLeft(yScale);
      barChartSvg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", "black")
        .style("font-size", "12px");
    
      // Increase the height of the y-axis ticks
      barChartSvg.selectAll(".y-axis .tick line")
        .attr("x2", barChartInnerWidth)
        .attr("stroke-dasharray", "4");
    }
    
}

window.onload = init;