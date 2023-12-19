Feature: Search and Filter Job Profiles

  As a user,
  I want to search and filter job profiles,
  So that I can find profiles that match my specific criteria.

  Background:
    Given the user is logged in
    And the user navigates to the job search page

  Scenario: Display job profile data correctly
    When the user views the job profiles list
    Then they see a list of job profiles

  Scenario: Search for a job profile by various fields
    When the user enters a keyword into the search field
    And the user clicks the "Search" button
    Then job profiles containing that keyword in any of the searchable fields should be displayed

  Scenario: Filter job profiles by classification
    When the user selects a classification from the classification filter dropdown
    Then only job profiles classified under that selected classification should be displayed

  #   Scenario: Filter job profiles by job family
  #     When the user selects "Engineering" from the job family filter
  #     Then the job profiles list updates to show profiles in the "Engineering" job family

  Scenario: Job profile selection
    When the user clicks on a job profile from the list
    Then the details of the selected job profile are displayed

  Scenario: Page navigation in job profiles
    Given there are multiple pages of job profiles
    When the user navigates to a specific page
    Then the job profiles for that page are displayed

# Scenario: Deselect a job profile by performing a new search
#   Given a job profile is currently selected and its details are displayed
#   When the user performs a new search or applies new filters
#   Then the previously selected job profile should be deselected
#   And the details view should be cleared or hidden
#   And the new search results should be displayed on the left side


# Scenario: Combine search and filters to narrow down job profiles
#   When the user enters "analyst" into the search field
#   And the user selects "Finance" from the ministry filter dropdown
#   And the user selects "Accounting" from the job family filter dropdown
#   And the user clicks the "Apply Filters" button
#   Then only job profiles containing "analyst" and matching the selected filters should be displayed