function displayAll()
{
	$.ajax({
	type: "GET",
	url: "http://localhost:8080/api/courses",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(result){
		console.log(result);
		
        var col = [];
        for (var i = 0; i < result.length; i++) {
            for (var key in result[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
					console.log(key);
                }
            }
        }	
		// CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
		var colHead = ['ID','Course Name','Description','Program Code','Instructed By','Edit','Delete'];
        var tr = table.insertRow(-1);               // TABLE ROW.
        for (var i = 0; i < colHead.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = colHead[i];
            tr.appendChild(th);
        }		
		for (var i = 0; i < result.length; i++) {
            tr = table.insertRow(-1);
			var queryStr;
            for (var j=0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = result[i][col[j]];
				if(j==0)
				{
					queryStr=result[i][col[j]];
				}
            }
			
			var tabCell = tr.insertCell(-1);
			var queryStrEdit="AddCourse.html?id="+queryStr.toString();
            tabCell.innerHTML = '<a id="linkEdit" href='+queryStrEdit+'>Edit</a>';
			
			var tabCell = tr.insertCell(-1);
			var queryStrDelete="Course.html?id="+queryStr.toString();
            tabCell.innerHTML = '<a id="linkDelete" href='+queryStrDelete+' >Delete</a>';
        }
		
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
		
		}
	});
}





function deleteDocument(CourseId)
{
	$.ajax({
	type: "delete",
	url: "http://localhost:8080/api/courses/"+CourseId,
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(result){}
	});
	top.location.href = "Course.html?id=all";	
}


function modifyCourse()
{
	var params = new window.URLSearchParams(window.location.search);
		var courseId=params.get('id').toString(); //need to validate the query string
		
		if (courseId=="new")
		{
			$('#cId').val('');
			$('#cname').val('');
			$('#desc').val('');
			$('#pcode').val('');
			$('#insId').val('');
			
			$("#btnUpdate").hide();
			$("#btnSubmit").show();
		}
		else
		{
			$("#btnUpdate").show();
			$("#btnSubmit").hide();
			$.ajax({
			type: "GET",
			url: "http://localhost:8080/api/courses/"+courseId,		
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
					console.log(data);
					var cId=data[0]["c_id"].toString();
					var cname=data[0]["c_name"].toString();
					var desc=data[0]["c_description"].toString();
					var pcode=data[0]["program_code"].toString();
					var insId=data[0]["instructed_by"].toString();
					
					$('#cId').val(cId);
					$('#cname').val(cname);
					$('#desc').val(desc);
					$('#pcode').val(pcode);
					$('#insId').val(insId);
				}
			});		
		}
}
	
	function update()
	{
		var params = new window.URLSearchParams(window.location.search);
		var courseId=params.get('id').toString(); //validate the query string
		
		var cname=$('#cname').val();
		var desc=$('#desc').val();
		var pcode=$('#pcode').val();
		var insId=$('#insId').val();
		
		$.ajax({
			type: "PUT",
			url: "http://localhost:8080/api/courses/"+courseId+"/"+cname+"/"+desc+"/"+pcode+"/"+insId,		
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){}
			});	
		top.location.href = "Course.html?id=all";
	}
	
	function addNewInstructor()
	{
		var courseId=$('#cId').val();
		var cname=$('#cname').val();
		var desc=$('#desc').val();
		var pcode=$('#pcode').val();
		var insId=$('#insId').val();		
		
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/courses/"+courseId+"/"+cname+"/"+desc+"/"+pcode+"/"+insId,		
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){}
			});	
		top.location.href = "Course.html?id=all";	
	}