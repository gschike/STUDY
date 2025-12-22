	$("document").ready(function() {
		_main.init();
	});
	var _main = {
		top : function() {
			return _main;
		}, 
		_const : {
			stat_type : ""
			,sms_all_cnt_total : 0
			,sms_succ_cnt_total : 0
			,sms_fail_cnt_total : 0
			,sms_wait_cnt_total : 0
			,lms_all_cnt_total : 0
			,lms_succ_cnt_total : 0
			,lms_fail_cnt_total : 0
			,lms_wait_cnt_total : 0
			,mms_all_cnt_total : 0
			,mms_succ_cnt_total : 0
			,mms_fail_cnt_total : 0
			,mms_wait_cnt_total : 0
			
			,grid_list_data_obj : ""
			,grid_list_sum_obj : ""
		},
		init : function() {
			var _this = this.top();
			fnSetMenu("5", "1");
			
			_this._const.grid_list_data_obj = $(".Grid_list tbody tr:first").clone();
			_this._const.grid_list_sum_obj = $(".Grid_list tbody tr:last").clone();
			$(".Grid_list tbody").empty();
			_this.btn();
			_this.search.init();
			_this.statistics.init();
			_this.statistics.get_brand_list({procType : "selectBranList" , async : false});
			
		},
		btn : function() {
			var _this = this.top();
			
			$("#type").unbind("change").change(function(){
				var type = $(this).val();
				if(type == "msg"){
					$("#gw_type").show();
				}else{
					$("#gw_type").hide();
				}
			});
			$(".btn_orange").unbind("click").click(function(){
				alert("준비중");
			});
			
			$(".btn_search").unbind("click").click(function(){
				var sch_str = $("#sch_str").val();
				//if(sch_str != ""){
					var type = $("#type").val();
					var stat_type = $("#stat_type").val();
					var year = $("#year").val();
					var month = $("#month").val();
					var gw_type = $("#gw_type").val();
					var bran_no = $("#bran_no").val();
					var params = new Object();
					//var params = {procType:"selectSendStatistics" ,async : false};
					_this._const.stat_type = stat_type;
					
					params.procType = "selectSendStatistics";
					params.async = false;
					params.type = type;
					params.stat_type = stat_type;
					params.year = year;
					params.month = month;
					if(gw_type != ""){
						params.gw_type = gw_type;	
					}
					params.bran_no = bran_no;
					_this.statistics.get_send_data(params);
				/*}else{
					alert("검색어")
				}*/
			});
		},
		search : {
			top : function() {
				return _main;
			},
			init : function() {
				for(i = 1 ; i <= 12 ; i++){
					$("#month").append("<option value='"+((i<10)?"0"+i:i)+"'>"+i+"월");
				}
			}
		},
		statistics : {
			top : function() {
				return _main;
			}, 
			init : function(){
				var _this = this.top();
				_this._const.sms_all_cnt_total = 0;
				_this._const.sms_succ_cnt_total = 0;
				_this._const.sms_fail_cnt_total = 0;
				_this._const.sms_wait_cnt_total = 0;
				_this._const.lms_all_cnt_total = 0;
				_this._const.lms_succ_cnt_total = 0;
				_this._const.lms_fail_cnt_total = 0;
				_this._const.lms_wait_cnt_total = 0;
				_this._const.mms_all_cnt_total = 0;
				_this._const.mms_succ_cnt_total = 0;
				_this._const.mms_fail_cnt_total = 0;
				_this._const.mms_wait_cnt_total = 0;
				$(".Grid_list tbody").empty();
				_this.statistics.btn();
			},
			btn : function(){
				var _this = this.top();
				//통계타입
				$("#stat_type").unbind("change").change(function(){
					var stat_type = $(this).val();
					if(stat_type == "day"){
						$("#year").show();
						$("#month").show();
						$("#gw_type").show();
						$("#bran_no").show();
					}else if(stat_type == "month"){
						$("#year").show();
						$("#month").hide();
						$("#gw_type").show();
						$("#bran_no").show();
					}else if(stat_type == "bran"){
						$("#year").show();
						$("#month").show();
						$("#gw_type").show();
						$("#bran_no").hide();
					}else if(stat_type == "part"){
						$("#year").show();
						$("#month").show();
						$("#gw_type").show();
						$("#bran_no").hide();
					}
				});
			},
			get_brand_list : function(params){
				var _this = this.top();
				//_obj.list.total_count = 0;
				$("#loadingLayer").show();
				$.ajax({url : Common.DEFAULT_PATH+"statistics.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(params)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							//var result_msg = data.resultMsg;
							if(result_code == "1000") {
								if(data.listData.length > 0){
									$(data.listData).each(function(idx,item){
										$("#bran_no").append("<option value='"+item.bran_no+"'>"+item.bran_nm);
									});
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
					}
					$("#loadingLayer").hide();
				}});
			},
			get_send_data : function(params){
				var _this = this.top();
				$("#loadingLayer").show();
				$.ajax({url : Common.DEFAULT_PATH+"statistics.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(params)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000") {
								_this.statistics.init();
								if(data.listData.length > 0){
									$(data.listData).each(function(idx,item){
										$(".Grid_list tbody").append(_this._const.grid_list_data_obj.clone());
										var tr = $(".Grid_list tbody tr:last");
										
										var gubun_str = "";
										if(_this._const.stat_type == "day"){
											gubun_str = item.date_client_req.substring(0,10);
										}else if(_this._const.stat_type == "month"){
											gubun_str = item.date_client_req.substring(0,7);
										}else if(_this._const.stat_type == "bran"){
											gubun_str = (item.mt_refkey == ""?"SYSTEM":item.mt_refkey) ;
										}else if(_this._const.stat_type == "part"){
											gubun_str = item.letr_msg_cd_part;
										}
																						
										$(tr).find("td").eq(0).text(gubun_str);
										
										var sms_tot = Number(item.sms_succ_cnt) + Number(item.sms_fail_cnt) + Number(item.sms_wait_cnt);
										var lms_tot = Number(item.lms_succ_cnt) + Number(item.lms_fail_cnt) + Number(item.lms_wait_cnt);
										var mms_tot = Number(item.mms_succ_cnt) + Number(item.mms_fail_cnt) + Number(item.mms_wait_cnt);
										
										$(tr).find("td").eq(1).text(_IBCommon.format_number(sms_tot));
										$(tr).find("td").eq(2).text(_IBCommon.format_number(item.sms_succ_cnt));
										$(tr).find("td").eq(3).text(_IBCommon.format_number(item.sms_fail_cnt));
										$(tr).find("td").eq(4).text(_IBCommon.format_number(item.sms_wait_cnt));
										$(tr).find("td").eq(5).text(_IBCommon.format_number(lms_tot));
										$(tr).find("td").eq(6).text(_IBCommon.format_number(item.lms_succ_cnt));
										$(tr).find("td").eq(7).text(_IBCommon.format_number(item.lms_fail_cnt));
										$(tr).find("td").eq(8).text(_IBCommon.format_number(item.lms_wait_cnt));
										$(tr).find("td").eq(9).text(_IBCommon.format_number(mms_tot));
										$(tr).find("td").eq(10).text(_IBCommon.format_number(item.mms_succ_cnt));
										$(tr).find("td").eq(11).text(_IBCommon.format_number(item.mms_fail_cnt));
										$(tr).find("td").eq(12).text(_IBCommon.format_number(item.mms_wait_cnt));

										_this._const.sms_all_cnt_total += Number(sms_tot);
										_this._const.sms_succ_cnt_total += Number(item.sms_succ_cnt);
										_this._const.sms_fail_cnt_total += Number(item.sms_fail_cnt);
										_this._const.sms_wait_cnt_total += Number(item.sms_wait_cnt);
										_this._const.lms_all_cnt_total += Number(lms_tot);
										_this._const.lms_succ_cnt_total += Number(item.lms_succ_cnt);
										_this._const.lms_fail_cnt_total += Number(item.lms_fail_cnt);
										_this._const.lms_wait_cnt_total += Number(item.lms_wait_cnt);
										_this._const.mms_all_cnt_total += Number(mms_tot);
										_this._const.mms_succ_cnt_total += Number(item.mms_succ_cnt);
										_this._const.mms_fail_cnt_total += Number(item.mms_fail_cnt);
										_this._const.mms_wait_cnt_total += Number(item.mms_wait_cnt);
									});
									$(".Grid_list tbody").append(_this._const.grid_list_sum_obj.clone());
									var tr = $(".Grid_list tbody tr:last");
									$(tr).find("th").eq(0).text("합계");
									$(tr).find("th").eq(1).text(_IBCommon.format_number(_this._const.sms_all_cnt_total));
									$(tr).find("th").eq(2).text(_IBCommon.format_number(_this._const.sms_succ_cnt_total));
									$(tr).find("th").eq(3).text(_IBCommon.format_number(_this._const.sms_fail_cnt_total));
									$(tr).find("th").eq(4).text(_IBCommon.format_number(_this._const.sms_wait_cnt_total));
									$(tr).find("th").eq(5).text(_IBCommon.format_number(_this._const.lms_all_cnt_total));
									$(tr).find("th").eq(6).text(_IBCommon.format_number(_this._const.lms_succ_cnt_total));
									$(tr).find("th").eq(7).text(_IBCommon.format_number(_this._const.lms_fail_cnt_total));
									$(tr).find("th").eq(8).text(_IBCommon.format_number(_this._const.lms_wait_cnt_total));
									$(tr).find("th").eq(9).text(_IBCommon.format_number(_this._const.mms_all_cnt_total));
									$(tr).find("th").eq(10).text(_IBCommon.format_number(_this._const.mms_succ_cnt_total));
									$(tr).find("th").eq(11).text(_IBCommon.format_number(_this._const.mms_fail_cnt_total));
									$(tr).find("th").eq(12).text(_IBCommon.format_number(_this._const.mms_wait_cnt_total));
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
					$("#loadingLayer").hide();
				}});
			}
		}
	}
	