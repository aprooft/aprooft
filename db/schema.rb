# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_25_121957) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "content_accesses", force: :cascade do |t|
    t.datetime "click_at"
    t.string "source"
    t.integer "source_id"
    t.bigint "widget_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["widget_id"], name: "index_content_accesses_on_widget_id"
  end

  create_table "reddits", force: :cascade do |t|
    t.string "thread_id"
    t.string "thread_title"
    t.string "ups"
    t.string "link_flair_text"
    t.string "created"
    t.string "author"
    t.string "num_comments"
    t.string "subreddit"
    t.bigint "widget_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "thumbnail"
    t.index ["widget_id"], name: "index_reddits_on_widget_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "widget_accesses", force: :cascade do |t|
    t.datetime "open_at"
    t.datetime "close_at"
    t.bigint "widget_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "session_time"
    t.index ["widget_id"], name: "index_widget_accesses_on_widget_id"
  end

  create_table "widgets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "product_title"
    t.string "product_pic"
    t.jsonb "style"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "product_id"
    t.index ["user_id"], name: "index_widgets_on_user_id"
  end

  create_table "youtubes", force: :cascade do |t|
    t.string "title"
    t.string "video_id"
    t.string "thumbnail"
    t.string "like_count"
    t.string "dislike_count"
    t.string "channel_name"
    t.string "view_count"
    t.bigint "widget_id", null: false
    t.text "description"
    t.string "etag"
    t.string "channel_pic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["widget_id"], name: "index_youtubes_on_widget_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "content_accesses", "widgets"
  add_foreign_key "reddits", "widgets"
  add_foreign_key "widget_accesses", "widgets"
  add_foreign_key "widgets", "users"
  add_foreign_key "youtubes", "widgets"
end
