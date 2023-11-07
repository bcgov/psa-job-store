Feature: Edit Job Profiles

    As a user,
    I want to edit job profiles and review my changes,
    So that I can confirm all edits before saving my personalized job profile copy.

    Background:
        Given the user is logged in
        And the test environment has a set of job profiles with known attributes
        And the user has navigated to the job profile search page
        And the user has searched for and selected a specific job profile "Senior Developer Role"
        And the user is on the job profile edit page for "Senior Developer Role"

    Scenario: Change classification and update job context and overview
        When the user selects "Band 1" from the classification dropdown
        And the user updates the job context to "Context updated"
        And the user updates the job overview to "Overview updated"
        And the user clicks the "Next" button
        Then the user should be taken to the review edits page
        And the review page should display the updated classification "Band 1"
        And the review page should show the updated context "Context updated"
        And the review page should show the updated overview "Overview updated"

    Scenario: Add and delete required accountabilities
        When the user adds a new required accountability "Lead successful deployments"
        And the user deletes an existing required accountability "Manage team meetings"
        And the user clicks the "Next" button
        Then the review page should include the new accountability "Lead successful deployments"
        And the review page should not list the deleted accountability "Manage team meetings"

    Scenario: Validate minimum job requirements during editing
        When the user inputs an invalid job requirement "Too short"
        And the user attempts to navigate to the next page
        Then a validation error message should display "Requirement must be more than 10 characters"
        When the user corrects the job requirement to "Two years of project management experience"
        And the user clicks the "Next" button
        Then the user should be taken to the review edits page without any validation errors

    Scenario: Add and delete optional accountabilities
        When the user adds a new optional accountability "Participate in continuous learning"
        And the user deletes an existing optional accountability "Attend weekly sector meetings"
        And the user clicks the "Next" button
        Then the review page should include the new optional accountability "Participate in continuous learning"
        And the review page should not list the deleted optional accountability "Attend weekly sector meetings"

    Scenario: Modify behavioural competencies
        When the user selects the competency "Effective Communication" from the predefined list
        And the user deselects the competency "Advanced Spreadsheet Skills"
        And the user clicks the "Next" button
        Then the review page should display the competency "Effective Communication"
        And the review page should not list the competency "Advanced Spreadsheet Skills"

    Scenario: Confirm edits and save profile on the review page
        When the user reads and agrees to the disclaimer
        And the user clicks the "Confirm" button
        Then the system should save a copy of the job profile with the user's edits
        And the user should see the message "Your personalized job profile has been saved"
