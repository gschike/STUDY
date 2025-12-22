	$("document").ready(function() {
		_main.init();
	});
	
	var _main = {
		top : function() {
			return _main;
		},
		_const : {
			chartdiv1: {
				dataProvider : []
			},
			chartdiv2: {dataProvider : []},
			chartdiv3: {dataProvider : []},
			chartdiv4: {dataProvider : []}, 
			chartdiv5: {dataProvider: [
				/*{date: "IB", "IB": 460, "LG U+": 375, "알림톡":400, "성공%": 80}, 
				{date: "LG U+", "IB": 371, "LG U+": 280, "알림톡":380, "성공%": 99}, 
				{date: "알림톡", "IB": 433, "LG U+": 410, "알림톡":340, "성공%": 92}*/
			]},
			chartdiv6: {dataProvider : []},
			chartdiv7: {dataProvider : []},
			chartdiv8: {dataProvider : []},
			chartdiv9 : {dataProvider:[/*{
                "date": "1일","SMS": 45151,"LMS": 40000,"MMS": 48000,"알림톡": 30000}, {
	                "date": "2일","SMS": 41542,"LMS": 35000,"MMS": 40000,"알림톡": 40000}, {
	                "date": "3일","SMS": 15141,"LMS": 15000,"MMS": 20000,"알림톡": 15000}, {
	                "date": "4일","SMS": 15485,"LMS": 25000,"MMS": 30000,"알림톡": 12000}, {
	                "date": "5일","SMS": 41234,"LMS": 27800,"MMS": 35000,"알림톡": 45200}, {
	                "date": "6일","SMS": 35254,"LMS": 20000,"MMS": 10000,"알림톡": 13200}, {
	                "date": "7일","SMS": 42145,"LMS": 36000,"MMS": 50000,"알림톡": 17000}*/]}
			, chart1 : ""
			, chart5 : ""
			, chart9 : ""
			, chartdiv11_grid_list_obj :  ""
		},
		init : function() {
			var _this = this.top();
			_this._const.chartdiv11_grid_list_obj = $("#chartdiv11 div.Grid_list").find("tbody tr:last").eq(0).clone();
			fnSetMenu("1", "1");
			_this._const;
			_this.chart.init();
		},
		btn : function() {
			var _this = this.top();
		},
		chart : {
			top : function() {
				return _main;
			},
			init: function() {
				var _this = this.top();
				var params = {procType:"getMonitoringData" ,async : false , service_type: "3" };
				_this.chart.get_chart_data(params);
				//_this.chart.makeCharts("chart", "#FFFFFF");
			},
			btn : function() {
				var _this = this.top();
				$("#MoniterChart1 li").unbind("click",function(){
					if($(this).text() == "SMS"){
						console.log("SMS");
					}else if($(this).text() == "LMS"){
						console.log("LMS");
					}else if($(this).text() == "MMS"){
						console.log("MMS");
					}else if($(this).text() == "알림톡"){
						console.log("알림톡");
					}
				});
			},
			get_chart_data : function(params) {
				var _this = this.top();
				//_obj.list.total_count = 0;
				$.ajax({url : Common.DEFAULT_PATH+"mnt.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(params)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							//var result_msg = data.resultMsg;
							if(result_code == "1000") {
								_this._const.chartdiv1.dataProvider = new Array();
								if(data.listData.length > 0){
									var selectWeekCnt = data.listData[0].selectWeekCnt;
									var sendStatus = data.listData[0].sendStatus;
									var oneMinCnt = data.listData[0].oneMinCnt;
									var selectMonitordData = data.listData[0].selectMonitordData;
									
									$(oneMinCnt).each(function(idx , item){
										//0-SMS MT ,2-MMS MT , 3-LMS MT
										var jsonObj = new Object();
										jsonObj.min = item.update_time.substr(-2,2) ;
										jsonObj.IB = item.ib;
										jsonObj.LG = item.lg;
										if(item.service_type == "0"){
											_this._const.chartdiv1.dataProvider.push(jsonObj);
										}else if(item.service_type == "2"){
											_this._const.chartdiv2.dataProvider.push(jsonObj);
										}else if(item.service_type == "3"){
											_this._const.chartdiv3.dataProvider.push(jsonObj);
										}else if(item.service_type == "4"){
											_this._const.chartdiv4.dataProvider.push(jsonObj);
										}
									});

									$(sendStatus).each(function(idx , item){
										var jsonObj = new Object();
										//jsonObj.min = item.update_time.substr(-2,2) ;

										if(item.gw_type == "IB"){
											jsonObj.date = "IB";
										}else if(item.gw_type == "LG"){
											jsonObj.date = "LG U+";
										}else if(item.gw_type == "BZ"){
											jsonObj.date = "알림톡";
										}
										//jsonObj.date = 
										jsonObj["IB"] = item.ib;
										jsonObj["LG U+"] = item.lg;
										jsonObj["알림톡"] = item.bz;
										jsonObj["성공%"] = item.per;
										
										if(item.service_type == "0"){
											_this._const.chartdiv5.dataProvider.push(jsonObj);
										}else if(item.service_type == "2"){
											_this._const.chartdiv6.dataProvider.push(jsonObj);
										}else if(item.service_type == "3"){
											_this._const.chartdiv7.dataProvider.push(jsonObj);
										}else if(item.service_type == "4"){
											_this._const.chartdiv8.dataProvider.push(jsonObj);
										}
									});
									
									$(selectWeekCnt).each(function(idx,item){
										var jsonObj = new Object();
										jsonObj.date = item.update_time.substr(-2,2) ;
										jsonObj.SMS = item.sms;
										jsonObj.LMS = item.lms;
										jsonObj.MMS = item.mms;
										jsonObj["알림톡"] = item.bz;
										_this._const.chartdiv9.dataProvider.push(jsonObj);
										
									});
									_this.chart.makeCharts("chart", "#FFFFFF");
									
									//data

									$("#chartdiv11 div.Grid_list").find("tbody").empty();
									$("#chartdiv12 div.Grid_list").find("tbody").empty();
									$("#chartdiv13 div.Grid_list").find("tbody").empty();
									$("#chartdiv14 div.Grid_list").find("tbody").empty();
									$("#chartdiv15 div.Grid_list").find("tbody").empty();
									$("#chartdiv16 div.Grid_list").find("tbody").empty();
									$("#chartdiv17 div.Grid_list").find("tbody").empty();
									$("#chartdiv18 div.Grid_list").find("tbody").empty();
									$("#chartdiv19 div.Grid_list").find("tbody").empty();
									
									$(selectMonitordData).each(function(idx,item){
										//chartdiv11_grid_list_obj
										//$("#chartdiv13 div.Grid_list").eq(0).find("tr:last").html()
										//11 14 17
										//인포뱅크
										if(item.gw_type == "IB"){
											if(item.service_type == "0"){
												$("#chartdiv11 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv12 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv13 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds11 =  $("#chartdiv11 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds11).eq(0).text(item.agent_id);
												$(tds11).eq(1).text(item.send_1min_cnt);
												$(tds11).eq(2).text(item.send_10min_cnt);
												$(tds11).eq(3).text(item.send_today_cnt);
												var tds12 =  $("#chartdiv12 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds12).eq(0).text(item.agent_id);
												$(tds12).eq(1).text(item.rpt_1min_cnt);
												$(tds12).eq(2).text(item.rpt_10min_cnt);
												$(tds12).eq(3).text(item.rpt_today_cnt);
												var tds13 =  $("#chartdiv13 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds13).eq(0).text(item.agent_id);
												$(tds13).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds13).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds13).eq(3).text(item.rpt_today_fail_cnt);
											}else if(item.service_type == "2"){
												$("#chartdiv11 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv12 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv13 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds11 =  $("#chartdiv11 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds11).eq(0).text(item.agent_id);
												$(tds11).eq(1).text(item.send_1min_cnt);
												$(tds11).eq(2).text(item.send_10min_cnt);
												$(tds11).eq(3).text(item.send_today_cnt);
												var tds12 =  $("#chartdiv12 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds12).eq(0).text(item.agent_id);
												$(tds12).eq(1).text(item.rpt_1min_cnt);
												$(tds12).eq(2).text(item.rpt_10min_cnt);
												$(tds12).eq(3).text(item.rpt_today_cnt);
												var tds13 =  $("#chartdiv13 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds13).eq(0).text(item.agent_id);
												$(tds13).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds13).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds13).eq(3).text(item.rpt_today_fail_cnt);
											}else if(item.service_type == "3"){
												$("#chartdiv11 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv12 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv13 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds11 =  $("#chartdiv11 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds11).eq(0).text(item.agent_id);
												$(tds11).eq(1).text(item.send_1min_cnt);
												$(tds11).eq(2).text(item.send_10min_cnt);
												$(tds11).eq(3).text(item.send_today_cnt);
												var tds12 =  $("#chartdiv12 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds12).eq(0).text(item.agent_id);
												$(tds12).eq(1).text(item.rpt_1min_cnt);
												$(tds12).eq(2).text(item.rpt_10min_cnt);
												$(tds12).eq(3).text(item.rpt_today_cnt);
												var tds13 =  $("#chartdiv13 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds13).eq(0).text(item.agent_id);
												$(tds13).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds13).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds13).eq(3).text(item.rpt_today_fail_cnt);
											}
										}else if(item.gw_type == "LG"){
											if(item.service_type == "0"){
												$("#chartdiv14 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv15 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv16 div.Grid_list").eq(0).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds14 =  $("#chartdiv14 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds14).eq(0).text(item.agent_id);
												$(tds14).eq(1).text(item.send_1min_cnt);
												$(tds14).eq(2).text(item.send_10min_cnt);
												$(tds14).eq(3).text(item.send_today_cnt);
												var tds15 =  $("#chartdiv15 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds15).eq(0).text(item.agent_id);
												$(tds15).eq(1).text(item.rpt_1min_cnt);
												$(tds15).eq(2).text(item.rpt_10min_cnt);
												$(tds15).eq(3).text(item.rpt_today_cnt);
												var tds16 =  $("#chartdiv16 div.Grid_list").eq(0).find("tbody tr:last td");
												$(tds16).eq(0).text(item.agent_id);
												$(tds16).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds16).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds16).eq(3).text(item.rpt_today_fail_cnt);
											}else if(item.service_type == "2"){
												$("#chartdiv14 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv15 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv16 div.Grid_list").eq(1).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds14 =  $("#chartdiv14 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds14).eq(0).text(item.agent_id);
												$(tds14).eq(1).text(item.send_1min_cnt);
												$(tds14).eq(2).text(item.send_10min_cnt);
												$(tds14).eq(3).text(item.send_today_cnt);
												var tds15 =  $("#chartdiv15 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds15).eq(0).text(item.agent_id);
												$(tds15).eq(1).text(item.rpt_1min_cnt);
												$(tds15).eq(2).text(item.rpt_10min_cnt);
												$(tds15).eq(3).text(item.rpt_today_cnt);
												var tds16 =  $("#chartdiv16 div.Grid_list").eq(1).find("tbody tr:last td");
												$(tds16).eq(0).text(item.agent_id);
												$(tds16).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds16).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds16).eq(3).text(item.rpt_today_fail_cnt);
											}else if(item.service_type == "3"){
												$("#chartdiv14 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv15 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												$("#chartdiv16 div.Grid_list").eq(2).find("tbody").append($(_this._const.chartdiv11_grid_list_obj).clone());
												var tds14 =  $("#chartdiv14 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds14).eq(0).text(item.agent_id);
												$(tds14).eq(1).text(item.send_1min_cnt);
												$(tds14).eq(2).text(item.send_10min_cnt);
												$(tds14).eq(3).text(item.send_today_cnt);
												var tds15 =  $("#chartdiv15 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds15).eq(0).text(item.agent_id);
												$(tds15).eq(1).text(item.rpt_1min_cnt);
												$(tds15).eq(2).text(item.rpt_10min_cnt);
												$(tds15).eq(3).text(item.rpt_today_cnt);
												var tds16 =  $("#chartdiv16 div.Grid_list").eq(2).find("tbody tr:last td");
												$(tds16).eq(0).text(item.agent_id);
												$(tds16).eq(1).text(item.rpt_1min_fail_cnt);
												$(tds16).eq(2).text(item.rpt_10min_fail_cnt);
												$(tds16).eq(3).text(item.rpt_today_fail_cnt);
											}
										}else if(item.gw_type == "BZ"){
											//확인후 작업
										}
										
									})
								}
							}else if(result_code == "8000") {
								alert(Common.getAlertMsg(result_code));
								location.href = "/common/loginForm.do";
							}else {
								alert(Common.getAlertMsg(result_code));
							}
						}else {
							//json data not exist
							alert(Common.getAlertMsg("202"));
						}
					}
				}});
			},
			makeCharts : function(theme, bgColor, bgImage){
				if (_main._const.chart1) {
					_main._const.chart1.clear();
		        }
		        if (_main._const.chart5) {
		        	_main._const.chart5.clear();
		        }

		        // background
		        if (document.body) {
		            document.body.style.backgroundColor = bgColor;
		            document.body.style.backgroundImage = "url(" + bgImage + ")";
		        }

		        // column chart1
		        _main._const.chart1 = AmCharts.makeChart("chartdiv1", {
		            type: "serial",
		            theme: theme, 
		            dataProvider:  _main._const.chartdiv1.dataProvider,
		            categoryField: "min",
		            startDuration: 1,

		            categoryAxis: {gridPosition: "start"},
		            graphs: [
						{type: "column",title: "IB",valueField: "IB",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}, 
						{type: "column",title: "LG",valueField: "LG",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}
					],
		            legend: {useGraphSettings: true}

		        });
		        _main._const.chart2 = AmCharts.makeChart("chartdiv2", {
		            type: "serial",
		            theme: theme, 
		            dataProvider:  _main._const.chartdiv2.dataProvider,
		            categoryField: "min",
		            startDuration: 1,

		            categoryAxis: {gridPosition: "start"},
		            graphs: [
						{type: "column",title: "IB",valueField: "IB",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}, 
						{type: "column",title: "LG",valueField: "LG",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}
					],
		            legend: {useGraphSettings: true}

		        });
		        _main._const.chart3 = AmCharts.makeChart("chartdiv3", {
		            type: "serial",
		            theme: theme, 
		            dataProvider:  _main._const.chartdiv3.dataProvider,
		            categoryField: "min",
		            startDuration: 1,

		            categoryAxis: {gridPosition: "start"},
		            graphs: [
						{type: "column",title: "IB",valueField: "IB",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}, 
						{type: "column",title: "LG",valueField: "LG",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}
					],
		            legend: {useGraphSettings: true}

		        });
		        _main._const.chart4 = AmCharts.makeChart("chartdiv4", {
		            type: "serial",
		            theme: theme, 
		            dataProvider:  _main._const.chartdiv4.dataProvider,
		            categoryField: "min",
		            startDuration: 1,

		            categoryAxis: {gridPosition: "start"},
		            graphs: [
						{type: "column",title: "IB",valueField: "IB",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}, 
						{type: "column",title: "LG",valueField: "LG",lineAlpha: 0,fillAlphas: 0.8,balloonText: "<b>[[value]]</b>"}
					],
		            legend: {useGraphSettings: true}

		        });

		        // column chart5
		        _main._const.chart5 = AmCharts.makeChart("chartdiv5", {
					type: "serial",
					theme: theme,
					valueAxes: [
						{id: "distanceAxis","axisAlpha": 0,"gridAlpha": 0,"position": "left"}, 
						{id: "durationAxis","axisAlpha": 0,"gridAlpha": 0,"inside": false,"position": "right","title": "percent(%)"}
					],
					dataProvider: _main._const.chartdiv5.dataProvider,
					categoryField: "date",
		            startDuration: 1,
					
					categoryAxis: {gridPosition: "start"},
					graphs: [
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "발송",type: "column",valueField: "IB",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "성공",type: "column",valueField: "LG U+",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "실패",type: "column",valueField: "알림톡",valueAxis: "distanceAxis"}, 
						{bullet: "square",bulletBorderAlpha: 1,bulletBorderThickness: 1,dashLengthField: "dashLength",balloonText: "[[value]]%",title: "성공%",fillAlphas: 0,valueField: "성공%",valueAxis: "durationAxis"}
					],
					legend: { useGraphSettings: true }
				});
		        _main._const.chart6 = AmCharts.makeChart("chartdiv6", {
					type: "serial",
					theme: theme,
					valueAxes: [
						{id: "distanceAxis","axisAlpha": 0,"gridAlpha": 0,"position": "left"}, 
						{id: "durationAxis","axisAlpha": 0,"gridAlpha": 0,"inside": false,"position": "right","title": "percent(%)"}
					],
					dataProvider: _main._const.chartdiv5.dataProvider,
					categoryField: "date",
		            startDuration: 1,
					
					categoryAxis: {gridPosition: "start"},
					graphs: [
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "발송",type: "column",valueField: "IB",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "성공",type: "column",valueField: "LG U+",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "실패",type: "column",valueField: "알림톡",valueAxis: "distanceAxis"}, 
						{bullet: "square",bulletBorderAlpha: 1,bulletBorderThickness: 1,dashLengthField: "dashLength",balloonText: "[[value]]%",title: "성공%",fillAlphas: 0,valueField: "성공%",valueAxis: "durationAxis"}
					],
					legend: { useGraphSettings: true }
				});
		        _main._const.chart7 = AmCharts.makeChart("chartdiv7", {
					type: "serial",
					theme: theme,
					valueAxes: [
						{id: "distanceAxis","axisAlpha": 0,"gridAlpha": 0,"position": "left"}, 
						{id: "durationAxis","axisAlpha": 0,"gridAlpha": 0,"inside": false,"position": "right","title": "percent(%)"}
					],
					dataProvider: _main._const.chartdiv5.dataProvider,
					categoryField: "date",
		            startDuration: 1,
					
					categoryAxis: {gridPosition: "start"},
					graphs: [
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "발송",type: "column",valueField: "IB",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "성공",type: "column",valueField: "LG U+",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "실패",type: "column",valueField: "알림톡",valueAxis: "distanceAxis"}, 
						{bullet: "square",bulletBorderAlpha: 1,bulletBorderThickness: 1,dashLengthField: "dashLength",balloonText: "[[value]]%",title: "성공%",fillAlphas: 0,valueField: "성공%",valueAxis: "durationAxis"}
					],
					legend: { useGraphSettings: true }
				});
		        _main._const.chart8 = AmCharts.makeChart("chartdiv8", {
					type: "serial",
					theme: theme,
					valueAxes: [
						{id: "distanceAxis","axisAlpha": 0,"gridAlpha": 0,"position": "left"}, 
						{id: "durationAxis","axisAlpha": 0,"gridAlpha": 0,"inside": false,"position": "right","title": "percent(%)"}
					],
					dataProvider: _main._const.chartdiv5.dataProvider,
					categoryField: "date",
		            startDuration: 1,
					
					categoryAxis: {gridPosition: "start"},
					graphs: [
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "발송",type: "column",valueField: "IB",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "성공",type: "column",valueField: "LG U+",valueAxis: "distanceAxis"}, 
						{alphaField: "alpha",balloonText: "[[value]]",dashLengthField: "dashLength",fillAlphas: 0.7,title: "실패",type: "column",valueField: "알림톡",valueAxis: "distanceAxis"}, 
						{bullet: "square",bulletBorderAlpha: 1,bulletBorderThickness: 1,dashLengthField: "dashLength",balloonText: "[[value]]%",title: "성공%",fillAlphas: 0,valueField: "성공%",valueAxis: "durationAxis"}
					],
					legend: { useGraphSettings: true }
				});

				// column chart9
		        _main._const.chart9 = AmCharts.makeChart("chartdiv9", {
		            type: "serial",
		            theme: theme,
		            dataProvider: _main._const.chartdiv9.dataProvider,
		            categoryField: "date",
		            startDuration: 1,

		            categoryAxis: {
		                gridPosition: "start"
		            },
		            graphs: [{
		                type: "line",
		                title: "SMS",
		                valueField: "SMS",
		                lineThickness: 2,
		                fillAlphas: 0,
		                bullet: "round",
		                balloonText: "<b>[[value]]</b>"
		            }, {
		                type: "line",
		                title: "LMS",
		                valueField: "LMS",
		                lineThickness: 2,
		                fillAlphas: 0,
		                bullet: "round",
		                balloonText: "<b>[[value]]</b>"
		            }, {
		                type: "line",
		                title: "MMS",
		                valueField: "MMS",
		                lineThickness: 2,
		                fillAlphas: 0,
		                bullet: "round",
		                balloonText: "<b>[[value]]</b>"
		            }, {
		                type: "line",
		                title: "알림톡",
		                valueField: "알림톡",
		                lineThickness: 2,
		                fillAlphas: 0,
		                bullet: "round",
		                balloonText: "<b>[[value]]</b>"
		            }],
		            legend: {
		                useGraphSettings: true
		            }

		        });
			}
		}
	}
	
    // in order to set theme for a chart, all you need to include theme file
    // located in amcharts/themes folder and set theme property for the chart.

    