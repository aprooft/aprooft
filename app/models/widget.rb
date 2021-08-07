class Widget < ApplicationRecord
  belongs_to :user
  has_many :youtubes, dependent: :destroy

  validates :user_id, presence: true
  validates :product_title, presence: true
  validates :product_pic, presence: true
end
