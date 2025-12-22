	$("document").ready(function() {
		_main.init();
	});
	
	var _main = {
			top : function() {
				return _main;
			}, 
			val : {
				tr : ""		
			},
			init : function() {
				var _this = this.top();

				_this.list.id = $("#"+_this.list.id_name);
				_this.list.tr = $("tbody tr:first",_this.list.id).clone();
				_this.sendDetail.list.id = $("#"+_this.sendDetail.list.id_name);
				_this.sendDetail.list.tr = $("tbody tr:first",_this.sendDetail.list.id).clone();
				_this.search.getDate();
				_this.search.check();
				_this.search.btn();
			},
			del : function(schd_id_list) {
				$("#loadingLayer").show();
				var _this = this.top();
				var param = {procType:"delTranInfoList", schd_id_list:schd_id_list};
				$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							console.log(data);
							if(result_code == "1000") {
								alert("보낸 메시지를 삭제하였습니다.");
								_this.search.check();//최신
							}else if(result_code == "2000"){
								alert("선택된 메시지가 없습니다.");
							}else if(result_code == "8000") {
								alert(Common.getAlertMsg(result_code));
								location.href = "/common/login_form.do";
							}else {
								alert(Common.getAlertMsg("201"));
							}
						}else {
							//json data not exist
							alert(Common.getAlertMsg("202"));
						}
					}
					$("#loadingLayer").hide();
				}});
			},
			search : {
				top : function() {
					return _main;
				},
				valueCheck : function(obj){
					var placeholder = $(obj).attr("placeholder");
					var value = $(obj).val();
					
					if(placeholder == value){
						$(obj).val("");
					}
				},
				check : function() {
					var _this = this.top();
					_this.search.get(0,"search");	
				},
				btn : function(){
					var _this = this.top();	
					$("#searchArea input[type='button']","#tranInfoArea").unbind("click").click(function(){	
						console.log('search');
						_this.search.check();
					});
					$("#sendList #checkAll").unbind("click").click(function(){
						console.log('click');
						if($("#checkAll").is(":checked") == true){
							$("#sendList tbody input:checkbox[name='checkbox1']").prop("checked", true);
						}else{
							$("#sendList tbody input:checkbox[name='checkbox1']").prop("checked", false);	
						}
					});	
					$("#tranInfoArea .board_info a").unbind("click").click(function(){
						var checkBox = $("#sendList tbody input:checkbox[name='checkbox1']:checked");
						var schd_id_list = "";
						//console.log(checkBox);
						//console.log(checkBox.length);
						if(checkBox.length==0){
							alert('선택된 메시지가 없습니다.');
							return false;
						}
						checkBox.each(function(){
							schd_id_list = schd_id_list + "'"+$(this).attr("schd_id")+"',";
						});
						schd_id_list = schd_id_list.substring(0,schd_id_list.length-1);
						_this.del(schd_id_list);
					});
				},
				get : function(START, type) 
				{
					var _this = this.top();
					//search field set
					var json = "";
					json = Common.getInputTagToJson($("#searchArea"));
					_this.list.pJson = json;
					var param = $.extend({procType:"getTranInfoList"}, json);
					console.log("_this.list.pJson : " + _this.list.pJson);
					var param = $.extend({procType:"getTranInfoList", START:START,COUNT:_this.list.vertical_count}, json);
					if(START == 0) _this.list.current_page = 1;
					_this.list.get(param);
				},
				getDate : function(){

					$("#datepicker1, #datepicker2").datepicker({
					    dateFormat: 'yy.mm.dd',
					    prevText: '이전 달',
					    nextText: '다음 달',
					    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    dayNames: ['일','월','화','수','목','금','토'],
					    dayNamesShort: ['일','월','화','수','목','금','토'],
					    dayNamesMin: ['일','월','화','수','목','금','토'],
					    showMonthAfterYear: true,
					    yearSuffix: '년',
					    minDate: "-3m",
						maxDate: "0",
						onSelect : function(selectedDate){
							if(this.id == "datepicker1")
								$("#datepicker2").datepicker("option","minDate",selectedDate);
							else if(this.id == "datepicker2")
								$("#datepicker1").datepicker("option","maxDate",selectedDate);
						}
					});
					
					$("#datepicker1").val(Common.currentDate(-7));
					$("#datepicker2").val(Common.currentDate());
				}
			},
			list : {
				json : "",
				pJson : "",
				top : function() {
					return _main;
				},
				id : "",
				id_name : "sendList",
				tr : "",
				total_count : 0,
				current_page : 1,
				vertical_count : 10,
				horizon_count : 10,
				user_count : 0,
				init : function() {
					//init
					var _this = this.top();
					
					$("tbody tr",_this.list.id).remove();
					//parameter set
					//_this.search.valueCheck($("#searchArea input[name=campaignName]",_this.list.id));
					var	json = Common.getInputTagToJson($("#searchArea",_this.list.id));
					_this.list.pJson = json;
					
					var param = $.extend( {procType:"getTranInfoList", START:"0", COUNT:_this.list.vertical_count}, json);
					
					//list view 
					_this.list.get(param);
				},
				btn : function(){
					var _this = this.top();
					
					$("td[name=subject] a",_this.list.id).unbind("click").click(function(){
						var schd_id = $(this).attr("schd_id");
						var par_date = $(this).attr("par_date");
						var date_client_req = $(this).attr("date_client_req");
						var uuid = $(this).attr("uuid");
						var total_cnt = $(this).attr("total_cnt");
						var success_cnt = $(this).attr("success_cnt");
						var fail_cnt = $(this).attr("fail_cnt");
						var wait_cnt = $(this).attr("wait_cnt");
						var content = $("textarea",$(this).parent()).html();
						console.log("content :" + content);
						var param = {schd_id:schd_id,par_date:par_date,date_client_req:date_client_req,total_cnt:total_cnt,success_cnt:success_cnt,fail_cnt:fail_cnt,wait_cnt:wait_cnt,content:content,uuid:uuid};
						_this.sendDetail.view(param);
						//_this.sendDetail.search.check();
					});
				},
				get : function(param) {
					$("#loadingLayer").show();
					var _this = this.top();
					_this.list.json = param;
					_this.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						
						$("tbody tr",_this.list.id).remove();
						
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								console.log(data);
								if(result_code == "1000") {			
									_this.list.total_count = data.totalCnt;					
									if(data.listData.length > 0){
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											$("tbody",_this.list.id).append(_this.list.tr.clone());
											var tr = $("tbody tr:last",_this.list.id);
											var uuid = obj.uuid;
											var schd_id = obj.schd_id;
											var date_client_req = obj.date_client_req;
											var par_date = obj.date_client_req.substring(0,10).replace(/\./g,"").substring(0,6);
											var subject = Common.XSSfilter(obj.template_name);
											var template_code = obj.template_code;
											var total_cnt = obj.total_cnt;
											var success_cnt = obj.success_cnt;
											var fail_cnt = obj.fail_cnt;
											var wait_cnt = parseInt(total_cnt) - (parseInt(success_cnt) + parseInt(fail_cnt));
											var content = obj.content;
											//_IBCommon.format_number()
											$("td[name='schd_id'] input",tr).attr("schd_id", schd_id);
											$("td[name='date_client_req']",tr).html(date_client_req);
											$("td[name='uuid']",tr).html(uuid);
											$("td[name='subject'] a",tr).attr("schd_id", schd_id);
											$("td[name='subject'] a",tr).attr("par_date", par_date);
											$("td[name='subject'] a",tr).attr("uuid", uuid);
											$("td[name='subject'] a",tr).attr("date_client_req", date_client_req);
											$("td[name='subject'] a",tr).attr("total_cnt", total_cnt);
											$("td[name='subject'] a",tr).attr("success_cnt", success_cnt);
											$("td[name='subject'] a",tr).attr("fail_cnt", fail_cnt);
											$("td[name='subject'] a",tr).attr("wait_cnt", wait_cnt);
											$("td[name='subject'] a",tr).html(subject);
											$("td[name='subject'] textarea",tr).text(content);
											$("td[name='template_code']",tr).html(template_code);
											$("td[name='total_cnt']",tr).html(_IBCommon.format_number(total_cnt));
											$("td[name='success_cnt']",tr).html(_IBCommon.format_number(success_cnt));
											$("td[name='fail_cnt']",tr).html(_IBCommon.format_number(fail_cnt));
											$("td[name='wait_cnt']",tr).html(_IBCommon.format_number(wait_cnt));
										}										
									}else{		
										var tr = '<tr name="ptr"><td colspan="10" style="text-align:center;">데이터가 없습니다.</td></tr>';
										$("tbody",_this.list.id).append(tr);
									}
									_this.list.btn();
									$("#tranInfoArea .board_info span .txtP").html("총 " + _IBCommon.format_number(_this.list.total_count) +"개");
									console.log("_this.list.total_count :" + _this.list.total_count);
									if(_this.list.total_count > 0) {
										Common.pagingDraw(_this,"pagingDiv");
										$("#pagingDiv").show();
									}else {
										$("#pagingDiv").hide();
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/login_form.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}						
						_this.list.btn();
						$("#loadingLayer").hide();
					}});
				}
			},
			sendDetail : {
				top : function() {
					return _main;
				}, 
				view : function(param){
					var _this = this.top();
					//var byte = _IBString.check_byte_size(param.content);
					//var limit_byte = param.service_type=="SMS" ? "90byte" : "2000byte";
					console.log(param);
					$("#sendDetail #searchArea select option:eq(0)").attr("selected","selected");
					$("#sendDetail #searchArea input[name='searchWord']").val("");
					$("#sendDetail td[name='date_client_req']").html(param.date_client_req);
					$("#sendDetail td[name='date_client_req']").attr("schd_id",param.schd_id);
					$("#sendDetail td[name='date_client_req']").attr("fail_cnt",param.fail_cnt);
					$("#sendDetail td[name='uuid']").html(param.uuid);
					$("#sendDetail td[name='total_cnt']").html(param.total_cnt);
					$("#sendDetail td[name='success_cnt']").html(param.success_cnt);
					$("#sendDetail td[name='fail_cnt']").html(param.fail_cnt);
					$("#sendDetail td[name='wait_cnt']").html(param.wait_cnt);
					$("#sendDetail textarea").html(param.content);
					_this.sendDetail.list.schd_id = param.schd_id;
					_this.sendDetail.list.par_date = param.par_date;
					_this.sendDetail.list.service_type = param.servicetype;
					console.log("_this.sendDetail.list.service_type : " + _this.sendDetail.list.service_type);
					_this.sendDetail.search.check();
					_this.sendDetail.search.btn();
				},
				resend : function(json,gubun){
					$("#loadingLayer").show();
					var param = $.extend({procType:"mtResend"}, json);
					//ajax : mtResendvar param = $.extend({procType:"nititalk"}, _this.send_val);
					return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						console.log(json);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								console.log(data);
								console.log(result_code);
								if(result_code == "1000"){
									alert('문자를 발송하였습니다.');
									window.location.reload();
								}else if(result_code == "2000"){
									alert('재발송 대상이 존재하지 않습니다.');
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/loginForm.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}
						$("#loadingLayer").hide();
					}});
				},
				search : {
					top : function() {
						return _main;
					},
					valueCheck : function(obj){
						var placeholder = $(obj).attr("placeholder");
						var value = $(obj).val();
						
						if(placeholder == value){
							$(obj).val("");
						}
					},
					check : function() {
						var _this = this.top();
						_this.sendDetail.search.get(0,"search");	
					},
					btn : function(){
						var _this = this.top();	
						$("#searchArea input[type='button']","#sendDetail").unbind("click").click(function(){	
							console.log('search');
							_this.sendDetail.search.check();
						});
						$("input[name='checkDetail']","#sendDetail").unbind("click").click(function(){
							console.log('checkDetail click');
							if($("input[name='checkDetail']","#sendDetail").is(":checked") == true){
								$("#sendDetailList tbody input:checkbox[name='checkbox2']").prop("checked", true);
							}else{
								$("#sendDetailList tbody input:checkbox[name='checkbox2']").prop("checked", false);
							}
						});	
						$("#sendDetail #checkSendBtn").unbind("click").click(function(){
							var checkBox = $("#sendDetailList tbody input:checkbox[name='checkbox2']:checked");
							var mt_pr_list = "";
							//console.log(checkBox);
							//console.log(checkBox.length);
							if(checkBox.length==0){
								alert('선택된 메시지가 없습니다.');
								return false;
							}
							var resend_cnt = 0;
							checkBox.each(function(){
								if(!$(this).prop("disabled")){
									mt_pr_list = mt_pr_list + "'"+$(this).attr("mt_pr")+"',";
									resend_cnt++;
								}
							});
							if(resend_cnt == 0){
								alert('대기중인 메시지는 전송 할 수 없습니다.');
							}else{
								mt_pr_list = mt_pr_list.substring(0,mt_pr_list.length-1);
								var schd_id = $("#sendDetail td[name='date_client_req']").attr("schd_id");
								var service_type = $("#sendDetail td[name='date_client_req']").attr("service_type");
								var param = {schd_id:schd_id,service_type:service_type,mt_pr_list:mt_pr_list,resend_cnt:resend_cnt};
								_this.sendDetail.resend(param,"mt_pr");								
							}
						});
						$("#sendDetail #failSendBtn").unbind("click").click(function(){
							var schd_id = $("#sendDetail td[name='date_client_req']").attr("schd_id");
							var service_type = $("#sendDetail td[name='date_client_req']").attr("service_type");
							var resend_cnt = $("#sendDetail td[name='date_client_req']").attr("fail_cnt");
							resend_cnt = resend_cnt.replace(/,/g,"")
							if(resend_cnt == "0"){
								alert('대기중인 메시지는 전송 할 수 없습니다.');
							}else{
								var param = {schd_id:schd_id,service_type:service_type,resend_cnt:resend_cnt};
								_this.sendDetail.resend(param,"schd_id");								
							}
						});
					},
					get : function(START, type) 
					{
						var _this = this.top();
						//search field set
						var json = "";
						json = Common.getInputTagToJson($("#searchArea", "#sendDetail"));
						_this.sendDetail.list.pJson = json;
						//var param = $.extend({procType:"getMtLogList", START:START,COUNT:_this.list.vertical_count}, json);
						if(START == 0) _this.list.current_page = 1;
						var param = $.extend({procType:"getKkoLogList",schd_id:_this.sendDetail.list.schd_id,par_date:_this.sendDetail.list.par_date,service_type:_this.sendDetail.list.service_type,START:START,COUNT:_this.list.vertical_count}, json);
						_this.sendDetail.list.get(param);
					}
				},
				list : {
					json : "",
					pJson : "",
					top : function() {
						return _main;
					},
					id : "",
					id_name : "sendDetailList",
					tr : "",
					total_count : 0,
					current_page : 1,
					vertical_count : 10,
					horizon_count : 10,
					user_count : 0,
					schd_id : "",
					par_date : "",
					service_type : "",
					search : {
						top : function() {
							return _main;
						},
						get : function(START, type) 
						{
							var _this = this.top();
							//search field set
							var json = "";
							json = Common.getInputTagToJson($("#searchArea", "#sendDetail"));
							_this.sendDetail.list.pJson = json;
							//var param = $.extend({procType:"getMtLogList", START:START,COUNT:_this.list.vertical_count}, json);
							if(START == 0) _this.list.current_page = 1;
							var param = $.extend({procType:"getKkoLogList",schd_id:_this.sendDetail.list.schd_id,par_date:_this.sendDetail.list.par_date,service_type:_this.sendDetail.list.service_type,START:START,COUNT:_this.list.vertical_count}, json);
							_this.sendDetail.list.get(param);
						}
					},
					btn : function(){
						var _this = this.top();
						var	json = Common.getInputTagToJson($("#searchArea",_this.sendDetail.list.id));
						$("#searchArea input[type='button']", _this.sendDetail.list.id).unbind("click").click(function(){
							var	json = Common.getInputTagToJson($("#searchArea",_this.sendDetail.list.id));
							_this.sendDetail.search.check();
						});
					},
					get : function(param) {
						$("#loadingLayer").show();
						var _this = this.top();
						_this.sendDetail.list.json = param;
						_this.sendDetail.list.total_count = 0;
						$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
							var json = _IBJson.decode(_data);
							
							$("tbody tr",_this.sendDetail.list.id).remove();
							
							if(json) {
								if(json.data) {
									var data = json.data;
									var result_code = data.resultCode;
									console.log(data);
									if(result_code == "1000") {			
										_this.sendDetail.list.total_count = data.totalCnt;					
										if(data.listData.length > 0){
											for(var i=0;i<data.listData.length;i++) {
												var obj = data.listData[i];
												$("tbody",_this.sendDetail.list.id).append(_this.sendDetail.list.tr.clone());
												var tr = $("tbody tr:last",_this.sendDetail.list.id);
												var mt_pr = obj.mt_pr;
												var recipient_num = _IBCommon.format_phone(obj.recipient_num);
												var name = Common.XSSfilter(obj.change_words);
												var result_code = obj.result_code;
												var result_msg = obj.result_msg;
												var rslt_device = obj.date_rslt_device.substring(0,16);
												var rslt_name = result_code == "1000" ? "성공" : (result_code == "" ? "대기" : "<div class=\"tooltip\">실패<span class=\"tooltiptext\">"+result_msg+"</span></div>");
												$("td[name='mt_pr'] input",tr).attr("mt_pr",mt_pr);
												if(result_code == ""){
													$("td[name='mt_pr'] input",tr).prop("disabled",true);
												}
												$("td[name='recipient_num']",tr).html(recipient_num);
												$("td[name='name']",tr).html(name);
												$("td[name='result']",tr).html(rslt_name);
												$("td[name='date_rslt_device']",tr).html(rslt_device);
											}										
										}else{		
											var tr = '<tr><td colspan="5" style="text-align:center;">데이터가 없습니다.</td></tr>';
											$("tbody",_this.sendDetail.list.id).append(tr);
										}
										
										_this.sendDetail.list.btn();
										console.log("_this.sendDetail.list.total_count :" + _this.sendDetail.list.total_count);
										if(_this.sendDetail.list.total_count > 0) {
											Common.pagingLayerDraw(_this.sendDetail.list,"pagingDiv");
											$("#sendDetail #detailPagingDiv").show();
										}else {
											$("#sendDetail #detailPagingDiv").hide();
										}
									}else if(result_code == "8000") {
										alert(Common.getAlertMsg(result_code));
										location.href = "/common/login_form.do";
									}else {
										alert(Common.getAlertMsg("201"));
									}
								}else {
									//json data not exist
									alert(Common.getAlertMsg("202"));
								}
							}
							$("#loadingLayer").hide();					
						}});
					}
				},
				
			}
		};
	