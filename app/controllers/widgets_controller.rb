require 'json'
require 'open-uri'
require 'net/http'
include ActiveSupport::NumberHelper
# need to look at this
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
    reddit_links_result = params["reddit_links"].reject{ |link| link=="" }
    render json: {youtubes: youtube_links_result.map{ |link| fetchYoutubeApi(link)},
                  reddits: reddit_links_result.map{ |link| fetchRedditApi(link) }
                  }
  end

  def update
    yturls = params["youtube-link"].reject{ |link| link=="" }
    rdurls = params["reddit-link"].reject{ |link| link=="" }
    yturls.each do |link|
      youtube = Youtube.new(fetchYoutubeApi(link))
      youtube.widget = @widget
      youtube.save
    end
    rdurls.each do |link|
      reddit = Reddit.new(fetchRedditApi(link))
      reddit.widget = @widget
      reddit.save
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
    youtube = result["items"][0]
    video_result = {
      etag: result["etag"],
      title: youtube["snippet"]["title"],
      video_id: youtube["id"],
      thumbnail: youtube["snippet"]["thumbnails"]["high"]["url"],
      like_count: number_to_human(youtube["statistics"]["likeCount"].to_i, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' }),
      dislike_count: number_to_human(youtube["statistics"]["dislikeCount"].to_i, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' }),
      channel_name: youtube["snippet"]["channelTitle"],
      channel_id: youtube["snippet"]["channelId"],
      view_count: number_to_human(youtube["statistics"]["viewCount"].to_i, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' }),
      description: youtube["snippet"]["description"]
    }

    channel_id = video_result[:channel_id]
    channel_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=#{channel_id}&key=#{ENV['GOOGLE_API_KEY']}"
    video_result[:channel_pic] = JSON.parse(URI.open(channel_url).read)["items"][0]["snippet"]["thumbnails"]["default"]["url"]
    return video_result.except(:channel_id)
  end

  def reddit_id(reddit_url)
    regex = /(?:reddit.com.*\/comments\/)([\w\d_-]*)/
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
    reddit = result["data"]["children"][0]["data"]
    comment_result = {
      thread_id: reddit["id"],
      thread_title: reddit["title"],
      ups: number_to_human(reddit["ups"].to_i, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' }),
      link_flair_text: reddit["link_flair_text"],
      created: time_ago(reddit["created"]),
      author: reddit["author"],
      num_comments: number_to_human(reddit["num_comments"].to_i, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' }),
      subreddit: reddit["subreddit"],
      thumbnail: reddit["thumbnail"],
    }
  end

  def time_ago(timestamp)
    days_ago = Date.today - Time.at(timestamp).to_date
    if days_ago.to_i == 1
      difference_in_sec = Time.now - Time.at(timestamp)
      difference_in_h = (difference_in_sec / 3600).to_i.to_s
      difference_in_h
    else
      days_ago.to_s
    end
  end

end
