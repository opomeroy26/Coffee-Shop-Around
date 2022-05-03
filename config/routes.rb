Rails.application.routes.draw do
  resources :bookmarks
  resources :comments
  resources :shops
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/me", to: "users#show"

  delete "/logout", to: "sessions#destroy"

  post "/login", to: "sessions#create"

  post "/signup", to: "users#create"

  patch "/shops/:id/likes", to: "shops#increment_likes"

  




  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

end
