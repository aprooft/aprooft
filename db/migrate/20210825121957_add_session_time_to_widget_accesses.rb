class AddSessionTimeToWidgetAccesses < ActiveRecord::Migration[6.1]
  def change
    add_column :widget_accesses, :session_time, :bigint
  end
end
