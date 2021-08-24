Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post '/widgets/:id/preview', to: 'widgets#preview', as: :preview
  post '/widgets/:id/styles', to: 'widgets#setStyle', as: :styles

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :widgets, only: [:show ]
    end
  end

  resources :widgets do
    resources :youtubes, only: [:create, :update]
  end
end
