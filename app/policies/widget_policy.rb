class WidgetPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def update?
    true
  end 

  def show?
    true
  end

  def preview?
    true
  end  
end
