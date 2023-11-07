Feature: Review and Confirm Job Profile Edits

    As a user,
    I want to review and confirm my edits to a job profile,
    So that I can ensure the information is correct before submitting.

    Background:
        Given the user has edited a job profile
        And the user is on the review edits page

    Scenario: Review edits before submission
        Then the user should see a summary of changes made

    Scenario: Confirm disclaimer and submit
        When the user reads the disclaimer
        And the user checks the "I agree" checkbox
        And the user clicks the "Submit" button
        Then the user should see a confirmation message