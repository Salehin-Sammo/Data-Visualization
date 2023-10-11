function init() {
  const sankey = d3
    .sankey()
    .nodePadding(40)
    .nodeWidth(35)
    .extent([
      [50, 50],
      [700, 500],
    ])
    .iterations(32);

  const chart = d3
    .select("#innerwrapper")
    .append("svg")
    .attr("height", 600)
    .attr("width", 900)
    .append("g");

  const nodes = [
    "Western Australia",
    "Tasmania",
    "South Australia",
    "New South Wales",
    "Queensland",
    "Victoria",
    "Western Australia",
    "Tasmania",
    "South Australia",
    " ",
    "Queensland",
    "Victoria",
  ].map((n) => ({ node: n }));
  const nodeNames = nodes.map((element) => element.node);
  console.log(nodeNames[1]);

  const links = [
    { source: 0, target: 3, value: 20 }, // western australia to new south wales
    { source: 0, target: 4, value: 250 }, // western australia to QueensLand 250
    { source: 0, target: 5, value: 600 }, // western australia to Victoria
    { source: 1, target: 8, value: 290 }, //Tasmania to South Australia 90
    { source: 1, target: 4, value: 790 }, //Tasmania to QueensLand
    { source: 1, target: 5, value: 1110 }, //Tasmania to Victoria
    { source: 2, target: 3, value: 800 }, // South Australia to New south wales
    { source: 2, target: 4, value: 270 }, // South Australia to QueensLand 270
    { source: 2, target: 5, value: 950 }, // South Australia to Victoria

    { source: 3, target: 10, value: 3800 }, //NSW to Queensland 3800
    { source: 3, target: 6, value: 570 }, //NSW to W.A 570
    { source: 3, target: 7, value: 300 }, //NSW to Tasmania  300

    { source: 4, target: 6, value: 250 }, //QU to WA
    { source: 4, target: 8, value: 110 },

    { source: 5, target: 10, value: 2900 }, // Victoria to QLD 2900
    { source: 5, target: 8, value: 380 }, // Vicotria to S.A

    { source: 5, target: 6, value: 20 },
    { source: 5, target: 7, value: 170 },
    { source: 11, target: 3, value: 880 }, // Victoria to NSW 880
  ];

  const graph = sankey({ nodes: nodes, links: links });

  // color blind feature

  const color = d3.scaleOrdinal(d3.schemeSet3).domain([0, nodes.length]);
  var latch = false;
  d3.select("#colorchange").on("click", function changecolor() {
    latch = !latch;
    if (latch == true) {
      const color = d3
        .scaleOrdinal(d3.schemeTableau10)
        .domain([0, nodes.length]);
      chart
        .selectAll("path.link")
        .data(graph.links)
        .join("path")
        .attr("class", "link")
        .attr("d", d3.sankeyLinkHorizontal())
        .style("stroke-width", (d) => d.width)
        .style("stroke", (d) => color(d.source.index))
        .attr("id", (graph, i) => "link-" + i);
      chart
        .selectAll("g.node")
        .data(graph.nodes)
        .join("g")
        .attr("transform", (d) => `translate(${[d.x0, d.y0]})`)
        .attr("class", "node")

        .each(function (d, i) {
          d3.select(this)
            .append("rect")
            .attr("width", d.x1 - d.x0)
            .attr("height", d.y1 - d.y0)
            .style("fill", color(i))
            .style("stroke", "black")
            .style("stroke-width", "2.5px")
            .attr("id", "node-" + i);

          d3.select(this)
            .append("text")
            .attr("x", (d.x1 - d.x0) / 2 + 19)
            .attr("y", (d.y1 - d.y0) / 2 + 6)
            // .attr("dy", ".35em")
            .text(d.node)
            .style("fill", "black")
            .style("font-weight", "bolder");
        })
        .on("mouseover", function (links) {
          d3.select(this).style("stroke-opacity", "0.1");
        })
        .on("mouseout", function (links) {
          d3.select(this).style("stroke-opacity", "1");
        });
    } else {
      const color = d3.scaleOrdinal(d3.schemeSet3).domain([0, nodes.length]);
      chart
        .selectAll("path.link")
        .data(graph.links)
        .join("path")
        .attr("class", "link")
        .attr("d", d3.sankeyLinkHorizontal())
        .style("stroke-width", (d) => d.width)
        .style("stroke", (d) => color(d.source.index))
        .attr("id", (graph, i) => "link-" + i);
      chart
        .selectAll("g.node")
        .data(graph.nodes)
        .join("g")
        .attr("transform", (d) => `translate(${[d.x0, d.y0]})`)
        .attr("class", "node")

        .each(function (d, i) {
          d3.select(this)
            .append("rect")
            .attr("width", d.x1 - d.x0)
            .attr("height", d.y1 - d.y0)
            .style("fill", color(i))
            .style("stroke", "black")
            .style("stroke-width", "2.5px")
            .attr("id", "node-" + i);

          d3.select(this)
            .append("text")
            .attr("x", (d.x1 - d.x0) / 2 + 19)
            .attr("y", (d.y1 - d.y0) / 2 + 6)
            // .attr("dy", ".35em")
            .text(d.node)
            .style("fill", "black")
            .style("font-weight", "bolder");
        })
        .on("mouseover", function (links) {
          d3.select(this).style("stroke-opacity", "0.1");
        })
        .on("mouseout", function (links) {
          d3.select(this).style("stroke-opacity", "1");
        });
    }
  });

  chart
    .selectAll("path.link")
    .data(graph.links)
    .join("path")
    .attr("class", "link")
    .attr("d", d3.sankeyLinkHorizontal())
    .style("stroke-width", (d) => d.width)
    .style("stroke", (d) => color(d.source.index))
    .attr("id", (graph, i) => "link-" + i)

    .on("mouseover", function (links) {
      d3.select("#link-18")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[5] +
            " --> " +
            nodeNames[3] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-10")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[3] +
            " --> " +
            nodeNames[0] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-15")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[5] +
            " --> " +
            nodeNames[2] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-6")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[2] +
            " --> " +
            nodeNames[3] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-7")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[2] +
            " --> " +
            nodeNames[4] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-5")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[1] +
            " --> " +
            nodeNames[5] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-4")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[1] +
            " --> " +
            nodeNames[4] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-3")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[1] +
            " --> " +
            nodeNames[2] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-2")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[0] +
            " --> " +
            nodeNames[5] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-1")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[0] +
            " --> " +
            nodeNames[4] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-11")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[3] +
            " --> " +
            nodeNames[1] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-17")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[5] +
            " --> " +
            nodeNames[1] +
            "\nNet migration: " +
            links.value
          );
        });
      d3.select("#link-12")
        .append("title")
        .text(function (links) {
          return (
            nodeNames[4] +
            " --> " +
            nodeNames[0] +
            "\nNet migration: " +
            links.value
          );
        });

      // Link-9 NSW to QU PURPLE
      d3.select("#link-9").on("mouseover", function (d) {
        d3.select(this)
          .append("title")
          .attr("class", "title")
          .text(function (links) {
            return ` Net migration: ${links.value}\nThis donut chart showcases the 'NATURAL INCREASE' \nin the capital cities.---> `;
          });
        d3.select(this);

        var width = 650;
        height = 450;
        margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the div called 'my_dataviz'
        var svg = d3
          .select("#innerwrapper")
          .append("svg")
          .attr("id", "donut")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // cleanup data
        var data = {
          Perth: 13246,
          Brisbane: 16238,
          Darwin: 1527,
          Hobart: 1266,
          Canberra: 3252,
          Sydney: 32177,
          Melbourne: 27011,
          Adelaide: 4163,
        };

        var color = d3
          .scaleOrdinal()
          .domain([
            "Sydney",
            "Melbourne ",
            "Brisbane ",
            "Adelaide",
            "Perth",
            "Hobart",
            "Darwin",
            "Canberra",
          ])
          .range(d3.schemeSet3);

        var pie = d3
          .pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });
        var data_ready = pie(d3.entries(data));

        // The arc generator
        var arc = d3
          .arc()
          .innerRadius(radius * 0.5) // This is the size of the donut hole
          .outerRadius(radius * 0.9);

        var outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

        svg
          .selectAll("allSlices")
          .data(data_ready)
          .enter()
          .append("path")
          .attr("d", arc)
          .transition()
          .duration(1000)
          .attr("fill", function (d) {
            return color(d.data.key);
          })
          .attr("stroke", "black")
          .style("stroke-width", "3px")
          .style("opacity", 0.7);

        svg
          .selectAll("allPolylines")
          .data(data_ready)
          .enter()
          .append("polyline")
          .transition()
          .duration(1350)
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 2)
          .attr("points", function (d) {
            var posA = arc.centroid(d); // line insertion in the slice
            var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(data_ready)
          .enter()
          .append("text")
          .text(function (d) {
            console.log(d.data.key);
            return d.data.key + "(+" + d.data.value + ")";
          })
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      });
      d3.select("#link-9").on("mouseout", function (d) {
        d3.select("#donut").remove();
      });
      //

      // Link-14 VIC to QU PINK
      d3.select("#link-8").on("mouseover", function (d) {
        d3.select(this)
          .append("title")
          .attr("class", "title")
          .text(function (links) {
            return (
              " Net migration: " +
              links.value +
              "\nThe donut chart showcases the 'INTERNAL MIGRATION'\nin the capital cities.--->"
            );
          });
        d3.select(this);

        var width = 650;
        height = 450;
        margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin;

        var svg = d3
          .select("#innerwrapper")
          .append("svg")
          .attr("id", "donut")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // cleanup data
        var data = {
          Sydney: 51732,
          Hobart: 798,
          Melbourne: 26212,
          Adelaide: 64,
          Perth: 9139,
          Canberra: 3138,
          Brisbane: 14717,
          Darwin: 2289,
        };

        var color = d3
          .scaleOrdinal()
          .domain([
            "Sydney",
            "Melbourne ",
            "Brisbane ",
            "Adelaide",
            "Perth",
            "Hobart",
            "Darwin",
            "Canberra",
          ])

          .range(d3.schemeSet3);

        var pie = d3
          .pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });
        var data_ready = pie(d3.entries(data));

        // The arc generator
        var arc = d3
          .arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.9);

        var outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

        svg
          .selectAll("allSlices")
          .data(data_ready)
          .enter()
          .append("path")
          .attr("d", arc)
          .transition()
          .duration(1000)
          .attr("fill", function (d) {
            return color(d.data.key);
          })
          .attr("stroke", "black")
          .style("stroke-width", "3px")
          .style("opacity", 0.8);

        svg
          .selectAll("allPolylines")
          .data(data_ready)
          .enter()
          .append("polyline")
          .attr("stroke", "black")
          .transition()
          .duration(1350)
          .style("fill", "none")
          .attr("stroke-width", 2)
          .attr("points", function (d) {
            var posA = arc.centroid(d); // line insertion in the slice
            var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(data_ready)
          .enter()
          .append("text")
          .text(function (d) {
            console.log(d.data.key);
            return d.data.key + "(-" + d.data.value + ")";
          })
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      });
      d3.select("#link-14").on("mouseout", function (d) {
        d3.select("#donut").remove();
      });
      //

      // Link-8 SA to VIC RED
      d3.select("#link-14").on("mouseover", function (d) {
        d3.select(this)
          .append("title")
          .attr("class", "title")
          .text(function (links) {
            return (
              " Net migration: " +
              links.value +
              "\nThe donut chart showcases the 'OVERSEAS MIGRATION'\n in the capital cities.--->"
            );
          });
        d3.select(this);

        var width = 650;
        height = 450;
        margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin;

        var svg = d3
          .select("#innerwrapper")
          .append("svg")
          .attr("id", "donut")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // cleanup data
        var data = {
          Sydney: 54886,
          Hobart: 1266,
          Melbourne: 54239,
          Adelaide: 1132,
          Perth: 9681,
          Canberra: 3220,
          Brisbane: 14717,
          Darwin: 1527,
        };

        var color = d3
          .scaleOrdinal()
          .domain([
            "Sydney",
            "Melbourne ",
            "Brisbane ",
            "Adelaide",
            "Perth",
            "Hobart",
            "Darwin",
            "Canberra",
          ])
          .range(d3.schemeCategory10);

        var pie = d3
          .pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });
        var data_ready = pie(d3.entries(data));

        // The arc generator
        var arc = d3
          .arc()
          .innerRadius(radius * 0.5) // This is the size of the donut hole
          .outerRadius(radius * 0.9);

        // Another arc that won't be drawn. Just for labels positioning
        var outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

        svg
          .selectAll("allSlices")
          .data(data_ready)
          .enter()
          .append("path")
          .attr("d", arc)
          .transition(1000)
          .attr("fill", function (d) {
            return color(d.data.key);
          })
          .attr("stroke", "black")
          .style("stroke-width", "3px")
          .style("opacity", 0.8);

        svg
          .selectAll("allPolylines")
          .data(data_ready)
          .enter()
          .append("polyline")
          .transition()
          .duration(1350)
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 2)
          .attr("points", function (d) {
            var posA = arc.centroid(d); // line insertion in the slice
            var posB = outerArc.centroid(d); // line break: i use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(data_ready)
          .enter()
          .append("text")
          .text(function (d) {
            console.log(d.data.key);
            return d.data.key + "(+" + d.data.value + ")";
          })
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      });
      d3.select("#link-8").on("mouseout", function (d) {
        d3.select("#donut").remove();
      });
      //
    })
    .on("mouseout", function (d) {
      d3.select(this).transition().duration(20).delay(3); //makes transition smoother
      d3.select("#donut").remove();
    });

  chart
    .selectAll("g.node")
    .data(graph.nodes)
    .join("g")
    .attr("transform", (d) => `translate(${[d.x0, d.y0]})`)
    .attr("class", "node")

    .each(function (d, i) {
      d3.select(this)
        .append("rect")
        .attr("width", d.x1 - d.x0)
        .attr("height", d.y1 - d.y0)
        .style("fill", color(i))
        .style("stroke", "black")
        .style("stroke-width", "2.5px")
        .attr("id", "node-" + i);

      d3.select(this)
        .append("text")
        .attr("x", (d.x1 - d.x0) / 2 + 19)
        .attr("y", (d.y1 - d.y0) / 2 + 6)
        // .attr("dy", ".35em")
        .text(d.node)
        .style("fill", "black")
        .style("font-weight", "bolder");
    })
    .on("mouseover", function (links) {
      d3.select(this).style("stroke-opacity", "0.1");
    })
    .on("mouseout", function (links) {
      d3.select(this).style("stroke-opacity", "1");
    });
  //
  // create a tooltip
  var tooltip = d3
    .select("svg")
    .append("rect")
    .attr("height", 30)
    .attr("width", 270)
    .style("opacity", 0)
    .attr("stroke-width", "3px")
    .style("stroke", "black")
    .attr("class", "cooltip")
    .style("font-size", "16px");
  var text = d3
    .select("svg")
    .append("text")
    .attr("x", 10)
    .attr("y", 20)
    .style("font-weight", "bold")
    .text(function () {
      // Set the text content for the tooltip
      return "Net Migration: ";
    })
    .style("opacity", 0);

  var mouseover = function (d) {
    text.transition().duration(200).style("opacity", 0.7);
    tooltip
      .transition()
      .duration(2000)
      .attr("width", "250")
      .style("opacity", 0.7);
  };
  var mouseleave = function (d) {
    tooltip.transition().duration(200).style("opacity", 0);
    text.style("opacity", 0);
  };

  // SA
  d3.select("#node-2").on("mouseover", function () {
    mouseover();
    // mousemove();
  });
  d3.select("#node-2").on("mouseout", function () {
    mouseleave();
  });
  d3.select("#node-2").on("mouseover", function () {
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("2,160")
      .attr("id", "arrivals");
    mouseover();
    // mousemove();
  });
  d3.select("#node-2").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
  //

  // TAS
  d3.select("#node-1").on("mouseover", function () {
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("1,213")
      .attr("id", "arrivals");
    mouseover();
  });
  d3.select("#node-1").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
  //

  // QU
  d3.select("#node-10").on("mouseover", function () {
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("25,348")
      .attr("id", "arrivals");
    mouseover();
    // mousemove();
  });
  d3.select("#node-10").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
  //

  // VIC
  d3.select("#node-5").on("mouseover", function () {
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("2,243")
      .attr("id", "arrivals");
    mouseover();
  });
  d3.select("#node-5").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
  //

  // NSW
  d3.select("#node-3").on("mouseover", function () {
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("20,887")
      .attr("id", "arrivals");
    mouseover();
  });
  d3.select("#node-3").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
  //

  // WA
  d3.select("#node-0").on("innerwrapper", function () {
    mouseover();
    d3.select("svg")
      .append("text")
      .attr("x", 120)
      .attr("y", 20)
      .style("color", "white")
      .text("2,410")
      .attr("id", "arrivals");
    mouseover();
    // mousemove();
  });
  d3.select("#node-0").on("mouseout", function () {
    d3.select("#arrivals").remove();
    mouseleave();
  });
}
window.onload = init;
