class TodoList < ActiveRecord::Base
  attr_accessible :title, :user_id
  
  belongs_to :user,
  :foreign_key => :user_id
  
  has_many :todo_items
end
