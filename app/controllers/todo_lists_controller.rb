class TodoListsController < ApplicationController
  
  def index
    @user = current_user
    @lists = @user.todo_lists
    @list = TodoList.new
  end
  
  def create
    @list = TodoList.new(params[:todo_list])
    current_user.todo_lists << @list
    render :json => @list
  end
  
  def destroy
    
  end
end
