Feature: Search and Filter Job Profiles

  As a user,
  I want to search and filter job profiles,
  So that I can find profiles that match my specific criteria.

  Background:
    Given the user is logged in
    And the user navigates to the job search page

  # Scenario: Display job profile data correctly
  #   When the user views the job profiles list
  #   Then they see a list of job profiles

  # Scenario: Filter job profiles by classification
  #   When the user selects a classification from the classification filter dropdown
  #   Then only job profiles classified under that selected classification should be displayed

  # Scenario: Job profile selection
  #   When the user clicks on a job profile from the list
  #   Then the details of the selected job profile are displayed

  # Scenario: Page navigation in job profiles
  #   Given there are multiple pages of job profiles
  #   When the user navigates to a specific page
  #   Then the job profiles for that page are displayed

  Scenario: Search for a job profile by various fields
    When the user enters a keyword into the search field
    And the user clicks the "Search" button
    Then job profiles containing that keyword in any of the searchable fields should be displayed


# Scenario: Filter job profiles by ministry
#   When the user selects "Health" from the ministry filter dropdown
#   And the user clicks the "Apply Filters" button
#   Then only job profiles associated with the "Health" ministry should be displayed

# Scenario: Filter job profiles by job family
#   When the user selects "Administrative" from the job family filter dropdown
#   And the user clicks the "Apply Filters" button
#   Then only job profiles within the "Administrative" family should be displayed



# Scenario: Combine search and filters to narrow down job profiles
#   When the user enters "analyst" into the search field
#   And the user selects "Finance" from the ministry filter dropdown
#   And the user selects "Clerk 12" from the classification filter dropdown
#   And the user selects "Accounting" from the job family filter dropdown
#   And the user clicks the "Apply Filters" button
#   Then only job profiles containing "analyst" and matching the selected filters should be displayed

# Scenario: Clear filters and perform a new search
#   Given the user has applied certain filters
#   When the user clicks the "Clear Filters" button
#   And the user enters "project manager" into the search field
#   And the user clicks the "Search" button
#   Then all filters should be cleared
#   And only job profiles containing "project manager" should be displayed

# Scenario: Deselect a job profile by performing a new search
#   Given a job profile is currently selected and its details are displayed
#   When the user performs a new search or applies new filters
#   Then the previously selected job profile should be deselected
#   And the details view should be cleared or hidden
#   And the new search results should be displayed on the left side

# Scenario: No results found for a search or filter criteria
#   When the user enters "astronaut" into the search field
#   And the user clicks the "Search" button
#   Then a message "No job profiles found matching your criteria" should be displayed


# ======================

# Feature: Job Profile Search and Display

#   Background:
#     Given the user is on the Job Profiles page


#   Scenario: Display loading state during data fetch
#     Given the job profiles data is being loaded
#     When the user views the job profiles list
#     Then they see a loading indicator

#   Scenario: Display empty state when no job profiles are available
#     Given no job profiles are available
#     When the user views the job profiles list
#     Then they see an empty state message

#   Scenario: Pagination functionality
#     Given there are multiple pages of job profiles
#     When the user interacts with the pagination component
#     Then the job profiles list updates according to the selected page

#   Scenario: Generate correct link URL for each job profile
#     When the user views the job profiles list
#     Then each job profile has a correct link URL

#   Scenario: Job profile search functionality
#     When the user enters "test search" in the search input and submits
#     Then the job profiles relevant to "test search" are displayed

#   Scenario: Display search input and dropdown filters
#     When the user views the search area
#     Then they see the search input and dropdown filters for "Organization", "Classification", and "Job Family"

#   Scenario: Filter job profiles by organization
#     When the user selects "Organization B" from the organization filter
#     Then the job profiles list updates to show profiles from "Organization B"

#   Scenario: Filter job profiles by job family
#     When the user selects "Engineering" from the job family filter
#     Then the job profiles list updates to show profiles in the "Engineering" job family

#   Scenario: Clear organization filter
#     Given the organization filter is applied
#     When the user clears the organization filter
#     Then the job profiles list updates to show all profiles regardless of organization

#   Scenario: Responsive layout rendering
#     Given the user is on a device with varying screen sizes
#     When the screen size changes
#     Then the layout of the job profiles page adjusts to fit the screen size

#   Scenario: Error handling for data fetch failure
#     Given there is an error fetching job profiles data
#     When the user views the job profiles list
#     Then an error message is displayed

#   Scenario: Initial page load
#     When the user first loads the Job Profiles page
#     Then they see the page header "Job Profiles" with the subtitle "Find a Job Profile which suits your needs"
#     And the job profiles list showing "1-2 of 7 results" is displayed
