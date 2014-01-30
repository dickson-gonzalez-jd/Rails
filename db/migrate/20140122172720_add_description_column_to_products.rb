class AddDescriptionColumnToProducts < ActiveRecord::Migration
  def change
    add_column :products, :Description, :string
  end
end
