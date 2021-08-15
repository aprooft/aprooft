# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require "open-uri"

Youtube.destroy_all
Widget.destroy_all
User.destroy_all

User.create(email: "admin@me.com", password: "123456", admin: true)

4.times do
  User.create(email: Faker::Internet.email, password: Faker::Internet.password, admin: false)
end
puts "creating Widgets..."

  widget1 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "Sleepbuds II", product_id: "FR69230")
  widget1.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/noise_masking_sleepbuds_ii/product_silo_images/SBII_PP_Ecom_Silo-2_1200x1022_web.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
  widget1.save

puts "widget1 created"

#   widget2 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "A20 Aviation Headset", product_id: "FR89723")
#   widget2.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/a20_aviation_headset/product_silo_images/a20_hdst_EC5_01.psd/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
#   widget2.save

# puts "widget2 created"

#   widget3 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "QuietComfort Earbuds", product_id: "FR84581")
#   widget3.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/v2/QCEB_PDP_Ecom-Gallery-B03.png/jcr:content/renditions/cq5dam.web.600.600.png").open, filename: 'product.jpeg')
#   widget3.save

# puts "widget3 created"

#   widget4 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "Noise Cancelling Headphones 700", product_id: "FR73252")
#   widget4.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/noise_cancelling_headphones_700/product_silo_images/Silo_jpg/noise_cancelling_headphones_700_blk_EC_02.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg").open, filename: 'product.jpeg')
#   widget4.save

# puts "widget4 created"

#   widget5 = Widget.new(user_id: User.all.first.id, style: {}, product_title: "SoundComm B40 Headset", product_id: "FR67230")
#   widget5.product_pic.attach(io: URI.parse("https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/soundcomm_b40_headset/product_silo_images/B40_headset_Headon_hero.psd/jcr:content/renditions/cq5dam.web.600.600.png").open, filename: 'product.jpeg')
#   widget5.save

# puts "widget5 created"

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

# Sleepbuds II
sleepbuds_links = ["https://www.youtube.com/watch?v=GR0LL_7ZirE", "https://www.youtube.com/watch?v=aOjFrajPFLE", "https://www.youtube.com/watch?v=ATz7i6pcWE0", "https://www.youtube.com/watch?v=I8O8zajg4c4"];
sleepbuds_links.each do |sleepbuds_link|
  video_data = fetchYoutubeApi(sleepbuds_link)
  Youtube.create(title: video_data[:title], video_id: video_data[:video_id], thumbnail: video_data[:thumbnail], like_count: video_data[:like_count],
  dislike_count: video_data[:dislike_count], channel_name: video_data[:channel], view_count: video_data[:view_count], widget_id: Widget.all.first.id,
  description: video_data[:description], etag: video_data[:etag], channel_pic: video_data[:channel_pic])
end
puts "sleepbuds links created"

puts "done"
