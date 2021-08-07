class WidgetsController < ApplicationController

def index
  #@widgets = policy_scope(Widget)
  #authorize @widgets
  @widgets = Widget.all
end

end
