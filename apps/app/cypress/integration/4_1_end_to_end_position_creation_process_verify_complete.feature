Feature: End-to-End Position Creation Process with Verification warning

    As a user,
    I want to go through the entire process of creating a position with edits,
    So that I can ensure all steps function correctly in sequence.

    Background:
        Given the user is logged in
        And the user is on the home page

    Scenario Outline: Complete position creation process with edits, gets verification warning, and submits for verification. Classifications then switches the status in CRM.
        # Starting the process from the home page
        When the user presses "Create new direct report" on the home page org chart
        Then they are taken to the job profile selection step

        # Selecting a job profile
        When the user selects a job profile
        Then they proceed to the profile editing step

        # Edit form
        When the user makes edits in significant fields
        Then they proceed to the review changes step

        # Reviewing changes
        When the user reviews their changes
        Then they proceed to the additional information step

        # Filling out additional information
        When the user fills out the required additional information
        Then they proceed to the result step

        # Finalizing the creation of the position
        Then they see a verification warning window

        # Submitting the position for verification
        When the user enters comments into the comment box
        And the user presses "Submit for verification"
        Then they see a success message
        And position request contains the comment

        When user navigates to My Positions page
        Then they see the new position in the list with "In Review" status

        When Classification team switches the CRM service request to "Action required"
        And user waits for systems to synchronize
        And the user navigates to My Positions page
        Then they see the new position in the list with "Action required" status
