class WidgetPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end


  def create?
    true
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

  def setStyle?
    true
  end

  def analytics?
    true
  end

  # def showStyle?
  #   true
  # end
end
