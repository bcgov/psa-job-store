Feature: View home page
    As a user,
    I want to view the dashboard upon logging in,
    So that I can quickly access recent positions, org chart, position requests counts, and other features.

    Background:
        Given the user is logged in

    Scenario: User is viewing the dashboard
        When the user navigates to the home page
        Then the user should see recent positions
        And the user should see org chart
        And the user should see correct counts for position requests
        And the user should see create new position button
        And the user should see other menu options
        And the menu should be collapsed

        When the user clicks expand menu
        Then the menu should be expanded

        When the user clicks collapse menu
        Then the menu should be collapsed

        When the user clicks expand menu
        And the user reloads the page
        Then the menu should be expanded