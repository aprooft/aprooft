class CreateReddits < ActiveRecord::Migration[6.1]
  def change
    create_table :reddits do |t|
      t.string :thread_id
      t.string :thread_title
      t.string :ups
      t.string :link_flair_text
      t.string :created
      t.string :author
      t.string :num_comments
      t.string :subreddit
      t.references :widget, null: false, foreign_key: true

      t.timestamps
    end
  end
end
