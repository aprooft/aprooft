class AddProductIdToWidgets < ActiveRecord::Migration[6.1]
  def change
    add_column :widgets, :product_id, :string
  end
end
