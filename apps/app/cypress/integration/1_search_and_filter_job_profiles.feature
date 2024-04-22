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

  Scenario: Search for a job profile
    When the user enters a keyword into the search field
    And the user clicks the "Search" button
    Then job profiles containing that keyword in any of the searchable fields should be displayed

  Scenario: Filter job profiles by classification
    When the user selects a classification from the classification filter dropdown
    Then only job profiles classified under that selected classification should be displayed

  Scenario: Filter job profiles by job family
    When the user selects a job family from the job family filter
    Then only job profiles classified under that selected job family should be displayed

  Scenario: Combine search and filters to narrow down job profiles
    When the user selects "Financial Officer R15" from the classification filter dropdown
    And the user enters "multiple programs" into the search field
    And the user clicks the "Search" button
    Then only job profiles containing "multiple programs" and matching the selected filters should be displayed

  Scenario: Combine Job Family and Classification filters together
    When the user selects "Budgeting" from the job family filter
    And the user selects "Financial Officer R15" from the classification filter dropdown
    Then only job profiles classified under "Budgeting" job family and "Financial Officer R15" classification should be displayed

  Scenario: Clearing filters to show default job profile results
    When the user selects "Budgeting" from the job family filter
    And the user selects "Financial Officer R15" from the classification filter dropdown
    Then only job profiles classified under "Budgeting" job family and "Financial Officer R15" classification should be displayed
    When the user clicks the "Clear Filters" button
    Then the default job profile results should be displayed

  Scenario: Combine search and filters, then clear filters while maintaining the search query
    When the user selects "Financial Officer R15" from the classification filter dropdown
    And the user enters "multiple programs" into the search field
    And the user clicks the "Search" button
    Then only job profiles containing "multiple programs" and matching the selected filters should be displayed
    When the user clicks the "Clear Filters" button
    Then the search results should still display job profiles containing "multiple programs"

  Scenario: Job profile selection
    When the user clicks on a job profile from the list
    Then the details of the selected job profile are displayed
    And the new job profile should be selected

  Scenario: Page navigation in job profiles
    Given there are multiple pages of job profiles
    And the user sets the page size to 2
    When the user navigates to a specific page
    Then the job profiles for that page are displayed

  Scenario: Deselect a job profile by performing a new search
    Given a job profile is currently selected and its details are displayed
    When the user performs a new search
    Then the previously selected job profile should be deselected
    And the details view should be cleared or hidden

  Scenario: Deselect a job profile by applying a filter
    Given a job profile is currently selected and its details are displayed
    When the user applies a filter
    Then the previously selected job profile should be deselected
    And the details view should be cleared or hidden

  Scenario: Reset to first page after applying a search while on the second page
    Given there are multiple pages of job profiles
    And the user sets the page size to 2
    When the user navigates to a specific page
    And the user enters a keyword into the search field
    And the user clicks the "Search" button
    Then the job profiles for the first page should be displayed

  Scenario: Reset to first page after applying a filter while on the second page
    Given there are multiple pages of job profiles
    And the user sets the page size to 2
    When the user navigates to a specific page
    And the user applies a filter
    Then the job profiles for the first page should be displayed for filtered results