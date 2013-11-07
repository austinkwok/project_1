class AppointmentsController < ApplicationController
  
  skip_before_filter :verify_authenticity_token
  
  def index
	@appointments = Appointments.where("month = ? AND year = ?", params[:month], params[:year])
        render:json => @appointments
  end
  
  def create
    @appointment = Appointments.new(app_params)
    @appointment.save
    render :nothing => true
  end
  
  private
  
  def app_params
      params.require(:appointments).permit(:event, :time, :day, :month, :year)                 
  end
end
