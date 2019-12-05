# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル

|Colum|Type|Options|
|-----|----|-------|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|
|email|string|unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :groups
- has_many: groups, through: :groups_users
- has_many :messages

## groupテーブル

|Colum|Type|Options|
|-----|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_name|string|null: false|

### Association
- has_many :users
- has_many: users, through: :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|      |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|



