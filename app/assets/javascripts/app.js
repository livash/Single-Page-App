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
		this.listenForClicks();
	};
	
	UI.prototype.makeMainDiv = function(){
		var div = $("<div class='main-div'></div>")
		var header = $('<h1>').html("Your Todo lists:");
		div.prepend(header);
		$('body').prepend(div);
	}
	
	UI.prototype.renderTasks = function(){
		var that = this;
		var ol = $('<ol>');

		that.tasks.forEach(function(list, idx){
			var div = $('<div>').attr({'class' : 'todo-list', 'id' : idx});
			var listTitle = list['todo_list']['title'];
			var a = $('<a>').attr({'href' : '#'}).html(listTitle);
			var uniqID = "link" + idx;
			var li = $('<li>').attr({'id' : uniqID}).html(a);
			div.append(li);
			ol.append(div);
		});
		$('.main-div').append(ol);
	};
	
	UI.prototype.listenForClicks = function(){
		var that = this;
		$('.todo-list').click(function() {
			var div = this;
			var divOflistItems = that.listTodoItems($(div).attr('id'));
			$(this).append(divOflistItems);
		});
	};
	
	UI.prototype.listTodoItems = function(divID) {
		var div = $("id");
		var newDiv = $('<div>');
		var that = this;
		var todoItemsArray = that.tasks[divID]['todo_list']['todo_items'];
		var ul = $("<ul>");
		todoItemsArray.forEach(function(item, idx) {
			var li = $('<li>').html(item['name']);
			$(ul).append(li);
		});
		$(newDiv).append(ul);
		return newDiv;
	}
	
	return UI;
})();








