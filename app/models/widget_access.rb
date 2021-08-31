class WidgetAccess < ApplicationRecord
    belongs_to :widget

    def self.sessions_compared_to_last_week
        data_this_week = where("open_at >= ?", 1.week.ago)
        data_last_week = where(open_at: 2.weeks.ago..1.week.ago)
        sessions_this_week = data_this_week.count
        sessions_last_week = data_last_week.count
        unless sessions_this_week == 0
            change = (sessions_this_week - sessions_last_week).to_f / sessions_this_week * 100
            change.round
        else
            change = 0
        end
    end

    def self.time_compared_to_last_week
        data_this_week = where("open_at >= ?", 1.week.ago)
        data_last_week = where(open_at: 2.weeks.ago..1.week.ago)
        time_this_week = data_this_week.map { |data| data.session_time }.reject{ |time| time.nil? }.sum
        time_last_week = data_last_week.map { |data| data.session_time }.reject{ |time| time.nil? }.sum
        unless time_this_week == 0
            change = (time_this_week - time_last_week).to_f / time_this_week * 100
            change.round
        else
            change = 0
        end

    end
end
