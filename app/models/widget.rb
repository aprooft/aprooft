class Widget < ApplicationRecord
  belongs_to :user
  has_many :youtubes, dependent: :destroy
  has_one_attached :product_pic, dependent: :destroy
  has_many :reddits, dependent: :destroy

  validates :user_id, presence: true
  validates :product_title, presence: true
  validates :product_pic, presence: true
  validates :product_id, presence: true, uniqueness: true

  include PgSearch::Model
  pg_search_scope :search_by_title,
    against: [:product_title],
    using: {
      tsearch: { prefix: true }
            }
end
