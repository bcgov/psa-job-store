Feature: Form Editability Based on Approval Toggle

    Background:
        Given the user is logged in
        And the user is on the additional info form page

    Scenario: User enters form data
        Given the approval toggle is off
        Then all form fields are disabled

        When the user attempts to proceed to next step
        Then an error message appears

        When the user dismisses the error message
        And the user toggles the approval switch on
        Then all form fields become enabled

        And a default department is already selected in the dropdown

        When the user changes the department dropdown value
        Then the selected department changes accordingly

        When the user tries to proceed without entering a first level excluded manager
        Then an error message appears

        When the user dismisses the error message
        Then an error message prompts the user to enter the value

        When the user enters excluded manager position number
        # And the user enters comments

        Then information about job title, expected classification level, reporting manager, type, and job store profile number is displayed

        When the user inputs all information but then toggles the approval switch off
        And the user attempts to proceed to next step
        Then an error message appears

        When the user dismisses the error message
        Then error message to toggle executive approval is visible

        When the user presses save and quit
        And the user returns to the additional info form page
        Then the previously entered data is displayed on the form
