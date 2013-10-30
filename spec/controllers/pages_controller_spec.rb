require 'spec_helper'

describe PagesController do

  describe "GET 'calendar'" do
    it "returns http success" do
      get 'calendar'
      response.should be_success
    end
  end

end
