Feature: Search and Filter Job Profiles

  As a user,
  I want to search and filter job profiles,
  So that I can find profiles that match my specific criteria.

  Background:
    Given the user is logged in
    And the user navigates to the job search page

  Scenario: Filter job profiles by ministry
    When the user selects "Health" from the ministry filter dropdown
    And the user clicks the "Apply Filters" button
    Then only job profiles associated with the "Health" ministry should be displayed

  Scenario: Filter job profiles by classification
    When the user selects "Band 2" from the classification filter dropdown
    And the user clicks the "Apply Filters" button
    Then only job profiles classified as "Band 2" should be displayed

  Scenario: Filter job profiles by job family
    When the user selects "Administrative" from the job family filter dropdown
    And the user clicks the "Apply Filters" button
    Then only job profiles within the "Administrative" family should be displayed

  Scenario: Search for a job profile by various fields
    When the user enters "budget" into the search field
    And the user clicks the "Search" button
    Then job profiles containing "budget" in any of the searchable fields should be displayed

  Scenario: Combine search and filters to narrow down job profiles
    When the user enters "analyst" into the search field
    And the user selects "Finance" from the ministry filter dropdown
    And the user selects "Clerk 12" from the classification filter dropdown
    And the user selects "Accounting" from the job family filter dropdown
    And the user clicks the "Apply Filters" button
    Then only job profiles containing "analyst" and matching the selected filters should be displayed

  Scenario: Clear filters and perform a new search
    Given the user has applied certain filters
    When the user clicks the "Clear Filters" button
    And the user enters "project manager" into the search field
    And the user clicks the "Search" button
    Then all filters should be cleared
    And only job profiles containing "project manager" should be displayed

  Scenario: Select a job profile to view details
    Given job profiles are listed from a search or filter action
    When the user clicks on a job profile from the search results
    Then the selected job profile details should be displayed on the side
    And the search results should remain visible on the left side

  Scenario: Deselect a job profile by performing a new search
    Given a job profile is currently selected and its details are displayed
    When the user performs a new search or applies new filters
    Then the previously selected job profile should be deselected
    And the details view should be cleared or hidden
    And the new search results should be displayed on the left side

  Scenario: No results found for a search or filter criteria
    When the user enters "astronaut" into the search field
    And the user clicks the "Search" button
    Then a message "No job profiles found matching your criteria" should be displayed
