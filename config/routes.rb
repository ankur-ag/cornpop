Cornpop::Application.routes.draw do
  root "cornpop#index"

  get "cornpop/index"

  match '*path' => "cornpop#index", :via => [:get, :post]
end
