(function(window){
	window.Cell=function(){
		var cell = {};
			cell.name = "";
			cell.data="";
			cell.firstCellPerTop="";
			cell.img="";
			/*
			*{"name":"txt0","height":"143px","width":"122px","left":"82px","top":"184px","percentWidth":"0.190625","p_x":"286px","p_y":"40px"},
			*/
　　　　　　  cell.initWith = function(name,data,firstCellPerTop){
				cell.name=name;
				cell.data=data;
				cell.firstCellPerTop=firstCellPerTop;
				
			};

			cell.createCell=function()
			{
				var div = document.createElement('div');
				$(div).addClass(cell.name);
				$(div).css("position","absolute");
				/*$(div).css("width",cell.data["percentWidth"]+"%");
				$(div).css("height",cell.data["percentHeight"]+"%");
				$(div).css("top",cell.data["pertop"]+"%");
				$(div).css("left",cell.data["perleft"]+"%");*/

				

				$(div).css("width",cell.data["width"]);
				$(div).css("height",cell.data["height"]);
				//这里判断屏幕设备尺寸，其中元素的位置，要与psd中高度做差值计算
				var screenHeight=$(window).height();
				
				

				//$(div).css("top",cell.data["top"]);
				$(div).css("left",cell.data["left"]);

				
					var toper=cell.firstCellPerTop;
					var firstCellByTop=screenHeight/100*toper;
					var reduce=(window.psdinfo["height"])/100*(cell.firstCellPerTop)-firstCellByTop*1.2;
				
				if("bg"==cell.data.name)
				{
					console.log(toper);
				}
				if("0"!=cell.data["pertop"]){
					$(div).css("top",parseInt(cell.data["top"])-reduce+"px");
				}else{
					$(div).css("top",cell.data["top"]);
				}
				

				var img=document.createElement('img');
					$(img).attr("width","100%");
					$(img).attr("data-src","images/"+cell.data["src"]);

				cell.img=img;
				$(div).append(img);
				
				//console.log(div);
				return div;
			}
　　　　　　return cell;
	}
})(window)
