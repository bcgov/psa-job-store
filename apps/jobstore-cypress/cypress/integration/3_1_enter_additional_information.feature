# Feature: Form Editability Based on Approval Toggle

#     Background:
#         Given the user is logged in
#         And the user is on the additional info form page

#     Scenario: User enters form data
#         When the user attempts to proceed to next step
#         Then an error message appears

#         When the user dismisses the error message

#         And a default department is already selected in the dropdown

#         When the user changes the department dropdown value
#         Then the selected department changes accordingly

#         When the user tries to proceed without entering a first level excluded manager
#         Then an error message appears

#         When the user dismisses the error message
#         Then an error message prompts the user to enter the value

#         When the user enters excluded manager position number
#         And the user enters branch and division information

#         When the user presses save and quit
#         And the user returns to the additional info form page
#         Then the previously entered data is displayed on the form
