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

        # Selecting a job profile
        When the user changes the search results page
        And the user selects a job profile
        And they press the next button
        Then they proceed to the profile editing step
        And the form contains default values of the selected profile

        # Going back to the job profile selection step
        When the user presses the back button
        Then they are taken to the job profile selection step
        And the previously selected job profile is still selected
        And the correct page is selected

        # Selecting a different job profile
        When the user selects a different job profile on a different page
        And they press the next button
        Then they are shown a warning that they are changing the job profile

        When the user presses the cancel button
        Then the search results reset back to the previously selected job profile and page

        When the user selects a different job profile on a different page
        And they press the next button
        Then they are shown a warning that they are changing the job profile

        # Confirming the change
        When the user confirms the change
        Then they proceed to the profile editing step
        And the form contains default values of the new profile

        When the user does some edits
        And the user presses the back button
        Then they are taken to the job profile selection step
        And the new previously selected job profile and page is selected

        When they press the next button
        Then they proceed to the profile editing step
        And the form contains the previously entered values
