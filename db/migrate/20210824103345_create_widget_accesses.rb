class CreateWidgetAccesses < ActiveRecord::Migration[6.1]
  def change
    create_table :widget_accesses do |t|
      t.datetime :open_at
      t.datetime :close_at, null: true
      t.references :widget, null: false, foreign_key: true
      t.timestamps
    end
  end
end
