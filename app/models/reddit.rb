class Reddit < ApplicationRecord
    belongs_to :widget

    validates :thread_id, presence: true
    validates :thread_id, uniqueness: { scope: :widget_id }
end
