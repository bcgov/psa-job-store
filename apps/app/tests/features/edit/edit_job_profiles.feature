Feature: Edit Job Profiles

    As a user,
    I want to edit job profiles and then review my changes,
    So that I can confirm all edits before saving my personalized job profile copy.

    Background:
        Given the user has searched and selected a job profile to edit
        And the user is on the job profile edit page

    Scenario: Change classification and update job context and overview
        When the user selects "Senior Developer" from the classification dropdown
        And the user edits the job context to "Context updated"
        And the user edits the job overview to "Overview updated"
        And the user clicks the "Next" button
        Then the user should be taken to the review edits page
        And the review page should reflect the updated classification, context, and overview

    Scenario: Add and remove required accountabilities
        Given the user is editing the required accountabilities
        When the user clicks the "Add" button in the required accountabilities section
        And the user enters "New accountability" into the new text field
        And the user clicks on "Delete" next to an existing accountability
        And the user clicks the "Next" button
        Then the user should see "New accountability" in the list on the review page
        And the deleted accountability should not be present

    Scenario: Edit minimum job requirements with validation
        When the user edits a minimum job requirement to an invalid format
        And the user attempts to navigate to the next page
        Then the user should see a validation error message
        When the user corrects the minimum job requirement to a valid format
        And the user clicks the "Next" button
        Then the user should be taken to the review edits page without error

    Scenario: Add and remove optional accountabilities
        Given the user is editing the optional accountabilities
        When the user adds a new optional accountability
        And the user enters "New optional accountability" into the new text field
        And the user removes an existing optional accountability
        And the user clicks the "Next" button
        Then the user should see the changes reflected on the review page

    Scenario: Add and remove behavioural competencies
        Given the user is on the behavioural competencies section
        When the user selects a new competency from the predefined options
        And the user deselects an existing competency
        And the user clicks the "Next" button
        Then the user should see the new competency added on the review page
        And the deselected competency should not be present

    Scenario: Confirm edits and save profile on the review page
        Given the user has completed edits and is on the review edits page
        When the user reads and confirms the disclaimer
        And the user clicks the "Confirm" button
        Then a copy of the job profile with the user's edits should be saved
        And the user should see a confirmation message "Your personalized job profile has been saved"
