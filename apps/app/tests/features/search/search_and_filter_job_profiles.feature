Feature: Search and Filter Job Profiles

  As a user,
  I want to search and filter job profiles,
  So that I can find profiles that match my criteria.

  Background: 
    Given the user is logged in
    And the user navigates to the job search page

  Scenario: Search for a job profile by keyword
    When the user enters "Engineer" into the search field
    And the user clicks the "Search" button
    Then job profiles containing "Engineer" in the title should be displayed

  Scenario: Filter job profiles by location
    Given job profiles are listed
    When the user selects "New York" from the location filter
    And the user clicks the "Apply Filters" button
    Then only job profiles located in "New York" should be displayed

  Scenario: Search and filter job profiles using multiple criteria
    Given job profiles are listed
    When the user enters "Developer" into the search field
    And the user selects "Remote" from the location filter
    And the user selects "Full Time" from the job type filter
    And the user clicks the "Apply Filters" button
    Then only "Full Time Remote Developer" job profiles should be displayed