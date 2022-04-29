# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Clearing old data..."

User.destroy_all
Shop.destroy_all
Comment.destroy_all
Bookmark.destroy_all

puts "🌱 Seeding Users"
u1 = User.create(username:"Admin", password:"admin", profile_img:"https://media.istockphoto.com/photos/admin-login-sign-made-of-wood-on-a-wooden-table-picture-id1314651804?s=612x612", location:"Everywhere and Anywhere", admin: true )
u2 = User.create(username:"Olivia", password:"olivia", profile_img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", location:"San Francisco", admin: false)
u3 = User.create(username:"Admin2", password:"admin2", profile_img:"https://images.unsplash.com/photo-1507206130118-b5907f817163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnVzaW5lc3MlMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", location:"Washington", admin: true)
u4 = User.create(username:"Liv", password:"liv", profile_img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", location:"Oakland", admin: false)

puts "🌱 Seeding Shops"
s1 = Shop.create(user_id: u1.id,name:"Another Cafe", pricing:"$$", wifi: true , rating: 6/10 , likes: 2, latitude: 37.790328445301284 , longitude: -122.41533086444366)
s2 = Shop.create(user_id: u1.id, name:"Crostini & Java", pricing:"$", wifi: false , rating: 7/10 , likes: 5 , latitude: 37.78908370809386, longitude: -122.41719154550377)
s3 = Shop.create(user_id: u1.id, name:"Higher Grounds Coffee House", pricing:"$$", wifi: false , rating: 5/10, likes: 0 , latitude: 37.73453822472601, longitude: -122.43379850805375 )
s4 = Shop.create(user_id: u1.id, name:"The Sacred Grounds Coffee", pricing:"$", wifi: true , rating: 9/10 , likes: 8 , latitude: 37.778776132229076, longitude: -122.45189066115061 )
s5 = Shop.create(user_id: u1.id,name:"Starbucks", pricing:"$$", wifi: true , rating: 8/10, likes: 3 , latitude:37.79954089549517, longitude: -122.4494937691552 )
s6 = Shop.create(user_id: u1.id,name:"Xochi the Dog Cafe", pricing:"$$$", wifi: false , rating: 2/10 , likes: 0, latitude:37.79667975235605, longitude: -122.2425292652071 )
s7 = Shop.create(user_id: u1.id,name:"Mocha Express", pricing:"$", wifi: true , rating: 4/10, likes: 1, latitude:45.418096258950435, longitude: -122.59260303955796)

puts "🌱 Seeding Comments"
Comment.create(user_id: u2.id, shop_id: s1.id, comment:"Wifi spotty, food is really good", postdate: '2022-04-27', likes: 0)
Comment.create(user_id: u2.id, shop_id: s2.id, comment:"Good to pick up and go. No room to sit.", postdate: "2022/04/28" , likes: 1)
Comment.create(user_id: u4.id, shop_id: s1.id, comment:"Not packed, still spots open", postdate: "2022/04/26", likes: 0 )
Comment.create(user_id: u4.id, shop_id: s3.id, comment:"Wifi is down", postdate: "2022/04/28", likes: 2)
Comment.create(user_id: u3.id, shop_id: s3.id, comment:"Glad you like our shop!", postdate: "2022/04/27", likes: 0)

puts "🌱 Seeding Bookmarks"
Bookmark.create(user_id: u2.id, shop_id: s1.id, bookmarked: true )
Bookmark.create(user_id: u2.id, shop_id: s2.id, bookmarked: true )
Bookmark.create(user_id: u4.id, shop_id: s6.id, bookmarked: true)



