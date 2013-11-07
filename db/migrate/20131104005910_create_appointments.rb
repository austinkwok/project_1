class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :event
      t.string :time
      t.integer :day
      t.string :month
      t.integer :year

      t.timestamps
    end
  end
end
