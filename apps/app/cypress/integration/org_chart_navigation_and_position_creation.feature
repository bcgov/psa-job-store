Feature: Org Chart Navigation and New Position Creation

    As a logged-in user,
    I want to navigate an org chart and create new positions within it,
    So that I can expand the organizational structure directly from the chart.

    Background:
        Given the user is logged in
        And the user is presented with their organizational chart

    Scenario: Create a new position after selecting with the mouse
        Given the user selects a position on the org chart with the mouse
        Then the "Create new position" button should become visible for that position
        When the user clicks the "Create new position" button
        Then the user should be taken to the search and filtering screen to pick a job profile

    Scenario: Create a new position after selecting with the keyboard
        Given the user selects a position on the org chart with the keyboard
        Then the "Create new position" button should become visible for that position
        When the user presses the key to activate the "Create new position" button
        Then the user should be taken to the search and filtering screen to pick a job profile

    Scenario: Ensure accessibility for org chart navigation
        Given the user requires assistive technologies to navigate
        Then the org chart interactions should comply with WCAG accessibility standards