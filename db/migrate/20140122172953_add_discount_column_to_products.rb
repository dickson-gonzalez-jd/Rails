class AddDiscountColumnToProducts < ActiveRecord::Migration
  def change
    add_column :products, :Discount, :decimal
  end
end
