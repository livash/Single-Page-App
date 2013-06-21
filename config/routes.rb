AjaxDemo::Application.routes.draw do
  root :to => "Users#new"

  resources :secrets
  resource :session
  resources :users
  resources :users do 
    resource :secrets, only: [:new, :create]
  end
  
  resources :todo_lists
end
