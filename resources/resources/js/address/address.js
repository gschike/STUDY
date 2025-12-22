	$("document").ready(function() {
		_main.init();
	});
	var _main = {
		top : function() {
			return _main;
		}, 
		val : {
			groupAddressList : {}
		},
		init : function() {
			var _this = this.top();
			_this.btn();
			_this.address.init();
			fnSetMenu("4", "1");
		},	
		btn : function(){
			var _this = this.top();
			$(".btn03").unbind("click").click(function(){
				if($(this).attr("data-target")=="ins_group_name"){
					if($("#ins_group_name").val().trim() == ""){
						alert("그룹이름을 입력하십시오.");
					}else{
						var param = {procType:"insertGroup" , group_name : Common.XSSfilter($("#ins_group_name").val())};
						_this.address.addressController.insertGroup(param);
					}
				}else{
					if($("#ins_people_name").val() == "" ){
						alert("이름을 확인해주십시오.");
					}else if($("#ins_people_name").val() == ""){
						alert("전화번호를 확인해주십시오..");
					}else if(!_IBCommon.is_numeric(Common.XSSfilter( $("#ins_people_mobile").val() ))){
						
					}else{
						var param = {procType:"insertPeople" 
							, name : Common.XSSfilter($("#ins_people_name").val()) 
							, mobile : Common.XSSfilter($("#ins_people_mobile").val()) 
							, group_id : $("#insGroupList option:selected").val() 
							, memo1 : Common.XSSfilter($("#ins_people_memo1").val())
						};
						_this.address.addressController.insertPeople(param);
						//insertPeople	
					}
				}
			});
			
			$("#vertical_count_list").unbind("change").change(function(){
				_main.address.list.vertical_count = $(this).val();
				$("#groupList tbody tr").removeClass("on");
				$(this).addClass("on");
				//var group_id = $("input",$(this)).attr("group_id");
				group_id = _this.address.list.group_id;
				var json = {group_id:group_id,START:"0", COUNT:_this.address.list.vertical_count};
				_this.address.list.addressList(json);	
			});
			
			$(".remodal-confirm").unbind("click").click(function(){
				_main.address.addressController.insertAddressExcelArrData({procType:"insertExcelDataArr" ,async : false , excelDataArr : _this.address.tmp_getData_obj ,element : "modal1" });
			});
			//_obj.list.vertical_count
			//검색
			$(".btn_search").unbind("click").click(function(e){
				if($(this).prop("type") == "button"){
					if($("#search_str").val() == ""){
						alert("검색어를 확인해주세요");
					}else{
						var start = 0;
						/*var search_target = $("#search_target").val();
						var search_str = Common.XSSfilter($("#search_str").val());*/
						_main.address.search.get(start);
						//_main.address.search.get(1)
					}
				}
			});
			

			//이동 복사
			$(".btn_sm").unbind("click").click(function(){
				if($("#personalList input:checked").length <= 0 ){
					alert("주소를 선택해주십시오.")
				}else{
					var people_seq_json = new Array();
					var group_id = $("#copycutGroupList").val();
					
					if(group_id <= 0){
						alert("적용할 그룹을 선택해 주십시오.");
					}else{
						$("#personalList input:checked").each(function(idx , chkObj){
							var seqs = new Object();
							seqs.seq = $(chkObj).val();
							seqs.maps_seq = $(chkObj).attr("maps_seq");
							people_seq_json.push(seqs);
							//console.log("idx : " + idx + "// val : " + $(chkObj).val())
						});
						
						if($(this).val() == "이동"){
							var param = {procType:"cutPeoples" , people_seq_json : people_seq_json , group_id : group_id};
							_this.address.addressController.cutPeoples(param);
						}else if($(this).val() == "복사"){
							var param = {procType:"copyPeoples" , people_seq_json : people_seq_json , group_id : group_id};
							_this.address.addressController.copyPeoples(param);
						}
					}
					
				}
				
			});
		},
		address : {
			top : function() {
				return _main;
			},
			init : function(){
				var _this = this.top();
				_this.address.group.init();
				var json = {group_id:_this.address.list.group_id,START:"0", COUNT:_this.address.list.vertical_count};
				_this.address.list.addressList(json);	
				_this.address.addressController.init();
			},	
			group : {
				top : function() {
					return _main;
				},				
				init : function(){
					var _this = this.top();
					_this.address.group_list_obj = $("#groupList tbody tr:first").clone();
					//insGroupList
					_this.address.ins_group_list_obj = $("#insGroupList option:first").clone();
					//modalGroupList
					_this.address.modal_group_list_obj = $("#modalGroupList option:first").clone();
					
					_this.address.group_list_empty_obj = $("#groupList tbody tr:last").clone();
					_this.address.personal_add_obj = $("#personalList tbody tr:nth-child(1)").clone();
					_this.address.personal_list_obj = $("#personalList tbody tr:nth-child(2)").clone();
					_this.address.personal_list_empty_obj = $("#personalList tbody tr:last").clone();
					_this.address.board_listP_obj = $(".board_listP tbody tr:last").clone();
					
					$("#groupList tbody tr").remove();
					_this.address.group.groupList(0);
				},
				btn : function(e){
					var _this = this.top();
					$("#groupList tbody tr").unbind("click").click(function(e){
						if($(e.target).is('a')){
							if($(e.target).text()=="삭제"){
								if(confirm("삭제하시겠습니까?")){
									var group_id = $("input",$(this)).attr("group_id");
									var param = {procType:"deleteGroup" , group_id : group_id};
									_this.address.addressController.deleteGroup(param);
								}
							}else if($(e.target).text()=="수정"){
								//수정하기 
								$(this).find("span").eq(0).hide();
								$(this).find("span").eq(1).hide();
								$(this).find("span").eq(2).hide();
								$(this).find("span").eq(3).show();
								$(this).find("input").eq(1).show();
							}else if($(e.target).text()=="취소"){
								//수정하기 
								$(this).find("span").eq(0).show();
								$(this).find("span").eq(1).show();
								$(this).find("span").eq(2).show();
								$(this).find("span").eq(3).hide();
								$(this).find("input").eq(1).hide();
							}else if($(e.target).text()=="저장"){
								//수정하기 
								var group_id = $(this).find("input").eq(1).attr("group_id");
								var group_name = $(this).find("input").eq(1).val();
								if(group_name == ""){
									alert("수정할 그룹명을 확인하십시오.");
								}else{
									$(this).find("span").eq(0).show();
									$(this).find("span").eq(1).show();
									$(this).find("span").eq(2).show();
									$(this).find("span").eq(3).hide();
									$(this).find("input").eq(1).hide();
									var param = {procType:"updateGroup" , group_id : group_id , group_name : group_name};
									_this.address.addressController.updateGroup(param);	
								}
							}
						}else if(!$(e.target).is('input')){
							$("#groupList tbody tr").removeClass("on");
							$(this).addClass("on");
							var group_id = $("input",$(this)).attr("group_id");
							_main.address.list.group_id = group_id;
							var json = {group_id:group_id,START:"0", COUNT:_main.address.list.vertical_count};
							_this.address.list.addressList(json);	

							_main.address.search.get(0);
						}
					});
				},
				groupList : function(group_id){
					var _this = this.top();
	
					var param = {procType:"getGroupList", group_id:group_id};
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000") {
									var address_cnt = _IBCommon.format_number(data.addressCnt);
									$("#groupList tbody").empty();
									var group_name = "";
									var group_id = "";
									$("#groupList tbody").append(_this.address.group_list_obj.clone());
									$("#groupList tbody tr input").attr("group_id", "0");
									$("span[name='group_cnt']","#groupList tbody tr").html("("+address_cnt+")");
									$("span[name='group_name']","#groupList tbody tr").attr("title","전체");
									$("#groupList tbody tr span").eq(2).hide();
									$("#modalGroupList").empty();
									$("#insGroupList").empty();
									
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										$("#groupList tbody").append(_this.address.group_list_obj.clone());
										var tr = $("#groupList tbody tr:last");
										address_cnt = _IBCommon.format_number(obj.cnt);
										group_name = Common.XSSfilter(" " + obj.group_name);
										group_id = obj.group_id;
										$("#groupList tbody tr:last input").attr("group_id", group_id);
										$("span[name='group_name']","#groupList tbody tr:last").html(group_name);
										$("span[name='group_cnt']","#groupList tbody tr:last").html("("+address_cnt+")");
										$("span[name='group_name']","#groupList tbody tr:last").attr("title",group_name);
										
										$("#modalGroupList").append(_this.address.modal_group_list_obj.clone());
										var option = $("#modalGroupList option:last");
										$(option).val(group_id).text(group_name);
										$("#insGroupList").append(_this.address.ins_group_list_obj.clone());
										var option = $("#insGroupList option:last");
										$(option).val(group_id).text(group_name);
										
										$("#insGroupList option:first").prop("selected" , true);
										$("#modalGroupList option:first").prop("selected" , true);
									}
									_this.address.group.btn();
									//_this.address.ins_group_list_obj = $("#insGroupList");
									if(data.listData.length < _this.address.address_list_cnt){
										for(var i=data.listData.length;i<_this.address.address_list_cnt;i++) {
											$("#groupList tbody").append(_this.address.group_list_empty_obj.clone());
										}											
									}								
									$("#copycutGroupList").html($("#insGroupList").html());
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
					}});
					
				}
			},
			search : {
				top : function() {
					return _main;
				},
				check : function() {
					var _this = this.top();
						
				},
				get : function(START) 
				{
					//console("START : " + START);
					var _this = this.top();
					var _obj = this.top().address;
					//search field set
					var json = Common.getInputTagToJson($("#searchArea"));
					
					var param = $.extend({procType:"getAddressList", START:START,COUNT:_obj.list.vertical_count}, json);
					if(START == 0) _this.address.list.current_page = 1;
					_this.address.list.addressList(param);
					_this.address.group.groupList(0);
					
				}/*,
				get : function(START , SEARCH_TARGET , SEARCH_STR) 
				{
					//console("START : " + START);
					var _this = this.top();
					var _obj = this.top().address;
					//search field set
					//var json = Common.getInputTagToJson($("#searchArea"));
					
					//var param = $.extend({procType:"getAddressList", START:START,COUNT:_obj.list.vertical_count}, json);
					var param = {procType:"getAddressList", START:START,COUNT:_obj.list.vertical_count , searchTarget : SEARCH_TARGET , searchStr : SEARCH_STR};
					if(START == 0) _this.address.list.current_page = 1;
					_this.address.list.addressList(param);
				}	*/			
			},
			list : {
				top : function() {
					return _main;
				},			
				id : "",
				//id_name : "myboxMsgList",
				li : "",
				total_count : 0,
				current_page : 1,
				vertical_count : 20,
				horizon_count : 5,
				group_id : 0,
				tmp_mobile : [],
				tmp_group_name : [],
				tmp_memo1 : [],
				tmp_maps_seq : [],
				
				
				init : function(){
					var _this = this.top();
					var json = {group_id:"0"};
					//_this.address.list.addressList(json);	
					$("#personalList tbody tr").remove();
					for(var i=0;i<_this.address.address_list_cnt + 1;i++) {
						$("#personalList tbody").append(_this.address.personal_list_empty_obj.clone());
					}	
					_this.address.list.btn();
				},	
				btn : function(){
					var _this = this.top();
					$("#personalList").find(".btn02").unbind("click").click(function(){
						if($(this).text() == "수정"){
							var seq = $(this).parent().parent().parent().find("input[name=checkbox1]").val();
							var span_obj = $(this).parent().parent().parent().find("span");
							_this.address.list.tmp_maps_seq[seq] = $(this).parent().parent().parent().find("input[name=checkbox1]").attr("maps_seq");
							_this.address.list.tmp_mobile[seq] = $(span_obj).eq(1).text();
							_this.address.list.tmp_group_name[seq] = $(span_obj).eq(2).text();
							_this.address.list.tmp_memo1[seq] = $(span_obj).eq(3).text();
							var a_obj = $(span_obj).eq(4).find("a");
							
							$(span_obj).eq(1).html("<input name='' type='text' value='"+ _this.address.list.tmp_mobile[seq] +"' style='width:80%'>");
							$(span_obj).eq(2).html($("#insGroupList").parent().clone());
							$(span_obj).eq(3).html("<input name='' type='text' value='"+ _this.address.list.tmp_memo1[seq] +"' style='width:80%'>");
							$(a_obj).eq(0).text("저장");
							$(a_obj).eq(1).text("취소");
							
						}else if($(this).text() == "삭제"){
							if(confirm("삭제하시겠습니까?")){
								var seq = $(this).parent().parent().parent().find("[name=checkbox1]").val();
								var param = {procType:"deletePeople" , seq : seq};
								_this.address.addressController.deletePeople(param);	
							}
						}else if($(this).text() == "취소"){
							var seq = $(this).parent().parent().parent().find("[name=checkbox1]").val();
							var span_obj = $(this).parent().parent().parent().find("span");
							var a_obj = $(span_obj).eq(4).find("a");
							 $(span_obj).eq(1).text(_this.address.list.tmp_mobile[seq]);
							 $(span_obj).eq(2).text(_this.address.list.tmp_group_name[seq]);
							 $(span_obj).eq(3).text(_this.address.list.tmp_memo1[seq]);
							 $(a_obj).eq(0).text("수정");
							 $(a_obj).eq(1).text("삭제");
						}else if($(this).text() == "저장"){
							var tr_obj = $(this).parent().parent().parent();
							var seq = $(tr_obj).find("input").eq(0).val();
							var maps_seq = $(tr_obj).find("input").eq(0).attr("maps_seq");
							var mobile = $(tr_obj).find("input").eq(1).val();
							var group_id = $(tr_obj).find("select").val();
							var memo1 = $(tr_obj).find("input").eq(2).val();
							var param = {procType:"updatePeople" , seq : seq , maps_seq : maps_seq , mobile : mobile , memo1 : memo1 , group_id: group_id};
							
							_this.address.addressController.updatePeople(param);	
						}
					});
				},
				addressList : function(json){
					var _this = this.top();
					var _obj = this.top().address;
					_obj.list.total_count = 0;
					$("#personalList tbody tr").remove();
					$("#personalList tbody").append(_this.address.personal_add_obj.clone());
					var param = $.extend({procType:"getAddressList"}, json);
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000") {
									_obj.list.total_count = data.totalCnt;	
									var tmp_group = {};
									if(data.listData.length > 0){
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											var seq = obj.seq;
											var maps_seq = obj.maps_seq;
											var address_name = Common.XSSfilter(" " + obj.name);
											var address_mobile = _IBCommon.format_phone(" " + obj.mobile);
											var address_group_name = Common.XSSfilter(" " + obj.group_name);
											$("#personalList tbody").append(_this.address.personal_list_obj.clone());
											var tr = $("#personalList tbody tr:last");
											$("#personalList tbody tr:last input").attr("value", seq);
											$("#personalList tbody tr:last input").attr("maps_seq", maps_seq);
											$("span[name='address_name']","#personalList tbody tr:last").html(address_name);
											$("span[name='address_mobile']","#personalList tbody tr:last").html(address_mobile);
											$("span[name='address_group_name']","#personalList tbody tr:last").html(address_group_name);
											
											if(typeof(param.searchTarget) == "undefined"){
												tmp_group[address_mobile] = {person_name:address_name,person_mobile:address_mobile};
												_this.val.groupAddressList[param.group_id] = tmp_group[address_mobile];
											}
										}
									}
									if(typeof(param.searchTarget) == "undefined"){
										_this.val.groupAddressList[param.group_id] = tmp_group;
									}
									if(data.listData.length < _this.address.address_list_cnt + 1){
										for(var i=data.listData.length;i<_this.address.address_list_cnt + 1;i++) {
											$("#personalList tbody").append(_this.address.personal_list_empty_obj.clone());
										}											
									}
									//수정삭제
									_main.address.list.btn();
									//_this.address.group.init();
									
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
						
						if(_obj.list.total_count > 0) {
							Common.pagingDraw(_obj,"personalPagingDiv");
							$("#personalPagingDiv").show();
						}else {
							//$("tbody ",_obj.list.id).html("<tr><td colspan='3' style='text-align:center;'>데이터가 없습니다.</td></tr>");
							$("#personalPagingDiv").hide();
						}
					}});
					
				}
			},
			addressController : {
				top : function() {
					return _main;
				},
				init : function() {
					var _this = this.top();
					_this.address.addressController.btn();
				},
				btn : function(){
					var _this = this.top();
					//파일찾기
					$("#file").unbind("change").change(function(){
						if(Common.checkExtension(2 , $("#file").val())){
							$("#file_input").val($(this).val());
						}else{
							alert(Common.getAlertMsg("1011"));
						}
					});
					//파일업로드
					$(".btnE").unbind("click").click(function(e){
						e.preventDefault();
						if($("#file").val() == ""){
							alert(Common.getAlertMsg("1012"));
						}else{
							//_this.set({procType:"uploadFileXls" , element : "modal2" });
							_this.address.addressController.upload();
						}
					});
				},
				upload : function(){
					var _this = this.top();
					var formOptions = {
							url : "/file/addressExcelUpload.do",
							dataType :  "text",
							iframe:true,
							beforeSubmit : function(){
								var file = $("input[type='file']","#frm_modal1").val();
								var fileExt = file.slice(file.lastIndexOf(".") + 1).toLowerCase();
								
								if(file == ""){
									alert("파일을 선택 하세요.");
									//_this.loadingHide();
									return false;
								}
								
								if(fileExt != "xls" && fileExt != "xlsx"){
									alert("파일은 xls, xls만 가능합니다.");
									//_this.loadingHide();
									return false;
								}
							},
							success : function(_data) {
								var json = JSON.parse(_data);
								var data = json.data;
								var filePath = json.filePath;
								for(var i=0;i<data.length;i++) {
									var obj = data[i];
									if(obj.status == "100"){
										_this.address.addressController.getAddressExcelData(
											{procType:"getAddressExcelData" , async : false , filePath : filePath, element : "api" }
										);
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
					
					$("#frm_modal1").ajaxForm(formOptions).submit();
				},
				insertGroup : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("등록되었습니다.");
									_this.address.group.init();
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
				insertPeople : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("등록되었습니다.");
									_this.address.group.init();
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
				deleteGroup : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("삭제되었습니다.");
									_this.address.group.init();
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
				updateGroup : function(param){
					var _this = this.top();
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("수정 되었습니다.");
									_this.address.group.init();
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
				getAddressExcelData : function(param){
					var _this = this.top();
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000") {
								$(".conPop tbody").empty();
								/*$.each(data,function(index,items){
									$(".conPop tbody").append(_this.address.board_listP.obj.clone());
									
								});*/
								var group_id= $("#modalGroupList").val();
								
								for(var i=0;i<data.listData.length;i++) {
									var obj = data.listData[i];
									$(".conPop tbody").append(_this.address.board_listP_obj.clone());
									var tr = $(".conPop tbody tr:last");
									obj.group_id = group_id;
									name = Common.XSSfilter(obj.name);
									mobile = Common.XSSfilter(obj.mobile);
									memo1 = Common.XSSfilter(obj.memo1);
									$(tr).find("td").eq(0).text(group_id);
									$(tr).find("td").eq(1).text(name);
									$(tr).find("td").eq(2).text(mobile);
									$(tr).find("td").eq(3).text(memo1);
									//group_id 추가후 변경
									data.listData[i] = obj;
								}
								_this.address.tmp_getData_obj = data.listData;
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
					}});
				},
				insertAddressExcelArrData : function(param){
					var _this = this.top();
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("등록 되었습니다.");
									_this.address.group.init();
									$(".remodal-close").trigger("click");
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
				deletePeople: function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("삭제되었습니다.");
									_main.address.search.get(0);
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
				updatePeople : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("저장되었습니다.");
									_main.address.search.get(0);
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
				copyPeoples : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("복사되었습니다.");
									_main.address.search.get(0);
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
				cutPeoples : function(param){
					var _this = this.top();
					var _obj = this.top().address;
					//_obj.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								//var result_msg = data.resultMsg;
								if(result_code == "1000") {
									alert("이동되었습니다.");
									_main.address.search.get(0);
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
				}
			}
		}
	}