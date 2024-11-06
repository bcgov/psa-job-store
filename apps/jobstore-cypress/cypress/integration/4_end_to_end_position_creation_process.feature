# Feature: End-to-End Position Creation Process

#     As a user,
#     I want to go through the entire process of creating a position with optional edits,
#     So that I can ensure all steps function correctly in sequence.

#     Background:
#         Given the user is logged in
#         And the user is on the home page

#     Scenario Outline: Complete position creation process with optional edits
#         # Starting the process from the home page
#         When the user presses "Create new direct report" on the home page org chart
#         Then they proceed to the additional information step
#         Then the user fills out the required additional information
#         Then they are taken to the job profile selection step

#         # Selecting a job profile
#         When the user selects a job profile
#         Then they proceed to the profile editing step

#         # Edit form
#         When the user does not make edits
#         Then they proceed to the review changes step

#         # Reviewing changes
#         When the user reviews their changes
#         # Then they proceed to the additional information step

#         # Filling out additional information
#         # When the user fills out the required additional information
#         Then they proceed to the result step

#         # Finalizing the creation of the position
#         When the user clicks the "Generate position number" button and confirms the dialog
#         Then they see a confirmation screen with the position number
