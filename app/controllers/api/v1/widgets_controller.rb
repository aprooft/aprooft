class Api::V1::WidgetsController < Api::V1::BaseController
    before_action :set_widget, only: [ :show ]

    def show
      response.headers['Access-Control-Allow-Origin'] = '*'
    end

    private

    def set_widget
      @widget = Widget.find(params[:id])
      authorize @widget  # For Pundit
    end
  end