class TodoItem < ActiveRecord::Base
  attr_accessible :name, :todo_list_id
  
  belongs_to :todo_list,
  :foreign_key => :todo_list_id
end
