Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/analytics', to: 'widgets#analytics', as: :analytics
  post '/widgets/:id/preview', to: 'widgets#preview', as: :preview
  post '/widgets/:id/styles', to: 'widgets#setStyle', as: :styles
  post 'widgets/:id/widgetaccess', to: 'widgets#widgetAccess', as: :widget_access
  post 'widgets/:id/widgetaccess/update', to: 'widgets#widgetAccessUpdate', as: :widget_access_update
  post 'widgets/:id/contentaccess', to: 'widgets#contentAccess', as: :content_access

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :widgets, only: [:show ]
    end
  end

  resources :widgets do
    resources :youtubes, only: [:create, :update]
  end
end
