class ContentAccess < ApplicationRecord
    belongs_to :widget

    def self.clicks_compared_to_last_week
        data_this_week = where("click_at >= ?", 1.week.ago)
        data_last_week = where(click_at: 2.weeks.ago..1.week.ago)
        clicks_this_week = data_this_week.count
        clicks_last_week = data_last_week.count
        unless clicks_this_week == 0
            change = (clicks_this_week - clicks_last_week).to_f / clicks_this_week * 100
            change.round
        else
            change = 0
        end
    end
end
