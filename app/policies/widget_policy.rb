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

<<<<<<< HEAD
  def destroy?
     true
  end

=======
  def setStyle?
    true
  end  

  def  widgetAccess?
    true
  end 
  
  def  widgetAccessUpdate?
    true
  end 
  
  def contentAccess?
    true
  end  
>>>>>>> c0947365e452b7cc91bc00eb492c8937c1c9f690
end
