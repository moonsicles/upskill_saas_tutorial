class Users::RegistrationsController < Devise::RegistrationsController
  # Extend default devise gem behavior so that users signing up with 
  # pro account (plan id 2), will be saved with a subscription function.
  # Otherwise Devise signs up user as usual.
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end