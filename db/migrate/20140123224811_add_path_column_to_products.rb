class AddPathColumnToProducts < ActiveRecord::Migration
  def change
    add_column :products, :Path, :text
  end
end
