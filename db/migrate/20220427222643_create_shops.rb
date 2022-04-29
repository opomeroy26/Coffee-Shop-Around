class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :pricing
      t.boolean :wifi
      t.integer :rating
      t.integer :likes
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
