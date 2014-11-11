Cornpop::Application.routes.draw do
  devise_for :users, 
    :controllers => {
      registrations: "users/registrations",
      sessions: "users/sessions"
    }

  resources :movies
  resources :favorites

  root "cornpop#index"

  get "cornpop/index"
  get 'users', :to => 'users#index'
  get 'users/:id/movies', :to => 'users#movies'

  match '*path' => "cornpop#index", :via => [:get, :post]
end
