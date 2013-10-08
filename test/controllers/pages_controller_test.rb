require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get project_2" do
    get :project_2
    assert_response :success
  end

end
