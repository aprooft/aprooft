require 'json'
require 'open-uri'

class WidgetsController < ApplicationController
    def index
        @result =  fecthYoutubeApi();
        raise
    end    

    def show
    end    

    private

    def fecthYoutubeApi
        url = "https://www.googleapis.com/youtube/v3/videos?id=Fd0neo9rppk&key=" + ENV["GOOGLE_API_KEY"] + "&part=snippet,contentDetails,statistics,status"
        result_serialized = URI.open(url).read
        result = JSON.parse(result_serialized)
        video_result = { 
            etag: result["etag"],
            title: result["items"][0]["snippet"]["title"],
            video_id: result["items"][0]["id"],
            thumbnail: result["items"][0]["snippet"]["thumbnails"]["high"]["url"],
            like_count: result["items"][0]["statistics"]["likeCount"],
            dislike_count: result["items"][0]["statistics"]["dislikeCount"],
            channel_name: result["items"][0]["snippet"]["channelTitle"],
            channel_id: result["items"][0]["snippet"]["channelId"],
            view_count: result["items"][0]["statistics"]["viewCount"],
            description: result["items"][0]["snippet"]["description"],
        }   
        channel_id = video_result[:channel_id]
        channel_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=#{channel_id}&key=#{ENV["GOOGLE_API_KEY"]}"       
        video_result["channel_pic"] = JSON.parse(URI.open(channel_url).read)["items"][0]["snippet"]["thumbnails"]["default"]["url"]
        return video_result
    end    
end
