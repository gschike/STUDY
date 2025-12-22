	$("document").ready(function() {
		_main.init();
	});

	var _const = {
			modal2_tmp_code_chk_boo : false,
			template_list_data : null,
			tmp_getData_obj : null
			
	};
	//summary.js 참고 2018-04-12 PHI
	var _main = {
		top : function() {
			return _main;
		}
		,init : function() {
			var _this = this.top();
			fnSetMenu("7", "4");
			_this.btn();
			_this.modal.init();
			_this.uuid.init();
			_this.sch.init();
			_this.file.init();
			_this.sch.init();
			_this.taskCate.init();
			_this.tmp.init();
			_this.file.init();
		},
		btn : function() {
			var _this = this.top();
			
			$("#modal4 a.remodal-confirm").unbind("click").click(function(){
				$("a.remodal-close").trigger("click");
			});
			
			//체크박스 하나만 선택되도록 하기
			$("input:checkbox[id='modal2_var_use_chkbox']").unbind("click").click(function(){
				$("input:checkbox[id='modal2_var_use_chkbox']").prop("checked",false);
				$(this).prop("checked",true);
			});
			
		},
		modal : {
			top : function() {
				return _main;
			},
			init : function() {
				var _this = this.top();
				_this.modal.btn();
			},
			btn : function() {
				var _this = this.top();
				//템플릿 등록
				$("#modal2 a.remodal-confirm").unbind("click").click(function(){
					var sendDatas = $("#frm_modal2").serializeArray();
					//var params_arr = new Array();
					var params = new Object();

					params.chat_button_info = _this.modal.validation();
					if(params.chat_button_info != false){
						$(sendDatas).each(function(idx , item){
							var name = item.name;
							if(name == "modal2_uuid_list") params.uuid = item.value;
							if(name == "modal2_task_cate") params.task_id = item.value;
							if(name == "modal2_var_use_chkbox") params.variable_use = item.value;
							if(name == "modal2_tmp_nm") params.template_name = item.value;
							if(name == "modal2_tmp_code") params.template_code = item.value;
							//if(name == "modal2_tmp_cont") params.template_contents = item.value;
							if(name == "modal2_tmp_cont") params.template_contents = item.value.replace(/\r\n/gi,"<br/>");
							if(name == "modal2_btn_use_chk") params.button_use_chk = item.value;
						});
						
						params.sender_key = $("#modal2_uuid_list option:selected").attr("data-sender_key")
						params.sender_key_type = "S"; //S 기본 , G:발신프로필타입
						params.template_status = "R"; //템플릿상태(S:중단, A:정상, R:대기(발송전))
						//params.inspaction_status = "REG"; //검사상태(REG:접수, APL:등록, INS:검수중, COM:승인, REJ: 반려) 

						params.procType = "insertTemplate";
						params.async = true;
						params.element = "modal2";
						_this.tmp.insTmp(params);
					}
				});

				//modal2 버튼 사용여부
				$("#modal2_btn_use_chk").unbind("change").change(function(){
					//옵션 초기화
					$(this).parent().parent().parent().find("select").each(function(idx,item){
						if(idx != 0){
							$("#modal2_btn_type"+idx+" option:eq(0)").prop("selected",true);
							$("#modal2_btn_nm"+idx).val("");
							$("#modal2_btn_url1_"+idx).val("");
							$("#modal2_btn_url2_"+idx).val("");	
						}
						//display
						if(idx != 0){
							if($("#modal2_btn_use_chk").val() == "Y"){
								$(item).parent().parent().show()
							}else{
								$(item).parent().parent().hide()
							}	
						}
					});
				});

				$("#cfrmXlsData").unbind("click").click(function(e){
					e.preventDefault();
					if($("#file_input").val()=="" || $("#file").val() == ""){
						alert(Common.getAlertMsg("1012"));
					}else if($("#tab2").find("tbody").eq(1).is(':empty')){
						alert(Common.getAlertMsg("1013"));
					}else{
						_this.get({procType:"insertExcelDataArr" , async : false , excelDataArr : _const.tmp_getData_obj , element : "modal2" });	
					}
				});
				
				$("#modal2_uuid_list").unbind("change").change(function() {
					if($("#modal2_uuid_list option:selected").val() != -1){
						_this.taskCate.getTaskCateList({procType:"getTaskCategoryList" , async : false , uuid : $("#modal2_uuid_list option:selected").val(), element : "modal2" });	
					}
				});
			},
			validation : function(){
				if($("#modal2_uuid_list").val() == "" || $("#modal2_uuid_list").val() == -1 ){
					alert(Common.getAlertMsg("1001"));
					return false;
				}

				if($("#modal2_task_cate").val() == "" || $("#modal2_task_cate").val() == null){
					alert(Common.getAlertMsg("1002"));
					return false;
				}
				if($.trim($("#modal2_tmp_nm").val()) == ""){
					alert(Common.getAlertMsg("1004"));
					$("#modal2_tmp_nm").val("");
					return false;
				}
				
				if($("#modal2_tmp_code").val() == ""){
					alert(Common.getAlertMsg("1006"));
					return false;
				}
				
				if(!_const.modal2_tmp_code_chk_boo){
					alert(Common.getAlertMsg("1005"));
					return false;
				}
				
				if($("#modal2_tmp_cont").val() == ""){
					alert(Common.getAlertMsg("1007"));
					return false;
				}else{
					if($("#modal2_var_use_chkbox:checked").val() == "Y"){
						if($("#modal2_tmp_cont").val().match(/#{/g) != null	){
							var cnt = $("#modal2_tmp_cont").val().match(/#{/g).length;
							if(cnt > 5){
								alert("변수는 5개까지 지원됩니다.");
								return false;
							}	
						}	
					}
				}
				

				if($("#modal2_btn_use_chk").val() == "Y"){
					var modal2_button_json = new Array();
					
					$("#modal2_btn_use_chk").parent().parent().parent().find("select").each(function(idx,item){
						if(idx != 0){
							var buttons = new Object();
							//버튼타입
							buttons.name = $(item).parent().parent().find("input").eq(0).val();
							buttons.type = $(item).val();
							//ordering 확인 필요
							buttons.ordering = "1";
							
							if(buttons.type == "AL"){
								buttons.scheme_ios = $(item).parent().parent().find("input").eq(1).val();
								buttons.scheme_android = $(item).parent().parent().find("input").eq(2).val();
							}else{
								buttons.url_pc = $(item).parent().parent().find("input").eq(1).val();
								buttons.url_mobile = $(item).parent().parent().find("input").eq(2).val();	
							}
							if(buttons.name != "" && ((buttons.scheme_ios != ""  && buttons.scheme_android != "") || (buttons.url_pc != ""  && buttons.url_mobile != ""))){
								modal2_button_json.push(buttons);
							}
						}
						//json 생성
					});
					if(modal2_button_json.length <= 0){
						alert("버튼을 설정해주시기 바랍니다.");
					}
					return modal2_button_json;
				}else{
					return;
				}
			}
		},
		sch : {
			top : function() {
				return _main;
			},
			init : function() {
				var _this = this.top();
				_this.sch.btn();
			},
			btn : function() {
				$(".btn_search").unbind("click").click(function(){
					//검색어 버튼일경우
					if($(this).find("input").length <= 0 ){
						if($("#sch_tmp_key").val()=="" ){
							alert(Common.getAlertMsg(1009));
						}else{
							var params_obj = new Object();
							params_obj.procType = "searchTemplateList";
							params_obj.async = false;
							params_obj.searchTemplateKeyword = $("#sch_tmp_key").val();
							if($("#inspection_status").val() != "-1"){
								params_obj.inspection_status = $("#inspection_status").val();
							}
							params_obj.element = "normal";
							
							_this.get(params_obj);
						}	
					}
				});
			}
		},
		uuid : {
			top : function() {
				return _main;
			},
			init : function() {
				var _this = this.top();
				_this.uuid.getUuidList({procType:"getUuidList" , async : false , element : "normal" });
				_this.uuid.btn();
			},
			btn : function() {
				var _this = this.top();
				$(".btn_01").unbind("click").click(function(e){
					e.preventDefault();
					if($(this).attr("data-remodal-target") == "modal2"){
						_this.uuid.getUuidList({procType:"getUuidList" , async : false , element : "modal2" });
					}
				});
				
				//플러스친구 ID Selectbox Change
				$("#uuid_list").unbind("change").change(function() {
					if($("#uuid_list option:selected").val() != -1)
						_this.taskCate.getTaskCateList({procType:"getTaskCategoryList" , async : false , uuid : $("#uuid_list option:selected").val(), element : "normal" });
				});
			},
			getUuidList : function(params) {
				var _this = this.top();
				//플러스친구 가져오기
				_this.get(params);
			}
		},
		taskCate : {
			top : function() {
				return _main;
			},
			init : function() {
				var _this = this.top();
				_this.taskCate.btn();
			},
			btn : function() {
				var _this = this.top();
				$("#task_cate").find("a").unbind("click").bind("click",function(){
					var uuids = "";
					if($(this).attr("data-uuid") == undefined){
						uuids = $("#uuid_list option:selected").val() 
					}else{
						uuids = $(this).attr("data-uuid");
						$("#uuid_list").val(uuids).prop("selected", true);
					}
					_this.tmp.getTmpList({procType:"getTemplateList" , async : false , uuid : uuids , task_id : $(this).attr("data-taks-id"), element : "normal" });
				});
			},
			getTaskCateList : function(params) {
				var _this = this.top();
				_this.get(params);
			}
		},
		tmp : {
			top : function() {
				return _main;
			},
			init : function() {
				var _this = this.top();
				_this.tmp.btn();
			},
			btn : function() {
				var _this = this.top();
				
				$("#tmp_list").find("a").unbind("click").bind("click",function(){
					var seq = $(this).parent().find("input").attr("data-seq");
					$(_const.tmp_list_data).each(function(idx,item){
						if(item.seq == seq ){
							$(".kakaoBox").empty();
							$(".kakaoBox").append("<li>알림톡도착<div class='kakaoicon'></div></li>");
							$(".kakaoBox").append("<li>"+item.template_contents.replace(/\r\n/gi,"<br/>")+"</li>");
							
							//$(".kakaoBox > li").eq(1).html(item.template_contents);

							var buttons_json = eval(item.chat_button_info);
							$(buttons_json).each(function(idx , button){
								if(button.type == "WL"){
									$(".kakaoBox").append("<li class='btn'><a href='"+button.url_pc+"'>"+button.name+"</a></li>");
									$(".kakaoBox").append("<li class='btn'><a href='"+button.url_mobile+"'>"+button.name+"</a></li>");
								}else{
									$(".kakaoBox").append("<li class='btn'><a href='"+button.scheme_ios+"'>"+button.name+"</a></li>");
									$(".kakaoBox").append("<li class='btn'><a href='"+button.scheme_android+"'>"+button.name+"</a></li>");
								}
							});
						}
					});
				});
				
				$("#modal2_tmp_code_chk").unbind("click").click(function(){
					if($("#modal2_tmp_code").val().trim()==""){
						alert("템플릿코드를 확인하십시오.");
						$("#modal2_tmp_code").focus();
					}else{
						_this.get({procType:"getTemplateCodeCnt" , async : true , template_code : $("#modal2_tmp_code").val(), element : "modal2" });
					}
				});
			},
			getTmpList : function(params){
				var _this = this.top();
				_this.get(params);
			},
			insTmp : function(params) {
				var _this = this.top();
				_this.get(params);
			}
		},
		get : function(param){
			var _this = this.top();
			//_this.push.json = param;
			$.ajax({
				url : Common.NOTITALK_PATH+"get.do"
				,type:"POST"
				,dataType:"text"
				,timeout:Common.DEFAULT_AJX_TIME
				,async: (param.async) ? param.async : false 
				,data:{jsonBody:_IBJson.encode(param)}
			,success:function(_data) {
				
				var json = _IBJson.decode(_data);
				
				if(json) {
					if(json.data) {
						var data = json.data;
						var result_code = data.resultCode;
						if(result_code == "1000") {
							_this.makeUi(data , param);
						}else{
							alert(Common.getAlertMsg(result_code));
						}
					}else {
						//json data not exist
						alert(Common.getAlertMsg("202"));
					}
				}
			}});
		},
		file : {
			top : function(){
				return _main;
			},
			init : function(){
				var _this = this.top();
				_this.file.btn();
			},
			btn : function(){
				var _this = this.top();
				$(".btnE").unbind("click").click(function(e){
					e.preventDefault();
					if($("#file").val() == ""){
						alert(Common.getAlertMsg("1012"));
					}else{
						_this.file.upload();
					}
				});
				
				//파일찾기
				$("#file").unbind("change").change(function(){
					if(Common.checkExtension(2 , $("#file").val())){
						$("#file_input").val($(this).val());
					}else{
						alert(Common.getAlertMsg("1011"));
					}
				});
			},
			upload : function(){
				var _this = this.top();
				var formOptions = {
						url : "/file/talkExcelUpload.do",
						dataType :  "text",
						iframe:true,
						beforeSubmit : function(){
						},
						success : function(_data) {
							console.log("_data : "+ _data);
							var json = JSON.parse(_data);
							var data = json.data;
							var filePath = json.filePath;
							for(var i=0;i<data.length;i++) {
								var obj = data[i];
								//console.log("data o : "+ i + "--" +obj);
								if(obj.status == "100"){
									_this.get({procType:"getTalkExcelData" , async : false , filePath : filePath, element : "api" });
								}else{
									alert(Common.getAlertMsg("9999"));
								}
							}									
						},
						complete:function(){
							//_this.loadingHide();
						},
						error: function (request, status, error) {
		                }
					};
				
				$("#frm_modal2").ajaxForm(formOptions).submit();	
			}
		},
		makeUi : function(data , param){
			var _this = this.top();
			var _getData = data.listData;
			var procType = param.procType;
			var element = param.element;
			//modal용일경우 처리
			if(element != "normal"){
				if(procType == "getUuidList"){
					$("#modal2_uuid_list").html("").append("<option value='-1'>플러스 친구를 선택해주세요.");
					if(_getData.length > 0){
						$.each(_getData,function(index,item){
							$("#modal2_uuid_list").append("<option value='"+item.uuid+"' data-sender_key='"+item.sender_key+"'>"+item.uuid+"</option>");
						});
					}/*else{
						alert(Common.getAlertMsg("1001"));
					}*/
				}else if(procType == "getTaskCategoryList"){
					$("#modal2_task_cate").html("");
					if(_getData.length > 0){
						$.each(_getData,function(index,item){
							$("#modal2_task_cate").append("<option value='"+item.task_id+"'>"+item.task_name+"</option>");
						});
					}else{
						alert(Common.getAlertMsg("2002"));
					}
				}else if(procType == "getTemplateCodeCnt"){
					if(data.tempCnt > 0 ){
						alert(Common.getAlertMsg("1003"));
						_const.modal2_tmp_code_chk_boo = false;
					}else{
						alert(Common.getAlertMsg("OK"));
						_const.modal2_tmp_code_chk_boo = true;
					}
				}else if(procType == "getTemplateDetail"){
					//console.log(_getData.length);
					if(_getData.length > 0){
						var item = _getData[0];
						$("#modal4_template_detail").html("");
						$("#modal4_template_detail_buttons").html("");
						var html_str = "<tr><th>승인상태</th>";
						html_str += "<td class='left'>"+Common.getInspectionStatustMsg(item.inspection_status)+"("+item.update_date+")";
						if(item.inspection_status == "REJ") {
							html_str += "<input name='' type='button' value='템플릿수정' class='btn_mdOrange' data-remodal-target='modal5' date-seq='"+item.seq+"'>";
							html_str += "<input name='' type='button' value='재수검요청' class='btn_md'>";
						}
						html_str += "</td></tr>";
						html_str += "<tr><th>플러스친구ID</th><td class='left'>"+item.uuid+"</td></tr>";
						html_str += "<tr><th>업무카테고리</th><td class='left'>"+item.task_name+"</td></tr>";
						if(item.variable_use == "N"){
							html_str += "<tr><th>내용, 버튼<br/>\#[변수}설정</th><td class='left'>미지원(개별 발송만 가능)</td></tr>";
						}else{
							html_str += "<tr><th>내용, 버튼<br/>\#[변수}설정</th><td class='left'>적용(개별 및 파일 발송 모두 가능)</td></tr>";
						}
						html_str += "<tr><th>템플릿제목</th><td class='left'>"+item.template_name+"</td></tr>";
						html_str += "<tr><th>템플릿코드</th><td class='left'>"+item.template_code+"</td></tr>";
						html_str += "<tr><th>내용</th><td class='left'>"+item.template_contents+"</td></tr>";
						$("#modal4_template_detail").append(html_str);
						var buttons_json = eval(item.chat_button_info);
						var html_btn_str = "";
						$(buttons_json).each(function(idx , button){
							html_btn_str += "<tr>";
							if(button.type == "WL"){
								html_btn_str += "<td>웹링크</td>";	
								html_btn_str += "<td>"+button.url_pc+"<br/>"+button.url_mobile+"</td>";
							}
							else{
								html_btn_str += "<td>앱링크</td>";	
								html_btn_str += "<td>"+button.scheme_ios+"<br/>"+button.scheme_android+"</td>";
							}
							html_btn_str += "</tr>";
						});
						
						$("#modal4_template_detail").append(html_btn_str);
						
					}else{
						alert(Common.getAlertMsg("9999"));
					}
				}else if(procType == "getTalkExcelData"){
					if(_getData.length > 0){
						$("#tab2").find("tbody").eq(1).empty();
						$.each(_getData,function(index,items){
							$("#tab2").find("tbody").eq(1).append("<tr><td>"+items.uuid+"</td><td>"+items.task_id+"</td>" +
									"<td>"+items.variable_use+"</td><td>"+items.template_name+"</td><td>"+items.template_code+"</td>" +
									"<td>"+items.template_contents+"</td></tr>");	
							_getData[index].template_name = items.template_name;// items.template_name.replace(/\n/gi,"<br/>");
							_getData[index].template_contents = items.template_contents.replace(/\n/gi,"<br/>");
						});
						_const.tmp_getData_obj = _getData;
					}else{
						//error
					}
				}else if(procType == "insertExcelDataArr"){
					if(data.resultCode == "1000"){
						alert(Common.getAlertMsg("0"));
						//초기화
						_const.tmp_getData_obj = null;
						$("#tab2").find("tbody").eq(1).empty();
						$("#file_input").val("");
						$("#file").val("");
						$("#modal2 a.remodal-close").click()
					}
				}else if(procType == "insertTemplate"){
					alert(Common.getAlertMsg("0"));
					//임시로 redirect
					location.href="http://localhost:8080/operations/template.do";
				}else{
					alert(Common.getAlertMsg("9001"));
				}
			}else{
				if(procType == "getUuidList"){
					$("#uuid_list").html("<option value='-1'>플러스 친구를 선택해주세요.");
					if(_getData.length > 0){
						$.each(_getData,function(index,item){
							$("#uuid_list").append("<option value='"+item.uuid+"'>"+item.uuid+"</option>");
						});
					}else{
						//alert(Common.getAlertMsg("1001"));
					}
				}else if(procType == "getTaskCategoryList"){
					$("#task_cate").html("<tr><td class='nodata'></td></tr>");
					if(_getData.length > 0){
						$("#task_cate").html("");
						$.each(_getData,function(index,item){
							$("#task_cate").append("<tr><td><a href='#' data-taks-id='"+item.task_id+"'>"+item.task_name+"</a></td></tr>");
						});
						// ajax 호출 후 리스트 event 재적용시 호출
						fnLAjaxListCss();
						_this.taskCate.init();
					}else{
						$("#task_cate").html("");
						alert(Common.getAlertMsg("2002"));
					}
				}else if(procType == "getTemplateList"){
					$("#tmp_list").html("<td colspan='3' class='nodata'></td>");
					
					if(_getData.length > 0){
						$("#tmp_list").html("");
						$.each(_getData,function(index,item){
							$("#tmp_list").append("<tr><td><a href='#'>"+item.template_name+"</a> <input type='button' class='btn_sm' value='상세' data-remodal-target='modal4' data-seq='"+item.seq+"'></td>" +
									"<td>"+item.template_code+"</td><td>"+item.template_status+"</td></tr>");
						});
						fnLAjaxListCss();

						$("#tmp_list").find("input[type=button]").unbind("click").click(function(){
							_this.get({procType:"getTemplateDetail" , async : false , seq : $(this).attr("data-seq"), element : "modal4" });
						});
						_const.tmp_list_data = _getData;
						_this.tmp.init();
						
					}else{
						$("#tmp_list").html("");
						alert(Common.getAlertMsg("1008"));
					}
				}else if(procType =="searchTemplateList"){
					if(_getData.length > 0){
						$("#tmp_list").html("");
						$.each(_getData,function(index,item){
							$("#tmp_list").append("<tr><td><a href='#'>"+item.template_name+"</a> <input type='button' class='btn_sm' value='상세' data-remodal-target='modal4' data-seq='"+item.seq+"'></td>" +
									"<td>"+item.template_code+"</td><td>"+item.template_status+"</td></tr>");
						});
						var task_name_temp = "";
					
						if(_getData.length > 0){
							$("#task_cate").html("");
							$.each(_getData,function(index,item){
								if(task_name_temp != item.task_name){
									$("#task_cate").append("<tr><td><a href='#' data-taks-id='"+item.task_id+"' data-uuid='"+item.uuid+"'>"+item.task_name+"</a></td></tr>");
									task_name_temp = item.task_name;
								}
								
								if(task_name_temp == "") 
									task_name_temp = item.task_name
							});
							// ajax 호출 후 리스트 event 재적용시 호출
							fnLAjaxListCss();
						}
						
					}else{
						$("#tmp_list").empty();
						$("#task_cate").empty();
						alert(Common.getAlertMsg("1010"));
					}
				}else{
					alert(Common.getAlertMsg("9001"));
				}
			}
		}
	};
	