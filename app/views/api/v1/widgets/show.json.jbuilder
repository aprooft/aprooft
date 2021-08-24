json.youtubes @widget.youtubes do |youtube|
    json.merge! youtube
end

json.reddits @widget.reddits do |reddit|
    json.merge! reddit
end

json.styles @widget.style