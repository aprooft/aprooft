class AddThumbnailToReddits < ActiveRecord::Migration[6.1]
  def change
    add_column :reddits, :thumbnail, :string
  end
end
