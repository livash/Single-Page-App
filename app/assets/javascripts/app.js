$(document).ready(function() {
	var listsString = $('#lists').html();
	var TASKS = JSON.parse(listsString);
	var ui = new Todo.UI(TASKS);
	ui.start();
});

var Todo = {};

Todo.UI = (function() {
	
	function UI(tasks) {
		this.tasks = tasks;
	};
	
	UI.prototype.start = function(){
		console.log("in the start");
		console.log(this.tasks);
		this.makeMainDiv();
		this.renderTasks();
		//this.listenForClicks();
	};
	
	UI.prototype.makeMainDiv = function(){
		var div = $("<div class='main-div'>This is main div</div>")
		$('body').prepend(div);
	}
	
	UI.prototype.renderTasks = function(){
		var that = this;
		var ol = $('<ol>');
		console.log(that.tasks);
		that.tasks.forEach(function(list, idx){
			var listTitle = list['todo_list']['title'];
			var a = $('<a>').attr({'href' : '#', 'id' : idx}).html(listTitle);
			var li = $('<li>').html(a);
			ol.append(li);
		});
		$('.main-div').append(ol);
	};
	
	
	return UI;
})();