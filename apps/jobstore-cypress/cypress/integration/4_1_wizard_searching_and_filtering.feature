Feature: Coming back from edit page to search page selects previously selected job profile

        As a user,
        I want to see my previously selected profile when I navigate back in wizard
        So that I can continue the process without having to select the profile again
        And get warned if I change the profile to another

    Background:
        Given the user is logged in
        And the user is on the home page

    Scenario Outline: User navigates through the wizard up to the edit form and goes back to select a different job profile
        # # Starting the process from the home page
        When the user presses "Create new direct report" on the home page org chart
        Then they proceed to the additional information step
        Then the user fills out the required additional information
        Then they are taken to the job profile selection step

        When the user applies filters
        And the user applies search
        And the user selects a job profile

        When the user reloads the page
        Then the filters and search are still applied
        And the profile is selected