function view(){

			$.ajax({

		  	url : "<?= base_url('presensi/Presensi/view');?>",
		  	Type :"post",
		  	dataType :"JSON",
		  	success:function(data){
		  		var html = "";
		  		var no = 0;
		  		for (var i = 0; i < data.length; i++) {
		  			no++;
		  			html+="<tr>"
		  				 +"<td>"+no+"</td>"
		  				 +"<td>"+data[i].tanggal+"</td>"
		  				 +"<td>"+data[i].time_in+"</td>"
		  				 +"<td>"+data[i].time_out+"</td>"
		  				 +"<td>"+data[i].nama_peserta+"</td>"
		  				 +"<td>"+data[i].kelas+"</td>"
		  				 +"</tr>";
		  		}
		  	$('#view').html(html);

		  	}
		  });
		}


		$( "#nis" ).on('input',function() {
		  var nis = $('#nis').val();
		  var status = $('#status').val();
		  $.ajax({
		  	url : "<?= base_url('presensi/Presensi/cari/');?>"+nis+"/"+status,
		  	Type :"post",
		  	dataType :"JSON",
		  	success:function(data){
		  	// 	console.log(data);
		  	// 	document.getElementById("nama").innerHTML= data.nama_peserta;
		  		document.getElementById("nis").value = "";
		  		view();
		  		toastr.info(data.message);
		  		toastr.options.timeOut = 2000; // 3s
		  	}
		  });
		});


		$('#save').on('click',function(){
			var data_form = $('#form').serialize();
			$.ajax({
				url : "<?= base_url('presensi/Presensi/set/');?>",
				method: 'post',
				dataType : "JSON",
				data :data_form,
				success : function(data1){
					if (data1.message == 'Berhasil') {
						$('#exampleModal').modal('hide');
						toastr.success(data1.message);
		  				toastr.options.timeOut = 2000;
		  				location.reload();
					} else {
						$('#exampleModal').modal('hide');
						toastr.warning(data1.message);
		  				toastr.options.timeOut = 2000;
		  				location.reload();
					}
				}
			});
		});
