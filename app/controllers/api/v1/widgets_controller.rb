class Api::V1::WidgetsController < Api::V1::BaseController
    before_action :set_widget, only: [ :show ]

    def show
        # render json: Youtube.where(widget: @widget)
        # @youtubes = @widget.youtubes
        # @reddits = ["coming soon"]
    end

    private

    def set_widget
      @widget = Widget.find(params[:id])
      authorize @widget  # For Pundit
    end
  end