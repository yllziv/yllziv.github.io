/**
 * Created by ziv on 2015/2/3.
 */
 var showPeople = function (peopleArray) {
     var scriptDom = document.createElement("script")
     scriptDom.type = "text/javascript";
     scriptDom.src = "js/d3js/extarray.js";
     document.body.appendChild(scriptDom)
    document.getElementById("myBubbleChart").innerHTML ="";
    var bubbleChart = new d3.svg.BubbleChart({
        supportResponsive: true,
        //container: => use @default
        size: 600,
        //viewBoxSize: => use @default
        innerRadius: 600 / 3.5,
        //outerRadius: => use @default
        radiusMin: 50,
        //radiusMax: use @default
        //intersectDelta: use @default
        //intersectInc: use @default
        //circleColor: use @default
        data: {
            items:peopleArray,
//            items: [
//                {text: "杨龙龙", count: "500",attrName:"姓名"},
//                {text: "男", count: "300",attrName:"性别"},
//                {text: "21", count: "300",attrName:"年龄"},
//                {text: "武汉大学", count: "300",attrName:"学校"},
//                {text: "国重", count: "300",attrName:"学院"},
//                {text: "2014206190001", count: "300",attrName:"学号"},
//                {text: "研一", count: "300",attrName:"年级"},
//                {text: "地信", count: "300",attrName:"专业"},
//                {text: "327", count: "300",attrName:"机房"},
//                {text: "朱欣焰", count: "300",attrName:"指导老师"},
//                {text: "205", count: "300",attrName:"老师办公室"}
//            ],
            eval: function (item) {return item.count;},
            classed: function (item) {return item.text.split(" ").join("");}
        },
        plugins: [
            {
                name: "central-click"
            },
            {
                name: "lines",
                options: {
                    format: [
                        {// Line #0
                            textField: "attrName",
                            classed: {count: true},
                            style: {
                                "font-size": "18px",
                                "font-family": "Source Sans Pro, sans-serif",
                                "text-anchor": "middle",
                                fill: "white"
                            },
                            attr: {
                                dy: "0px",
                                x: function (d) {return d.cx;},
                                y: function (d) {return d.cy;}
//                                "fill-opacity":0.0
                            }
                        },
                        {// Line #1
                            textField: "text",
                            classed: {text: true},
                            style: {
                                "font-size": "15px",
                                "font-family": "Source Sans Pro, sans-serif",
                                "text-anchor": "middle",
                                fill: "white"
                            },
                            attr: {
                                dy: "30px",
                                "text-anchor": "middle",
                                x: function (d) {return d.cx;},
                                y: function (d) {return d.cy;}
                            }
                        }
                    ],
                    centralFormat: [
                        {// Line #0
                            style: {"font-size": "70px"},
                            attr: {}
                        },
                        {// Line #1
                            style: {"font-size": "50px"},
                            attr: {dy: "60px"}
                        }
                    ]
                }
            }]
    });
};