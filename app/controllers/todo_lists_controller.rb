class TodoListsController < ApplicationController
  
  def index
    @user = current_user
    @lists = @user.todo_lists
    
  end
  
  def create
    
  end
  
  def destroy
    
  end
end
