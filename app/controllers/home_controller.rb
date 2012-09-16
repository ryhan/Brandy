require 'rubygems'
require 'whois'

class HomeController < ApplicationController
  def index
		puts Whois.whois("google.com")
  end
end
