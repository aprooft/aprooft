class CreateContentAccesses < ActiveRecord::Migration[6.1]
  def change
    create_table :content_accesses do |t|
      t.datetime :click_at
      t.string :source
      t.integer :source_id
      t.references :widget, null: false, foreign_key: true
      t.timestamps
    end
  end
end
