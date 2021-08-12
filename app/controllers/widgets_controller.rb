require 'json'
require 'open-uri'

class WidgetsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[update preview]
  before_action :set_widget, only: %i[update edit preview]

  def index
      @widgets = policy_scope(Widget)
      #authorize @widgets
      if params[:query].present?
        @widgets = Widget.search_by_title(params[:query])
      else
        @widgets = Widget.all
      end
  end

  def show
    @youtube_data = fecthYoutubeApi
  end

  def create
  end

  def edit
  end  

  def preview
    p '-----------'
    p 'hello'
    p '-----------'
  end  

  def update
    # youtube_links = params["youtube-link"].reject{ |link| link=="" }
    # youtube_datas = youtube_links.map{ |link| fecthYoutubeApi(link) } 
    # youtube_datas.each do |youtube_content|
    #   @youtube_row = Youtube.new(youtube_content)
    #   @youtube_row.widget = @widget
    #   @youtube_row.save
    # end

    # redirect_to edit_widget_path(@widget)
  end   

  private

  def set_widget
    @widget = Widget.find(params[:id].to_i)
    authorize @widget
  end
  
  def youtube_id(youtube_url)
    regex = %r{(?:youtube(?:-nocookie)?\.com/(?:[^/\n\s]+/\S+/|(?:v|e(?:mbed)?)/|\S*?[?&]v=)|youtu\.be/)([a-zA-Z0-9_-]{11})}
    match = regex.match(youtube_url)
    match[1] if match && !match[1].blank?
  end

  def fecthYoutubeApi(youtube_url)
    input_video_id = youtube_id(youtube_url)
    url = "https://www.googleapis.com/youtube/v3/videos?id=#{input_video_id}&key=#{ENV['GOOGLE_API_KEY']}&part=snippet,contentDetails,statistics,status"
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
      description: result["items"][0]["snippet"]["description"]
    }
    channel_id = video_result[:channel_id]
    channel_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=#{channel_id}&key=#{ENV['GOOGLE_API_KEY']}"
    video_result["channel_pic"] = JSON.parse(URI.open(channel_url).read)["items"][0]["snippet"]["thumbnails"]["default"]["url"]
    return video_result.except(:channel_id)
  end
end
