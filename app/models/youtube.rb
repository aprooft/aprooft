class Youtube < ApplicationRecord
  belongs_to :widget

  validates :title, presence: true
  validates :video_id, presence: true
  validates :widget_id, presence: true
  validates :thumbnail, presence: true
  validates :like_count, presence: true
  validates :dislike_count, presence: true
  validates :view_count, presence: true
  # validates :channel_name, presence: true
  # validates :channel_pic, presence: true
  validates :description, presence: true
  validates :etag, presence: true
  validates :video_id, uniqueness: { scope: :widget_id }
end
