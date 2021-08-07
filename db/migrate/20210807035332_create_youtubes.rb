class CreateYoutubes < ActiveRecord::Migration[6.1]
  def change
    create_table :youtubes do |t|
      t.string :title
      t.string :video_id
      t.string :thumbnail
      t.string :like_count
      t.string :dislike_count
      t.string :channel_name
      t.string :view_count
      t.references :widget, null: false, foreign_key: true
      t.text :description
      t.string :etag
      t.string :channel_pic

      t.timestamps
    end
  end
end
