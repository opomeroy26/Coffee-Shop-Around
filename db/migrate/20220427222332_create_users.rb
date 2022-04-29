class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :profile_img
      t.string :location
      t.boolean :admin

      t.timestamps
    end
  end
end
