Feature: Manage and Display Position Requests

    As a user
    I want to manage and display job positions with various filters, search, and pagination
    So that I can efficiently find and interact with specific position requests

    Background:
        Given the user is logged in
        And the user is on the My Positions page

    # Scenario: Search for job positions using keywords
    #     When the user enters "analyst" into the search field
    #     And the user clicks the "Find positions" button
    #     Then job positions containing "analyst" in the title or submission ID should be displayed

    # Scenario: Filter job positions by status
    #     When the user selects the "Draft" status from the status filter dropdown
    #     Then only job positions with the "Draft" status should be displayed

    # Scenario: Filter job positions by classification
    #     When the user selects a classification from the classification filter dropdown
    #     Then only job positions with the selected classification should be displayed

    # Scenario: Clear all filters to show default job position results
    #     Given the user has applied filters for status and classification
    #     When the user clicks the "Clear all filters" button
    #     Then all filters should be cleared and the default job position results should be displayed

    # Scenario: Selecting a job position to view details
    #     When the user clicks on a job position from the list
    #     Then the details of the selected job position are displayed

    # Scenario Outline: Sort job positions by <Column> in <Direction> order
    #     Given job positions are listed
    #     When the user sorts by "<Column>" in "<Direction>" order
    #     And the user changes the items per page to 10
    #     Then job positions are sorted by "<Column>" in "<Direction>" order correctly

    #     Examples:
    #         | Column    | Direction |
    #         | Job Title | ascending |
    #         | Job Title     | descending |
    #         | Status        | ascending  |
    #         | Status        | descending |
    #         | Class         | ascending  |
    #         | Class         | descending |
    #         | Position #    | ascending  |
    #         | Position #    | descending |
    #         | Submission ID | ascending  |
    #         | Submission ID | descending |
    #         | Modified at   | ascending  |
    #         | Modified at   | descending |

    # Scenario: User copies the position number
    #     When the user hovers over the position row with id "3"
    #     And the user clicks the copy button next to the position number
    #     And a success message "Position number copied!" should be displayed


    # Scenario Outline: Executing actions for DRAFT status menu options
    #     When the user changes the items per page to 10
    #     And the user opens the action menu for a job position with "DRAFT" status
    #     And the user selects the "<Action>" option
    #     Then the system should perform the "<Action>" action

    #     Examples:
    #         | Action |
    #         | Edit   |
    #         | Copy link |
    #         | Delete |

    # Scenario: Executing actions for COMPLETED status menu options
    #     When the user opens the action menu for a job position with "COMPLETED" status
    #     And the user selects the "<Action>" option
    #     Then the system should perform the "<Action>" action

    #     Examples:
    #         | Action    |
    #         | View   |
    #         | Download |
    #         | Copy link |

    # Scenario: Executing actions for IN_REVIEW status menu options
    #     When the user opens the action menu for a job position with "IN_REVIEW" status
    #     And the user selects the "<Action>" option
    #     Then the system should perform the "<Action>" action

    #     Examples:
    #         | Action    |
    #         | View      |
    #         | Copy link |


    Scenario: Focus shifts to the first menu item on opening and returns to the ellipsis on closing
        When the user activates the action menu for a position
        Then focus should move to the first item in the action menu
        When the user closes the menu with the escape key
        Then focus should return to the ellipsis button that opened it