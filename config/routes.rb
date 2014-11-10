Cornpop::Application.routes.draw do
  devise_for :users

  resources :movies
  resources :favorites

  root "cornpop#index"

  get "cornpop/index"

  match '*path' => "cornpop#index", :via => [:get, :post]
end
