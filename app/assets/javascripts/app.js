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
		this.listenAJAX();
	};
	
	//make new <div> + add button for adding new lists
	UI.prototype.makeMainDiv = function(){
		var div = $("<div class='main-div'></div>")
		var header = $('<h1>').html("Your Todo lists:");
		div.prepend(header);
		$('body').prepend(div);
	}
	
	UI.prototype.renderTasks = function(){
		var that = this;
		var ol = $('<ol>').addClass('ordered-list');

		that.tasks.forEach(function(list, idx){
			var div = $('<div>').attr({'class' : 'todo-list', 'id' : idx});
			var listTitle = list['todo_list']['title'];
			var a = $('<a>').attr({'href' : '#'}).html(listTitle);
			var uniqID = "link" + idx;
			var li = $('<li>').attr({'id' : uniqID, 'class' : 'not-clicked'}).html(a);
			div.append(li);
			ol.append(div);
		});
		$('.main-div').append(ol);
	};
	
	
	UI.prototype.listenForClicks = function(){
		var that = this;
		$('.todo-list').children().click(function() { 
			//here 'this' is <li>
			var div = $(this).parent();
			
			if ($(this).attr('class') === 'not-clicked'){
				var divOflistItems = that.listTodoItems($(div).attr('id'));
				$(this).append(divOflistItems);
				$(this).removeClass('not-clicked');
				$(this).addClass('clicked');
			} else if ($(this).attr('class') === 'clicked') {
				console.log("it's working");
				$(this).removeClass('clicked');
				$(this).addClass('not-clicked');
				var items = $(this).children(); // an array [<a>, <div>]
				console.log(items);
				$(items[1]).remove();
			}
		});
	};
	
	UI.prototype.listenAJAX = function() {
		$('.new_todo_list').on('ajax:success', function(event, data) {
			var ol = $('.ordered-list');
			var idx = $(ol).children().length + 1;
			var div = $('<div>').attr({'class' : 'todo-list', 'id' : idx});
			var listTitle = data['todo_list']['title'];
			var a = $('<a>').attr({'href' : '#'}).html(listTitle);
			var uniqID = "link" + idx;
			var li = $('<li>').attr({'id' : uniqID, 'class' : 'not-clicked'}).html(a);
			div.append(li);
			ol.append(div);
		});
	}
	
	UI.prototype.listTodoItems = function(divID) {
		var div = $("id");
		var newDivClass = "list-items-" + divID;
		var newDiv = $('<div>').attr('class', newDivClass);
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








