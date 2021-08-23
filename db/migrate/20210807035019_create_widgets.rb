class CreateWidgets < ActiveRecord::Migration[6.1]
  def change
    create_table :widgets do |t|
      t.references :user, null: false, foreign_key: true
      t.text :product_title
      t.string :product_pic
      t.jsonb :style, default: {}

      t.timestamps
    end
  end
end
