class CartController < ApplicationController


	def create
  		render text: params[:cart].inspect
  		render "products/show"
	end
	
	def show
		#debugger
		id=params[:id]
		 
	end

end
