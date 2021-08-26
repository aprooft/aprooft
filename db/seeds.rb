require 'faker'
require "open-uri"
include ActiveSupport::NumberHelper

ContentAccess.destroy_all
WidgetAccess.destroy_all
Youtube.destroy_all
Reddit.destroy_all
Widget.destroy_all
User.destroy_all

User.create(email: "admin@me.com", password: "123456", admin: true)

4.times do
  User.create(email: Faker::Internet.email, password: Faker::Internet.password, admin: false)
end
puts "creating Widgets..."

#   widget1 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "Sleepbuds II", product_id: "FR69230")
#   widget1.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/noise_masking_sleepbuds_ii/product_silo_images/SBII_PP_Ecom_Silo-2_1200x1022_web.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
#   widget1.save

# puts "widget1 created"

#   widget2 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "A20 Aviation Headset", product_id: "FR89723")
#   widget2.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/a20_aviation_headset/product_silo_images/a20_hdst_EC5_01.psd/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
#   widget2.save

# puts "widget2 created"

#   widget3 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "QuietComfort Earbuds", product_id: "FR84581")
#   widget3.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/v2/QCEB_PDP_Ecom-Gallery-B03.png/jcr:content/renditions/cq5dam.web.600.600.png").open, filename: 'product.jpeg')
#   widget3.save

# puts "widget3 created"

  widget4 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "Noise Cancelling Headphones 700", product_id: "FR73252")
  widget4.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/noise_cancelling_headphones_700/product_silo_images/Silo_jpg/noise_cancelling_headphones_700_blk_EC_02.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
  widget4.save

puts "widget4 created"

  widget5 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "SoundComm B40 Headset", product_id: "FR67230")
  widget5.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/soundcomm_b40_headset/product_silo_images/B40_headset_Headon_hero.psd/jcr:content/renditions/cq5dam.web.600.600.png").open, filename: 'product.jpeg')
  widget5.save

puts "widget5 created"

#   widget6 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "Sport Open Earbuds", product_id: "FR31007")
#   widget6.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/sport_open_earbuds/product_silo_images/soeb_product_page_ec_02_1200x1022_web.png/jcr:content/renditions/cq5dam.web.320.320.png").open, filename: 'product.jpeg')
#   widget6.save

# puts "widget6 created"
puts "done"

puts "creating youtubes links..."
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

# Sleepbuds II
# sleepbuds_links = ["https://www.youtube.com/watch?v=GR0LL_7ZirE", "https://www.youtube.com/watch?v=aOjFrajPFLE", "https://www.youtube.com/watch?v=ATz7i6pcWE0", "https://www.youtube.com/watch?v=I8O8zajg4c4"];
# sleepbuds_links.each do |sleepbuds_link|
#   video_data = fetchYoutubeApi(sleepbuds_link)
#   Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
#   dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.all.first.id,
#   description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
# end
# puts "sleepbuds links created"

#A20 Aviation Headset
# aviation_links = ["https://www.youtube.com/watch?v=Lp3tJSaKDFc", "https://www.youtube.com/watch?v=aV4l4NWBOK4", "https://www.youtube.com/watch?v=lW6YIwAFs2U"];
# aviation_links.each do |aviation_link|
#   video_data = fetchYoutubeApi(aviation_link)
#   Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
#   dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.all[1].id,
#   description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
# end
# puts "A20 Aviation Headset links created"

#QuietComfort Earbuds
# quietcomfort_links = ["https://www.youtube.com/watch?v=1adxs49qIqA", "https://www.youtube.com/watch?v=mxtJyn3pl30", "https://www.youtube.com/watch?v=8r_ivUdeR8Y", "https://www.youtube.com/watch?v=4sU6NrpDMB4"];
# quietcomfort_links.each do |quietcomfort_link|
#   video_data = fetchYoutubeApi(quietcomfort_link)
#   Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
#   dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.all[2].id,
#   description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
# end
# puts "QuietComfort Earbuds links created"

# Noise Cancelling Headphones 700
noisecanceling_links = ["https://www.youtube.com/watch?v=Q15ZzwzN2-w", "https://www.youtube.com/watch?v=YPln3JP_gKs", "https://www.youtube.com/watch?v=7DMDA5pde-0"];
noisecanceling_links.each do |noisecanceling_link|
  video_data = fetchYoutubeApi(noisecanceling_link)
  Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
  dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.first.id,
  description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
end
puts "Noise Cancelling 700 links created"

# SoundComm B40 Headset
soundcomm_links = ["https://www.youtube.com/watch?v=f9yUAND_VWU", "https://www.youtube.com/watch?v=2gjWPS_NI5A", "https://www.youtube.com/watch?v=cUGx_iq1Sis"];
soundcomm_links.each do |soundcomm_link|
  video_data = fetchYoutubeApi(soundcomm_link)
  Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
  dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.all[1].id,
  description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
end
puts "SoundComm B40 Headset links created"

#Sport Open Earbuds
# noisecanceling_links = ["https://www.youtube.com/watch?v=ieQ8icsc6dk", "https://www.youtube.com/watch?v=YOeCRKffHhg", "https://www.youtube.com/watch?v=rfknxc3_wjs"];
# noisecanceling_links.each do |noisecanceling_link|
#   video_data = fetchYoutubeApi(noisecanceling_link)
#   Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
#   dislike_count: video_data[:dislike_count], channel_name: video_data[:channel_name], view_count: video_data[:view_count], widget_id: Widget.all[5].id,
#   description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
# end
# puts "Sport Open Earbuds links created"

# --------------------------------------------------------
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
    difference_in_h + " hours"
  else
    days_ago.to_s + " days"
  end
end

puts "creating reddit links"
#Noise Cancelling Headphones 700
noisecanceling_links = ["https://www.reddit.com/r/bose/comments/kp5uuk/bose_nc700_are_underrated_overhated/", "https://www.reddit.com/r/bose/comments/j66yqa/quick_unbiased_review_of_the_bose_nc700/", "https://www.reddit.com/r/bose/comments/oa8m63/personal_review_nc_700_vs_sony_xm4_long/"];
noisecanceling_links.each do |noisecanceling_link|
  thread_data = fetchRedditApi(noisecanceling_link)
  Reddit.create(thread_id: thread_data[:thread_id], thread_title: thread_data[:thread_title], ups: thread_data[:ups],
  link_flair_text: thread_data[:link_flair_text], created: thread_data[:created], author: thread_data[:author],
  num_comments: thread_data[:num_comments], subreddit: thread_data[:subreddit], thumbnail: thread_data[:thumbnail], widget_id: Widget.first.id)
end
puts "Noise Cancelling 700 links created"

puts "creating widget accesses widget4"
32.times do
  start_at = Faker::Time.between_dates(from: Date.today - 7, to: Date.today, period: :all)
  close_at = start_at + rand(5..120).seconds
  session_time = close_at.to_i - start_at.to_i
  WidgetAccess.create(open_at: start_at, close_at: close_at, session_time: session_time, widget_id: Widget.first.id)
end

puts "creating content accesses widget4"
26.times do
  random_youtube = Youtube.where(widget_id: Widget.first.id).sample
  click_at = Faker::Date.between(from: 7.days.ago, to: Date.today)
  ContentAccess.create(click_at: click_at, source: random_youtube.title, source_id: random_youtube.id, widget_id: Widget.first.id)
end

puts "creating widget accesses widget4"
47.times do
  start_at = Faker::Time.between_dates(from: Date.today - 7, to: Date.today, period: :all)
  close_at = start_at + rand(5..120).seconds
  session_time = close_at.to_i - start_at.to_i
  WidgetAccess.create(open_at: start_at, close_at: close_at, session_time: session_time, widget_id: Widget.all[1].id)
end

puts "creating content accesses widget4"
39.times do
  random_youtube = Youtube.where(widget_id: Widget.all[1].id).sample
  click_at = Faker::Date.between(from: 7.days.ago, to: Date.today)
  ContentAccess.create(click_at: click_at, source: "youtube", source_id: random_youtube.id, widget_id: Widget.all[1].id)
end
puts "done"
