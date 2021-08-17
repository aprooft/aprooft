require 'json'
require 'open-uri'
require 'net/http'
$fonts = { "arial" => "Arial", "verdana" => "Verdana" }

class WidgetsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[update preview]
  before_action :set_widget, only: %i[update edit preview show]

  def index
    # @fonts = { "arial" => "'Arial', sans-serif", "verdana" => "'Verdana', sans-serif" }
    @widgets = policy_scope(Widget)

    if params[:query].present?
      @widgets = Widget.search_by_title(params[:query])
    else
      @widgets = Widget.all
    end
  end

  def show
  end

  def new
    @widget = Widget.new
    authorize @widget
  end

  def create
    @widget = Widget.new(widget_params)
    @widget.user_id = current_user.id
    if @widget.save
      redirect_to widgets_path
    else
      render :new
    end
    authorize @widget
  end

  def edit
  end

  def preview
    youtube_links_result = params["youtube_links"].reject{ |link| link=="" }
    render json: youtube_links_result.map{ |link| fetchYoutubeApi(link) }

    # reddit_links_result = params["reddit_links"].reject{ |link| link=="" }
    # render json: reddit_links_result.map{ |link| fetchRedditApi(link) }
  end

  def update
    urls = params["youtube-link"].reject{ |link| link=="" }
    urls.each do |link|
      youtube = Youtube.new(fetchYoutubeApi(link))
      youtube.widget = @widget
      youtube.save
    end
    redirect_to edit_widget_path(@widget)
  end

  private

  def widget_params
    params.require(:widget).permit(:user_id, :product_title, :product_pic, :product_id)
  end

  def set_widget
    @widget = Widget.find(params[:id].to_i)
    authorize @widget
  end

  def youtube_id(youtube_url)
    regex = %r{(?:youtube(?:-nocookie)?\.com/(?:[^/\n\s]+/\S+/|(?:v|e(?:mbed)?)/|\S*?[?&]v=)|youtu\.be/)([a-zA-Z0-9_-]{11})}
    match = regex.match(youtube_url)
    match[1] if match && !match[1].blank?
  end

  def fetchYoutubeApi(youtube_url)
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
    video_result[:channel_pic] = JSON.parse(URI.open(channel_url).read)["items"][0]["snippet"]["thumbnails"]["default"]["url"]
    return video_result.except(:channel_id)
  end

  def reddit_id(reddit_url)
    regex = /(?:^.+?)(?:reddit.com\/r)(?:\/[\w\d]+){2}(?:\/)([\w\d]*)/
    match = regex.match(reddit_url)
    match[1] if match && !match[1].empty?
  end

  def fetchRedditApi(reddit_url)
    input_thread_id = reddit_id(reddit_url)
    url = URI("https://api.reddit.com/api/info/?id=t3_#{input_thread_id}")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["User-Agent"] = "test-user-agent"
    response = https.request(request)
    result = JSON.parse(response.read_body)
    comment_result = {
      thread_id: result["data"]["children"][0]["data"]["id"],
      thread_title: result["data"]["children"][0]["data"]["title"],
      ups: result["data"]["children"][0]["data"]["ups"],
      link_flair_text: result["data"]["children"][0]["data"]["link_flair_text"],
      created: result["data"]["children"][0]["data"]["created"],
      author: result["data"]["children"][0]["data"]["author"],
      num_comments: result["data"]["children"][0]["data"]["num_comments"],
      subreddit: result["data"]["children"][0]["data"]["subreddit"]
    }
  end

end
