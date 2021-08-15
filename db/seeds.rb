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
puts "creating Widget..."
1.times do
 widget3 = Widget.new(user_id: User.all.sample.id, style: {}, product_title: Faker::Commerce.product_name, product_id: "FR69230" )
 widget3.product_pic.attach(io: URI.parse("https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80").open, filename: 'product.jpeg')
 widget3.save
end
puts "done"
puts "creating youtubes links..."
Youtube.create(title: "AirPods MaxじゃなくてBOSE NC700を買ったよ", thumbnail: "", like_count: 204,
dislike_count: 27, channel_name: "DEEP KICS", view_count: 10898, widget_id: Widget.all.sample.id,
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a cursus eros. ", etag: "", channel_pic: "" )

Youtube.create(title: "Bose Headphones 700: The King is Back!", thumbnail: "", like_count: 83570,
dislike_count: 2710, channel_name: "Marques Brownlee", view_count: 3121467, widget_id: Widget.all.sample.id,
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a cursus eros. ", etag: "", channel_pic: "" )

Youtube.create(title: "Bose 700 Headphones Review - 6 Months Later", thumbnail: "", like_count: 1521,
dislike_count: 23, channel_name: " 6 Months Later Reviews", view_count: 84101, widget_id: Widget.all.sample.id,
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a cursus eros. ", etag: "", channel_pic: "" )

Youtube.create(title: "Bose ACTIVE NOISE CANCELLING 700 Headphones - REVIEW", thumbnail: "", like_count: 16522,
dislike_count: 233, channel_name: "DEEP KICS", view_count: 504231, widget_id: Widget.all.sample.id,
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a cursus eros. ", etag: "", channel_pic: "" )

puts "done"
