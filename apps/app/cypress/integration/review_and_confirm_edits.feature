Feature: Review and Confirm Job Profile Edits

    As a user who has made edits to a job profile,
    I want to review and confirm these changes accurately,
    So that I can finalize the profile with an immediate position number for no or minor edits, or ensure it is submitted for review if the edits are significant.

    Background:
        Given the user has chosen a job profile and accessed the edit page
        And the user has made edits or left the profile unchanged
        And the user is now ready to review these edits on the review page

    Scenario: Decline to confirm edits on the review page
        When the user reads the disclaimer and selects "Decline"
        Then the user should remain on the review edits page
        And be given the option to review the edits again or go back to editing

    Scenario: Go back to edit from the review page
        When the user selects the option to go back from the review page
        Then the user should be taken back to the job profile edit page
        And be able to make further modifications to their edits
        And the form should contain the values that the user inputted

    Scenario: Confirm without edits and receive new position number
        When the user reads and agrees with the disclaimer
        And the user selects "Confirm"
        Then no new copy should be saved since there were no edits
        And the user should be given a new position number immediately
        And the user should see a confirmation message "Your position number [Position Number] has been generated"

    Scenario: Confirm minor edits and receive new position number
        Given the user made minor edits to the job profile
        When the user reads and agrees with the disclaimer
        And the user selects "Confirm"
        Then a copy of the job profile with the user's edits should be saved
        And the user should be given a new position number immediately
        And the user should see a confirmation message "Your position number [Position Number] has been generated"

    Scenario: Confirm significant edits and submit for classification review
        Given the user made significant edits to the job profile
        When the user reads and agrees with the disclaimer
        And the user selects "Confirm"
        Then a copy of the job profile with the user's edits should be saved
        And the user's edits should be submitted for classification review
        And the user should see a message "Your edits have been submitted for classification review. You will be provided with a position number upon completion of the review."

    Scenario: Make further edits after going back from the review page
        Given the user goes back to the edit page from the review page
        When the user makes additional changes to the job profile
        And then proceeds to the review page
        And the user reads and agrees with the disclaimer
        And the user selects "Confirm"
        Then the user should see the additional changes reflected in the saved copy
        And the user should see a confirmation message "Your personalized job profile has been saved"

