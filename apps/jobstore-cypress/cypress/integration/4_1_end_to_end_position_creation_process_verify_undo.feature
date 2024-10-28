# Feature: End-to-End Position Creation Process with Verification warning

#     As a user,
#     I want to go through the entire process of creating a position with edits,
#     So that I can ensure all steps function correctly in sequence.

#     Background:
#         Given the user is logged in
#         And the user is on the home page

#     Scenario Outline: Complete position creation process with edits, gets verification warning, and undoes changes
#         # Starting the process from the home page
#         When the user presses "Create new direct report" on the home page org chart
#         Then they are taken to the job profile selection step

#         # Selecting a job profile
#         When the user selects a job profile
#         Then they proceed to the profile editing step

#         # Edit form
#         When the user makes edits in significant fields
#         Then they proceed to the review changes step

#         # Reviewing changes
#         When the user reviews their changes
#         Then they proceed to the additional information step

#         # Filling out additional information
#         When the user fills out the required additional information
#         Then they proceed to the result step

#         # Finalizing the creation of the position
#         Then they see a verification warning window
#         And it contains a warning message with links to the edit form

#         When the user clicks the link in the warning message
#         Then they are taken to the edit form

#         When the user undoes previous significant changes
#         # takes them to review screen
#         And proceeds to next step
#         # takes them to additional information screen
#         And proceeds to next step
#         # takes them to confirmation screen
#         And proceeds to next step
#         Then the user sees the screen with "Generate position number button"

